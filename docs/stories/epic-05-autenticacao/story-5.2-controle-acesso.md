# Story 5.2: Implementar Controle de Acesso Baseado em Visibilidade

**Epic:** Épico 5 - Gestão de Acesso e Autenticação de Usuários
**Priority:** High
**Estimated Effort:** 6 horas
**Dependencies:** Story 5.1

## User Story

Como um **profissional de saúde autenticado**, eu quero **acessar documentos internos e restritos** enquanto **visitantes não autenticados veem apenas documentos públicos**, para que **informações sensíveis estejam protegidas**.

## Acceptance Criteria

- [ ] Middleware de autenticação criado
- [ ] JWT validado em todas as rotas de documentos
- [ ] Lógica de acesso implementada baseada em metadado `visibilidade`
- [ ] Documentos públicos acessíveis sem login
- [ ] Documentos internos/restritos requerem autenticação
- [ ] Redirecionamento para login implementado
- [ ] Página 403 customizada criada com shadcn
- [ ] Retorno à página original após login

## Technical Tasks

- [ ] **5.2.1: Criar Middleware de Autenticação:**
  - Criar um middleware Astro que verifica a presença e validade do JWT em todas as rotas de documentos.
  - O middleware deve ler o cookie de sessão e validar o token.

- [ ] **5.2.2: Modificar Lógica de Acesso a Documentos:**
  - Na camada de renderização de documentos, ler o metadado `visibilidade` do frontmatter.
  - Se a visibilidade for "Restrita" ou "Interna", verificar se o usuário está autenticado via middleware.
  - Documentos com visibilidade "Pública" devem ser acessíveis sem autenticação.

- [ ] **5.2.3: Implementar Redirecionamento para Login:**
  - Se um usuário não autenticado tentar acessar conteúdo "Restrito" ou "Interno", redirecioná-lo para a página de login.
  - Após login bem-sucedido, redirecionar o usuário de volta para o documento que tentava acessar.

- [ ] **5.2.4: Criar Página de Acesso Negado (usando shadcn):**
  - Desenvolver uma página 403 customizada usando `Card` e `Alert`:
    - `Alert` com variant="destructive" explicando que o acesso é negado
    - Ícone `ShieldAlert` do lucide-react
    - Mensagem clara: "Você precisa estar autenticado para acessar este documento"
    - `Button` para "Fazer Login" redirecionando para autenticação
    - Link secundário para voltar à homepage
  - Página deve ser responsiva e acessível.

## Notes

- 3-tier visibility model: Public / Internal / Restricted
- Middleware deve ser eficiente - não bloquear assets estáticos
- Preservar return URL no fluxo de login crítico para UX
- Página 403 deve ser informativa mas não revelar estrutura do sistema
- Testar com diferentes níveis de visibilidade

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 5.2](../PR.md#história-52-implementar-controle-de-acesso-baseado-em-visibilidade)
- Architecture: [Document Visibility Model - Section 8.2](../Arquitetura.md#8-estratégia-de-autenticação-e-controle-de-acesso)
- FR9 (Visibility Control): O sistema deve controlar o acesso aos documentos com base no metadado visibilidade
