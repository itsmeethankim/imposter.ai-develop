/**
 * ⚙️ OpenAI API Configuration
 *
 * 🔒 IMPORTANT: The OpenAI API integration has been moved to the backend for security!
 *
 * ✅ Your API key is now stored securely on the server (Supabase Edge Functions)
 * ✅ No more CORS errors or security concerns
 * ✅ API calls are made server-side, keeping your key safe
 *
 * 📝 To enable AI word generation:
 * 
 * The OPENAI_API_KEY has already been configured as a Supabase environment variable.
 * You don't need to do anything - AI generation should work automatically!
 * 
 * If you need to update the API key:
 * 1. Go to your Supabase project settings
 * 2. Navigate to Edge Functions > Environment Variables  
 * 3. Update the OPENAI_API_KEY secret
 * 4. Restart the edge functions
 *
 * Get an API key from: https://platform.openai.com/api-keys
 */

// This file is kept for backwards compatibility but is no longer used
export const OPENAI_API_KEY = 'MOVED_TO_BACKEND';
