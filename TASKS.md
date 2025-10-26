# TASKS PRD

## Overview
This document tracks the remaining work required to launch the Imposter iOS app. Programmatic/automated tests are intentionally skipped for now; validation happens via manual acceptance (clicking through the final UI on devices/builds). The existing React UI is considered pixel-perfect—preserve visual fidelity when integrating Capacitor or native features. Tasks are grouped by priority (high → medium → low) and include notes on required research or follow-up actions. When tasks are completed, move them to the **Completed Tasks** section with any relevant notes.

## Active Tasks

- Active items:
  - **Implement production-ready subscriptions** (high priority)
  - **Align Capacitor web bundle paths** (high priority)

### High Priority
- **Consolidate build tooling (package/vite configuration)**
  - Merge the duplicated tooling stacks (root `package.json`/`vite.config.ts` vs. `src/package.json`/`src/vite.config.ts`).
  - Preserve the correct dependency versions (Capacitor runtime packages must be listed in the canonical manifest; remove unused entries).
  - Outcome: a single source of truth for installations and builds.
- **Relocate static web assets into the active Vite public directory**
  - Move `src/public/` contents (manifest, service worker, sounds, icons) into the root `public/` folder or configure `publicDir` explicitly.
  - Verify runtime paths (`/manifest.json`, `/service-worker.js`, `/sounds/*.mp3`) resolve during `vite dev` and `vite build`.
  - Re-test service worker registration and audio loading after consolidation.
- **Align Capacitor web bundle paths**
  - Ensure Vite's `build.outDir` matches `capacitor.config.ts` `webDir` (`dist` vs `build` mismatch currently ships an empty bundle).
  - Re-run `npx cap sync` after the directory alignment.
- **Implement production-ready subscriptions**
  - Replace the localStorage-based paywall bypass with StoreKit (or RevenueCat) and server-side receipt validation.
  - Update UI flows to consume real entitlement status and gate premium categories/AI features server-side so client state alone cannot unlock them.
- **Preserve locked UI design across platforms**
  - Treat current web UI as the visual source of truth; avoid layout or styling regressions when configuring Capacitor/iOS.
  - Capture reference renders (screenshots/video) before changes and compare after native adjustments.
  - Document any unavoidable deviations and secure approval before merging.
- **Ship required iOS assets and native project**
  - Generate full icon and splash sets; add to `ios/App/App/Assets.xcassets`.
  - Run `npx cap add ios` (if not already) and commit the native Xcode project with Info.plist updates.
  - Verify launch screen, orientation, status bar, and permissions metadata.

### Medium Priority
- **Harden mobile entry HTML**
  - Merge the PWA/mobile `<meta>` tags from `src/index.html` into the production `index.html` so notch handling and status bar styling work in Capacitor.
- **Fix service worker precache strategy**
  - Replace hardcoded asset list (`/styles/globals.css`) with a build-generated manifest or remove precache entries to avoid install failures.
- **Add real audio and haptics**
  - Provide licensed `.mp3` files under `public/sounds/` and confirm they package with Capacitor.
  - Integrate `@capacitor/haptics` so tactile feedback works on iOS (replace `navigator.vibrate` fallbacks when running natively).
- **Strengthen Supabase backend readiness**
  - Confirm RLS policies, provisioned tables (KV store), and rate-limiting logic in production.
  - Add monitoring/alerts for edge functions.
- **Introduce baseline logging/analytics**
  - Evaluate Sentry, Firebase Crashlytics (via Capacitor plugin), or custom Supabase logging.
  - At minimum capture JS errors, API failures, and critical game events for debugging.
- **Prepare App Store submission package**
  - Produce required screenshots, app description, keywords, and App Store promotional assets.
  - Complete the App Privacy questionnaire and confirm data-collection answers align with implementation.
  - Draft release notes and regional availability plan for App Store Connect.
- **Run end-to-end QA on real hardware**
  - Build a TestFlight beta, verify cold start, offline play, AI fallback, subscription purchase, and paywall gating on iPhone/iPad.
  - Capture regressions or crashes and feed them back as new tasks when discovered.
  - Note: automated/programmatic testing is skipped; rely on thorough manual acceptance passes.
  - Include pixel-level UI sweeps to confirm parity with the original React build.

### Low Priority
- **Document AI feature dependencies**
  - Create user-facing guidance for AI-powered category generation (API quota limits, fallbacks).
- **Polish UI microcopy & accessibility**
  - Audit text contrast, focus states, and voice-over labels, especially inside modal flows.

## Completed Tasks
- **Consolidate build tooling (package/vite configuration)** (October 23, 2025)
  - Merged all tooling into root directory
  - Removed versioned imports in components
  - Successfully building with Vite and syncing with Capacitor
- **Relocate static web assets into the active Vite public directory** (October 23, 2025)
  - Moved manifest.json and service-worker.js to root public directory
  - Verified runtime paths are resolving correctly
  - Created sounds directory structure (note: actual sound files to be added in "Add real audio and haptics" task)
- **Align Capacitor web bundle paths** (October 23, 2025)
  - Configured Vite's `build.outDir` to match Capacitor's `webDir` setting
  - Successfully ran `npx cap sync` after directory alignment
  - Verified web bundle is being properly included in the build
- **Publish Terms of Service & Privacy Policy** (October 25, 2025)
  - Added static legal pages under `public/legal/terms.html` and `public/legal/privacy.html` so they ship with every build
  - Hooked the paywall modal buttons to open those URLs with a Capacitor-safe `window.open` fallback
  - Documented the canonical review links in `README.md`

## Maintenance Guide
1. **Adding Tasks**
   - Capture a concise title, required actions, and any research dependencies.
   - Place the task in the section that matches its priority (see below).
2. **Prioritization Rules**
   - **High Priority**: Blocks launch readiness, compliance, or core functionality (e.g., payment flows, build failures).
   - **Medium Priority**: Important UX, quality, or reliability improvements that should ship before broad marketing, but won’t block TestFlight builds.
   - **Low Priority**: Enhancements or documentation polish that can follow the first release.
3. **Updating Progress**
   - When a task starts, optionally note owners/dates inline.
   - On completion, move the task to **Completed Tasks** with the completion date and any lessons learned or follow-up actions.
4. **Review Cadence**
   - Reassess priorities before each TestFlight or App Store submission milestone.
   - Ensure new requirements (e.g., policy changes, SDK updates) are captured promptly.
5. **Testing Approach**
   - Default to manual acceptance testing (UI walkthroughs on device/simulator).
   - Only add automated tests if the strategy changes; document the shift here when it happens.
