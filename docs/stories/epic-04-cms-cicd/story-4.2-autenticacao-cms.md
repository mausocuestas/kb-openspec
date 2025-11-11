# Story 4.2: Configuração da Autenticação do CMS

**Epic:** Épico 4 - Configuração do Ambiente de Edição e CI/CD
**Priority:** High
**Estimated Effort:** 5 horas
**Dependencies:** Story 4.1

## User Story

Como um **administrador do sistema**, eu quero **que apenas gestores autorizados acessem o CMS** para que **o conteúdo esteja protegido contra edições não autorizadas**.

## Acceptance Criteria

- [ ] Provedor de autenticação implementado (@tinacms/auth)
- [ ] OAuth App registrado no GitHub
- [ ] Client ID e Client Secret configurados em `.env`
- [ ] Handler de autenticação criado em API routes
- [ ] Acesso ao modo de edição (`/admin`) requer login
- [ ] Login e logout funcionais
- [ ] Apenas usuários autorizados podem editar

## Technical Tasks

- [ ] **4.2.1: Implementar Provedor de Autenticação (NFR6):**
  - Usar o `@tinacms/auth` para implementar um fluxo de autenticação (e.g., com GitHub OAuth).

- [ ] **4.2.2: Registrar Aplicativo OAuth no GitHub:**
  - Registrar um novo OAuth App no GitHub para obter o Client ID e Client Secret.

- [ ] **4.2.3: Configurar Variáveis de Ambiente Seguras:**
  - Adicionar o Client ID, Client Secret e um segredo JWT no arquivo `.env` do projeto.

- [ ] **4.2.4: Criar Handler de Autenticação:**
  - Implementar o handler de API em `src/pages/api/tina/[...routes].ts` para gerenciar o login e logout.

- [ ] **4.2.5: Testar Fluxo de Autenticação:**
  - Garantir que o acesso ao modo de edição (`/admin`) exige login.
  - Testar o login via GitHub e o logout.

## Notes

- GitHub OAuth é apropriado para equipe técnica
- Considerar adicionar whitelist de usuários autorizados
- JWT secret deve ser forte e único
- Tokens devem ter expiração apropriada
- Documentar processo de adicionar novos gestores

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 4.2](../PR.md#história-42-configuração-da-autenticação-do-cms)
- Architecture: [Environment Variables - TINA_CLIENT_ID, TINA_TOKEN](../Arquitetura.md#7-fluxo-de-trabalho-de-desenvolvimento-e-implantação)
- NFR6 (Security): Proteger o acesso ao TinaCMS com autenticação
