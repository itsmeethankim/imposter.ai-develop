# 🎮 Imposter AI - Social Deduction Party Game

> A sophisticated pass-the-phone social deduction game with AI-powered hints, freemium monetization, and native iOS support.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features

- 🎭 **Pass-the-Phone Gameplay** - Players take turns revealing their roles with fingerprint-style thumb scan
- 🤖 **AI-Powered Hints** - GPT-4o-mini generates contextual hints for imposters using OpenAI API
- 💎 **Freemium Model** - $4.99/month subscription with free and premium categories
- 🎨 **Premium Design** - Dark grey theme (#1A1A1A, #2D2D2D) with sophisticated animations
- 📱 **Progressive Web App** - Installable PWA with offline support
- 🍎 **iOS Native** - Full Capacitor integration for App Store deployment
- 🔊 **Sound System** - 10+ detective/spy-themed audio effects
- 🎯 **Rate Limiting** - 50 AI generations per day to prevent API abuse
- 👤 **12 Avatars** - Detective/spy-themed transparent PNG avatars
- 🌐 **Fully Private** - Device-based storage, no authentication required

---

## 🚀 Quick Start

### For Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/imposter-ai.git
cd imposter-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** to see the app.

### For iOS Deployment

```bash
# Build production bundle
npm run build

# Sync to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

See **[QUICK_START_IOS.md](./QUICK_START_IOS.md)** for detailed iOS setup.

---

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Xcode** (Mac only, for iOS builds)
- **OpenAI API Key** (for AI hint generation)
- **Supabase Account** (for backend, optional)

---

## 🔑 Environment Setup

Create a `.env` file in the root directory:

```env
# OpenAI (required for AI hint generation)
OPENAI_API_KEY=sk-your-openai-key-here

# Supabase (provided by project maintainer)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Get API Keys:**
- **OpenAI**: https://platform.openai.com/api-keys
- **Supabase**: https://supabase.com (or ask project maintainer)

See **[OPENAI_SETUP.md](./OPENAI_SETUP.md)** and **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for detailed setup.

---

## 📁 Project Structure

```
imposter-ai/
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── IntroSlides.tsx    # Onboarding slides
│   ├── LobbySetup.tsx     # Player management
│   ├── CategorySelector.tsx  # Category selection
│   ├── RoleReveal.tsx     # Thumb scan reveal
│   ├── VotingScreen.tsx   # Vote interface
│   └── ResultsScreen.tsx  # Game results
├── utils/                 # Utilities
│   ├── openai.ts          # OpenAI integration
│   ├── soundManager.ts    # Audio system
│   ├── avatars.ts         # Avatar management
│   ├── aiLimits.ts        # Rate limiting
│   └── pwa.ts             # PWA functionality
├── data/
│   └── categories.ts      # Game categories
├── styles/
│   └── globals.css        # Tailwind + animations
├── supabase/
│   └── functions/         # Edge functions
├── public/
│   └── sounds/            # Sound effects
├── App.tsx                # Main component
└── main.tsx               # Entry point
```

---

## 🎮 How to Play

1. **Gather Players** - Minimum 3 players, pass phone between them
2. **Select Category** - Choose from 15+ preset categories or create custom
3. **Configure Game** - Set imposter count, hints, and timer
4. **Reveal Roles** - Each player scans thumb to see their role
5. **Discuss** - Players exchange clues (imposters get hints)
6. **Vote** - Vote for suspected imposters
7. **See Results** - Find out who the imposters were!

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool
- **Tailwind CSS 4.0** - Styling

### Backend
- **Supabase** - Database & Edge Functions
- **OpenAI GPT-4o-mini** - AI hint generation

### Mobile
- **Capacitor** - iOS native wrapper
- **PWA** - Progressive Web App

### Libraries
- **lucide-react** - Icons
- **motion/react** - Animations
- **sonner** - Toast notifications

---

## 📚 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md)** - GitHub setup
- **[IOS_DEBUG_GUIDE.md](./IOS_DEBUG_GUIDE.md)** - iOS troubleshooting
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design guidelines
- **[OPENAI_SETUP.md](./OPENAI_SETUP.md)** - AI integration
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Backend setup
- **[APP_STORE_DEPLOYMENT_GUIDE.md](./APP_STORE_DEPLOYMENT_GUIDE.md)** - App Store deployment

---

## 🤝 Contributing

We welcome contributions! Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** for:

- Development workflow
- Code style guidelines
- Testing requirements
- Pull request process

**Quick Contribution Guide:**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🐛 Bug Reports & Feature Requests

Use **GitHub Issues** to report bugs or request features:

- **Bug Report**: Use the bug report template
- **Feature Request**: Describe the feature and use case
- **Questions**: Open a discussion

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** - AI hint generation
- **Supabase** - Backend infrastructure
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling system
- Contributors listed in [Attributions.md](./Attributions.md)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/imposter-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/imposter-ai/discussions)
- **Email**: your-email@example.com

---

**Built with ❤️ by the Imposter AI team**
