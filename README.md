
  # imposter.ai

  This is a code bundle for imposter.ai. The original project is available at https://www.figma.com/design/gjljGIkAiU70VbfDnCRTVf/imposter.ai.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Environment variables

  Create a `.env` file in the project root (or update your existing one) and add:

  ```
  VITE_REVENUECAT_PUBLIC_KEY=appl_AotNmaBoxKXybLBYfEmgKNClfhS
  ```

  This key is required for the RevenueCat SDK to initialize on both web and native builds.

  For Supabase Edge Functions, set the following secrets (via `supabase secrets set` or the dashboard):

  ```
  REVENUECAT_SECRET_KEY=rc_secret_your_key_here
  ```

  This key allows the `/functions/v1/entitlements` endpoint to call the RevenueCat REST API securely.

  ## Legal

  The production Terms of Service and Privacy Policy now live under the Vite public directory and are bundled with every build:

  - Terms of Service: `/legal/terms.html`
  - Privacy Policy: `/legal/privacy.html`

  These URLs are accessible on the web build (`https://<your-domain>/legal/...`) and inside the Capacitor shell via the paywall modal links. Each hosted page now includes its own back button that returns users to the previous screen (or the app root if no history is available).
  
