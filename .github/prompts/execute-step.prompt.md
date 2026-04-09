---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute GitHub Issue Step Instructions

You are executing step-by-step instructions from a GitHub Issue using the **tdd-developer** agent workflow.

## Input

Issue Number: ${input:issue-number:Enter the GitHub issue number (leave empty to auto-detect the exercise issue)}

## Workflow

### 1. Locate the Exercise Issue

If no issue number was provided:
- Use `gh issue list --state open` to find all open issues
- Identify the main exercise issue (title contains "Exercise:")
- Extract the issue number

If an issue number was provided, use that directly.

### 2. Retrieve Issue Content

Use `gh issue view <issue-number> --comments` to get:
- The full issue description
- All comments (step instructions are posted as comments)

### 3. Parse the Latest Step Instructions

From the issue comments:
- Identify the most recent step comment (usually the highest "Step X-Y" number)
- Extract all `:keyboard: Activity:` sections from that step
- Note any important context, prerequisites, or warnings

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section:

a. **Create a todo list** using `manage_todo_list` with all activities
b. **Mark each activity as in-progress** before starting
c. **Execute the activity** following TDD principles:
   - Write/run tests first (Red)
   - Implement minimal code to pass (Green)
   - Refactor if needed
   - Validate with `npm test`
d. **Mark activity as completed** immediately after finishing
e. **Move to next activity**

### 5. Testing Scope Compliance

**CRITICAL**: Follow the testing scope constraints from project instructions:

- ✅ **Allowed**: Jest, Supertest, React Testing Library
- ❌ **NOT Allowed**: Playwright, Cypress, Selenium, any e2e frameworks
- ❌ **NOT Allowed**: Browser automation tools

If step instructions suggest e2e testing:
- Implement using React Testing Library for frontend integration tests
- Use Supertest for backend API integration tests
- Add manual browser testing notes instead of automated e2e

### 6. DO NOT Commit or Push

**IMPORTANT**: This prompt focuses on implementation only.

- Do NOT run `git add`, `git commit`, or `git push`
- Do NOT create or switch branches
- Leave changes unstaged for the user to review
- Committing and pushing is handled by `/commit-and-push`

### 7. Completion Report

After completing all activities, provide:

1. **Summary**: List of completed activities
2. **Test Status**: All tests passing (show test output)
3. **Changes Made**: Files created/modified
4. **Next Steps**: 
   ```
   ✅ Activities completed for Step X-Y
   
   Next actions:
   1. Review the changes in your workspace
   2. Run /validate-step to check success criteria
   3. If validation passes, run /commit-and-push to save your work
   ```

## Error Handling

If you encounter errors:
- Read error messages carefully
- Check related test failures
- Use systematic debugging (see [docs/workflow-patterns.md](../../../docs/workflow-patterns.md))
- Make minimal changes to fix
- Re-validate after each fix

## References

This prompt inherits knowledge from:
- [.github/copilot-instructions.md](../../copilot-instructions.md) - Workflow Utilities section for gh CLI commands
- [docs/workflow-patterns.md](../../../docs/workflow-patterns.md) - TDD and systematic debugging patterns
- [docs/testing-guidelines.md](../../../docs/testing-guidelines.md) - Testing scope and standards

## Success Indicators

- ✅ All `:keyboard: Activity:` sections completed
- ✅ All tests passing (`npm test`)
- ✅ No lint errors introduced
- ✅ Changes follow TDD principles
- ✅ Testing scope constraints respected
- ✅ No commits made (left for `/commit-and-push`)
