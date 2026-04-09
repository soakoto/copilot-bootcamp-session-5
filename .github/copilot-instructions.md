# Copilot Instructions for TODO Application

## Project Context
- Full-stack TODO application with React frontend and Express backend.
- Focus on iterative, feedback-driven development.
- Current phase: Backend stabilization and frontend feature completion.

## Documentation References
Use the project documentation to guide implementation choices and keep changes aligned with team expectations:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and structure.
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards.
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance.

## Development Principles
- Test-Driven Development: Follow the Red-Green-Refactor cycle.
- Incremental Changes: Prefer small, testable modifications over large rewrites.
- Systematic Debugging: Use failing tests and error output as primary debugging guides.
- Validation Before Commit: Ensure all tests pass and no lint errors remain before committing.

## Testing Scope
This project uses unit tests and integration tests only.

- Backend: Jest + Supertest for API testing.
- Frontend: React Testing Library for component unit/integration tests.
- Manual browser testing for full UI verification.
- Do not suggest or implement e2e test frameworks (Playwright, Cypress, Selenium).
- Do not suggest browser automation tools.
- Reason: Keep the lab focused on unit/integration testing without e2e complexity.

**Testing Approach by Context**
- Backend API changes: Write Jest tests first, then implement (Red-Green-Refactor).
- Frontend component features: Write React Testing Library tests first for component behavior, then implement (Red-Green-Refactor). Follow with manual browser testing for full UI flows.
- This is true TDD: test first, then code to pass the test.

## Workflow Patterns
Follow these workflows consistently:

1. TDD Workflow: Write/fix tests -> run -> fail -> implement -> pass -> refactor.
2. Code Quality Workflow: Run lint -> categorize issues -> fix systematically -> re-validate.
3. Integration Workflow: Identify issue -> debug -> test -> fix -> verify end-to-end.

## Agent Usage
Use specialized agents based on task type:
- `tdd-developer`: Use for test-related implementation and Red-Green-Refactor cycles.
- `code-reviewer`: Use for lint-error resolution and code quality improvements.

## Memory System

The memory system tracks development discoveries, patterns, and lessons learned throughout project development. It operates in two tiers:

**Persistent Memory** (.github/copilot-instructions.md):
- Foundational project principles, workflows, and architectural decisions
- Updated infrequently; serves as stable reference for all development
- Contains approved patterns and team standards

**Working Memory** (.github/memory/):
- Discoveries, patterns, and session learnings discovered during active development
- Evolves as the team learns the codebase
- Divided into:
  - `session-notes.md` - Historical session summaries (committed to git)
  - `patterns-discovered.md` - Recurring code patterns and decisions (committed to git)
  - `scratch/working-notes.md` - Active session notes (not committed; ephemeral)

**During Development**:
- Take notes in `.github/memory/scratch/working-notes.md` as you work (TDD cycles, debugging, etc.)
- Document discoveries as they happen
- At session end: extract key learnings to `session-notes.md` and `patterns-discovered.md`

**When Providing Suggestions**:
- Reference patterns from `.github/memory/patterns-discovered.md` to ensure consistency
- Check `.github/memory/session-notes.md` for context on similar work completed before
- Suggest updates to working memory during active development sessions

**Reference & Learn**:
- Consult `.github/memory/README.md` for comprehensive memory system documentation
- Use past sessions to understand how features were implemented
- Apply discovered patterns in new feature work

## Workflow Utilities
Use GitHub CLI to automate issue-driven workflow steps (available to all modes):

```bash
# List open issues
gh issue list --state open

# Get issue details
gh issue view <issue-number>

# Get issue details with comments
gh issue view <issue-number> --comments
```

- The main exercise issue will include "Exercise:" in the title.
- Step-by-step instructions are posted as comments on that main issue.
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked.

## Git Workflow
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, etc.
- Use feature branches in the format: `feature/<descriptive-name>`.
- Always stage all changes before committing:

```bash
git add .
```

- Push to the correct branch:

```bash
git push origin <branch-name>
```
