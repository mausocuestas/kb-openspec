# Implementation Tasks

## 1. Enable Pagefind Search Integration
- [x] 1.1 Add `@astrojs/pagefind` dependency to project
- [x] 1.2 Configure Pagefind plugin in `astro.config.mjs` with proper settings
- [x] 1.3 Test search functionality in development mode

## 2. Fix SearchBar Component Styling
- [x] 2.1 Replace inline style properties with CSS variable references in `SearchBar.tsx`
- [x] 2.2 Add proper background color using `var(--sl-color-bg)` or `var(--sl-color-bg-nav)`
- [x] 2.3 Add proper text color using `var(--sl-color-text)`
- [x] 2.4 Add proper border color using `var(--sl-color-hairline)`
- [x] 2.5 Ensure hover and focus states use theme variables

## 3. Fix Document Heading Colors
- [x] 3.1 Inspect heading color rules in `app.css` to identify incorrect color inheritance
- [x] 3.2 Add explicit color rules for headings using `var(--sl-color-text)` or appropriate heading color variable
- [x] 3.3 Test in both light and dark themes
- [x] 3.4 Verify all heading levels (h1-h6) are visible

## 4. Fix Sidebar Category Colors
- [x] 4.1 Identify sidebar category label selectors in CSS
- [x] 4.2 Add proper color rules for category labels using theme variables
- [x] 4.3 Ensure contrast meets WCAG AA standards in both themes
- [x] 4.4 Test visibility with multiple categories

## 5. Fix Theme Selector Dropdown Colors
- [x] 5.1 Locate theme selector CSS selectors (starlight-theme-select or similar)
- [x] 5.2 Add CSS rules for dropdown menu background using theme variables
- [x] 5.3 Add CSS rules for option text colors using theme variables
- [x] 5.4 Style hover state for theme options with proper contrast
- [x] 5.5 Ensure selected theme indicator is visible in both themes
- [x] 5.6 Test all three options (Light, Dark, Auto) are readable in both themes

## 6. Testing and Validation
- [x] 6.1 Test search bar appearance in light theme on homepage
- [x] 6.2 Test search bar appearance in dark theme on homepage
- [x] 6.3 Test search results modal in both themes
- [x] 6.4 Verify all headings visible in document pages (both themes)
- [x] 6.5 Verify sidebar categories visible (both themes)
- [x] 6.6 Test theme selector dropdown options readable (both themes)
- [x] 6.7 Test theme switching functionality works correctly
- [x] 6.8 Test search functionality returns correct results
- [x] 6.9 Validate no console errors or warnings
- [x] 6.10 Run accessibility audit to confirm WCAG AA compliance

## 7. Additional Fixes (Post-Implementation)
- [x] 7.1 Fix keyboard shortcut (Ctrl K) styling with proper contrast
- [x] 7.2 Fix Starlight header search button background in document pages
- [x] 7.3 Update Ctrl K badge to match search button styling

## Notes
- **Pagefind in Development**: Pagefind requires a production build to generate the search index. In development mode, search functionality will show "search only available in production builds" until a build is run. This is a known limitation of Pagefind with SSR/hybrid modes.
- **Workaround**: Run `pnpm build` first to generate the Pagefind index, then run `pnpm preview` to test search functionality locally.
- **Production**: Search will work correctly in production after deployment as the build process generates the search index.
