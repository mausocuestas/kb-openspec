# Consolidate CSS Styling

## Overview
Currently the project has two CSS files (`app.css` and `custom.css`) that create maintenance overhead and potential conflicts. This change consolidates all styling into a single `app.css` file, improving maintainability and reducing complexity.

## Motivation
- Eliminates duplication and potential style conflicts between two CSS files
- Simplifies the build configuration (fewer CSS imports)
- Reduces maintenance burden by having a single source of truth for styles
- Improves developer experience with clearer style organization

## Scope
This change affects:
- CSS architecture and organization
- Build configuration (Astro config)
- Component imports (HomeLayout.astro)
- Visual consistency and styling rules

## Dependencies
None - this is a standalone refactoring change.

## Related Changes
None currently, but future styling changes will benefit from this consolidation.

## Risks and Considerations
- Risk: Potential for missing styles during migration
  - Mitigation: Careful review and testing of all pages/components
- Risk: Temporary visual inconsistencies during transition
  - Mitigation: Complete consolidation in a single change, verify before deployment
- Risk: Style conflicts between `app.css` and `custom.css`
  - Mitigation: In case of conflicting styles, `app.css` styles SHALL prevail as the authoritative source

## Success Criteria
- Only one CSS file (`app.css`) exists in the project
- All visual styles from `custom.css` are preserved in `app.css`
- No visual regressions on any page
- Build configuration updated to reference only `app.css`
- All component imports updated accordingly
