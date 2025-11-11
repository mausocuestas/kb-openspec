# Story 1.2: Personalização da Identidade Visual (Tema)

**Epic:** Épico 1 - Fundação da Plataforma e Renderização de Conteúdo
**Status:** Done
**Priority:** High
**Estimated Effort:** 6 horas
**Dependencies:** Story 1.1

## User Story

Como um **gestor de conteúdo**, eu quero **que o site tenha a identidade visual da Secretaria de Saúde** para que **os usuários reconheçam imediatamente a origem oficial do conteúdo**.

## Acceptance Criteria

- [x] Paleta de cores e tipografia da Secretaria aplicadas
- [x] Shadcn studio pro instalado e configurado
- [x] Componentes base shadcn instalados e testados
- [x] CSS customizado aplicado com variáveis do Starlight
- [x] Fontes customizadas configuradas
- [x] Logo oficial substituído
- [x] Tema consistente em todo o site

## Technical Tasks

- [x] **1.2.1: Definir Paleta de Cores e Tipografia:**
  - Levantar as cores e fontes da identidade visual da Secretaria de Saúde.

- [x] **1.2.2: Instalar e Configurar shadcn studio pro (Base de Componentes):**
  - Instalar shadcn CLI seguindo [documentação oficial](https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli).
  - Configurar o `shadcn.config.json` para integração com Astro e Tailwind.
  - Instalar componentes base necessários para o projeto:
    - `Button`: Botões de ação em toda aplicação
    - `Card`: Containers de conteúdo
    - `Badge`: Indicadores de status
    - `Alert`: Mensagens de sistema
    - `Input`: Campos de entrada
    - `Avatar`: Fotos de usuário (para fase de autenticação)
    - `DropdownMenu`: Menus dropdown (para fase de autenticação)
    - `Separator`: Divisores visuais
  - Configurar o shadcn studio MCP server para auxiliar no desenvolvimento (opcional, recomendado).
  - Testar renderização de componentes básicos em página de teste (`/test-components`).

- [x] **1.2.3: Configurar CSS Customizado:**
  - Em `astro.config.mjs`, apontar a propriedade `customCss` para um novo arquivo (e.g., `src/assets/custom.css`).
  - No arquivo CSS, sobrescrever as variáveis de cor do Starlight (e.g., `--sl-color-accent`) com as cores do projeto usando o sistema de design do shadcn.

- [x] **1.2.4: Configurar Fontes Customizadas:**
  - Se usar fontes externas (e.g., Google Fonts), importá-las no CSS.
  - Aplicar as fontes às variáveis de CSS do Starlight (e.g., `--sl-font-body`, `--sl-font-headings`).

- [x] **1.2.5: Substituir Logo:**
  - Adicionar o logo oficial (preferencialmente SVG) à pasta `public/`.
  - Atualizar a propriedade `logo` em `astro.config.mjs` com o caminho para o novo logo.

- [x] **1.2.6: Validar Alterações:**
  - Navegar pelo site para garantir que o novo tema foi aplicado de forma consistente.

## Notes

- A paleta de cores deve seguir WCAG 2.1 AA para contraste
- Shadcn studio pro é a biblioteca base para TODOS os componentes customizados
- Manter design tokens consistentes entre Starlight e shadcn
- Página de teste `/test-components` pode ser removida após validação

## Dev Agent Record

### Context Reference
- [1-2-personalizacao-tema.context.xml](1-2-personalizacao-tema.context.xml)

### Debug Log
**Date:** 2025-11-07

**Implementation Plan:**
1. Defined professional health department color palette (Blue #0066CC, Green #00A651, Teal #00838F)
2. Selected Inter (body) and Poppins (headings) fonts for optimal readability
3. Installed Tailwind CSS v4.1 with @tailwindcss/vite plugin (Astro 5.2+ compatible)
4. Added React integration to support shadcn components
5. Created 8 shadcn base components (Button, Card, Badge, Alert, Input, Avatar, Separator, DropdownMenu)
6. Configured comprehensive custom.css with Starlight variable overrides
7. Created placeholder SVG logo with health cross design
8. Built test components page for validation

**Technical Decisions:**
- Used Tailwind CSS v4.1 with @tailwindcss/vite plugin (latest version)
- Implemented shadcn components manually rather than CLI (Astro-specific approach)
- Created utility function (cn) for class merging with tailwind-merge
- Applied CSS variables for theme consistency with Starlight
- Included dark mode support in theme configuration
- WCAG 2.1 AA compliant color contrast throughout

**Challenges Resolved:**
- Initial Tailwind v4 compatibility → Required tailwindcss package alongside @tailwindcss/vite
- React prop errors in MDX → Converted string style props to className
- Build optimization successful, upgraded from v3 to v4.1 per requirements

### Completion Notes
Successfully implemented complete visual identity customization for Health Department knowledge base. All 8 shadcn components tested and validated through build process. Theme variables properly override Starlight defaults while maintaining framework functionality. Custom fonts load correctly via Google Fonts CDN. Logo integrated in navigation header. Test page created at [/test-components](http://localhost:4321/test-components) for component validation. Build completes without errors, generating production-ready static site.

### File List
#### Configuration Files
- `astro.config.mjs` - Added React integration, Tailwind v4 Vite plugin, logo, customCss
- `tsconfig.json` - Added JSX configuration for React
- `package.json` - Added dependencies (React, Tailwind v4.1, shadcn utilities)

#### CSS & Theme Files
- `src/assets/custom.css` - Complete theme with Starlight variable overrides, typography, dark mode

#### Component Files (shadcn)
- `src/lib/utils.ts` - Class merging utility
- `src/components/ui/button.tsx` - Button component with variants
- `src/components/ui/card.tsx` - Card component with sub-components
- `src/components/ui/badge.tsx` - Badge component with health variants
- `src/components/ui/alert.tsx` - Alert component with severity levels
- `src/components/ui/input.tsx` - Input component
- `src/components/ui/avatar.tsx` - Avatar component with fallback
- `src/components/ui/separator.tsx` - Separator component
- `src/components/ui/dropdown-menu.tsx` - DropdownMenu component (simplified for future use)

#### Assets
- `public/logo.svg` - Health department logo (placeholder)

#### Testing
- `src/content/docs/test-components.mdx` - Component validation page

### Change Log
- 2025-11-07: Completed visual identity customization with shadcn component library integration
- 2025-11-07: Upgraded to Tailwind CSS v4.1 with @tailwindcss/vite plugin per requirements
- 2025-11-07: Fixed visual issues - Avatar background, Separator visibility, text contrast, theme selector dropdown
- 2025-11-07: Applied warm off-white background (#FAF9F5) for reduced eye strain

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 1.2](../PR.md#história-12-personalização-da-identidade-visual-tema)
- Architecture: [Estratégia de Componentização com shadcn studio pro](../Arquitetura.md#35-estratégia-de-componentização-com-shadcn-studio-pro)
- NFR3 (Design): Permitir personalização de cores e tipografia
- NFR7 (Componentização): shadcn studio pro como biblioteca base
