# OpenAI API Integration Setup

This guide explains how to integrate OpenAI API for AI-generated custom categories in your Imposter game.

## ⚠️ Important Security Notice

**NEVER expose your OpenAI API key in client-side code in production!**

The current implementation is for development/demo purposes only. For production:
1. Create a backend API (Node.js, Python, etc.)
2. Store API keys securely on the server
3. Have your frontend call your backend
4. Have your backend call OpenAI
5. Return results to your frontend

## Quick Setup (Development Only)

### Step 1: Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy your API key (you won't be able to see it again!)

### Step 2: Configure Your Environment

1. Create a `.env` file in the root of your project:
```bash
cp .env.example .env
```

2. Open `.env` and add your API key:
```
VITE_OPENAI_API_KEY=sk-...your-actual-key-here...
```

3. Make sure `.env` is in your `.gitignore` (it should be by default)

### Step 3: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the Custom Categories section
3. Click "Create" to make a new custom category
4. Click the "AI Generate" tab
5. Enter a category name (e.g., "Superheroes")
6. Click "Generate with AI"
7. Watch as OpenAI generates 50 relevant words!

## How It Works

The integration uses OpenAI's `gpt-4o-mini` model (fast and cost-effective) to generate appropriate words for your custom categories.

### File Structure

```
/utils/openai.ts          # OpenAI API integration
/components/CategorySelector.tsx  # Updated to use OpenAI
/.env                     # Your API key (DO NOT COMMIT!)
/.env.example            # Template for environment variables
```

### Code Flow

1. User enters a category name (e.g., "Superheroes")
2. User clicks "Generate with AI"
3. Frontend calls `generateWordsWithOpenAI()` from `/utils/openai.ts`
4. Function makes API request to OpenAI with a carefully crafted prompt
5. OpenAI returns 50 unique words fitting the category
6. Words are displayed in the text area
7. User can review/edit before creating the category

## API Cost Considerations

- Model used: `gpt-4o-mini` (very affordable)
- Approximate cost: $0.0001-0.0003 per generation
- Set up usage limits in your OpenAI dashboard to prevent unexpected charges

## Fallback Behavior

If the OpenAI API call fails (network error, invalid key, rate limit, etc.), the system automatically falls back to the original sample word generation for common categories like Pokemon, Countries, Cities, and Cars.

## Production Deployment

### Option 1: Backend API (Recommended)

Create a simple backend endpoint:

**Example with Node.js/Express:**

```javascript
// server.js
const express = require('express');
const OpenAI = require('openai');

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Stored securely on server
});

app.post('/api/generate-words', async (req, res) => {
  try {
    const { categoryName, numberOfWords } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates word lists for party games."
        },
        {
          role: "user",
          content: `Generate exactly ${numberOfWords} unique words for "${categoryName}". Return only a JSON array.`
        }
      ]
    });
    
    const words = JSON.parse(completion.choices[0].message.content);
    res.json({ words, success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000);
```

Then update your frontend to use `generateWordsViaBackend()` instead.

### Option 2: Serverless Functions

Use platforms like:
- **Vercel Functions**
- **Netlify Functions**
- **AWS Lambda**
- **Cloudflare Workers**

Example Vercel Function:

```typescript
// api/generate-words.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { categoryName, numberOfWords = 50 } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Generate word lists for party games." },
      { role: "user", content: `Generate ${numberOfWords} words for "${categoryName}". Return JSON array only.` }
    ]
  });

  const words = JSON.parse(completion.choices[0].message.content);
  res.json({ words, success: true });
}
```

## Troubleshooting

### "API key not configured" error
- Make sure `.env` file exists in project root
- Verify the key is named `VITE_OPENAI_API_KEY`
- Restart your dev server after adding the key

### "Invalid API key" error
- Double-check you copied the entire key from OpenAI
- Make sure there are no extra spaces
- Verify the key is still active in your OpenAI dashboard

### "Rate limit exceeded" error
- You've hit OpenAI's rate limits
- Wait a few minutes and try again
- Consider upgrading your OpenAI account tier

### Generation takes too long
- Check your internet connection
- OpenAI API might be experiencing high traffic
- The fallback will activate after timeout

## Rate Limits & Best Practices

1. **Implement request throttling** - Don't allow rapid-fire generations
2. **Cache results** - Store previously generated categories locally
3. **Show loading states** - Users should know AI is working
4. **Handle errors gracefully** - Always have a fallback
5. **Monitor usage** - Check your OpenAI dashboard regularly

## Alternative: Free Local AI

For a completely free solution, consider:
- **Ollama** - Run models locally
- **llama.cpp** - Local inference
- **GPT4All** - Local LLMs

These require more setup but eliminate API costs and security concerns.

## Support

If you need help:
1. Check [OpenAI Documentation](https://platform.openai.com/docs)
2. Review [OpenAI API Status](https://status.openai.com/)
3. Check your browser console for detailed error messages

---

**Remember**: The best practice for production is always to keep API keys on the server, never in client-side code! 🔒
