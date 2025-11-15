# Design: CSS Consolidation Strategy

## Problem Statement
The project currently maintains two separate CSS files:
1. `app.css` - Contains base styles, theme variables, Tailwind config, and component styles
2. `custom.css` - Contains UI overrides, sidebar styling, pagination, TOC, and Pagefind search customization

This separation creates:
- Maintenance overhead (where to add new styles?)
- Potential for conflicts and duplicate selectors
- Complexity in understanding style precedence
- Unnecessary build configuration complexity

## Design Goals
1. Single CSS file as source of truth
2. Preserve all existing visual functionality
3. Logical organization within consolidated file
4. No visual regressions
5. Simplified build configuration

## Architecture Decision

### Chosen Approach: Merge into app.css with logical sections
We will merge `custom.css` into `app.css` using clear section comments to maintain organization.

**Rationale:**
- `app.css` already contains the foundation (variables, theme, Tailwind)
- `custom.css` contains UI overrides and component-specific styles
- Merging maintains all styles in dependency order
- Section comments provide clear organization

### File Organization Structure
```css
/* 1. External imports (Google Fonts, Tailwind) */
/* 2. Theme variables (:root, .dark) */
/* 3. Tailwind theme configuration */
/* 4. Base element styles (body, headings, links, code) */
/* 5. Utility classes (health colors, focus states) */
/* 6. Component overrides (sidebar, pagination, TOC) */
/* 7. Pagefind search customization */
/* 8. Media queries and responsive styles */
```

### Alternative Approaches Considered

**Option 1: Keep both files but rename/reorganize**
- Pros: Less immediate refactoring
- Cons: Doesn't solve the fundamental duplication problem
- Decision: Rejected - doesn't address core issue

**Option 2: Split into multiple purpose-specific files**
- Pros: More granular organization
- Cons: Increases complexity, more imports to manage
- Decision: Rejected - over-engineering for current project size

**Option 3: Use CSS-in-JS or CSS modules**
- Pros: Component co-location
- Cons: Major architecture change, conflicts with Starlight/Astro patterns
- Decision: Rejected - too large a scope change

## Implementation Strategy

### Phase 1: Analysis and Mapping
1. Catalog all selectors in both files
2. Identify any duplicates or conflicts
3. Map logical groupings

### Phase 2: Consolidation
1. Create backup of both files
2. Append `custom.css` content to `app.css` with section headers
3. Organize into logical sections (imports → variables → base → components)
4. Remove any duplicates found
5. **Conflict Resolution Rule:** When duplicate or conflicting selectors exist between `app.css` and `custom.css`, the `app.css` version SHALL be preserved as the authoritative source

### Phase 3: Configuration Updates
1. Update `astro.config.mjs` to remove `custom.css` reference
2. Update `HomeLayout.astro` to remove `custom.css` import
3. Delete `custom.css` file

### Phase 4: Verification
1. Build the project
2. Visual regression testing on all pages
3. Test dark/light themes
4. Test search functionality (Pagefind)
5. Test responsive design

## Trade-offs

### Benefits
- Single source of truth for all styles
- Easier to find and modify styles
- Reduced cognitive load for developers
- Simpler build configuration
- Better style organization with clear sections

### Costs
- Larger single file (but still manageable ~500 lines)
- One-time migration effort
- Need to establish conventions for future additions

## Testing Strategy
1. **Visual testing:** Compare before/after screenshots
2. **Functional testing:** Verify interactive elements (sidebar selection, TOC highlighting, search)
3. **Theme testing:** Ensure dark/light mode works correctly
4. **Responsive testing:** Check mobile, tablet, desktop views
5. **Build testing:** Ensure no CSS compilation errors

## Rollback Plan
If issues are discovered post-deployment:
1. Git revert the consolidation commit
2. Restore both CSS files from version control
3. Restore original imports in config/components

## Future Considerations
- Establish clear documentation on where to add new styles
- Consider CSS linting rules to maintain organization
- May explore CSS modules in future if component count grows significantly
