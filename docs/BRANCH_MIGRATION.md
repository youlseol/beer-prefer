# Branch Migration Guide: Changing Default Branch to "main"

## Overview
This document provides instructions for completing the migration from the current default branch to "main".

## Current Status

### What Has Been Done
✅ Created a new "main" branch from the current default branch
- The "main" branch contains all the latest code from the repository
- Branch created at commit: `facd1fe` (refactor: add TypeScript path aliases for cleaner imports)

### What Needs to Be Done by Repository Admin

#### Step 1: Push the "main" branch to GitHub
The "main" branch has been created locally and needs to be pushed to GitHub:

```bash
git push origin main
```

#### Step 2: Change the Default Branch on GitHub
To complete the migration, the repository owner must change the default branch in GitHub:

1. Go to the repository on GitHub: https://github.com/youlseol/beer-prefer
2. Click on "Settings" tab
3. Click on "Branches" in the left sidebar
4. Under "Default branch", click the switch icon (⇄) or edit button
5. Select "main" from the dropdown
6. Click "Update" or "I understand, update the default branch"
7. Confirm the change

#### Step 3: Update Local Clones (Optional - For All Contributors)
After the default branch is changed on GitHub, contributors should update their local repositories:

```bash
# Fetch the latest changes
git fetch origin

# If you're on the old default branch, switch to main
git checkout main

# Set main to track origin/main
git branch --set-upstream-to=origin/main main

# Optional: Delete old local branch reference (if not needed)
# git branch -d "feature/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116"
```

#### Step 4: (Optional) Clean Up Old Branch
After confirming that "main" is working correctly as the default branch, you can optionally delete the old feature branch:

```bash
# Delete remote branch (on GitHub)
git push origin --delete "feature/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116"
```

## Benefits of Using "main" as Default Branch
- Standard convention: "main" is now the widely adopted standard for default branch names
- Clearer semantics: "main" clearly indicates the primary development branch
- Better for team collaboration: Easier to understand for new contributors
- Shorter name: Easier to type and reference in commands and documentation

## Notes
- All existing pull requests and references will continue to work
- Branch protection rules will need to be reconfigured for the "main" branch
- CI/CD workflows (if any) that reference the old branch name should be updated
