/**
 * OpenAI API Integration via Backend
 * 
 * This calls the Supabase Edge Function which securely handles OpenAI API calls.
 * The API key is stored in Supabase environment variables, not exposed to the client.
 */

import { projectId } from './supabase/info';

type GenerateWordsRequest = {
  categoryName: string;
  numberOfWords?: number;
  accessToken: string;
};

type GenerateWordsResponse = {
  words: string[];
  success: boolean;
  error?: string;
};

/**
 * Generate words for a custom category using OpenAI API via backend
 */
export async function generateWordsWithOpenAI({
  categoryName,
  numberOfWords = 50,
  accessToken,
}: GenerateWordsRequest): Promise<GenerateWordsResponse> {
  try {
    console.log(`🤖 Generating ${numberOfWords} words for category: ${categoryName}`);
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-be273801/generate-words`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          categoryName,
          numberOfWords
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || 'Failed to generate words';
      
      // Provide helpful messages for common errors
      if (errorMessage.includes('not configured') || errorMessage.includes('API key')) {
        console.log('%c🤖 OpenAI API Key Not Configured on Server', 'color: #8B5CF6; font-size: 14px; font-weight: bold;');
        console.log('%cℹ️ AI generation is optional! The app works great without it.', 'color: #06B6D4;');
        console.log('%cTo enable AI-powered category generation:', 'color: #EC4899;');
        console.log('  1. Go to your Supabase project settings');
        console.log('  2. Navigate to Edge Functions > Environment Variables');
        console.log('  3. Add a new secret: OPENAI_API_KEY');
        console.log('  4. Get a key from: https://platform.openai.com/api-keys');
        console.log('%c✅ Using fallback generation for now...', 'color: #10B981;');
      } else if (errorMessage.includes('quota') || errorMessage.includes('credits')) {
        console.log('%c💳 OpenAI Quota Exceeded', 'color: #EC4899; font-size: 14px; font-weight: bold;');
        console.log('%cYour OpenAI account is out of credits.', 'color: #8B5CF6;');
        console.log('%cTo fix this:', 'color: #06B6D4;');
        console.log('  1. Go to https://platform.openai.com/account/billing');
        console.log('  2. Add a payment method or purchase more credits');
        console.log('%c✅ Using fallback generation for now...', 'color: #10B981;');
      } else {
        console.error('OpenAI generation error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    console.log(`✅ Successfully generated ${data.words?.length || 0} words`);
    
    return {
      words: data.words || [],
      success: true
    };

  } catch (error) {
    console.error('Error calling word generation API:', error);
    return {
      words: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

type GenerateHintRequest = {
  word: string;
  categoryName?: string;
  accessToken: string;
};

type GenerateHintResponse = {
  hint: string | null;
  success: boolean;
  error?: string;
};

/**
 * Generate a contextual hint for imposters using OpenAI API via backend
 * The hint is based on the actual word innocent players received
 */
export async function generateHintWithOpenAI({
  word,
  categoryName,
  accessToken,
}: GenerateHintRequest): Promise<GenerateHintResponse> {
  try {
    console.log(`💡 Generating AI hint for word: "${word}"${categoryName ? ` in category: "${categoryName}"` : ''}`);
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-be273801/generate-hint`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          word,
          categoryName
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || 'Failed to generate hint';
      
      // Log errors but don't show detailed messages for hints - fall back silently
      if (errorMessage.includes('not configured') || errorMessage.includes('API key')) {
        console.log('%c💡 AI hint generation unavailable - using fallback hints', 'color: #8B5CF6;');
      } else if (errorMessage.includes('quota') || errorMessage.includes('credits')) {
        console.log('%c💡 OpenAI quota exceeded - using fallback hints', 'color: #EC4899;');
      } else {
        console.error('Hint generation error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    console.log(`✅ Generated AI hint: "${data.hint}"`);
    
    return {
      hint: data.hint || null,
      success: true
    };

  } catch (error) {
    console.error('Error calling hint generation API:', error);
    return {
      hint: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
