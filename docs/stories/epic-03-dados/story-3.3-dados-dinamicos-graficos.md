# Story 3.3 (Nova): Conexão de Dados Dinâmicos aos Componentes de Gráfico

**Epic:** Épico 3 - Integração e Visualização de Dados
**Priority:** High
**Estimated Effort:** 4 horas
**Dependencies:** Story 3.1, Story 3.2

## User Story

Como um **sistema**, eu quero **buscar dados epidemiológicos reais do banco de dados e renderizá-los nos gráficos** para que **os profissionais de saúde vejam informações atualizadas**.

## Acceptance Criteria

- [ ] Componentes wrapper modificados para aceitar dados como props
- [ ] Dados buscados no build-time do banco Neon PostgreSQL
- [ ] Dados dinâmicos passados corretamente aos componentes
- [ ] Gráficos renderizam corretamente com dados reais
- [ ] Build completo validado com dados dinâmicos

## Technical Tasks

- [ ] **3.3.1: Modificar Componentes Gráfico para Aceitar Dados:**
  - Alterar os componentes wrapper (e.g., `GraficoDeBarra.astro`) para que aceitem os dados a serem exibidos como `props`.

- [ ] **3.3.2: Buscar Dados no Build-Time (NFR1):**
  - Em uma página de exemplo, usar o módulo `src/lib/db.ts` para buscar dados reais do banco de dados no topo do arquivo.

- [ ] **3.3.3: Passar Dados Dinâmicos aos Componentes:**
  - Passar os dados buscados do banco de dados como `props` para os componentes de gráfico.

- [ ] **3.3.4: Validar Renderização com Dados Dinâmicos:**
  - Executar o processo de build e verificar se os gráficos são renderizados corretamente com os dados reais.

## Notes

- Build-time rendering é essencial para performance (NFR1)
- Gráficos são estáticos após build (não client-side fetching)
- Dados devem ser transformados no formato esperado pelos charts
- Validar que queries ao BD são eficientes
- Considerar adicionar indicadores de última atualização

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 3.3](../PR.md#história-33-nova-conexão-de-dados-dinâmicos-aos-componentes-de-gráfico)
- Architecture: [Data Flow - Build-time rendering](../Arquitetura.md#2-arquitetura-de-alto-nível-revisado)
- FR6 (Charts): Incorporar gráficos com dados buscados de fonte externa
- NFR1 (Performance): Renderizar gráficos no build-time para performance máxima
