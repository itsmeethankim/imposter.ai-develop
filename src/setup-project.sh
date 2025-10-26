#!/bin/bash

# Imposter Game - Project Setup Script
# Run this on your Mac to create the folder structure

echo "🎮 Setting up Imposter Game project structure..."

# Create main directories
mkdir -p components/ui
mkdir -p components/figma
mkdir -p config
mkdir -p data
mkdir -p styles
mkdir -p utils/supabase
mkdir -p supabase/functions/server
mkdir -p public/assets

echo "✅ Created directory structure"

# Create placeholder files (you'll copy content from Figma Make)
touch App.tsx
touch capacitor.config.ts

# Create build configuration files
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>Imposter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
EOL

cat > main.tsx << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

cat > vite.config.ts << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
EOL

cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOL

cat > tsconfig.node.json << 'EOL'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "capacitor.config.ts"]
}
EOL

# Rename package.json template if it exists
if [ -f "package.json.template" ]; then
    mv package.json.template package.json
    echo "✅ Renamed package.json.template to package.json"
fi

cat > .gitignore << 'EOL'
# Dependencies
node_modules
.pnp
.pnp.js

# Production
dist
build

# Capacitor
ios
android
.capacitor

# Testing
coverage

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode
.idea
*.swp
*.swo

# TypeScript
*.tsbuildinfo
EOL

echo "✅ Created build configuration files"

# Create component placeholder files
components=(
  "AnimatedBackground"
  "CategoryBackground"
  "CategoryIcon"
  "CategorySelector"
  "CategoryTutorial"
  "GameSettings"
  "IntroSlides"
  "LobbySetup"
  "OnboardingTutorial"
  "PaywallModal"
  "ResultsScreen"
  "RippleButton"
  "RoleReveal"
  "ThemeToggle"
  "VotingScreen"
  "WelcomeScreen"
)

for component in "${components[@]}"; do
  touch "components/${component}.tsx"
done

echo "✅ Created component placeholder files"

# Create other necessary files
touch config/openai.ts
touch data/categories.ts
touch styles/globals.css
touch utils/openai.ts
touch utils/supabase/info.tsx
touch supabase/functions/server/index.tsx
touch supabase/functions/server/kv_store.tsx

echo "✅ Created utility and data files"

# Create README for next steps
cat > NEXT_STEPS.md << 'EOL'
# Next Steps

## 1. Copy File Contents from Figma Make

Copy the content from each file in Figma Make to the corresponding file here.

**Priority files (copy these first):**
1. `App.tsx`
2. `styles/globals.css`
3. `package.json` (from package.json.template)
4. `data/categories.ts`
5. `config/openai.ts`
6. All files in `components/`

## 2. Download Images

Save these images to `public/assets/`:
- Imposter icon → `public/assets/imposter-icon.png`
- Detective icon → `public/assets/detective-icon.png`

Then update App.tsx imports:
```tsx
import imposterIcon from "./public/assets/imposter-icon.png";
import detectiveIcon from "./public/assets/detective-icon.png";
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Test Build

```bash
npm run dev
```

## 5. Add Capacitor

```bash
npm run build
npx cap add ios
npx cap open ios
```

## 6. Follow CAPACITOR_SETUP.md

See the full guide for detailed instructions.
EOL

echo ""
echo "🎉 Project structure created!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy file contents from Figma Make (see NEXT_STEPS.md)"
echo "   2. npm install"
echo "   3. npm run dev"
echo ""
echo "📖 Full instructions in DOWNLOAD_INSTRUCTIONS.md"
