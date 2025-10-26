#!/bin/bash

# ============================================
# IMPOSTER AI - GitHub Upload Script
# ============================================
# This script helps you upload your project to GitHub
# Run: bash UPLOAD_TO_GITHUB.sh

echo "🎮 Imposter AI - GitHub Upload Script"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Install git first: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✅ Git is installed"
echo "✅ In project directory"
echo ""

# Step 1: Initialize Git (if not already)
if [ ! -d ".git" ]; then
    echo "📦 Step 1: Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi
echo ""

# Step 2: Check for .env file
if [ -f ".env" ]; then
    echo "⚠️  WARNING: .env file detected!"
    echo "This file contains secrets and should NOT be committed"
    echo ""
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted. Please review your .env file"
        exit 1
    fi
fi

# Step 3: Add all files
echo "📦 Step 2: Adding files to git..."
git add .
echo "✅ Files staged"
echo ""

# Step 4: Create initial commit
echo "📦 Step 3: Creating initial commit..."
if git diff-index --quiet HEAD --; then
    echo "⚠️  No changes to commit"
else
    git commit -m "Initial commit: Imposter AI social deduction game

- React + TypeScript + Vite
- AI-powered hint generation with OpenAI
- iOS native support with Capacitor
- Freemium monetization model
- 50 AI generations per day rate limit
- Device-based subscriptions
- Progressive Web App
- 12 detective/spy avatars
- Comprehensive sound system"
    echo "✅ Initial commit created"
fi
echo ""

# Step 5: Prompt for GitHub username
echo "📦 Step 4: Connect to GitHub"
echo ""
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

echo ""
read -p "Enter repository name (default: imposter-ai): " repo_name
repo_name=${repo_name:-imposter-ai}

echo ""
echo "📦 GitHub Repository URL:"
echo "https://github.com/$github_username/$repo_name"
echo ""
echo "⚠️  IMPORTANT: Create this repository on GitHub first!"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: $repo_name"
echo "3. Description: Social deduction game with AI-powered hints"
echo "4. Visibility: Public (or Private)"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "Have you created the repository? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please create the repository first, then run this script again"
    exit 1
fi

# Step 6: Add remote origin
echo ""
echo "📦 Step 5: Adding remote origin..."
git remote remove origin 2>/dev/null  # Remove if exists
git remote add origin "https://github.com/$github_username/$repo_name.git"
echo "✅ Remote origin added"
echo ""

# Step 7: Rename branch to main
echo "📦 Step 6: Renaming branch to main..."
git branch -M main
echo "✅ Branch renamed to main"
echo ""

# Step 8: Push to GitHub
echo "📦 Step 7: Pushing to GitHub..."
echo "You may be prompted for your GitHub credentials"
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your project is now on GitHub!"
    echo "======================================"
    echo ""
    echo "📍 Repository URL:"
    echo "   https://github.com/$github_username/$repo_name"
    echo ""
    echo "📚 Next Steps:"
    echo "   1. Visit your repository to verify upload"
    echo "   2. Add collaborators: Settings → Collaborators"
    echo "   3. Enable Issues: Settings → Features → Issues"
    echo "   4. Add topics: About section → Add topics"
    echo "   5. Review GITHUB_SETUP_GUIDE.md for more tips"
    echo ""
    echo "🤝 Share with collaborators:"
    echo "   git clone https://github.com/$github_username/$repo_name.git"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure you created the repository on GitHub"
    echo "2. Check your GitHub credentials"
    echo "3. Try using GitHub CLI: gh auth login"
    echo "4. Or use SSH: git remote set-url origin git@github.com:$github_username/$repo_name.git"
    echo ""
    echo "Manual push:"
    echo "   git push -u origin main"
    exit 1
fi
