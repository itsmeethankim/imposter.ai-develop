# Imposter.AI

A social party game where players get secret roles, give clues, and vote to find the imposter.

I co-founded the app with friends and helped build its user flows, core game mechanics, AI features, and release process. The app has since reached **1M+ downloads**.

[Download on the App Store](https://apps.apple.com/us/app/imposter-ai-timer-party-game/id6754861642)

This repository contains an early development snapshot. The current App Store release includes work beyond this snapshot.

## Product and engineering

- Player setup, category selection, private role reveals, timed rounds, and voting.
- AI-generated word lists and hints through Supabase Edge Functions.
- Supabase authentication and server-side RevenueCat entitlement checks for AI requests.
- Input validation, request limits, and fallback handling around external API calls.
- Community category data and likes backed by PostgreSQL.

**Stack:** React, TypeScript, Vite, Tailwind CSS, Capacitor, Supabase, Hono, OpenAI, and RevenueCat.

## Code map

| Area | Start here |
| --- | --- |
| App state and game flow | [src/App.tsx](src/App.tsx) |
| Setup, roles, and voting | [src/components](src/components) |
| Community category queries | [src/utils/supabase.ts](src/utils/supabase.ts) |
| Database schema | [src/supabase-schema.sql](src/supabase-schema.sql) |
| AI routes and request checks | [supabase/functions/server/index.tsx](supabase/functions/server/index.tsx) |
| Subscription entitlement endpoint | [supabase/functions/entitlements/index.ts](supabase/functions/entitlements/index.ts) |
| Historical launch tasks | [TASKS.md](TASKS.md) |

The AI implementation is in `server/index.tsx`. The adjacent `server/index.ts` is a demo handler, so verify the configured entrypoint before deploying a function from this snapshot.

## Run the web app

Use the package manifest and build configuration at the repository root.

```bash
npm install
npm run dev
```

To build and preview the web bundle:

```bash
npm run build
npm run preview
```

## Service configuration

Create a local `.env` file for the RevenueCat public SDK key:

```dotenv
VITE_REVENUECAT_PUBLIC_KEY=your_revenuecat_public_sdk_key
```

The Supabase client reads its project ID and public anonymous key from `src/utils/supabase/info`. Configure these for your own development project.

The Edge Functions use `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `REVENUECAT_SECRET_KEY`, and `OPENAI_API_KEY` in their server environment. Keep service-role and provider secrets out of the client bundle. Review the schema, KV storage setup, and authentication policies before connecting a new backend.

## iOS

The app uses Capacitor. Native development requires macOS and Xcode. This snapshot does not include the generated iOS project.

After configuring your own app identity and creating the native project with `npx cap add ios`, `npm run ios` builds the web bundle, syncs it, and opens Xcode. `npm run sync` rebuilds and syncs native assets.

## Design and legal

The original design is available in [Figma](https://www.figma.com/design/gjljGIkAiU70VbfDnCRTVf/imposter.ai).

The bundled legal pages are [Terms of Service](public/legal/terms.html) and [Privacy Policy](public/legal/privacy.html). The web build serves them at `/legal/terms.html` and `/legal/privacy.html`.
