# Project Context

## Purpose
**Base de Conhecimento da Saúde** - Uma plataforma moderna de documentação técnica para a Secretaria de Saúde.

### Goals
- **Centralizar o Conhecimento:** Criar uma fonte única, oficial e confiável para todos os documentos técnicos
- **Garantir a Confiabilidade:** Implementar um sistema de governança claro (status, versão, datas)
- **Otimizar o Acesso:** Desenvolver uma busca avançada e navegação intuitiva
- **Promover a Melhoria Contínua:** Estabelecer um ciclo de feedback direto entre usuários e gestores
- **Enriquecer o Conteúdo:** Integrar visualizações de dados para apoiar a decisão

### Background
Os profissionais da Secretaria de Saúde enfrentam o desafio de localizar documentos operacionais críticos. A fragmentação resulta em perda de tempo e uso de informações desatualizadas. Este projeto visa solucionar esse problema através da criação de uma moderna Base de Conhecimento, que servirá como a "fonte única da verdade".

## Tech Stack

### Core Framework & UI
- **Astro** (^5.x) - Framework principal para o site estático e rotas de API
- **Astro Starlight** (latest) - UI & Sistema de documentação
- **TypeScript** (^5.x) - Linguagem de desenvolvimento
- **React** (^19.2.0) - Para componentes interativos (Client-side)

### UI Components & Design System
- **shadcn-astro** (latest) - Base para TODOS componentes personalizados
- **Shadcn Studio Pro Charts** (latest) - Biblioteca de gráficos
- **lucide-react** (^0.553.0) - Sistema de ícones compatível com shadcn
- **Tailwind CSS** (^4.x) - Estilização
- **class-variance-authority** (^0.7.1) - Variantes de componentes
- **sonner** (^2.0.7) - Toasts e notificações

### Backend & Data
- **Neon (PostgreSQL)** (^17) - Banco de dados
- **postgres (node-postgres)** (^8.x) - Cliente de banco de dados
- **Supabase Storage** - Armazenamento de arquivos (PDFs, imagens, etc.)

### Content Management & Auth
- **TinaCMS** (^2.x) - CMS para gestores
- **Google OAuth 2.0** - Autenticação universal para profissionais

### Infrastructure & DevOps
- **Vercel** - Plataforma de deploy
- **GitHub** - Controle de versão e repositório
- **npm** (^11.x) - Gerenciador de pacotes

### Development Tools
- **Shadcn Studio MCP Server** - Ferramentas de desenvolvimento para componentes shadcn

## Project Conventions

### Code Style
- **TypeScript** obrigatório em todo o código
- **ESLint** e **Prettier** para formatação consistente
- Componentes React com **TypeScript interfaces** explícitas
- Uso de **named exports** para componentes
- Variáveis em **camelCase**, constantes em **UPPER_SNAKE_CASE**
- Arquivos de componentes em **PascalCase** (ex: `FeedbackForm.tsx`)
- Pastas e arquivos de configuração em **kebab-case** (ex: `search-config.ts`)

### Architecture Patterns
- **Arquitetura Jamstack** com geração estática (SSG)
- **Component-Driven Development** usando shadcn studio pro como base
- **Separation of Concerns:**
  - Conteúdo em arquivos MDX versionados via Git
  - Dados dinâmicos buscados no build-time
  - Componentes UI reutilizáveis e isolados (seguindo princípios de atomic design)
- **Design System First:** Todos os componentes UI personalizados devem usar shadcn studio pro
- **API Routes** do Astro para endpoints backend (`/api/*`)
- **Build-time Data Fetching** para gráficos e visualizações
- **Cache-first Strategy** com fallback para dados estáticos

### Component Guidelines (shadcn studio pro)
- Todos os componentes devem ser **acessíveis (WCAG 2.1 AA)**
- Evitar **estilos inline** - usar classes Tailwind e variáveis CSS
- Usar **tokens de design** (cores, espaçamentos, tipografia) do design system
- Componentes devem ser **reutilizáveis** e **bem documentados**
- Seguir **convenções do shadcn** para composição, props e acessibilidade

### Testing Strategy
- **Testes unitários** para componentes críticos
- **Testes de acessibilidade** automáticos em componentes shadcn
- **Testes de integração** para fluxos de autenticação e feedback
- **Validação de build** antes de cada deploy
- **Smoke tests** pós-deploy na Vercel

### Git Workflow
- **Branch principal:** `main` - sempre pronto para produção
- **Feature branches:** `feature/[nome-da-feature]`
- **Commits convencionais:**
  - `feat:` nova funcionalidade
  - `fix:` correção de bug
  - `docs:` documentação
  - `style:` formatação
  - `refactor:` refatoração de código
  - `test:` adição de testes
  - `chore:` tarefas de manutenção
- **Pull Requests** obrigatórios antes de merge para `main`
- **CI/CD automatizado** via GitHub Actions + Vercel

## Domain Context

### User Roles
1. **Profissionais de Saúde:** Usuários autenticados (via Google OAuth) que consomem documentos e enviam feedback
2. **Gestores:** Profissionais com permissão adicional de edição via TinaCMS e recebem notificações de feedback
3. **Público Geral:** Visitantes não autenticados que acessam apenas conteúdo público

### Document Visibility Levels
- **Pública:** Acessível a todos os visitantes sem login
- **Interna:** Apenas profissionais autenticados via Google OAuth
- **Restrita:** Apenas profissionais autenticados via Google OAuth

### Document Status Types
- **Rascunho:** Documento em elaboração
- **Publicado:** Documento oficial e ativo
- **Revisão:** Documento sob revisão
- **Revogado:** Documento obsoleto (exibe banner de alerta visual)

### Document Types
- **Protocolos Clínicos**
- **Fluxogramas** (com link de download)
- **Formulários** (com link de download)
- **Manuais Operacionais**
- **Diretrizes Técnicas**
- **Relatórios de Dados Epidemiológicos** (com gráficos interativos)

## Important Constraints

### Technical Constraints (NFRs)
- **Autenticação obrigatória** via Google OAuth 2.0 para documentos Internos/Restritos
- **Validação de domínio:** Apenas emails `@dominio-saude.gov.br` são aceitos
- **Build-time rendering:** Gráficos devem ser renderizados durante o build (NFR1)
- **Cache strategy:** Usar dados de cache se conexão com BD falhar durante build (NFR2)
- **Git-based content:** Todo conteúdo gerenciado via arquivos Markdown no repositório (NFR4)
- **Performance:** Tempo de carregamento inicial (LCP) < 2.5s em redes 3G (NFR5)

### Security Constraints
- **JWT tokens** armazenados em cookies seguros (httpOnly, secure, sameSite)
- **TinaCMS** protegido com autenticação separada
- **API endpoints** protegidos com API_SECRET_KEY
- **Validação de permissões** no servidor antes de servir conteúdo restrito

### Business Constraints
- **Ordem de implementação:** Épicos 1-4 primeiro, Épico 5 (Autenticação) na fase final
- **Testes iniciais:** Documentos podem usar visibilidade "Pública" durante desenvolvimento para facilitar testes
- **Governança de conteúdo:** Apenas gestores podem editar via TinaCMS
- **Notificações de feedback:** Curadores devem receber email após cada feedback submetido

### Design Constraints (NFR3, NFR7)
- **Shadcn Studio Pro obrigatório:** Todos os componentes UI devem usar shadcn como base
- **Consistência visual:** Design system unificado via tokens CSS
- **Acessibilidade:** WCAG 2.1 AA em todos os componentes
- **Identidade visual:** Seguir paleta de cores e tipografia da Secretaria de Saúde

## External Dependencies

### Data & Storage
- **Neon PostgreSQL** - Banco de dados para feedbacks e dados epidemiológicos
  - Connection string via `DATABASE_URL`
- **Supabase Storage** - Armazenamento de arquivos (PDFs, imagens, fluxogramas)
  - Requer `SUPABASE_URL` e `SUPABASE_ANON_KEY`

### Authentication & Authorization
- **Google Cloud Platform (OAuth 2.0)** - Autenticação universal de profissionais
  - Requer `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`
- **TinaCMS Cloud** - Autenticação de gestores no CMS
  - Requer `TINA_CLIENT_ID` e `TINA_TOKEN`

### Email & Notifications
- **Resend** - Envio de notificações de feedback para curadores
  - Requer `RESEND_API_KEY` e `FEEDBACK_NOTIFICATION_EMAIL`

### Infrastructure
- **Vercel** - Hospedagem e CI/CD
  - Deploy automatizado via GitHub integration
- **GitHub** - Controle de versão e triggers de CI/CD

### Development & Design Tools
- **Shadcn Studio MCP Server** - Ferramentas de desenvolvimento para componentes
  - Documentação: https://shadcnstudio.com/docs/getting-started/shadcn-studio-mcp-server
- **Shadcn Studio Pro Charts** - Biblioteca de gráficos
  - Documentação: https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli

## Environment Variables Required
```bash
# Database
DATABASE_URL="sua_connection_string_do_neon_aqui"

# Storage
SUPABASE_URL="seu_supabase_url_aqui"
SUPABASE_ANON_KEY="sua_supabase_key_aqui"

# Security
API_SECRET_KEY="uma_chave_secreta_forte_gerada_aqui"
JWT_SECRET="uma_chave_secreta_para_jwt_aqui"

# Email Notifications
FEEDBACK_NOTIFICATION_EMAIL="email_dos_curadores@dominio.com"
RESEND_API_KEY="sua_api_key_do_resend_aqui"

# Google OAuth 2.0 Authentication
GOOGLE_CLIENT_ID="seu_google_client_id_aqui"
GOOGLE_CLIENT_SECRET="seu_google_client_secret_aqui"
GOOGLE_REDIRECT_URI="https://seu-dominio.com/api/auth/callback/google"

# CMS (TinaCMS)
TINA_CLIENT_ID="seu_tina_client_id_aqui"
TINA_TOKEN="seu_tina_token_aqui"
```
