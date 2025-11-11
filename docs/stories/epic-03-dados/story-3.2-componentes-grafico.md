# Story 3.2 (Nova): Adição de Componentes de Gráfico do Shadcn Studio Pro

**Epic:** Épico 3 - Integração e Visualização de Dados
**Priority:** High
**Estimated Effort:** 6 horas
**Dependencies:** Story 1.2 (shadcn setup)

## User Story

Como um **profissional de saúde**, eu quero **visualizar dados epidemiológicos em gráficos interativos** para que **possa tomar decisões informadas baseadas em dados**.

## Acceptance Criteria

- [ ] Shadcn Studio Pro Charts instalado
- [ ] Componentes de gráfico instalados (Bar, Line, Area, Pie)
- [ ] Skeleton component instalado para loading states
- [ ] Componentes wrapper criados (GraficoDeBarra, GraficoLinha, etc.)
- [ ] Gráficos de exemplo com dados mockados funcionais
- [ ] Estilos alinhados à identidade visual
- [ ] Responsividade implementada
- [ ] Acessibilidade validada (aria-labels, legendas, contraste)

## Technical Tasks

- [ ] **3.2.1: Instalar e Configurar Shadcn Studio Pro Charts:**
  - Seguir a [documentação oficial do shadcn CLI](https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli) para instalar no projeto Astro.
  - Instalar componentes de gráfico: Bar Chart, Line Chart, Area Chart, Pie Chart.
  - Instalar `Skeleton` do shadcn para loading states.

- [ ] **3.2.2: Criar Componentes Gráfico Wrapper:**
  - Criar componentes Astro (e.g., `GraficoDeBarra.astro`, `GraficoLinha.astro`) que encapsulem os charts do Shadcn Studio Pro.
  - Cada wrapper deve usar `Card` como container.
  - Incluir título do gráfico, descrição opcional e os dados.
  - Implementar `Skeleton` como placeholder durante carregamento (se aplicável).

- [ ] **3.2.3: Adicionar Gráficos de Exemplo com Dados Estáticos:**
  - Inserir os componentes wrapper em uma página de teste (`/test-charts`) com dados mockados.
  - Testar diferentes tipos de gráficos (barra, linha, pizza).
  - Validar renderização e interatividade (tooltips, hover).

- [ ] **3.2.4: Estilizar Gráficos:**
  - Ajustar os estilos dos gráficos para alinhá-los à identidade visual do projeto usando o design system do shadcn.
  - Aplicar paleta de cores consistente (usar variáveis CSS do design system).
  - Adicionar responsividade (adaptar altura/largura para mobile).

- [ ] **3.2.5 (UX): Garantir Acessibilidade dos Gráficos:**
  - Adicionar `aria-labels` com descrições textuais dos dados para leitores de tela.
  - Incluir legendas descritivas abaixo de cada gráfico.
  - Verificar se as cores utilizadas nos gráficos possuem contraste suficiente (WCAG AA).
  - Testar navegação por teclado nos elementos interativos do gráfico.

## Notes

- Shadcn Studio Pro Charts é a biblioteca oficial para gráficos
- Gráficos devem ser interativos mas performáticos
- Acessibilidade é crítica (NFR7 - WCAG 2.1 AA)
- Dados mockados serão substituídos por dados reais em Story 3.3
- Página de teste `/test-charts` pode ser removida após validação

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 3.2](../PR.md#história-32-nova-adição-de-componentes-de-gráfico-do-shadcn-studio-pro)
- Architecture: [Tech Stack - Shadcn Studio Pro Charts](../Arquitetura.md#3-tech-stack-versão-20---revisada)
- Architecture: [Component Strategy - Charts](../Arquitetura.md#35-estratégia-de-componentização-com-shadcn-studio-pro)
- FR6 (Charts): Incorporar gráficos do Shadcn Studio Pro com dados buscados de fonte externa
- NFR7 (Componentização): WCAG 2.1 AA compliance
