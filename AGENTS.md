# AGENTS GUIDE

## Overview
Imposter.ai is a Vite/React + Capacitor project that targets both PWA and native iOS builds. Source lives under `src/`, with native artifacts generated via Capacitor (not yet committed). Supabase Edge Functions back the AI/category features, and local state currently drives the core gameplay.

## Key Points for Agents
- **Tooling Single Source of Truth**: Always reference the canonical `package.json`, `vite.config.ts`, and `capacitor.config.ts` at the repository root. If duplicates appear elsewhere, consolidate per the High Priority task in `TASKS.md`.
- **Native Builds**: The web bundle destined for Capacitor must match `capacitor.config.ts:webDir`. After modifying build tooling or adding assets, run the standard `npm install`, `npm run build`, then `npx cap sync`.
- **Supabase Integration**: API keys are managed server-side. Avoid adding secrets to the client bundle. Backend schema and edge functions live under `supabase/`.
- **UI Fidelity is Locked**: The current React UI is treated as “pixel-perfect.” Any change (including native wrappers, viewport tweaks, or platform-specific overrides) must preserve the existing look and feel; screenshot diffs and manual review are required after adjustments.
- **Compliance Touchpoints**: Terms of Service, Privacy Policy, StoreKit integrations, and icon/splash assets are all tracked as High Priority launch blockers in `TASKS.md`.

## MCP Tools
- Always use context7 MCP to reference the latest documentation for frameworks, libraries, and languages before writing code to ensure the latest patterns and modules are used.
- Use sequential-thinking MCP for deep reasoning and critical thinking to work through complex problems or architectural decisions.

## Maintaining `TASKS.md`
1. **Read Before Editing**: Review the current Active and Completed task lists to avoid duplicating entries.
2. **Adding Work**: Follow the Maintenance Guide inside `TASKS.md`. Record each new task with:
   - concise title
   - action steps / research needs
   - priority (High/Medium/Low per guide)
3. **Updating Status**:
   - Note owner or status inline if helpful during execution.
   - When done, move the task to the "Completed Tasks" section with completion date and any notes.
4. **Re-Prioritizing**: If scope changes (e.g., new compliance requirements, regressions), adjust task priority per the rules in `TASKS.md` and document the reasoning.
5. **Regular Audits**: Before TestFlight submissions or major releases, audit the High Priority list to ensure blockers are resolved. Clean up stale tasks during these reviews.

For deeper context, consult `TASKS.md` and the collection of guides inside `src/` (e.g., `CAPACITOR_SETUP.md`, `APP_STORE_DEPLOYMENT_GUIDE.md`). When in doubt, capture the question in `TASKS.md` as a Medium Priority research item.
