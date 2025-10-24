# ✅ Instructions: Change Root Branch Name to "main"

## Summary
This PR prepares for changing the repository's default branch from:
- **Current**: `feature/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116`
- **Target**: `main`

## What You Need To Do

### Step 1: Create and Push "main" Branch
Run these commands in your local repository:

```bash
# Fetch the latest changes
git fetch origin

# Create main branch from current default branch
git checkout "feature/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116"

# Create main branch from this
git checkout -b main

# Push main to GitHub
git push -u origin main
```

### Step 2: Change Default Branch on GitHub UI

1. Navigate to: https://github.com/youlseol/beer-prefer/settings/branches
2. Under "Default branch" section, click the switch/edit button (⇄)
3. Select "main" from the dropdown menu
4. Click "Update" button
5. Confirm by clicking "I understand, update the default branch"

### Step 3: Verify the Change

```bash
# Check that main is now the default
git ls-remote --symref origin HEAD
# Should show: ref: refs/heads/main	HEAD
```

### Step 4 (Optional): Clean Up Old Branch

After verifying everything works with "main" as the default branch:

```bash
# Delete the old feature branch from GitHub
git push origin --delete "feature/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116"
```

## Why "main"?

- ✅ Industry standard for default branch names
- ✅ Clear and simple
- ✅ Easier for new contributors to understand
- ✅ Shorter and easier to type
- ✅ Aligns with modern Git best practices

## Additional Documentation

For more details, see [docs/BRANCH_MIGRATION.md](docs/BRANCH_MIGRATION.md)

## Repository Structure
No code changes are required. The repository structure remains the same:
```
beer-prefer/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── shared/            # Shared types and models
└── docs/              # Documentation
```

All existing functionality will continue to work after the branch name change.
