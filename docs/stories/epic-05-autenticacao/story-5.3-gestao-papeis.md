# Story 5.3: Implementar Gestão de Papéis (Gestor)

**Epic:** Épico 5 - Gestão de Acesso e Autenticação de Usuários
**Priority:** Medium
**Estimated Effort:** 4 horas
**Dependencies:** Story 5.1, Story 5.2

## User Story

Como um **administrador do sistema**, eu quero **diferenciar entre profissionais e gestores** para que **gestores possam acessar funcionalidades adicionais como o CMS**.

## Acceptance Criteria

- [ ] Estrutura de dados para papéis definida (DB ou arquivo config)
- [ ] Lista de gestores configurada (por e-mail)
- [ ] Verificação de papel implementada no backend
- [ ] Papel do usuário adicionado ao JWT
- [ ] Papel exibido na página de perfil
- [ ] Badge de papel implementado com shadcn
- [ ] Distinção entre Profissional e Gestor funcional

## Technical Tasks

- [ ] **5.3.1: Definir Estrutura de Dados para Papéis:**
  - Criar uma estrutura no banco de dados ou em um arquivo de configuração para associar usuários (por e-mail) ao papel de "Gestor".

- [ ] **5.3.2: Implementar Verificação de Papel:**
  - No backend, ao validar a sessão do usuário, verificar se o e-mail do usuário está na lista de gestores.
  - Adicionar o papel do usuário ("Profissional" ou "Gestor") ao token de sessão (JWT).

- [ ] **5.3.3: Expor Papel do Usuário na UI (Opcional):**
  - Exibir o papel do usuário na página de perfil para fins de clareza. O controle de acesso a documentos não depende mais do papel, mas o papel pode ser usado para futuras funcionalidades de gerenciamento.

## Notes

- Papel "Gestor" é usado principalmente para acesso ao TinaCMS (Story 4.2)
- Todos os profissionais autenticados têm acesso a documentos Internos/Restritos
- Papel não afeta visibilidade de documentos - apenas funcionalidades admin
- Lista de gestores pode estar em arquivo config ou DB conforme necessidade
- Badge de papel deve usar cores consistentes com design system

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 5.3](../PR.md#história-53-implementar-gestão-de-papéis-gestor)
- Architecture: [User Roles - Section 8.3](../Arquitetura.md#8-estratégia-de-autenticação-e-controle-de-acesso)
- Architecture: [Component Strategy - Badge](../Arquitetura.md#35-estratégia-de-componentização-com-shadcn-studio-pro)
