# Epic Technical Specification: Fundação da Plataforma e Renderização de Conteúdo

Date: 2025-11-06
Author: mauso
Epic ID: 01
Status: Draft

---

## Overview

Epic 1 establishes the foundational infrastructure for the Public Health Knowledge Base platform. This epic implements the core Astro Starlight-based architecture that will serve as the technical foundation for all subsequent features. The primary deliverables include project initialization, visual identity customization using shadcn studio pro components, content navigation structure, document metadata governance display, and fundamental search capabilities powered by Pagefind.

This epic directly addresses the PRD goals of centralizing knowledge (FR1, FR2) and optimizing access (FR3), while laying the groundwork for the reliability governance system (FR7) introduced in Epic 2. The implementation follows the Jamstack architecture pattern defined in the Architecture document, with static site generation via Astro, Git-based content management, and build-time optimization for maximum performance (NFR1).

## Objectives and Scope

**In Scope:**
- Complete Astro Starlight project initialization with TypeScript and pnpm (Story 1.1)
- Visual identity customization including color palette, typography, and shadcn studio pro component library integration (Story 1.2)
- Category-based navigation structure with sidebar configuration (Story 1.3)
- Document metadata schema (version, status, author, lastUpdated) and display components using shadcn Cards, Badges, and Alerts (Story 1.4)
- Status-based visual alerts for "Revogado" documents (FR7 - Story 1.4)
- Pagefind-based search indexing for content and frontmatter metadata (FR3 - Story 1.5)
- Custom homepage with central search bar using shadcn Input and quick access cards (Story 1.6)
- Customized search results page with term highlighting and snippet improvements (Story 1.7)

**Out of Scope (Deferred to Later Epics):**
- User feedback functionality (Epic 2)
- Dynamic data visualization and database integration (Epic 3)
- TinaCMS integration and CI/CD pipeline (Epic 4)
- Google OAuth authentication and access control (Epic 5)
- Download functionality for forms and flowcharts (FR8 - will be added in a future iteration)

**Success Criteria:**
- Fully functional static site with professional branding aligned to Secretaria de Saúde identity
- Intuitive category-based navigation validated through card sorting exercises with key users (Story 1.3.2)
- Search returning relevant results for both content and metadata queries
- All document metadata visible and status alerts functioning correctly
- WCAG 2.1 AA accessibility compliance for all UI components (NFR7)

## System Architecture Alignment

This epic implements the frontend presentation layer of the Jamstack architecture specified in the Architecture document:

**Framework Stack:**
- Astro ^5.x as the primary SSG framework
- Astro Starlight (latest) for documentation-focused UI patterns
- TypeScript ^5.x for type safety
- Tailwind CSS ^4.x for styling via shadcn design system

**Component Library Strategy (NFR7):**
- All custom UI components built on shadcn-astro (latest) foundation
- lucide-react for icon system
- Components used in Epic 1: Button, Card, Badge, Alert, Input, Separator, Skeleton
- Design tokens (colors, spacing, typography) harmonized between shadcn and Starlight via `src/assets/custom.css`

**Content Management:**
- Git-based content storage in `src/content/docs/` (NFR4)
- MDX rendering for rich document format (FR1)
- Frontmatter schema validation via `src/content/config.ts`

**Search Infrastructure:**
- Pagefind integration (built-in with Starlight) for build-time indexing
- Client-side search with no backend dependencies
- Indexed fields: document content, title, frontmatter metadata (version, status, author)

**Deployment Preparation:**
- Static build output to `dist/` folder
- Build command: `pnpm build`
- Preview command: `pnpm preview`
- Dev server: `pnpm dev`
- Vercel deployment configuration (Epic 4 will implement CI/CD)

## Detailed Design

### Services and Modules

This epic focuses on frontend presentation components with no backend services. All modules are Astro components or configuration files:

| Module/Component | Responsibility | Inputs | Outputs | Owner/Location |
|:-----------------|:---------------|:-------|:--------|:---------------|
| `astro.config.mjs` | Main configuration file for Astro and Starlight | User-defined settings (title, logo, sidebar, theme) | Build-time configuration object | Root directory |
| `src/content/config.ts` | Content collection schema validation | Zod schema definitions | Type-safe content queries | `src/content/` |
| `src/assets/custom.css` | Global styles and design tokens | CSS variables for colors, fonts, spacing | Applied styles across all pages | `src/assets/` |
| `DocumentMetadata.astro` | Display document governance metadata | Frontmatter data (version, status, author, lastUpdated) | Rendered metadata card with badges | `src/components/` |
| `StatusBadge.astro` | Visual status indicator | Status enum value | Colored badge with icon | `src/components/` |
| `SearchBar.astro` | Homepage central search component | User search query | Redirect to search results | `src/components/` |
| `QuickAccessCard.astro` | Homepage quick access cards | Title, description, icon, link | Clickable card component | `src/components/` |
| Starlight PageSidebar (ejected) | Sidebar navigation with categories | Sidebar config from astro.config.mjs | Rendered navigation tree | `src/components/` (customized) |
| Pagefind Integration | Build-time search indexing | All .html files in dist/ | Search index files | Built-in with Starlight |

**Component Hierarchy:**
```
Pages (Astro/MDX)
├── Custom Layout (Homepage)
│   ├── SearchBar.astro (shadcn Input)
│   └── QuickAccessCard.astro (shadcn Card)
├── Standard Layout (Docs Pages)
│   ├── PageSidebar (customized)
│   ├── DocumentMetadata.astro
│   │   ├── Card (shadcn)
│   │   ├── StatusBadge.astro (shadcn Badge)
│   │   ├── Alert (shadcn - for Revogado status)
│   │   └── Separator (shadcn)
│   └── MarkdownContent
└── Search Results Page (Pagefind UI)
```

### Data Models and Contracts

**Content Collection Schema** (`src/content/config.ts`):

```typescript
import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Governance Metadata (Epic 1 - Story 1.4)
        version: z.string().describe('Document version (e.g., "1.0", "2.3")'),
        status: z.enum(['Rascunho', 'Publicado', 'Revisão', 'Revogado'])
          .describe('Document status for governance tracking'),
        author: z.string().describe('Document author name'),
        lastUpdated: z.date().describe('Last modification date'),

        // Future: Visibility control (Epic 5 - deferred)
        // visibilidade: z.enum(['Pública', 'Interna', 'Restrita']).optional(),
      }),
    }),
  }),
};
```

**StatusBadge Props Interface**:

```typescript
interface StatusBadgeProps {
  status: 'Rascunho' | 'Publicado' | 'Revisão' | 'Revogado';
}

// Visual mapping
const statusConfig = {
  'Rascunho': { variant: 'secondary', color: 'gray', icon: 'FileEdit' },
  'Publicado': { variant: 'default', color: 'green', icon: 'Check' },
  'Revisão': { variant: 'outline', color: 'yellow', icon: 'AlertCircle' },
  'Revogado': { variant: 'destructive', color: 'red', icon: 'XCircle' },
};
```

**Document Frontmatter Example**:

```yaml
---
title: "Protocolo de Atendimento COVID-19"
description: "Diretrizes para atendimento de casos suspeitos"
version: "2.1"
status: "Publicado"
author: "Dr. João Silva"
lastUpdated: 2025-11-01
---
```

### APIs and Interfaces

Epic 1 is fully static with no backend APIs. All interactions are client-side or build-time:

**Build-Time Operations:**
- **Pagefind Indexing**: Automatically runs during `astro build` to generate search index
  - Input: All HTML files in `dist/`
  - Output: `dist/pagefind/` directory with index files
  - Configuration: Default Pagefind settings (can be customized via `data-pagefind-*` attributes)

**Client-Side Interactions:**
- **Search Query Handling**:
  - User enters query in SearchBar component
  - JavaScript redirects to `/search?q={query}` or triggers Pagefind UI
  - Pagefind UI fetches results from pre-built index

- **Navigation Events**:
  - Sidebar click events handled by Starlight's built-in router
  - Quick access card clicks navigate via standard `<a>` tags

**No External API Calls**: Epic 1 requires no network requests at runtime (fully static/offline-capable after initial page load).

### Workflows and Sequencing

**User Journey 1: Discovering Content via Homepage**

```
1. User lands on homepage (/)
2. System displays:
   - Central SearchBar component (shadcn Input)
   - 3-4 QuickAccessCard components (shadcn Card) for key categories
3. User clicks a QuickAccessCard
4. System navigates to category index page
5. User browses documents via sidebar navigation
```

**User Journey 2: Searching for Documents**

```
1. User enters search term in SearchBar
2. Client-side JS submits query to Pagefind
3. Pagefind searches pre-built index for matches in:
   - Document content
   - Document titles
   - Frontmatter metadata (status, author, version)
4. Search results page displays:
   - Document title (highlighted matches)
   - Content snippet with matched terms
   - Document category/path
5. User clicks result → navigates to document page
```

**User Journey 3: Viewing Document with Governance Metadata**

```
1. User navigates to document page
2. System renders page with:
   - Standard Starlight header/sidebar
   - DocumentMetadata component (Card) displaying:
     - Version badge
     - StatusBadge component (colored by status)
     - Author name
     - Last updated date
3. IF status === 'Revogado':
   - System displays Alert component (shadcn, destructive variant)
   - Alert contains: warning icon, revocation message, link to replacement doc (if available)
4. User reads document content (rendered MDX)
```

**Build Process Sequence**:

```
Developer runs: pnpm build
  ↓
1. Astro reads astro.config.mjs
2. Astro processes src/content/docs/ (validates against schema)
3. Astro renders all .astro/.mdx files to HTML
4. Tailwind CSS purges unused styles
5. Pagefind indexes all HTML files
6. Build outputs to dist/
  ↓
Developer runs: pnpm preview (or deploys to Vercel)
```

## Non-Functional Requirements

### Performance

**Target Metrics (NFR1 - Build-time optimization):**
- **Initial Page Load**: < 2 seconds on 3G connection
- **Time to Interactive (TTI)**: < 3 seconds
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Build Time**: < 5 minutes for complete site generation (will scale with content volume)
- **Search Query Response**: < 200ms for Pagefind index queries

**Implementation Strategy:**
- Astro's static site generation eliminates server-side rendering latency
- Tailwind CSS purges unused styles during build (tree-shaking)
- Pagefind index is pre-built, avoiding runtime search API calls
- Images should use Astro's Image component with lazy loading (to be implemented in Story 1.6)
- All shadcn components are tree-shakeable, importing only what's used

**Measurement:**
- Use Lighthouse CI in Epic 4 (CI/CD pipeline) to track performance metrics
- Target Lighthouse scores: Performance > 90, Accessibility > 95

### Security

**Epic 1 Security Posture:**

Epic 1 implements a fully static site with no authentication or backend, resulting in minimal attack surface:

- **No Runtime Server**: Static HTML/CSS/JS served directly from CDN (Vercel)
- **No Database Connections**: All content is file-based in Git repository
- **No User Input Processing**: Search handled client-side via Pagefind (read-only index)
- **No Authentication**: All content is publicly accessible (visibility control deferred to Epic 5)

**Content Security:**
- Content stored in Git repository (NFR4) with commit history for auditability
- Repository access controlled via GitHub permissions
- Vercel deployment credentials stored as GitHub Secrets (Epic 4)

**Client-Side Security:**
- Standard web security headers will be configured in Epic 4 (Vercel deployment)
- No inline scripts in Epic 1 (all JS bundled by Astro)
- shadcn components follow secure coding practices (XSS-safe by default)

**Future Considerations (Epic 5):**
- Google OAuth 2.0 authentication (NFR6)
- JWT session tokens with httpOnly cookies
- Domain validation for @dominio-saude.gov.br emails

### Reliability/Availability

**Target Availability:**
- **Uptime SLA**: 99.9% (Vercel platform SLA)
- **Zero Runtime Dependencies**: Static site continues to function even if external services fail
- **Graceful Degradation**: If JavaScript fails to load, content remains readable (progressive enhancement)

**Failure Modes & Mitigation:**

| Failure Scenario | Impact | Mitigation |
|:-----------------|:-------|:-----------|
| Vercel platform outage | Site unavailable | Vercel's multi-region CDN provides automatic failover; consider multi-provider strategy in future |
| Build process failure | Deployment blocked, existing site remains live | Epic 4 will implement CI/CD with rollback capability |
| Pagefind index corruption | Search functionality broken, navigation still works | Build validation checks will catch index generation errors |
| CSS/JS bundle failure | Styling broken, content still accessible | Astro build process includes integrity checks |

**Disaster Recovery:**
- **RTO (Recovery Time Objective)**: < 15 minutes (redeploy from Git)
- **RPO (Recovery Point Objective)**: 0 (all content in Git, no data loss)
- **Backup Strategy**: Git history serves as complete backup; GitHub provides redundant storage

**Epic 1 Resilience Features:**
- Static HTML fallback for all content pages
- Offline-capable after initial load (service worker can be added in future iteration)
- No single point of failure (CDN-distributed static assets)

### Observability

**Logging Strategy:**

Epic 1 has minimal observability needs due to static nature:

- **Build Logs**: Astro build process logs stored in CI/CD pipeline (Epic 4)
  - Log level: INFO for successful builds, ERROR for failures
  - Retention: 30 days in GitHub Actions logs
- **Client-Side Errors**: Browser console errors (no centralized logging in Epic 1)
  - Future enhancement: Add Sentry or similar for production error tracking

**Metrics to Track (Post-Deployment):**

- **User Analytics** (via Vercel Analytics or Google Analytics - optional):
  - Page views per document
  - Search query volume
  - Most visited categories
  - User navigation paths
- **Performance Metrics** (Vercel automatically tracks):
  - Real User Monitoring (RUM) data
  - Core Web Vitals (FCP, LCP, CLS, TTI)
  - Geographic distribution of users

**Monitoring Gaps in Epic 1:**
- No application performance monitoring (APM) - not needed for static site
- No uptime monitoring dashboard - will rely on Vercel status page
- No custom alerting - Epic 4 will add build failure notifications

**Tracing:**
- Not applicable for Epic 1 (no distributed systems or backend services)
- Future: If API calls are added in Epic 3, implement OpenTelemetry tracing

## Dependencies and Integrations

**NPM Dependencies (package.json):**

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/starlight": "latest",
    "@astrojs/mdx": "^4.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0",
    "shadcn-astro": "latest",
    "lucide-react": "latest",
    "@astrojs/react": "^3.6.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.14.0"
  }
}
```

**Dependency Analysis:**

| Dependency | Version | Purpose | Risk Level | Mitigation |
|:-----------|:--------|:--------|:-----------|:-----------|
| Astro | ^5.x | Core SSG framework | Low | Stable v5 release, large community support |
| Starlight | latest | Documentation template | Low | Official Astro integration, well-maintained |
| TypeScript | ^5.x | Type safety | Low | Industry standard, stable releases |
| Tailwind CSS | ^4.x | Utility-first CSS | Low | Mature ecosystem, backward compatible |
| shadcn-astro | latest | UI component library | Medium | Community-maintained; pin specific version after testing |
| lucide-react | latest | Icon system | Low | Stable, lightweight, MIT licensed |
| React | ^18.3.0 | Required for shadcn components | Low | Partial hydration via Astro islands pattern |
| Zod | ^3.x | Schema validation | Low | Widely used, stable API |

**External Service Integrations:**

Epic 1 has **zero external service dependencies** at runtime:
- No database connections
- No API calls to third-party services
- No authentication providers
- No CDN dependencies beyond Vercel's built-in CDN

**Build-Time Dependencies:**

| Tool | Purpose | When Executed |
|:-----|:--------|:--------------|
| pnpm | Package manager | Local dev and CI/CD |
| Node.js (LTS) | Runtime environment | Local dev and CI/CD |
| Pagefind | Search index generation | During `astro build` |
| Tailwind JIT compiler | CSS generation | During `astro build` |

**Integration Points for Future Epics:**

- **Epic 2**: Will add Resend API for email notifications (feedback flow)
- **Epic 3**: Will integrate Neon PostgreSQL for chart data
- **Epic 4**: Will integrate TinaCMS for content editing
- **Epic 5**: Will integrate Google OAuth 2.0 for authentication

**Version Pinning Strategy:**

- **Major versions**: Pin to avoid breaking changes (e.g., `astro: "^5.0.0"`)
- **shadcn-astro**: Pin to specific version after initial testing to avoid unexpected UI changes
- **React**: Pin to ^18.3.0 (required for shadcn compatibility)
- **Development dependencies**: Allow minor/patch updates (`^` semver)

## Acceptance Criteria (Authoritative)

**AC1: Project Initialization (Story 1.1)**
- Node.js LTS and pnpm are installed and verified
- Astro Starlight project is created using `pnpm create astro@latest` with TypeScript
- Development server starts successfully with `pnpm dev`
- Git repository is initialized with initial commit
- Default Starlight content is removed and site title is updated

**AC2: Visual Identity Customization (Story 1.2)**
- shadcn-astro CLI is installed and configured for Astro + Tailwind integration
- Base shadcn components (Button, Card, Badge, Alert, Input, Separator) are installed
- Custom CSS file (`src/assets/custom.css`) overrides Starlight color variables with Secretaria de Saúde branding
- Custom fonts (if required) are imported and applied via CSS variables
- Official logo (SVG format) replaces default Starlight logo
- Test page (`/test-components`) renders all installed shadcn components correctly
- Visual consistency is validated across homepage and document pages

**AC3: Navigation Structure (Story 1.3)**
- Information architecture is defined with key categories (e.g., Protocolos, Formulários, Manuais)
- Card sorting exercise with 3-5 key users validates category structure (UX task)
- Sidebar configuration in `astro.config.mjs` creates category-based navigation groups
- Folder structure in `src/content/docs/` mirrors navigation hierarchy
- Each category has an `index.md` file and 1-2 example documents
- Sidebar navigation renders correctly and links navigate to appropriate pages

**AC4: Document Metadata Schema (Story 1.4)**
- Content schema in `src/content/config.ts` extends Starlight schema with: version (string), status (enum), author (string), lastUpdated (date)
- Example documents include all required metadata fields in frontmatter
- `DocumentMetadata.astro` component renders metadata using shadcn Card, Badge, and Separator
- `StatusBadge.astro` displays color-coded badges with icons for each status type
- Alert component (shadcn, destructive variant) displays for documents with status="Revogado"
- Revoked document alert includes warning icon, clear message, and optional link to replacement
- All metadata displays correctly below document title on document pages

**AC5: Search Functionality (Story 1.5)**
- Production build (`pnpm build`) generates Pagefind index without errors
- Search queries return results matching document content
- Search queries return results matching frontmatter metadata (author, status, version)
- Search results page displays document title, content snippet, and category
- Search result snippets highlight matched terms
- Search response time is < 200ms for typical queries

**AC6: Custom Homepage (Story 1.6)**
- Homepage uses custom layout (no sidebar, distinct from docs pages)
- Central SearchBar component (shadcn Input) is prominently displayed
- SearchBar includes search icon (lucide-react) and focus animation
- 3-4 QuickAccessCard components (shadcn Card) display key categories
- QuickAccessCards include: title, description, icon, and clickable link
- QuickAccessCards have hover effects (elevation, transition)
- Layout is responsive (3-column grid on desktop, 1-2 columns on mobile)

**AC7: Search Results Page (Story 1.7)**
- Custom Pagefind UI integrates with site's visual identity
- Matched search terms are highlighted in titles and snippets
- Each result displays: document title, content snippet, category/path
- Results page is accessible and follows WCAG 2.1 AA standards

**AC8: Accessibility Compliance (NFR7)**
- All shadcn components pass WCAG 2.1 AA color contrast requirements
- Keyboard navigation works for all interactive elements
- Screen readers can navigate site structure and read content
- Focus indicators are visible on all interactive elements
- ARIA labels are present where needed

**AC9: Performance Targets (NFR1)**
- Lighthouse Performance score > 90
- Lighthouse Accessibility score > 95
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Build completes in < 5 minutes

## Traceability Mapping

| AC # | Requirement (PRD) | Tech Spec Section | Component(s) | Test Approach |
|:-----|:------------------|:------------------|:-------------|:--------------|
| AC1 | NFR4 (Git-based content) | Services & Modules | astro.config.mjs, package.json | Manual verification: repo exists, `pnpm dev` runs |
| AC2 | NFR3 (Design customization), NFR7 (shadcn components) | Services & Modules, Dependencies | custom.css, shadcn components, logo file | Visual inspection: branding matches, test page renders |
| AC3 | FR2 (Category-based navigation) | Services & Modules, Workflows | astro.config.mjs sidebar, PageSidebar | Manual testing: navigate via sidebar, verify links work |
| AC4 | FR7 (Status alerts), Governance metadata | Data Models, Services & Modules | src/content/config.ts, DocumentMetadata.astro, StatusBadge.astro, Alert (shadcn) | Unit test: schema validation; Visual test: metadata displays correctly |
| AC5 | FR3 (Search by content & metadata) | APIs & Interfaces, Services & Modules | Pagefind integration | Integration test: search queries, verify results accuracy |
| AC6 | UX goal (Optimize access) | Services & Modules, Workflows | SearchBar.astro, QuickAccessCard.astro | Visual test: homepage layout, responsive behavior |
| AC7 | FR3 (Search results UI) | Workflows | Pagefind UI customization | Manual test: run searches, verify highlighting and layout |
| AC8 | NFR7 (WCAG 2.1 AA) | NFR: Performance | All components | Automated: Lighthouse accessibility audit; Manual: screen reader testing |
| AC9 | NFR1 (Build-time performance) | NFR: Performance | Build process | Automated: Lighthouse CI in Epic 4 |

**Requirements Coverage Summary:**
- **FR1** (MDX rendering): ✅ Covered by Astro Starlight default behavior
- **FR2** (Category navigation): ✅ AC3
- **FR3** (Search): ✅ AC5, AC7
- **FR7** (Status alerts): ✅ AC4
- **NFR1** (Performance): ✅ AC9
- **NFR3** (Design customization): ✅ AC2
- **NFR4** (Git-based content): ✅ AC1
- **NFR7** (Componentization, accessibility): ✅ AC2, AC8
- **FR4, FR5, FR6, FR8, FR9, FR10**: ❌ Out of scope for Epic 1 (deferred to Epics 2, 3, 5)

## Risks, Assumptions, Open Questions

**Risks:**

| ID | Risk Description | Severity | Likelihood | Mitigation Strategy |
|:---|:-----------------|:---------|:-----------|:-------------------|
| R1 | shadcn-astro library compatibility issues with Astro 5.x | Medium | Medium | Pin to tested version after initial setup; allocate buffer time in Story 1.2 for troubleshooting |
| R2 | Secretaria de Saúde branding assets (logo, colors, fonts) not readily available | Low | Low | Engage stakeholders early in Story 1.2; use placeholder assets if needed |
| R3 | Card sorting exercise (Story 1.3.2) reveals need for significant IA restructuring | Medium | Medium | Build flexibility into navigation design; allocate time for iteration |
| R4 | Pagefind search performance degrades with large document volume (>1000 docs) | Low | Low | Monitor build times and search performance; consider search optimization techniques if needed |
| R5 | Developer unfamiliarity with Astro/Starlight ecosystem | Medium | Medium | Allocate time for learning curve in Story 1.1; consult official documentation and community resources |
| R6 | Tailwind CSS v4 breaking changes impact shadcn components | Low | Low | Test thoroughly in Story 1.2; consider using Tailwind v3 if compatibility issues arise |

**Assumptions:**

| ID | Assumption | Validation Needed | Impact if Invalid |
|:---|:-----------|:------------------|:------------------|
| A1 | Secretaria de Saúde stakeholders can provide finalized branding assets (logo, color palette, fonts) | Confirm with stakeholders before Story 1.2 | Delays in visual identity implementation |
| A2 | Initial document content volume will be manageable (<500 documents) for Epic 1 | Verify with content team | May need search optimization earlier than planned |
| A3 | 3-5 key users are available for card sorting exercise in Story 1.3 | Schedule participants early | Navigation structure based on best practices only, not user validation |
| A4 | Vercel free tier is sufficient for development/staging environments | Confirm with DevOps/budget | May need alternative hosting for non-prod environments |
| A5 | All team members have access to modern development environment (Node.js LTS compatible) | Verify during Story 1.1 | Setup delays for developers |
| A6 | Content will be authored in Portuguese (Português do Brasil) | Confirm with content team | May need i18n considerations for future |

**Open Questions:**

| ID | Question | Stakeholder | Priority | Decision Needed By |
|:---|:---------|:-----------|:---------|:-------------------|
| Q1 | What are the exact Secretaria de Saúde brand colors (hex codes)? | Design/Marketing team | High | Before Story 1.2 |
| Q2 | Should the homepage include any announcements or news section? | Product Owner | Medium | Before Story 1.6 |
| Q3 | Are there existing document templates/formats that need to be supported? | Content team | Medium | Before Story 1.3 |
| Q4 | Should search support fuzzy matching or only exact matches? | Product Owner, UX | Low | During Story 1.5 |
| Q5 | Do we need multi-language support (English + Portuguese)? | Product Owner | Low | Post-Epic 1 (can be deferred) |
| Q6 | What categories/document types are most critical for initial launch? | Content team, key users | High | Before Story 1.3 |

## Test Strategy Summary

**Testing Approach:**

Epic 1 follows a **manual-first testing strategy** with automated testing introduced incrementally:

**1. Developer Testing (Inline with Development):**
- **Unit Testing**: Not required for Epic 1 (primarily presentation layer with minimal logic)
- **Component Testing**: Visual verification of shadcn components in isolation (test page)
- **Integration Testing**: Manual verification of navigation, search, and metadata display
- **Build Testing**: Verify `pnpm build` completes without errors

**2. Acceptance Testing (Per Story):**
- Each story completion triggers acceptance testing against defined ACs
- Scrum Master or Product Owner validates each story before marking "done"
- UX tasks (Stories 1.3.2, 1.6, 1.7) require stakeholder/user validation

**3. Accessibility Testing (NFR7):**
- **Automated**: Lighthouse accessibility audit (target score >95)
- **Manual**: Keyboard navigation testing across all interactive elements
- **Manual**: Screen reader testing with NVDA or JAWS on sample pages
- **Validation**: Color contrast checker for all text/background combinations

**4. Performance Testing (NFR1):**
- **Automated**: Lighthouse performance audit during local builds (target score >90)
- **Build-time monitoring**: Track `pnpm build` duration (target <5 minutes)
- **Manual**: Test on 3G network simulation to verify load times
- **Deferred**: Continuous performance monitoring via Lighthouse CI in Epic 4

**5. Browser/Device Testing:**
- **Primary browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile testing**: Responsive design verification on iOS Safari and Android Chrome
- **Viewport testing**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

**6. Search Testing (Story 1.5):**
- **Functional**: Verify search returns relevant results for content queries
- **Functional**: Verify search indexes frontmatter metadata (author, status, version)
- **Performance**: Measure search response time (<200ms target)
- **Edge cases**: Empty results, special characters, very long queries

**Test Coverage Goals:**
- **Critical paths**: 100% manual testing (navigation, search, metadata display)
- **Accessibility**: 100% of interactive components
- **Browser compatibility**: 95%+ of user base (Chrome, Firefox, Safari, Edge)
- **Performance**: Meet all NFR1 targets on production-like build

**Test Environment:**
- **Local development**: `pnpm dev` for rapid iteration
- **Production preview**: `pnpm build && pnpm preview` for final validation
- **Staging (Epic 4)**: Vercel preview deployments for stakeholder review

**Defect Management:**
- **Critical defects** (site won't build, navigation broken): Block story completion
- **Major defects** (accessibility issues, performance below target): Must fix before epic completion
- **Minor defects** (visual inconsistencies): Document as technical debt, fix if time permits

**Success Metrics:**
- All 9 Acceptance Criteria (AC1-AC9) validated and passed
- Zero critical/major defects open at epic completion
- Lighthouse scores meet targets (Performance >90, Accessibility >95)
- Stakeholder sign-off on visual identity and navigation structure
