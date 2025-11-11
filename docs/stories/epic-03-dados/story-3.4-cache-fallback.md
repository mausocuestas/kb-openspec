# Story 3.4: Implementação da Estratégia de Cache e Fallback

**Epic:** Épico 3 - Integração e Visualização de Dados
**Priority:** High
**Estimated Effort:** 4 horas
**Dependencies:** Story 3.3

## User Story

Como um **sistema**, eu quero **ter cache e fallback para dados dos gráficos** para que **o build não falhe se o banco de dados estiver temporariamente indisponível**.

## Acceptance Criteria

- [ ] Cache em memória implementado no módulo db.ts
- [ ] Fallback para arquivo `dados-cache.json` implementado
- [ ] Try-catch envolve conexão ao banco
- [ ] Script `pnpm generate-cache` criado
- [ ] Cenário de falha testado - build sucede com dados de fallback
- [ ] Logs informativos quando fallback é usado

## Technical Tasks

- [ ] **3.4.1: Implementar Cache na Busca de Dados:**
  - No módulo `src/lib/db.ts`, adicionar uma camada de cache em memória para evitar queries repetidas ao banco durante o mesmo build.

- [ ] **3.4.2: Implementar Fallback para Dados Estáticos (NFR2):**
  - No `src/lib/db.ts`, usar um bloco `try...catch` para, em caso de falha na conexão com o BD, ler dados de um arquivo de fallback (e.g., `dados-cache.json`).

- [ ] **3.4.3: Criar Script para Gerar o Arquivo de Fallback:**
  - Criar um script (`pnpm generate-cache`) que busca os dados mais recentes do BD e os salva em `dados-cache.json`.

- [ ] **3.4.4: Testar o Cenário de Falha:**
  - Simular uma falha de conexão com o BD e executar o build para garantir que o site é gerado com os dados de fallback, sem quebrar o processo.

## Notes

- Cache fallback é essencial para resiliência (NFR2)
- Script generate-cache deve rodar periodicamente (cron job futuro)
- Arquivo de fallback deve estar no .gitignore mas ter exemplo committed
- Logs devem indicar claramente quando fallback é usado
- Considerar adicionar timestamp de última atualização do cache

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 3.4](../PR.md#história-34-implementação-da-estratégia-de-cache-e-fallback)
- Architecture: [Data Flow - Cache fallback](../Arquitetura.md#2-arquitetura-de-alto-nível-revisado)
- NFR2 (Reliability): Usar dados de cache para os gráficos se a conexão com o BD falhar durante o build
