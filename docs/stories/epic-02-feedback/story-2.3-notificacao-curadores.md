# Story 2.3: Fluxo de Notificação para Curadores

**Epic:** Épico 2 - Implementação do Sistema de Feedback e Governança
**Priority:** High
**Estimated Effort:** 4 horas
**Dependencies:** Story 2.2

## User Story

Como um **gestor de conteúdo**, eu quero **receber notificações por e-mail quando há novo feedback** para que **possa responder rapidamente e manter o conteúdo atualizado**.

## Acceptance Criteria

- [ ] Serviço de e-mail transacional configurado (Resend)
- [ ] Chave de API adicionada às variáveis de ambiente
- [ ] SDK do Resend instalado
- [ ] Lógica de envio implementada no endpoint de feedback
- [ ] E-mail contém: dados do feedback e link da página
- [ ] Fluxo testado e e-mail recebido com sucesso

## Technical Tasks

- [ ] **2.3.1: Configurar Serviço de E-mail:**
  - Escolher um serviço de e-mail transacional (e.g., Resend, SendGrid).
  - Obter a chave de API e adicioná-la às variáveis de ambiente do projeto (`.env`).

- [ ] **2.3.2: Instalar SDK do Serviço de E-mail:**
  - Instalar a biblioteca do serviço escolhido (e.g., `pnpm install resend`).

- [ ] **2.3.3: Implementar Lógica de Envio de E-mail:**
  - No endpoint `src/pages/api/feedback.ts`, após salvar o feedback, adicionar a chamada para a API de envio de e-mail.
  - Construir o corpo do e-mail com os dados do feedback e o link da página.

- [ ] **2.3.4: Testar o Envio da Notificação:**
  - Submeter um novo feedback.
  - Verificar se o e-mail de notificação é recebido corretamente na caixa de entrada do curador.

## Notes

- E-mail deve ser profissional e direto
- Incluir: tipo de avaliação (👍/👎), comentário, URL do documento, timestamp
- Considerar adicionar link direto para responder ao usuário (futura feature)
- Resend é recomendado por simplicidade e confiabilidade
- Guardar FEEDBACK_NOTIFICATION_EMAIL em .env

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 2.3](../PR.md#história-23-fluxo-de-notificação-para-curadores)
- Architecture: [Environment Variables - RESEND_API_KEY](../Arquitetura.md#7-fluxo-de-trabalho-de-desenvolvimento-e-implantação)
- FR5 (Email Notifications): Enviar notificação por e-mail para curadores após submissão de feedback
