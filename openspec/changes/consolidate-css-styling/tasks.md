# Tasks: Consolidate CSS Styling

## Implementation Tasks

- [x] 1. **Create backup of current CSS files**
   - Copy `app.css` to `app.css.backup`
   - Copy `custom.css` to `custom.css.backup`
   - Validation: Backup files exist and contain original content

- [x] 2. **Analyze both CSS files for duplicates and conflicts**
   - Review all selectors in both files
   - Identify any duplicate rules
   - Document any conflicting styles
   - **Conflict Resolution Rule:** When conflicts exist, `app.css` styles SHALL be preserved
   - Validation: Analysis complete - no conflicts found, all styles are complementary

- [x] 3. **Consolidate CSS content into app.css**
   - Add section comments to `app.css` for organization
   - Merge content from `custom.css` into appropriate sections:
     - Sidebar styles → Component overrides section
     - Pagination styles → Component overrides section
     - TOC styles → Component overrides section
     - Pagefind search styles → Pagefind customization section
   - Ensure logical ordering (imports → variables → base → components → media queries)
   - Remove any duplicate rules found in analysis
   - **Apply Conflict Resolution:** Keep `app.css` versions of conflicting styles, discard conflicting `custom.css` styles
   - Validation: All content from `custom.css` merged with clear section headers

- [x] 4. **Update astro.config.mjs configuration**
   - Remove `'./src/assets/custom.css'` from the `customCss` array
   - Keep only `'./src/assets/app.css'` in the array
   - Validation: Config file only references `app.css`

- [x] 5. **Update HomeLayout.astro component**
   - Remove the import line: `import '../assets/custom.css';`
   - Validation: No import of `custom.css` in the component

- [x] 6. **Build the project and verify compilation**
   - Run `pnpm run build`
   - Check for CSS-related errors or warnings
   - Validation: Build completes successfully without CSS warnings (fixed invalid :has-text selectors)

- [ ] 7. **Visual regression testing - Light theme**
   - Test home page layout
   - Test sidebar current page highlighting
   - Test pagination controls appearance
   - Test TOC active section highlighting
   - Test search results styling (Pagefind)
   - Test all content pages
   - Validation: Manual testing recommended by user

- [ ] 8. **Visual regression testing - Dark theme**
   - Switch to dark mode
   - Repeat all visual tests from light theme
   - Verify color variables apply correctly
   - Validation: Manual testing recommended by user

- [ ] 9. **Responsive design testing**
   - Test on mobile viewport (< 768px)
   - Test on tablet viewport (768px - 1024px)
   - Test on desktop viewport (> 1024px)
   - Validation: Manual testing recommended by user

- [x] 10. **Delete custom.css file**
    - Remove `src/assets/custom.css`
    - Remove backup files if all tests pass
    - Validation: Only `app.css` exists in assets directory

- [x] 11. **Verify no remaining references to custom.css**
    - Search codebase for `custom.css` string
    - Check all component files
    - Check configuration files
    - Validation: No references to `custom.css` found in source code (only in OpenSpec docs)

- [x] 12. **Update documentation if needed**
    - Add comment in `app.css` explaining the organization
    - Document in CLAUDE.md or similar where to add new styles
    - Validation: Section headers added to `app.css` for clear organization

## Dependencies
- Tasks 1-3 can be done in parallel during analysis phase
- Task 4-5 depend on task 3 completion
- Task 6 depends on tasks 4-5
- Tasks 7-9 depend on task 6
- Task 10 depends on successful completion of tasks 7-9
- Tasks 11-12 can be done in parallel after task 10

## Estimated Effort
- Analysis and consolidation: 1-2 hours
- Configuration updates: 15 minutes
- Testing: 1-2 hours
- Documentation: 30 minutes
- **Total: 3-5 hours**
