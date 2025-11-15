# Build Configuration

## MODIFIED Requirements

### Requirement: Starlight customCss configuration
The Astro Starlight integration SHALL reference only the consolidated CSS file.

#### Scenario: Starlight loads custom styles (UPDATED)
**Given** the Astro configuration file (`astro.config.mjs`)
**When** the Starlight integration initializes
**Then** the `customCss` array contains only `'./src/assets/app.css'`
**And** no reference to `'./src/assets/custom.css'` exists
**And** all custom styles load correctly

**Previous behavior:** Both `app.css` and `custom.css` were listed in the `customCss` array

### Requirement: CSS import in layouts
Layout components SHALL import only the consolidated CSS file.

#### Scenario: HomeLayout imports styles (UPDATED)
**Given** the HomeLayout component (`src/layouts/HomeLayout.astro`)
**When** the component renders
**Then** it imports `'../assets/app.css'` (if needed via Astro config)
**And** the import of `'../assets/custom.css'` is removed
**And** all styles apply correctly to the home layout

**Previous behavior:** HomeLayout explicitly imported `custom.css`

## REMOVED Requirements

### Requirement: Multiple CSS files in build (REMOVED)
**Removed because:** Consolidation eliminates the need for multiple CSS files in the build process.

#### Scenario: Build processes multiple CSS files (REMOVED)
**Given** the build configuration
**When** compiling CSS assets
**Then** ~~both `app.css` and `custom.css` are processed and combined~~
**Now:** Only `app.css` is processed
