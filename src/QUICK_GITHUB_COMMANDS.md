# Quick GitHub Commands Reference

Essential Git and GitHub commands for collaborating on Imposter AI.

---

## 🚀 Initial Setup (One Time)

```bash
# Clone repository
git clone https://github.com/USERNAME/imposter-ai.git
cd imposter-ai

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env and add your API keys

# Run development server
npm run dev
```

---

## 🔄 Daily Workflow

### Start Working

```bash
# Update your local main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Make Changes

```bash
# Check what files changed
git status

# See detailed changes
git diff

# Stage specific files
git add file1.tsx file2.tsx

# Or stage all changes
git add .

# Commit with message
git commit -m "Add descriptive commit message"
```

### Push Changes

```bash
# Push feature branch to GitHub
git push origin feature/your-feature-name

# Then open Pull Request on GitHub website
```

---

## 📝 Commit Messages

### Format

```
Type: Brief description (50 chars max)

Detailed explanation if needed (wrap at 72 chars)

- Bullet points for multiple changes
- Another change
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, no code change
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance

### Examples

```bash
git commit -m "feat: Add AI hint fallback for offline mode"
git commit -m "fix: Correct vote counting in multiplayer"
git commit -m "docs: Update README with iOS setup instructions"
git commit -m "style: Format CategorySelector component"
```

---

## 🌿 Branch Management

```bash
# List all branches
git branch -a

# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Rename current branch
git branch -m new-name
```

---

## 🔄 Syncing with Main

```bash
# Update main branch
git checkout main
git pull origin main

# Merge main into your feature branch
git checkout feature/your-feature
git merge main

# Or rebase (cleaner history)
git checkout feature/your-feature
git rebase main
```

---

## 🔍 Viewing History

```bash
# View commit history
git log

# One line per commit
git log --oneline

# See last 5 commits
git log -5

# View changes in commit
git show commit-hash

# View file history
git log -- path/to/file.tsx
```

---

## ↩️ Undoing Changes

### Unstage Files

```bash
# Unstage specific file
git reset HEAD file.tsx

# Unstage all files
git reset HEAD
```

### Discard Changes

```bash
# Discard changes in file (CAREFUL!)
git checkout -- file.tsx

# Discard all changes (CAREFUL!)
git reset --hard HEAD
```

### Undo Last Commit

```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes and commit (CAREFUL!)
git reset --hard HEAD~1
```

### Amend Last Commit

```bash
# Modify last commit message
git commit --amend -m "New message"

# Add files to last commit
git add forgotten-file.tsx
git commit --amend --no-edit
```

---

## 🔧 Remote Management

```bash
# View remote URLs
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/repo.git

# Remove remote
git remote remove origin
```

---

## 🏷️ Tags (Releases)

```bash
# Create tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push origin --tags

# List tags
git tag -l

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

---

## 🔀 Pull Requests

### Create PR

1. Push feature branch to GitHub
2. Go to repository on GitHub
3. Click "Pull requests" → "New pull request"
4. Select your feature branch
5. Add title and description
6. Click "Create pull request"

### Update PR

```bash
# Make more changes
git add .
git commit -m "Address review feedback"
git push origin feature/your-feature

# PR updates automatically
```

### Merge PR

On GitHub:
1. Review changes
2. Check CI/CD passes
3. Click "Merge pull request"
4. Delete branch after merge

---

## 🚨 Common Issues

### Merge Conflicts

```bash
# When merge conflict occurs:
# 1. Open conflicted files
# 2. Look for <<<<<<< HEAD markers
# 3. Edit to resolve conflicts
# 4. Remove conflict markers
# 5. Stage resolved files
git add resolved-file.tsx

# Continue merge
git commit -m "Resolve merge conflicts"
```

### Accidentally Committed Secrets

```bash
# Remove file from last commit
git rm --cached .env
git commit --amend -m "Remove .env file"
git push --force origin branch-name

# ⚠️ IMPORTANT: Regenerate all exposed secrets!
```

### Reset to Remote State

```bash
# Discard all local changes (CAREFUL!)
git fetch origin
git reset --hard origin/main

# Or for feature branch
git reset --hard origin/feature/branch-name
```

### Force Push (Use Carefully!)

```bash
# Only use for your own branches!
git push --force origin feature/your-feature

# Never force push to main!
```

---

## 📊 Status and Information

```bash
# Check current status
git status

# View current branch
git branch --show-current

# View remote branches
git branch -r

# Check differences
git diff                    # Unstaged changes
git diff --staged          # Staged changes
git diff main              # Compare to main

# See who changed what
git blame file.tsx
```

---

## 🎯 Stashing (Save Work Temporarily)

```bash
# Save current changes
git stash

# Save with message
git stash save "Work in progress on feature"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

---

## 🔍 Searching

```bash
# Search in code
git grep "searchTerm"

# Search in commit messages
git log --grep="search term"

# Find who introduced text
git log -S "searchTerm"
```

---

## 🚀 Advanced: Cherry Pick

```bash
# Apply specific commit to current branch
git cherry-pick commit-hash

# Cherry pick range
git cherry-pick start-hash..end-hash
```

---

## 📦 Submodules (If Using)

```bash
# Add submodule
git submodule add https://github.com/user/repo path/to/submodule

# Initialize submodules after clone
git submodule update --init --recursive

# Update submodules
git submodule update --remote
```

---

## 🔒 Security Best Practices

```bash
# Check for secrets before commit
git diff --staged | grep -i "api_key\|password\|secret"

# View ignored files
git status --ignored

# Check .gitignore is working
git check-ignore -v file.tsx
```

---

## 💡 Useful Aliases (Add to ~/.gitconfig)

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --decorate --all'
```

Now use:
```bash
git co main          # git checkout main
git br               # git branch
git st               # git status
git visual           # Pretty log
```

---

## 📚 Help

```bash
# Get help for any command
git help <command>
git <command> --help

# Examples:
git help commit
git push --help
```

---

## 🎓 Learning Resources

- **Official Git Docs**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Git Cheat Sheet**: https://training.github.com/downloads/github-git-cheat-sheet/
- **Interactive Tutorial**: https://learngitbranching.js.org/

---

**Pro Tip:** Use `git status` frequently to know what's happening!

**Remember:** 
- Commit often with clear messages
- Pull before you push
- Test before you commit
- Never commit secrets
