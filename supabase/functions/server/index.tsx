import { Hono } from 'npm:hono';
import type { Context } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Supabase client for KV store operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);
const revenueCatSecret = Deno.env.get('REVENUECAT_SECRET_KEY') ?? '';

type PremiumCheckResult =
  | { userId: string }
  | { response: Response };

const getUserFromAuthHeader = async (c: Context): Promise<PremiumCheckResult> => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { response: c.json({ error: 'Unauthorized' }, 401) };
  }

  const jwt = authHeader.replace('Bearer', '').trim();
  if (!jwt) {
    return { response: c.json({ error: 'Unauthorized' }, 401) };
  }

  try {
    const { data: userData, error } = await supabase.auth.getUser(jwt);
    if (error || !userData?.user) {
      console.error('[server] auth validation failed', error);
      return { response: c.json({ error: 'Unauthorized' }, 401) };
    }
    return { userId: userData.user.id };
  } catch (error) {
    console.error('[server] unexpected auth error', error);
    return { response: c.json({ error: 'Unauthorized' }, 401) };
  }
};

type RevenueCatEntitlement = {
  product_identifier?: string;
  expires_date?: string | null;
};

const hasActivePremium = async (appUserId: string): Promise<boolean> => {
  if (!revenueCatSecret) {
    throw new Error('REVENUECAT_SECRET_KEY missing');
  }

  const rcResponse = await fetch(
    `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`,
    {
      headers: {
        Authorization: `Bearer ${revenueCatSecret}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const rcJson = await rcResponse.json();

  if (!rcResponse.ok) {
    console.error('[server] RevenueCat API error', rcResponse.status, rcJson);
    throw new Error('Failed to verify subscription status');
  }

  const entitlements = rcJson?.subscriber?.entitlements ?? {};
  const now = Date.now();

  return Object.values<RevenueCatEntitlement>(entitlements).some((ent) => {
    if (!ent) return false;
    if (!ent.expires_date) return true;
    const expiresDate = Date.parse(ent.expires_date);
    return !Number.isNaN(expiresDate) && expiresDate > now;
  });
};

const ensurePremiumAccess = async (c: Context): Promise<PremiumCheckResult> => {
  const auth = await getUserFromAuthHeader(c);
  if ('response' in auth) {
    return auth;
  }

  try {
    const active = await hasActivePremium(auth.userId);
    if (!active) {
      return {
        response: c.json(
          { error: 'Premium subscription required', success: false },
          402,
        ),
      };
    }
  } catch (error) {
    console.error('[server] premium validation error', error);
    return {
      response: c.json(
        { error: 'Unable to verify subscription status', success: false },
        500,
      ),
    };
  }

  return auth;
};

// KV store helper functions
const kvGet = async (key: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('kv_store_be273801')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error || !data) return null;
    return typeof data.value === 'string' ? data.value : JSON.stringify(data.value);
  } catch (e) {
    console.error(`KV get error for key "${key}":`, e);
    return null;
  }
};

const kvSet = async (key: string, value: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('kv_store_be273801')
      .upsert({ key, value }, { onConflict: 'key' });
    
    if (error) {
      console.error(`KV set error for key "${key}":`, error);
    }
  } catch (e) {
    console.error(`KV set error for key "${key}":`, e);
  }
};

// Middleware
app.use('*', logger(console.log));
app.use('*', cors());

// Health check
app.get('/make-server-be273801/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OpenAI word generation endpoint
app.post('/make-server-be273801/generate-words', async (c) => {
  try {
    const premiumResult = await ensurePremiumAccess(c);
    if ('response' in premiumResult) {
      return premiumResult.response;
    }

    const { categoryName, numberOfWords = 50 } = await c.req.json();

    if (!categoryName) {
      return c.json({ error: 'Category name is required' }, 400);
    }

    // Validate input to prevent abuse
    if (typeof categoryName !== 'string' || categoryName.length > 100) {
      return c.json({ error: 'Invalid category name' }, 400);
    }

    // Enforce reasonable limits on word count
    const validNumberOfWords = Math.min(Math.max(1, parseInt(numberOfWords) || 50), 100);

    // Basic rate limiting using IP address (production should use better solution)
    const clientIP = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const rateLimitKey = `rate_limit_${clientIP}_${new Date().toISOString().split('T')[0]}`;
    
    try {
      const currentCount = await kvGet(rateLimitKey);
      const count = currentCount ? parseInt(currentCount) : 0;
      
      // Limit: 50 AI word generations per IP per day (matches frontend limit)
      if (count >= 50) {
        console.log(`Rate limit exceeded for IP: ${clientIP}`);
        return c.json({ 
          error: 'Daily rate limit exceeded. Please try again tomorrow.',
          success: false,
          words: []
        }, 429);
      }
      
      // Increment counter
      await kvSet(rateLimitKey, (count + 1).toString());
    } catch (e) {
      console.error('Rate limiting error:', e);
      // Continue if rate limiting fails - don't block legitimate users
    }

    // Get OpenAI API key from environment
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
      console.log('OpenAI API key not configured');
      return c.json({ 
        error: 'OpenAI API key not configured',
        success: false,
        words: []
      }, 400);
    }

    const prompt = `Generate exactly ${validNumberOfWords} unique words for a social deduction game category called "${categoryName}". 

Requirements:
- Words should be specific, recognizable items/concepts that fit the category
- Each word should be distinct and not too similar to others
- Words should be appropriate for a party game
- Return a JSON object with a "words" property containing an array of strings
- Format: {"words": ["word1", "word2", "word3", ...]}

Category: ${categoryName}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates word lists for party games. Always respond with valid JSON objects containing a "words" array.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return c.json({ 
        error: errorData.error?.message || 'OpenAI API request failed',
        success: false,
        words: []
      }, response.status);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return c.json({ error: 'No response from OpenAI', success: false, words: [] }, 500);
    }

    // Parse the JSON response
    let words: string[];
    try {
      const parsed = JSON.parse(content);
      words = Array.isArray(parsed) ? parsed : parsed.words || [];
    } catch (e) {
      // Fallback: try to extract array from text
      const match = content.match(/\[.*\]/s);
      if (match) {
        words = JSON.parse(match[0]);
      } else {
        return c.json({ error: 'Failed to parse OpenAI response', success: false, words: [] }, 500);
      }
    }

    // Validate and clean the words
    const cleanedWords = words
      .filter((word: any) => typeof word === 'string' && word.trim().length > 0)
      .map((word: string) => word.trim())
      .slice(0, validNumberOfWords);

    if (cleanedWords.length === 0) {
      return c.json({ error: 'No valid words generated', success: false, words: [] }, 500);
    }

    return c.json({
      words: cleanedWords,
      success: true
    });

  } catch (error) {
    console.error('Error generating words:', error);
    return c.json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false,
      words: []
    }, 500);
  }
});

// OpenAI hint generation endpoint for imposters
app.post('/make-server-be273801/generate-hint', async (c) => {
  try {
    const premiumResult = await ensurePremiumAccess(c);
    if ('response' in premiumResult) {
      return premiumResult.response;
    }

    const { word, categoryName } = await c.req.json();

    if (!word) {
      return c.json({ error: 'Word is required' }, 400);
    }

    // Validate input to prevent abuse
    if (typeof word !== 'string' || word.length > 100) {
      return c.json({ error: 'Invalid word' }, 400);
    }

    if (categoryName && (typeof categoryName !== 'string' || categoryName.length > 100)) {
      return c.json({ error: 'Invalid category name' }, 400);
    }

    // Basic rate limiting using IP address
    const clientIP = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const rateLimitKey = `hint_rate_limit_${clientIP}_${new Date().toISOString().split('T')[0]}`;
    
    try {
      const currentCount = await kvGet(rateLimitKey);
      const count = currentCount ? parseInt(currentCount) : 0;
      
      // Limit: 150 hint generations per IP per day (3x word limit since hints are called per-game)
      if (count >= 150) {
        console.log(`Hint rate limit exceeded for IP: ${clientIP}`);
        return c.json({ 
          error: 'Daily rate limit exceeded for hints.',
          success: false,
          hint: null
        }, 429);
      }
      
      // Increment counter
      await kvSet(rateLimitKey, (count + 1).toString());
    } catch (e) {
      console.error('Rate limiting error:', e);
      // Continue if rate limiting fails
    }

    // Get OpenAI API key from environment
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
      console.log('OpenAI API key not configured for hint generation');
      return c.json({ 
        error: 'OpenAI API key not configured',
        success: false,
        hint: null
      }, 400);
    }

    const prompt = `You are generating a hint for a social deduction game where one player (the Imposter) doesn't know the secret word but needs to blend in.

The secret word that all innocent players received is: "${word}"
${categoryName ? `The category is: "${categoryName}"` : ''}

Generate a SINGLE subtle hint word or short phrase (1-3 words max) that:
- Is related to "${word}" but NOT too obvious
- Helps the imposter participate without giving away they don't know the word
- Is NOT the word itself or a direct synonym
- Is contextual and thematic (e.g., if the word is "Pizza", a good hint might be "Italian Food" or "Cheese Dish")
- Strikes a balance: helpful enough to blend in, but vague enough to not make it trivial

BAD examples for "Pizza": "Food", "Thing", "Item" (too vague)
BAD examples for "Pizza": "Pizza Pie", "Pepperoni Pizza", "Italian Pizza" (too obvious)
GOOD examples for "Pizza": "Italian Dish", "Baked Food", "Cheese Item"

Return ONLY a JSON object with a "hint" property containing the hint as a string.
Format: {"hint": "your hint here"}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a creative assistant that generates balanced hints for social deduction games. Always respond with valid JSON objects containing a "hint" property with a string value.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 50,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error during hint generation:', errorData);
      return c.json({ 
        error: errorData.error?.message || 'OpenAI API request failed',
        success: false,
        hint: null
      }, response.status);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return c.json({ error: 'No response from OpenAI', success: false, hint: null }, 500);
    }

    // Parse the JSON response
    let hint: string;
    try {
      const parsed = JSON.parse(content);
      hint = parsed.hint || '';
    } catch (e) {
      console.error('Failed to parse hint response:', e);
      return c.json({ error: 'Failed to parse OpenAI response', success: false, hint: null }, 500);
    }

    if (!hint || hint.trim().length === 0) {
      return c.json({ error: 'No valid hint generated', success: false, hint: null }, 500);
    }

    console.log(`Generated hint for "${word}": "${hint}"`);

    return c.json({
      hint: hint.trim(),
      success: true
    });

  } catch (error) {
    console.error('Error generating hint:', error);
    return c.json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false,
      hint: null
    }, 500);
  }
});

Deno.serve(app.fetch);
