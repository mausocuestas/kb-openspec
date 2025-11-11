# Story 2.2: Submissão e Registro do Feedback

**Epic:** Épico 2 - Implementação do Sistema de Feedback e Governança
**Priority:** High
**Estimated Effort:** 4 horas
**Dependencies:** Story 2.1

## User Story

Como um **sistema**, eu quero **registrar os feedbacks dos usuários** para que **os gestores possam analisar e agir sobre as sugestões**.

## Acceptance Criteria

- [ ] Endpoint `/api/feedback` criado e funcional
- [ ] Endpoint aceita requisições POST
- [ ] Frontend envia dados corretamente (avaliação, comentário, URL)
- [ ] Dados armazenados em `feedback-data.json`
- [ ] Respostas de sucesso e erro tratadas no frontend
- [ ] Fluxo completo testado end-to-end

## Technical Tasks

- [ ] **2.2.1: Criar Endpoint de API para Feedback:**
  - Criar um novo arquivo de rota em `src/pages/api/feedback.ts`.
  - O endpoint deve aceitar requisições `POST`.

- [ ] **2.2.2: Implementar Lógica de Submissão no Frontend:**
  - No script do `Feedback.astro`, usar `fetch` para enviar os dados (avaliação, comentário, URL da página) para o endpoint `/api/feedback`.
  - Tratar as respostas de sucesso e erro.

- [ ] **2.2.3: Implementar Armazenamento de Dados:**
  - No endpoint da API, receber os dados da requisição.
  - Anexar os novos dados a um arquivo `feedback-data.json` no servidor.
  - Retornar uma resposta de sucesso ao frontend.

- [ ] **2.2.4: Testar o Fluxo Completo:**
  - Enviar um feedback pela interface.
  - Verificar se a requisição de rede foi bem-sucedida.
  - Inspecionar o arquivo `feedback-data.json` para confirmar o registro dos dados.

## Notes

- Armazenamento em JSON é temporário - pode migrar para DB posteriormente
- Incluir timestamp e URL da página em cada registro
- Considerar adicionar rate limiting para prevenir spam
- Validar dados no backend antes de armazenar

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 2.2](../PR.md#história-22-submissão-e-registro-do-feedback)
- Architecture: [API Specification - POST /api/feedback](../Arquitetura.md#5-especificação-da-api)
- FR4 (Feedback Interface): Backend para processar submissões
