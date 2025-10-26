# Complete File Manifest

This is a checklist of ALL files you need to copy from Figma Make.

## Core Files (CRITICAL - Must Copy) ⭐

- [ ] `App.tsx` - Main application logic
- [ ] `styles/globals.css` - All styles and animations
- [ ] `package.json.template` → rename to `package.json`
- [ ] `capacitor.config.ts` - Capacitor configuration

## Configuration & Data

- [ ] `config/openai.ts` - OpenAI API key configuration
- [ ] `data/categories.ts` - Game categories and words

## Utilities

- [ ] `utils/openai.ts` - OpenAI helper functions
- [ ] `utils/supabase/info.tsx` - Supabase configuration

## Components (18 files)

Game Flow Components:
- [ ] `components/IntroSlides.tsx`
- [ ] `components/WelcomeScreen.tsx`
- [ ] `components/OnboardingTutorial.tsx`
- [ ] `components/LobbySetup.tsx`
- [ ] `components/CategorySelector.tsx`
- [ ] `components/CategoryTutorial.tsx`
- [ ] `components/GameSettings.tsx`
- [ ] `components/RoleReveal.tsx`
- [ ] `components/VotingScreen.tsx`
- [ ] `components/ResultsScreen.tsx`

UI Components:
- [ ] `components/AnimatedBackground.tsx`
- [ ] `components/CategoryBackground.tsx`
- [ ] `components/CategoryIcon.tsx`
- [ ] `components/RippleButton.tsx`
- [ ] `components/ThemeToggle.tsx`

Monetization:
- [ ] `components/PaywallModal.tsx`

Protected (DO NOT MODIFY):
- [ ] `components/figma/ImageWithFallback.tsx`

## Supabase Edge Functions (Optional)

- [ ] `supabase/functions/server/index.tsx`
- [ ] `supabase/functions/server/kv_store.tsx`

## ShadCN UI Components (47 files in components/ui/)

You can either:
1. **Copy all 47 files** from Figma Make, OR
2. **Regenerate them** after setup with:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card dialog input label
   # etc...
   ```

If copying, here are all 47 files:

- [ ] `components/ui/accordion.tsx`
- [ ] `components/ui/alert-dialog.tsx`
- [ ] `components/ui/alert.tsx`
- [ ] `components/ui/aspect-ratio.tsx`
- [ ] `components/ui/avatar.tsx`
- [ ] `components/ui/badge.tsx`
- [ ] `components/ui/breadcrumb.tsx`
- [ ] `components/ui/button.tsx`
- [ ] `components/ui/calendar.tsx`
- [ ] `components/ui/card.tsx`
- [ ] `components/ui/carousel.tsx`
- [ ] `components/ui/chart.tsx`
- [ ] `components/ui/checkbox.tsx`
- [ ] `components/ui/collapsible.tsx`
- [ ] `components/ui/command.tsx`
- [ ] `components/ui/context-menu.tsx`
- [ ] `components/ui/dialog.tsx`
- [ ] `components/ui/drawer.tsx`
- [ ] `components/ui/dropdown-menu.tsx`
- [ ] `components/ui/form.tsx`
- [ ] `components/ui/hover-card.tsx`
- [ ] `components/ui/input-otp.tsx`
- [ ] `components/ui/input.tsx`
- [ ] `components/ui/label.tsx`
- [ ] `components/ui/menubar.tsx`
- [ ] `components/ui/navigation-menu.tsx`
- [ ] `components/ui/pagination.tsx`
- [ ] `components/ui/popover.tsx`
- [ ] `components/ui/progress.tsx`
- [ ] `components/ui/radio-group.tsx`
- [ ] `components/ui/resizable.tsx`
- [ ] `components/ui/scroll-area.tsx`
- [ ] `components/ui/select.tsx`
- [ ] `components/ui/separator.tsx`
- [ ] `components/ui/sheet.tsx`
- [ ] `components/ui/sidebar.tsx`
- [ ] `components/ui/skeleton.tsx`
- [ ] `components/ui/slider.tsx`
- [ ] `components/ui/sonner.tsx`
- [ ] `components/ui/switch.tsx`
- [ ] `components/ui/table.tsx`
- [ ] `components/ui/tabs.tsx`
- [ ] `components/ui/textarea.tsx`
- [ ] `components/ui/toggle-group.tsx`
- [ ] `components/ui/toggle.tsx`
- [ ] `components/ui/tooltip.tsx`
- [ ] `components/ui/use-mobile.ts`
- [ ] `components/ui/utils.ts`

## Build Configuration Files (Create New)

These are NOT in Figma Make - you'll create them fresh:

- [ ] `index.html` - See CAPACITOR_SETUP.md
- [ ] `main.tsx` - See CAPACITOR_SETUP.md
- [ ] `vite.config.ts` - See CAPACITOR_SETUP.md
- [ ] `tsconfig.json` - See CAPACITOR_SETUP.md
- [ ] `tsconfig.node.json` - See CAPACITOR_SETUP.md
- [ ] `.gitignore` - See setup-project.sh

## Assets (Images)

- [ ] Imposter icon (purple alien blob)
- [ ] Detective icon (detective character)

**How to save:**
1. In Figma Make, find the images used in App.tsx
2. Right-click → Save Image As...
3. Save to `public/assets/` as:
   - `imposter-icon.png`
   - `detective-icon.png`

## Documentation Files (Optional - for reference)

- [ ] `README.md`
- [ ] `CAPACITOR_SETUP.md`
- [ ] `DOWNLOAD_INSTRUCTIONS.md`
- [ ] `HINT_SYSTEM.md`
- [ ] `OPENAI_SETUP.md`
- [ ] `Attributions.md`

---

## Quick Copy Strategy

### Minimum Viable Setup (15 files - ~20 minutes)

Just copy these to get it working:
1. App.tsx
2. styles/globals.css
3. package.json.template
4. All 18 component files in /components/
5. config/openai.ts
6. data/categories.ts
7. utils/supabase/info.tsx
8. Both image assets

Then run build configuration script and test!

### Full Setup (All files - ~1-2 hours)

Copy everything above including all ShadCN components.

---

## File Size Reference

Total files to copy:
- **Minimum**: 25 files (~20 min)
- **With ShadCN**: 72 files (~1-2 hrs)
- **Full project**: 80+ files with docs

## Verification

After copying, run:
```bash
npm install
npm run dev
```

If it starts without errors, you're good to go! ✅
