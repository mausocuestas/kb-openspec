# CSS Architecture

## ADDED Requirements

### Requirement: Single CSS file architecture
The project SHALL maintain all styling in a single consolidated CSS file.

#### Scenario: Developer adds new styles
**Given** a developer needs to add new component styles
**When** they look for where to add CSS
**Then** they find only one CSS file (`app.css`) in the assets directory
**And** the file has clear section comments indicating where different types of styles belong

#### Scenario: Build process imports CSS
**Given** the Astro build configuration
**When** the build process runs
**Then** only `app.css` is imported in the Starlight customCss array
**And** no reference to `custom.css` exists in the configuration

#### Scenario: Component imports styles
**Given** a component that needs custom styling
**When** examining the component's imports
**Then** it only imports `app.css` (if importing CSS directly)
**And** no import of `custom.css` exists

### Requirement: Organized CSS structure with clear sections
The consolidated CSS file SHALL have a logical, well-documented structure.

#### Scenario: Developer navigates CSS file
**Given** a developer opens `app.css`
**When** they scan the file
**Then** they see clear section comments dividing:
- External imports (fonts, Tailwind)
- Theme variables (light and dark modes)
- Tailwind theme configuration
- Base element styles
- Utility classes
- Component overrides
- Feature-specific customizations (search, pagination)
- Media queries

#### Scenario: Adding sidebar styles
**Given** a developer needs to modify sidebar styling
**When** they search for "sidebar" or look at section comments
**Then** they find all sidebar-related styles in the "Component overrides" section
**And** the styles are grouped together logically

### Requirement: All visual functionality preserved
All existing visual styles and functionality from both CSS files SHALL be maintained. In case of conflicting styles between the original `app.css` and `custom.css`, the `app.css` styles SHALL prevail as the authoritative source.

#### Scenario: Sidebar selection highlighting
**Given** a user navigates to a page
**When** viewing the sidebar
**Then** the current page link has visible highlighting
**And** text contrast meets accessibility standards
**And** the styling matches the pre-consolidation appearance

#### Scenario: Pagefind search styling
**Given** a user uses the search functionality
**When** viewing search results
**Then** results are styled with proper cards, borders, and hover effects
**And** search term highlighting works in both light and dark themes
**And** the appearance matches the pre-consolidation design

#### Scenario: Dark mode theme
**Given** a user switches to dark mode
**When** viewing any page
**Then** all color variables apply correctly
**And** all component overrides respect dark theme colors
**And** there are no visual regressions compared to pre-consolidation

#### Scenario: Pagination controls
**Given** a user views a content page with pagination
**When** looking at previous/next navigation
**Then** the compact pagination styling applies
**And** document titles display at 16px semibold
**And** arrow icons are hidden
**And** the appearance matches pre-consolidation design

#### Scenario: Table of contents highlighting
**Given** a user scrolls through a long document
**When** the active section changes
**Then** the TOC highlights the current section with bold text and accent color
**And** transitions are smooth
**And** the behavior matches pre-consolidation functionality

## REMOVED Requirements

### Requirement: Multiple CSS files for separation of concerns
**Removed because:** Maintaining two CSS files created unnecessary complexity and maintenance overhead. A single well-organized file with clear sections provides better maintainability.

#### Scenario: Developer chooses between CSS files (REMOVED)
**Given** a developer needs to add styles
**When** deciding where to place them
**Then** ~~they choose between `app.css` and `custom.css`~~
**Now:** They add to the appropriate section in the single `app.css` file

### Requirement: Custom.css for UI overrides
**Removed because:** UI overrides can be logically organized within sections of the main CSS file without needing a separate file.

#### Scenario: Adding component overrides (REMOVED)
**Given** a developer needs to override Starlight default styles
**When** they write the override CSS
**Then** ~~they add it to `custom.css`~~
**Now:** They add it to the "Component overrides" section of `app.css`
