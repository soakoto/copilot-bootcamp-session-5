# Development Memory System

## Purpose

This directory serves as a **working memory system** for tracking development discoveries, patterns, and lessons learned during coding sessions. It captures insights that emerge during TDD cycles, debugging, and feature implementation—knowledge that helps guide future development work and keeps the team aligned on discovered patterns.

## Memory Architecture

The memory system uses a **two-tier approach**:

### Tier 1: Foundational Knowledge (Persistent)
- **Location**: `.github/copilot-instructions.md`
- **Scope**: Project-wide principles, workflows, and architectural decisions
- **Lifetime**: Permanent; part of project setup
- **Role**: Guides all development work; rarely changes

### Tier 2: Operational Knowledge (Working)
- **Location**: `.github/memory/` (this directory)
- **Scope**: Discoveries, patterns, and session learnings
- **Lifetime**: Accumulated over time; some files are temporary, some permanent
- **Role**: Contextualizes development work; evolves as team learns the codebase

---

## Directory Structure

```
.github/memory/
├── README.md                    # This file
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/ (not committed)
    └── working-notes.md        # Active session notes (not committed, cleared at session end)
```

---

## File Reference Guide

### `session-notes.md` - Historical Session Records (COMMITTED)

**Purpose**: Document completed sessions as a historical record of the project's development journey.

**When to Use**:
- At the END of a development session
- When you've completed meaningful work (bugs fixed, features added, tests passing)
- To summarize what was accomplished for the team
- For future developers to understand how the codebase evolved

**Format**:
- One session per entry
- Timestamp indicates when the session was completed
- Sections: What was accomplished, Key findings, Decisions made, Outcomes
- Example: "Implemented TODO API endpoints" or "Fixed state management serialization issue"

**Lifecycle**:
1. During session: Work in `scratch/working-notes.md`
2. At session end: Extract key findings from scratch notes
3. Add summary to `session-notes.md` with timestamp
4. Commit to git as part of normal workflow
5. Never delete—serves as project history

**Best Practice**: These notes become a searchable history. If you encounter a similar problem months later, finding "Session: Fixed Jest initialization issue" lets you quickly reference what was learned.

---

### `patterns-discovered.md` - Accumulated Code Patterns (COMMITTED)

**Purpose**: Document recurring code patterns, architectural decisions, and best practices discovered during development.

**When to Use**:
- When you solve a problem that might occur again
- When you notice a pattern across multiple files
- When an architectural decision is made (e.g., "use empty array, not null")
- When you discover a clever solution worth preserving

**Format**:
- Pattern name (clear, action-oriented)
- Context: When/where this pattern applies
- Problem: What issue does this solve?
- Solution: The approach or code example
- Related files: Where this pattern is used
- Variations: Common adaptations or alternatives

**Lifecycle**:
1. During development: Note pattern discoveries in `scratch/working-notes.md`
2. At session end: Extract patterns and add to `patterns-discovered.md`
3. Commit to git when verified and team-aligned
4. Reference these patterns in code reviews and new feature work
5. Update when variations are discovered

**Why This Matters**:
- Keeps recurring solutions consistent across the codebase
- Accelerates onboarding (new developers learn patterns quickly)
- Prevents "reinventing the wheel" on known problems
- Guides architectural decisions (e.g., "use this pattern for state initialization")

---

### `scratch/working-notes.md` - Active Session Work (NOT COMMITTED)

**Purpose**: Capture active, in-progress notes during a development session. This is ephemeral—cleared when the session ends.

**When to Use**:
- Throughout your development session
- When testing, debugging, or implementing features
- During TDD cycles (document findings from each test)
- When troubleshooting linting or other issues
- For exploratory work (trying approaches before settling on best one)

**Format**:
- Current task being worked on
- Approach being taken
- Key findings discovered
- Decisions made
- Blockers encountered
- Next steps planned
- Free-form notes

**Lifecycle**:
1. Start of session: Create entry with current task
2. During work: Update continuously as you learn
3. At session end: Review notes, extract persistent learnings
4. Extract patterns for `patterns-discovered.md` (if new pattern found)
5. Extract summary for `session-notes.md` (what was accomplished)
6. Clear or delete `working-notes.md` (it's not committed anyway)
7. Next session can create a fresh `working-notes.md`

**Example Workflow**:
```
Start of session:
- Task: Fix failing test for TODO deletion
- Approach: Red-Green-Refactor with test-first approach

During debugging:
- Key Finding: Service was checking todo.id === id (type mismatch)
- Decision: Convert both to numbers before comparison
- Blocker: Test was checking for wrong response format

At end:
- Extract to session-notes.md: "Fixed TODO deletion endpoint type issue"
- Extract to patterns-discovered.md: "Type Coercion in Array Finds"
- Delete or clear working-notes.md
```

---

### `scratch/.gitignore` - Ignore Active Work

**Purpose**: Ensures active session notes are never committed to git.

**Contents**: Ignores all files in the scratch directory, keeping it local-only.

---

## How Copilot Uses This Memory

When you reference this memory system during development:

1. **During Implementation**: "Use the patterns in `.github/memory/patterns-discovered.md` to guide this feature."
2. **During Debugging**: "Check if this issue was documented in session-notes.md or patterns-discovered.md."
3. **During Code Review**: "Ensure this follows the patterns documented in the memory system."
4. **During Planning**: "Review past sessions (session-notes.md) to understand related decisions."

---

## Workflow Examples

### Example 1: TDD Cycle with Memory

```
1. Start session → Update scratch/working-notes.md with current task
2. Write test → Document test expectation in working-notes.md
3. Test fails (RED) → Note what test expects
4. Implement (GREEN) → Documented approach in working-notes.md
5. Test passes → Note key insight
6. Refactor → Document refactoring decision
7. Move to next test → Update working-notes.md
8. End of session → Extract findings to session-notes.md and patterns-discovered.md
```

### Example 2: Debugging with Memory

```
1. Encounter bug → Search patterns-discovered.md for similar issues
2. Found pattern → Apply documented solution
3. Bug fixed → Document if new insight discovered
4. Add to working-notes.md → "This pattern variation applied to X"
5. At session end → Decide if pattern variation belongs in patterns-discovered.md
```

### Example 3: Feature Planning with Memory

```
1. Plan new feature → Review session-notes.md (how were similar features added?)
2. Review patterns → Check patterns-discovered.md for relevant patterns
3. Design approach → Note decisions in working-notes.md
4. Implement using patterns → Reference specific patterns
5. Test and validate → Update working-notes.md with findings
6. Commit → Add session summary to session-notes.md
```

---

## Best Practices

### Writing Session Notes
- ✅ **Specific**: "Fixed JSON serialization in TODO state" (good) vs "Fixed stuff" (bad)
- ✅ **Dated**: Always include when the session completed
- ✅ **Outcomes**: What was the result? Tests passing? Feature complete?
- ✅ **Decisions**: Why did you choose this approach?

### Documenting Patterns
- ✅ **Named clearly**: "Empty Array Initialization Pattern" vs "Array Thing"
- ✅ **Problem-focused**: Frame around the problem it solves
- ✅ **Searchable**: Future developers should find it easily
- ✅ **Verifiable**: Include code examples from actual codebase

### Taking Working Notes
- ✅ **Frequent updates**: Capture discoveries as they happen
- ✅ **Honest observations**: "Struggled with X" is valuable
- ✅ **Decision rationale**: Why did you choose this approach?
- ✅ **Questions to resolve**: Note blockers for follow-up

### Maintenance
- ✅ **Review periodically**: Do discovered patterns still apply?
- ✅ **Consolidate duplicates**: If two patterns converge, merge them
- ✅ **Archive outdated patterns**: Mark as "deprecated pattern if they no longer apply
- ✅ **Link related entries**: Cross-reference patterns in session notes

---

## When to Reference This System

### During Copilot Conversations

Ask Copilot to reference the memory system:

```
"Implement the DELETE endpoint using patterns in .github/memory/patterns-discovered.md"
"This error seems familiar—check session-notes.md for related issues"
"Document this finding in scratch/working-notes.md for later review"
```

### During Code Review

```
"Ensure this follows the pattern: [pattern name from patterns-discovered.md]"
"We solved this before in [session name from session-notes.md]"
```

### During Debugging

```
"Search the memory system for similar issues"
"This looks like the [pattern name] pattern—apply documented solution"
```

---

## Getting Started

1. **First Session**: Start with `scratch/working-notes.md` for active work
2. **Mid-Session**: Update notes as you make discoveries
3. **End of Session**: 
   - Review `scratch/working-notes.md`
   - Extract patterns for `patterns-discovered.md` (if new patterns emerged)
   - Summarize session for `session-notes.md`
   - Clear or delete `scratch/working-notes.md` for next session
4. **Next Session**: Create fresh `scratch/working-notes.md` and reference `session-notes.md` for context

---

## Summary

| File | Purpose | Committed? | Lifetime | Use When |
|------|---------|-----------|----------|----------|
| `copilot-instructions.md` | Foundational project knowledge | Yes | Permanent | Need project principles/workflows |
| `session-notes.md` | Historical session summaries | Yes | Permanent | Need to understand project history |
| `patterns-discovered.md` | Code patterns & decisions | Yes | Permanent | Need to apply known patterns |
| `scratch/working-notes.md` | Active session notes | No | Temporary | Actively developing/debugging |

This two-tier system keeps foundational knowledge stable while allowing operational knowledge to grow and evolve with the project.
