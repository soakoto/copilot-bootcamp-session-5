---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Success Criteria

You are validating that all success criteria for a specific exercise step are met using the **code-reviewer** agent.

## Input

Step Number: ${input:step-number:Enter the step number to validate (e.g., "5-0", "5-1", "5-2")}

## Workflow

### 1. Locate the Exercise Issue

Use `gh issue list --state open` to:
- Find all open issues
- Identify the main exercise issue (title contains "Exercise:")
- Extract the issue number

### 2. Retrieve Issue Content

Run `gh issue view <issue-number> --comments` to get:
- Full issue description
- All step comments with success criteria

### 3. Find the Target Step

Search through the issue comments for:
- Heading matching `# Step ${step-number}:`
- Example: For step "5-1", search for `# Step 5-1:`

### 4. Extract Success Criteria

From the target step comment, locate the section:

```
## :white_check_mark: Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Parse all criteria into a structured list.

### 5. Validate Each Criterion

For each success criterion, systematically check:

a. **Understand what's being checked**
   - Parse the criterion text
   - Identify what file, feature, or behavior is being validated

b. **Gather evidence**
   - Read relevant files
   - Run tests: `npm test` or specific test files
   - Check lint status: `npm run lint` (in backend or frontend)
   - Verify code patterns with search tools

c. **Determine status**
   - ✅ **PASS**: Criterion fully met with evidence
   - ⚠️ **PARTIAL**: Partially implemented, needs work
   - ❌ **FAIL**: Not implemented or has errors

d. **Document findings**
   - Show evidence (test output, file content, etc.)
   - Note any issues or gaps

### 6. Generate Validation Report

Provide a comprehensive report in this format:

```markdown
# Step ${step-number} Validation Report

## Summary
- Total Criteria: X
- Passed: Y ✅
- Failed: Z ❌
- Partial: W ⚠️

## Detailed Results

### ✅ Criterion 1: [Description]
**Status**: PASS
**Evidence**: 
- File `path/to/file.js` exists and contains expected code
- Test `should do something` passes
**Validation**:
[Show relevant test output or code snippet]

### ❌ Criterion 2: [Description]
**Status**: FAIL
**Issue**: Missing implementation in `path/to/file.js`
**Expected**: Function should handle edge case
**Actual**: Function not implemented
**Recommendation**: 
1. Add the missing function
2. Implement error handling
3. Add test coverage

### ⚠️ Criterion 3: [Description]
**Status**: PARTIAL
**Completed**: Basic implementation exists
**Missing**: Edge case handling and validation
**Next Steps**:
1. Add input validation
2. Add corresponding tests

## Overall Status

[✅ STEP COMPLETE | ⚠️ NEEDS WORK | ❌ NOT READY]

## Next Actions

[Specific guidance based on validation results]

If all criteria pass:
1. Review the validation evidence above
2. Run /commit-and-push to save your work
3. Move to the next step with /execute-step

If criteria failed:
1. Address the failed criteria listed above
2. Re-run /validate-step when ready
```

### 7. Run Automated Checks

For common validation needs:

**Test Validation**:
```bash
# All tests
npm test

# Specific test file
npm test -- <test-file-name>

# Backend tests only
cd packages/backend && npm test

# Frontend tests only
cd packages/frontend && npm test
```

**Lint Validation**:
```bash
# Backend lint
cd packages/backend && npm run lint

# Frontend lint
cd packages/frontend && npm run lint
```

**File Existence**:
```bash
# Check if file exists
ls -la <file-path>

# Check file content
cat <file-path>
```

### 8. Code Quality Review

As the **code-reviewer** agent, also check for:

- ✅ No ESLint errors introduced
- ✅ Code follows project conventions
- ✅ Tests are comprehensive
- ✅ No console.log statements left in code (unless intentional)
- ✅ Proper error handling
- ✅ Clear, descriptive variable/function names
- ✅ Code is well-structured and maintainable

## Success Criteria Patterns

Common types of criteria you'll validate:

**Implementation Criteria**:
- "File X should exist"
- "Function Y should be implemented"
- "Endpoint Z should return correct response"

**Test Criteria**:
- "All tests should pass"
- "Test coverage should include X scenario"
- "New tests should be added for Y feature"

**Quality Criteria**:
- "No ESLint errors"
- "Code should follow convention X"
- "Error handling should be present"

**Behavioral Criteria**:
- "Feature X should work as expected"
- "Edge case Y should be handled"
- "API should return correct status codes"

## Error Handling

If validation encounters issues:

**Missing Step**:
- Verify step number format is correct (e.g., "5-0", not "Step 5-0")
- List available steps from the issue
- Ask user to confirm correct step number

**Incomplete Information**:
- Note what information is missing
- Make best effort validation with available data
- Clearly mark assumptions made

**Test Failures**:
- Show full test output
- Identify which tests failed
- Provide specific guidance for fixing failures

## References

This prompt inherits knowledge from:
- [.github/copilot-instructions.md](../../copilot-instructions.md) - Workflow Utilities for gh CLI, Testing Scope constraints
- [docs/testing-guidelines.md](../../../docs/testing-guidelines.md) - Test patterns and validation standards
- [docs/workflow-patterns.md](../../../docs/workflow-patterns.md) - Validation workflow patterns

## Validation Philosophy

Follow these principles:
1. **Evidence-Based**: Show concrete proof (test output, file content)
2. **Specific**: Point to exact files and lines
3. **Actionable**: Provide clear next steps for failed criteria
4. **Comprehensive**: Check all aspects, not just basic functionality
5. **Quality-Focused**: Ensure code meets project standards, not just "works"
