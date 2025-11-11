# Story 5.1: Implementar Autenticação Universal via Google OAuth 2.0

**Epic:** Épico 5 - Gestão de Acesso e Autenticação de Usuários
**Priority:** High
**Estimated Effort:** 8 horas
**Dependencies:** Todas as histórias anteriores (Epic 5 é final)

## User Story

Como um **profissional de saúde**, eu quero **fazer login com minha conta Google organizacional** para que **possa acessar documentos internos e restritos de forma segura**.

## Acceptance Criteria

- [ ] Projeto criado no Google Cloud Platform
- [ ] Credenciais OAuth 2.0 configuradas (Client ID e Secret)
- [ ] Botão "Entrar com Google" implementado com shadcn Button
- [ ] Fluxo Authorization Code implementado
- [ ] Handler de callback criado (`/api/auth/callback/google`)
- [ ] Validação de domínio (@dominio-saude.gov.br) implementada
- [ ] JWT session management com cookies seguros
- [ ] Componente UserProfile com shadcn Avatar/DropdownMenu
- [ ] Páginas de perfil e logout funcionais
- [ ] Toast de confirmação após logout

## Technical Tasks

- [ ] **5.1.1: Configurar Projeto no Google Cloud Platform:**
  - Criar um novo projeto no GCP para a Base de Conhecimento.
  - Configurar a tela de consentimento OAuth (escolher tipo "Interno" para limitar ao domínio da organização).
  - Criar as credenciais de cliente OAuth 2.0 (Client ID e Client Secret).
  - Adicionar URIs de redirecionamento autorizados (produção e desenvolvimento).

- [ ] **5.1.2: Implementar Fluxo de Autenticação no Frontend (usando shadcn):**
  - Adicionar um `Button` do shadcn com variant="outline" e texto "Entrar com Google" no cabeçalho do site.
  - Incluir o ícone do Google (SVG customizado ou lucide-react) à esquerda do texto.
  - Estilizar botão com cores do Google (opcional: fundo branco, texto escuro, borda).
  - Implementar a lógica para redirecionar o usuário para a tela de login do Google usando o fluxo Authorization Code.
  - Criar uma página de callback (`/api/auth/callback/google`) para receber o código de autorização.
  - Durante processamento do callback, exibir `Skeleton` ou loading state.

- [ ] **5.1.3: Criar Handler de Autenticação no Backend:**
  - Criar endpoint de API (`/api/auth/callback/google`) para:
    - Trocar o código de autorização por tokens de acesso.
    - Validar o token ID do Google.
    - Verificar se o email pertence ao domínio organizacional (@dominio-saude.gov.br).
  - Implementar a lógica para criar e gerenciar sessões de usuário usando JWTs armazenados em cookies seguros (httpOnly, secure, sameSite=strict).
  - O JWT deve conter: email, nome, foto de perfil, papel (Profissional ou Gestor).

- [ ] **5.1.4: Implementar Validação de Domínio:**
  - No processo de autenticação, validar que o email termina com `@dominio-saude.gov.br`.
  - Rejeitar tentativas de login de contas Google pessoais ou de outros domínios.

- [ ] **5.1.5: Criar Componente de Perfil de Usuário (usando shadcn):**
  - Desenvolver componente `UserProfile.astro` no cabeçalho usando:
    - `Avatar` do shadcn para foto do usuário (com fallback para iniciais se não houver foto)
    - `DropdownMenu` para menu de opções com trigger no Avatar
  - Menu dropdown com itens:
    - Item "Perfil" com ícone `User` (lucide-react) e link para `/perfil`
    - `Separator` entre opções
    - Item "Sair" com ícone `LogOut` (lucide-react) e ação de logout
  - Exibir nome do usuário truncado se muito longo (max 20 caracteres).
  - Adicionar indicador de status online (Badge pequeno verde no Avatar - opcional).

- [ ] **5.1.6: Criar Páginas de Perfil e Logout (usando shadcn):**
  - Desenvolver página de perfil (`/perfil`) exibindo informações do usuário usando `Card`:
    - `Avatar` grande com foto do usuário
    - Nome completo, email, papel (Profissional/Gestor)
    - `Badge` para indicar o papel
    - Estatísticas opcionais (documentos visualizados, feedbacks enviados)
  - Implementar endpoint de logout (`/api/auth/logout`) para limpar o cookie de sessão.
  - Após logout, exibir `Toast` de confirmação e redirecionar para homepage.

## Notes

- Google OAuth 2.0 é padrão enterprise para SSO
- Validação de domínio é crítica para segurança
- JWT deve ter expiração apropriada (ex: 7 dias)
- Refresh tokens podem ser implementados em iteração futura
- Testar fluxo completo: login → acesso → logout
- Componentes devem seguir design system (Story 1.2)

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 5.1](../PR.md#história-51-implementar-autenticação-universal-via-google-oauth-20)
- Architecture: [Authentication Strategy - Section 8.1](../Arquitetura.md#8-estratégia-de-autenticação-e-controle-de-acesso)
- Architecture: [Component Strategy - Avatar, DropdownMenu, Button](../Arquitetura.md#35-estratégia-de-componentização-com-shadcn-studio-pro)
- FR10 (Google OAuth): Todos os profissionais devem fazer login usando suas contas Google
- NFR6 (Security): Implementar autenticação segura via Google OAuth 2.0 com tokens JWT
