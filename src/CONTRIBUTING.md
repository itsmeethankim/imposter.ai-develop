# Contributing to Imposter AI

Thank you for your interest in contributing to Imposter AI! This document provides guidelines and instructions for collaborating on this project.

## 🚀 Quick Start for New Contributors

### Prerequisites
- **Node.js** 18+ and npm
- **Git** for version control
- Code editor (VS Code recommended)
- **Xcode** (Mac only, for iOS development)
- **Android Studio** (optional, for Android development)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/imposter-ai.git
   cd imposter-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Supabase (provided by project maintainer)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   
   # OpenAI (for AI hint generation)
   OPENAI_API_KEY=your_openai_key
   ```
   
   **Note:** Ask project maintainers for Supabase credentials or set up your own project.

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   The app should open at `http://localhost:5173`

5. **Test iOS build (Mac only)**
   ```bash
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

---

## 📂 Project Structure

```
imposter-ai/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── *.tsx           # Feature components
├── utils/              # Utility functions
│   ├── openai.ts       # OpenAI integration
│   ├── soundManager.ts # Audio system
│   └── avatars.ts      # Avatar management
├── data/               # Static data
│   └── categories.ts   # Game categories
├── styles/             # Global styles
│   └── globals.css     # Tailwind + animations
├── supabase/           # Backend code
│   └── functions/      # Edge functions
├── public/             # Static assets
│   └── sounds/         # Sound effects
└── App.tsx             # Main app component
```

---

## 🔧 Development Workflow

### Branching Strategy

We use **feature branches**:

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Making Changes

1. **Create a feature branch** from `main`
2. **Make your changes** with clear, focused commits
3. **Test thoroughly** (web + iOS if possible)
4. **Push your branch** to GitHub
5. **Open a Pull Request** with a clear description

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
✅ Good:
- "Add AI hint generation fallback for offline mode"
- "Fix vote counting bug in multiplayer"
- "Improve category selector performance"

❌ Bad:
- "Fixed stuff"
- "Updates"
- "WIP"
```

### Code Style

- **TypeScript** for type safety
- **React Hooks** for state management
- **Tailwind CSS** for styling (use existing design tokens)
- **Comments** for complex logic
- **Console logs** use emoji prefixes (🎮, 🚨, ✅, 💡)

---

## 🎨 Design Guidelines

### Colors (from globals.css)
- **Primary Dark**: `#1A1A1A`
- **Secondary Dark**: `#2D2D2D`
- **Accent**: `#A78BFA` (purple)
- **Text**: White on dark backgrounds

### Spacing System
- Use `--spacing-1` through `--spacing-6` (8/12/16/24/32/48px)
- Corner radius: `--radius-ios` (20px)

### Fonts
- **Primary**: Space Grotesk
- **Weights**: 400 (normal), 600 (headings)

---

## 🧪 Testing

Before submitting a PR:

### Web Testing
```bash
npm run dev
# Test in browser (Chrome, Safari, Firefox)
```

### iOS Testing
```bash
npm run build
npx cap sync ios
npx cap open ios
# Run in simulator
```

### Check for errors
- No console errors (🚨)
- All features work as expected
- Responsive design (mobile + tablet)
- Sound effects play correctly
- PWA installs properly

---

## 🐛 Reporting Issues

### Bug Reports

Use this template:

```markdown
**Bug Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to...
2. Click...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
If applicable

**Environment:**
- OS: [e.g., iOS 17, macOS 14]
- Browser: [e.g., Safari, Chrome]
- Device: [e.g., iPhone 15 Pro, iPad]
```

### Feature Requests

```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this needed?

**Proposed Solution:**
How might this work?

**Alternatives:**
Other approaches considered
```

---

## 🔐 Security Guidelines

### DO NOT commit:
- API keys or secrets
- `.env` files
- Supabase service role keys
- User data or logs

### Reporting Security Issues
Email security issues to [your-email] instead of creating public issues.

---

## 📚 Key Documentation

- **[README.md](./README.md)** - Project overview
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design guidelines
- **[IOS_DEBUG_GUIDE.md](./IOS_DEBUG_GUIDE.md)** - iOS troubleshooting
- **[OPENAI_SETUP.md](./OPENAI_SETUP.md)** - AI integration guide
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Backend setup

---

## 🎯 Areas to Contribute

### High Priority
- [ ] Android support (currently iOS-focused)
- [ ] More sound effects
- [ ] Additional game categories
- [ ] UI animations
- [ ] Performance optimizations

### Medium Priority
- [ ] Alternative payment options
- [ ] Accessibility improvements
- [ ] Localization/translations
- [ ] Social sharing features

### Low Priority
- [ ] Theme customization
- [ ] Statistics tracking
- [ ] Achievement system

---

## 💬 Communication

### Getting Help
- Open an issue with the `question` label
- Check existing issues first
- Provide context and screenshots

### Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on multiple devices
3. **Describe changes** clearly in PR description
4. **Link related issues** (e.g., "Fixes #123")
5. **Wait for review** - maintainers will respond within 48 hours

### Code Review Guidelines

**For reviewers:**
- Be respectful and constructive
- Explain *why* changes are needed
- Approve if code meets standards

**For contributors:**
- Respond to feedback promptly
- Ask questions if unclear
- Update based on feedback

---

## 🎉 Recognition

Contributors will be:
- Listed in [Attributions.md](./Attributions.md)
- Mentioned in release notes
- Thanked in app credits (Premium feature)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

## 🆘 Need Help?

- **Documentation**: Check `/guidelines` and `.md` files
- **Issues**: Search existing issues
- **Questions**: Open a discussion or issue
- **Urgent**: Email maintainers

---

**Thank you for contributing to Imposter AI! 🎮✨**
