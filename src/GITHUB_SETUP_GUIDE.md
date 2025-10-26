# GitHub Setup Guide

This guide will walk you through uploading your Imposter AI project to GitHub and setting it up for collaboration.

---

## 📋 Pre-Upload Checklist

Before uploading to GitHub, ensure:

- [x] `.gitignore` file exists (prevents uploading secrets/build files)
- [x] No `.env` file committed (contains API keys)
- [x] No `node_modules/` folder (too large)
- [x] No `dist/` or `build/` folders (build artifacts)
- [x] README.md is updated with accurate info
- [x] All sensitive data removed from code

---

## 🚀 Step 1: Initialize Git Repository

Open Terminal/Command Prompt in your project folder:

```bash
# Navigate to your project
cd ~/ImposterAI/imposter.ai

# Initialize git repository
git init

# Add all files (respects .gitignore)
git add .

# Create first commit
git commit -m "Initial commit: Imposter AI social deduction game"
```

---

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to **https://github.com/new**
2. Fill in repository details:
   - **Repository name**: `imposter-ai`
   - **Description**: "Social deduction game with AI-powered hints, freemium model, and pass-the-phone gameplay"
   - **Visibility**: 
     - **Public** ✅ (for open collaboration)
     - **Private** (if you want to keep it private initially)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)

```bash
# Install GitHub CLI first (if needed)
# Mac: brew install gh
# Windows: Download from https://cli.github.com/

# Authenticate
gh auth login

# Create repository
gh repo create imposter-ai --public --source=. --remote=origin

# Push code
git push -u origin main
```

---

## 🔗 Step 3: Connect Local Repository to GitHub

After creating the GitHub repository, you'll see instructions. Follow these:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/imposter-ai.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## ✅ Step 4: Verify Upload

1. Go to **https://github.com/YOUR_USERNAME/imposter-ai**
2. You should see all your files
3. Check that:
   - ✅ No `node_modules/` folder
   - ✅ No `.env` file
   - ✅ No `dist/` folder
   - ✅ README.md displays correctly
   - ✅ All source code is visible

---

## 👥 Step 5: Enable Collaboration

### Add Collaborators

1. Go to repository **Settings** → **Collaborators**
2. Click **"Add people"**
3. Enter their GitHub username
4. They'll receive an invitation email

### Branch Protection (Recommended)

Protect the `main` branch from direct pushes:

1. Go to **Settings** → **Branches**
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
5. Save changes

---

## 🔐 Step 6: Add Secrets for CI/CD (Optional)

If using GitHub Actions for automated builds:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

**⚠️ NEVER commit these values directly to code!**

---

## 📚 Step 7: Update Repository Settings

### About Section
1. Click ⚙️ **Settings** icon next to "About"
2. Add:
   - **Description**: "🎮 Social deduction game with AI-powered hints"
   - **Website**: Your live demo URL (if any)
   - **Topics**: `react`, `typescript`, `game`, `pwa`, `ios`, `ai`, `openai`
   - ✅ **Releases**
   - ✅ **Packages**
   - ✅ **Discussions** (for community Q&A)

### Issues
1. Go to **Settings** → **Features**
2. ✅ Enable **Issues**
3. Create issue templates (optional):
   - Bug report
   - Feature request

### Discussions
Enable **Discussions** for Q&A and community interaction.

---

## 📝 Step 8: Create Essential Labels

Add these labels to organize issues:

```
bug          - 🐛 Red
enhancement  - ✨ Blue
documentation - 📚 Green
help wanted  - 🙋 Purple
good first issue - 💚 Light green
question     - ❓ Yellow
priority: high - 🔥 Orange
priority: low - 🟢 Light blue
```

Go to **Issues** → **Labels** → **New label**

---

## 🎯 Step 9: Set Up Project Board (Optional)

Organize work with a project board:

1. Go to **Projects** → **New project**
2. Choose **"Board"** template
3. Create columns:
   - 📋 **Backlog**
   - 🚧 **In Progress**
   - 👀 **In Review**
   - ✅ **Done**
4. Add issues to appropriate columns

---

## 🤝 Step 10: Invite Collaborators

### Share Repository Link
```
https://github.com/YOUR_USERNAME/imposter-ai
```

### Collaborators Should:

1. **Fork** the repository (if not direct collaborators)
2. **Clone** their fork:
   ```bash
   git clone https://github.com/THEIR_USERNAME/imposter-ai.git
   cd imposter-ai
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment** (see CONTRIBUTING.md)

5. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

6. **Make changes and push**:
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

7. **Open Pull Request** on GitHub

---

## 📄 Step 11: Add License (Recommended)

Choose a license for your project:

1. Go to **Add file** → **Create new file**
2. Name it `LICENSE`
3. Click **"Choose a license template"**
4. Select license (common options):
   - **MIT** - Most permissive, allows commercial use
   - **GPL-3.0** - Open source, requires derivatives to be open source
   - **Apache-2.0** - Permissive, includes patent grant

---

## 🔄 Step 12: Workflow for Contributors

### Typical Workflow:

```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes
# ... edit files ...

# 4. Commit changes
git add .
git commit -m "Add amazing feature"

# 5. Push to GitHub
git push origin feature/amazing-feature

# 6. Open Pull Request on GitHub
# 7. Wait for review
# 8. Merge after approval
```

---

## 🛡️ Security Best Practices

### DO:
✅ Use `.gitignore` to exclude sensitive files
✅ Store secrets in environment variables
✅ Review code before merging
✅ Use branch protection
✅ Keep dependencies updated

### DON'T:
❌ Commit API keys or passwords
❌ Push directly to main
❌ Expose Supabase service role keys
❌ Include personal data in commits

---

## 📊 Step 13: Set Up GitHub Actions (Optional)

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build project
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

---

## 🎉 You're All Set!

Your project is now on GitHub and ready for collaboration!

### Next Steps:

1. ✅ Share repository link with collaborators
2. ✅ Create first issue or project milestone
3. ✅ Set up project board
4. ✅ Add topics and description
5. ✅ Start accepting contributions!

### Useful Commands:

```bash
# Check status
git status

# View remote URL
git remote -v

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## 🆘 Troubleshooting

### "Permission denied" error
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/imposter-ai.git
```

### "Large files" warning
```bash
# Remove large files from history
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push origin main
```

### Accidentally committed secrets
```bash
# Remove file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

**⚠️ Better solution: Regenerate all leaked secrets immediately!**

---

## 📚 Additional Resources

- **GitHub Guides**: https://guides.github.com/
- **Git Handbook**: https://guides.github.com/introduction/git-handbook/
- **GitHub CLI**: https://cli.github.com/
- **Markdown Guide**: https://www.markdownguide.org/

---

**Ready to collaborate? Share your repository link and start building together! 🚀**
