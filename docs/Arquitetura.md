# Documento de Arquitetura Fullstack: Base de Conhecimento da Saúd

## 1. Introdução
Este documento descreve a arquitetura fullstack para a Base de Conhecimento, incluindo frontend, camada de dados, CMS e infraestrutura. O projeto será iniciado a partir do template Astro Starlight.

## 2. Arquitetura de Alto Nível (Revisado)
**Resumo Técnico**
A arquitetura será baseada no padrão Jamstack (Astro.js), com conteúdo gerenciado via Git/TinaCMS. Dados dinâmicos serão buscados no build-time de um banco de dados Neon PostgreSQL. O armazenamento de mídias será feito no Supabase Storage. O deploy será automatizado na Vercel.

**Plataforma e Infraestrutura**
- **Plataforma de Aplicação:** Vercel
- **Banco de Dados:** Neon (PostgreSQL)
- **Armazenamento de Arquivos:** Supabase Storage

**Diagrama da Arquitetura**
(O diagrama Mermaid que definimos estaria aqui)

## 3. Tech Stack (Versão 2.0 - Revisada)
| Categoria                | Tecnologia                | Versão  | Notas |
| :----------------------- | :------------------------ | :------ | :---- |
| Framework Principal      | Astro                     | `^5.x`  | |
| UI & Documentação        | Astro Starlight           | `latest`| |
| Linguagem                | TypeScript                | `^5.x`  | |
| UI Components            | shadcn-astro              | `latest`| Base para TODOS componentes personalizados |
| Biblioteca de Gráficos   | Shadcn Studio Pro Charts  | `latest`| [Docs](https://shadcnstudio.com/docs/getting-started/how-to-use-shadcn-cli) |
| Ícones                   | lucide-react              | `latest`| Sistema de ícones compatível com shadcn |
| MCP Server (Dev Tools)   | Shadcn Studio MCP Server  | `latest`| [Docs](https://shadcnstudio.com/docs/getting-started/shadcn-studio-mcp-server) |
| Estilização              | Tailwind CSS              | `^4.x`  | |
| CMS (Interface)          | TinaCMS                   | `^2.x`  | Apenas para gestores |
| Autenticação             | Google OAuth 2.0          | `N/A`   | Para todos os profissionais |
| Plataforma de Deploy     | Vercel                    | `N/A`   | |
| Banco de Dados           | Neon (PostgreSQL)         | `^17`   | |
| Cliente de BD            | `postgres` (node-postgres) | `^8.x`  | |
| Armazenamento de Mídia   | Supabase Storage          | `N/A`   | |
| Controle de Versão       | Git                       | `N/A`   | |
| Repositório              | GitHub                    | `N/A`   | |
| Gerenciador de Pacotes   | npm                      | `^11.x` | |

## 3.5. Estratégia de Componentização com shadcn studio pro

**Filosofia de Design**

Todos os componentes UI personalizados serão construídos usando shadcn studio pro como biblioteca base, garantindo:
- **Consistência visual** em toda a aplicação através de um design system unificado
- **Acessibilidade (WCAG 2.1 AA)** por padrão em todos os componentes
- **Facilidade de manutenção** através de componentes reutilizáveis e bem documentados
- **Performance otimizada** com componentes leves e tree-shakeable
- **Developer Experience** aprimorada com TypeScript e autocomplete

**Componentes shadcn a serem utilizados:**

| Componente shadcn | Uso na Aplicação | Localização |
| :---------------- | :--------------- | :---------- |
| Button | Botões de ação, "Entrar com Google", submissões de formulários | Global |
| Card | Cards de acesso rápido, wrappers de conteúdo, container de metadados | Homepage, Docs |
| Badge | Status de documentos (Rascunho, Publicado, Revisão, Revogado) | Páginas de docs |
| Alert | Banner de documento "Revogado", mensagens de sistema | Páginas de docs |
| Textarea | Campo de comentário do feedback | Componente Feedback |
| DropdownMenu | Menu de perfil do usuário autenticado | Header |
| Avatar | Foto do usuário autenticado | Header, Perfil |
| Separator | Divisores visuais entre seções | Global |
| Input | Barra de busca, campos de formulário | Homepage, Busca |
| Charts (Bar, Line, Area, Pie) | Visualizações de dados epidemiológicos | Páginas de dados |
| Skeleton | Loading states durante carregamento assíncrono | Global |
| Toast | Notificações de feedback enviado com sucesso | Global |
| Dialog | Confirmações e modais | Global |

**Customização do Design System**

- Todos os componentes shadcn serão customizados através do arquivo \`src/assets/custom.css\`
- Paleta de cores será definida seguindo a identidade visual da Secretaria de Saúde
- Variáveis CSS do shadcn serão sobrescritas para alinhar com o tema do Starlight:
  - \`--primary\`: Cor principal da aplicação
  - \`--secondary\`: Cor secundária para elementos de apoio
  - \`--accent\`: Cor de destaque para CTAs e elementos interativos
  - \`--muted\`: Cor para backgrounds e elementos sutis
- Tokens de espaçamento e tipografia serão harmonizados entre shadcn e Starlight

## 4. Estrutura de Dados (Data Models)
(As definições das tabelas `feedbacks` e `epidemiological_data` em SQL e as interfaces TypeScript estariam aqui.)

## 5. Especificação da API
- **POST /api/feedback:** Endpoint público para receber e registrar novos feedbacks.
- **GET /api/data/:metricName:** Endpoint protegido para ser chamado durante o build e fornecer dados para os gráficos.

## 6. Estrutura Unificada do Projeto (Monorepo)
(A estrutura de pastas detalhada que definimos estaria aqui.)

## 7. Fluxo de Trabalho de Desenvolvimento e Implantação
**Variáveis de Ambiente (.env.example)**
\`\`\`bash
# Database
DATABASE_URL="sua_connection_string_do_neon_aqui"

# Storage
SUPABASE_URL="seu_supabase_url_aqui"
SUPABASE_ANON_KEY="sua_supabase_key_aqui"

# Security
API_SECRET_KEY="uma_chave_secreta_forte_gerada_aqui"

# Email Notifications
FEEDBACK_NOTIFICATION_EMAIL="email_dos_curadores@dominio.com"
RESEND_API_KEY="sua_api_key_do_resend_aqui"

# Google OAuth 2.0 Authentication
GOOGLE_CLIENT_ID="seu_google_client_id_aqui"
GOOGLE_CLIENT_SECRET="seu_google_client_secret_aqui"
GOOGLE_REDIRECT_URI="https://seu-dominio.com/api/auth/callback/google"
JWT_SECRET="uma_chave_secreta_para_jwt_aqui"

# CMS (TinaCMS)
TINA_CLIENT_ID="seu_tina_client_id_aqui"
TINA_TOKEN="seu_tina_token_aqui"
\`\`\`

## 8. Estratégia de Autenticação e Controle de Acesso

**8.1. Autenticação Universal via Google OAuth 2.0**
- **Objetivo:** Todos os profissionais de saúde devem fazer login usando suas contas Google para acessar documentos com visibilidade "Interna" ou "Restrita".
- **Implementação:**
  - Integração com Google OAuth 2.0 através do Google Cloud Platform.
  - Após autenticação bem-sucedida, o sistema cria uma sessão de usuário usando JWT armazenado em cookie seguro (httpOnly, secure, sameSite).
  - O token JWT contém: email do usuário, nome, foto de perfil e papel (Profissional ou Gestor).

**8.2. Controle de Visibilidade de Documentos**
| Visibilidade | Requisito de Acesso | Descrição |
| :----------- | :------------------ | :-------- |
| Pública      | Nenhum              | Acessível por qualquer visitante sem login |
| Interna      | Login Google        | Apenas profissionais autenticados podem visualizar |
| Restrita     | Login Google        | Apenas profissionais autenticados podem visualizar |

**8.3. Papéis de Usuário**
- **Profissional:** Acesso de leitura a documentos Internos e Restritos. Pode enviar feedback.
- **Gestor:** Acesso de leitura + edição via TinaCMS. Recebe notificações de feedback.

(O restante dos detalhes sobre CI/CD e Cron Jobs estaria aqui.)