---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze workspace changes, generate a conventional commit message, and push to a feature branch.

## Input

Branch Name: ${input:branch-name:Enter the feature branch name (e.g., feature/implement-todo-api)}

## Workflow

### 1. Validate Branch Name

- Ensure branch name follows format: `feature/<descriptive-name>`
- Examples: `feature/implement-todo-api`, `feature/fix-toggle-bug`, `feature/add-error-handling`
- If branch name doesn't follow format, suggest correction but proceed with user's choice

### 2. Analyze Changes

Run `git status` and `git diff` to understand:
- Which files were modified, added, or deleted
- The nature of the changes (features, fixes, refactoring, etc.)
- Scope of impact (backend, frontend, tests, docs, config)

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following this format:

```
<type>: <short description>

<optional body with details>
```

**Type prefixes** (from Git Workflow in project instructions):
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance task
- `docs:` - Documentation only
- `test:` - Test additions/changes
- `refactor:` - Code restructuring without behavior change
- `style:` - Formatting, whitespace (not CSS)

**Guidelines**:
- Keep first line under 72 characters
- Use imperative mood ("add feature" not "added feature")
- Be specific and descriptive
- Include scope if helpful (e.g., `feat(backend): add DELETE endpoint`)
- Add body for complex changes explaining why/how

**Examples**:
```
feat(backend): implement POST, PUT, DELETE endpoints

- Add ID counter for unique todo IDs
- Implement POST /todos with validation
- Implement PUT /todos/:id with existence check
- Implement DELETE /todos/:id
- Fix PATCH endpoint to properly toggle completed status
```

```
fix(backend): resolve todo initialization bug

Initialize todos array and nextId counter on app startup
```

```
test(frontend): add tests for error handling

Add React Testing Library tests for error states in TodoList component
```

### 4. Create or Switch to Branch

```bash
# Check if branch exists
git branch --list <branch-name>

# If branch doesn't exist, create it
git checkout -b <branch-name>

# If branch exists, switch to it
git checkout <branch-name>
```

**CRITICAL**: 
- ❌ NEVER commit to `main` branch
- ✅ ONLY commit to the user-provided feature branch
- Verify current branch with `git branch --show-current` before committing

### 5. Stage All Changes

```bash
git add .
```

This stages:
- All modified files
- All new files
- All deleted files

### 6. Commit with Generated Message

```bash
git commit -m "<generated commit message>"
```

For multi-line messages with body:
```bash
git commit -m "<first line>" -m "<body>"
```

### 7. Push to Feature Branch

```bash
git push origin <branch-name>
```

**CRITICAL**: 
- ❌ NEVER push to `main` 
- ✅ ONLY push to `origin <branch-name>`
- Use the exact branch name provided by the user

### 8. Completion Report

After successful push, provide:

```
✅ Changes committed and pushed

Branch: <branch-name>
Commit message: <generated message>

Files changed:
- <list of modified files>

Next steps:
1. Verify changes on GitHub: https://github.com/<owner>/<repo>/tree/<branch-name>
2. Create a pull request if ready to merge
3. Or continue working on this branch with /execute-step for the next step
```

## Error Handling

Common issues and solutions:

**Merge conflicts**:
- Inform user of conflict
- Suggest: `git status` to see conflicting files
- User must manually resolve conflicts

**Nothing to commit**:
- Check `git status` output
- Inform user that working tree is clean
- No action needed

**Push rejected**:
- Inform user that remote has changes
- Suggest: `git pull origin <branch-name>` to sync
- Then retry push

**Not on correct branch**:
- Show current branch
- Confirm with user before proceeding
- Switch to correct branch if needed

## Safety Checks

Before pushing, verify:
1. ✅ Current branch is NOT `main`
2. ✅ Current branch matches user-provided name
3. ✅ All changes are staged
4. ✅ Commit message follows conventional format
5. ✅ Tests are passing (optional check)

## References

This prompt inherits knowledge from:
- [.github/copilot-instructions.md](../../copilot-instructions.md) - Git Workflow section for conventional commits and branching
- [docs/workflow-patterns.md](../../../docs/workflow-patterns.md) - Validation and incremental change principles
