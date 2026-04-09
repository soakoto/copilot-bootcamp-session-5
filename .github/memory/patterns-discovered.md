# Code Patterns Discovered

This file documents recurring code patterns, architectural decisions, and best practices discovered during development. Each pattern is documented for reference during implementation and code review. Patterns accumulate over time as the codebase evolves.

---

## Pattern Template

### Pattern: [Name]

**Context**: Where/when this pattern applies
- Applicable to: [component type, feature type, etc.]
- Use when: [specific conditions or requirements]
- Avoid when: [scenarios where this pattern doesn't fit]

**Problem**: The issue or requirement this pattern solves
- Challenge: [What problem are you trying to solve?]
- Goal: [What's the desired outcome?]
- Constraints: [Any limitations to consider]

**Solution**: The approach or implementation
- Description: [High-level explanation]
- Key points: [Important implementation details]
- Code example: [Actual code snippet from the codebase]

**Variations**: Related approaches or adaptations
- Variant name: [Description of when to use]

**Related Files**: Where this pattern is used in the codebase
- [File path]: [Brief context of usage]
- [File path]: [Brief context of usage]

**References**: Links to session notes or documentation
- Session: [Session name/date where pattern was discovered]
- Related patterns: [Other related patterns]

---

## Example Pattern

### Pattern: Empty Array Initialization

**Context**: Service initialization for array-backed data structures
- Applicable to: Array data storage initialization, list-based services
- Use when: Initializing a data store that will hold multiple items (TODOs, users, etc.)
- Avoid when: Data comes from a database query or external API (use null or undefined until loaded)

**Problem**: Service needs consistent initialization for array-based storage
- Challenge: Should we initialize with empty array `[]`, null, or undefined?
- Goal: Consistent state, easy to reason about, prevents null-checking everywhere
- Constraints: Must work with forEach, filter, map operations; should not break if service not initialized

**Solution**: Always initialize with empty array `[]`
- Description: When initializing a service that manages a list (like todos), start with an empty array rather than null. This prevents null-checking in loops and makes the code more predictable.
- Key points:
  - Initialize immediately: `let todos = [];`
  - Allows direct array methods: `todos.push()`, `todos.filter()` work without checks
  - Consistent with JavaScript array conventions
  - Simplifies test setup (no special cases for null state)
  
- Code example:
  ```javascript
  // ✅ GOOD: Start with empty array
  let todos = [];
  
  app.get('/api/todos', (req, res) => {
    res.json(todos); // Returns [], never null
  });
  
  app.post('/api/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, ...req.body };
    todos.push(newTodo); // Safe: todos is always an array
    res.status(201).json(newTodo);
  });
  
  // ❌ BAD: Initialize as null, adds checks everywhere
  let todos = null;
  
  app.post('/api/todos', (req, res) => {
    if (!todos) todos = [];  // Extra check needed
    todos.push(...);
  });
  ```

**Variations**:
- **Lazy initialization**: Initialize as empty array, but delay loading external data until first query (check if loaded, load if needed)
- **Pre-loaded initialization**: If data must be loaded at startup, load then store in array (still empty array as structure, just populated)

**Related Files**: Where this pattern is used
- `packages/backend/src/app.js`: Todos initialized as `let todos = [];` at line 3
- `packages/backend/__tests__/app.test.js`: Tests always expect empty array on init

**References**:
- Discovered in: Session: "Implemented TODO API Deletion Endpoint" (April 8, 2026)
- Related patterns: Type-Safe Array Find, Service Response Consistency

---

### Pattern: Type-Safe Array Find

**Context**: Comparing values in array operations where type mismatch might occur
- Applicable to: Finding array elements, filtering by ID/key, array comparison operations
- Use when: IDs come from different sources (URL params as strings, stored data as numbers) 
- Avoid when: You've ensured consistent type throughout the data flow

**Problem**: Type mismatches prevent finding values in arrays
- Challenge: URL parameters are strings (":id" = "5"), but stored data might have number IDs (5)
- Goal: Reliable, predictable array finds regardless of type origin
- Constraints: Must work across string/number conversions; performance not critical for small arrays

**Solution**: Convert both sides to same type before comparison
- Description: When comparing array elements for equality/find operations, explicitly convert both sides to the same type (usually number for IDs).
- Key points:
  - Use `Number()` or `parseInt()` to convert string IDs to numbers
  - Apply conversion on both sides of comparison for safety
  - Most reliable for numeric IDs: convert both to number
  
- Code example:
  ```javascript
  // ❌ BAD: Type mismatch, find fails
  let todos = [
    { id: 1, title: 'Learn TDD' },
    { id: 2, title: 'Build API' }
  ];
  
  const todo = todos.find(t => t.id === '1'); // String '1' !== Number 1, returns undefined
  
  // ✅ GOOD: Convert both to number
  const todo = todos.find(t => t.id === Number('1')); // Number(1) === Number(1), works!
  
  // ✅ GOOD: Or convert ID when storing
  const paramId = Number(req.params.id);
  const todo = todos.find(t => t.id === paramId); // Now both are numbers
  ```

**Variations**:
- **String comparison**: If IDs are strings, convert to `String()` instead
- **Strict equality**: Always use `===` with converted types (safer than `==`)

**Related Files**: Where this pattern is used
- `packages/backend/src/app.js`: DELETE endpoint uses `Number(req.params.id)` on line 45
- `packages/backend/__tests__/app.test.js`: Tests verify both string and number comparisons work

**References**:
- Discovered in: Session: "Implemented TODO API Deletion Endpoint" (April 8, 2026)
- Related patterns: Empty Array Initialization, Service Response Consistency

---

## Adding New Patterns

When you discover a pattern:

1. **Identify the pattern**: Recognize when the same solution appears multiple times
2. **Document in working-notes.md**: Capture context during development
3. **Add to this file**: At session end, create formal pattern entry
4. **Use in code reviews**: Reference patterns to guide new implementations
5. **Update when needed**: Refine patterns as team learns more

## Searching Patterns

When implementing a feature, first ask:
- "Is there a pattern for [this type of operation]?"
- "How did we solve this before?"
- "What's the team's preferred approach for [this problem]?"

Example: Before implementing an endpoint, search this file for "API endpoint pattern" or look at session notes for similar endpoint implementations.
