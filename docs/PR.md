# PRD: Base de Conhecimento da Saúde

## 1. Metas e Contexto de Fundo

**Metas**
- **Centralizar o Conhecimento:** Criar uma fonte única, oficial e confiável para todos os documentos técnicos.
- **Garantir a Confiabilidade:** Implementar um sistema de governança claro (status, versão, datas).
- **Otimizar o Acesso:** Desenvolver uma busca avançada e navegação intuitiva.
- **Promover a Melhoria Contínua:** Estabelecer um ciclo de feedback direto entre usuários e gestores.
- **Enriquecer o Conteúdo:** Integrar visualizações de dados para apoiar a decisão.

**Contexto de Fundo**
Atualmente, os profissionais da Secretaria de Saúde enfrentam o desafio de localizar documentos operacionais críticos. A fragmentação resulta em perda de tempo e uso de informações desatualizadas. Este projeto visa solucionar esse problema através da criação de uma moderna Base de Conhecimento, que servirá como a "fonte única da verdade".

**Histórico de Alterações**
| Data       | Versão | Descrição                                  | Autor |
| :--------- | :----- | :----------------------------------------- | :---- |
| 28/10/2025 | 1.0    | Criação inicial do documento a partir do brainstorming. | John (PM) |

## 2. Requisitos

**2.1. Requisitos Funcionais (FR)**
- **FR1 (Renderização):** Renderizar documentos em MDX.
- **FR2 (Navegação):** Apresentar navegação principal baseada em categorias.
- **FR3 (Busca):** Indexar e buscar por conteúdo e metadados do frontmatter.
- **FR4 (Interface de Feedback):** Exibir seção de feedback com avaliação (👍/👎) e campo de comentário.
- **FR5 (Notificação de Feedback):** Enviar notificação por e-mail para curadores após submissão de feedback.
- **FR6 (Gráficos):** Incorporar gráficos do Shadcn Studio Pro com dados buscados de fonte externa.
- **FR7 (Status de Documento):** Exibir um banner de alerta visual para documentos com status "Revogado".
- **FR8 (Download):** Oferecer link de download para Formulários e Fluxogramas.
- **FR9 (Controle de Visibilidade):** O sistema deve controlar o acesso aos documentos com base no metadado `visibilidade`:
  - **Pública:** Acessível a todos os usuários, sem necessidade de login.
  - **Restrita e Interna:** Acessível apenas a profissionais de saúde autenticados via Google OAuth 2.0.
- **FR10 (Autenticação via Google):** Todos os profissionais devem fazer login usando suas contas Google (@dominio-saude.gov.br) para acessar documentos com visibilidade Interna ou Restrita.

**2.2. Requisitos Não Funcionais (NFR)**
- **NFR1 (Performance):** Renderizar gráficos no build-time para performance máxima.
- **NFR2 (Confiabilidade):** Usar dados de cache para os gráficos se a conexão com o BD falhar durante o build.
- **NFR3 (Design):** Permitir personalização de cores e tipografia usando shadcn studio pro.
- **NFR4 (Manutenibilidade):** Gerenciar todo o conteúdo via arquivos Markdown em um repositório Git.
- **NFR5 (Implantação):** Configurar pipeline de CI/CD a partir do GitHub.
- **NFR6 (Segurança):**
  - Proteger o acesso ao TinaCMS com autenticação.
  - Implementar autenticação segura via Google OAuth 2.0 com tokens JWT.
  - Validar domínio de e-mail organizacional (@dominio-saude.gov.br) durante o processo de autenticação.
- **NFR7 (Componentização):**
  - Todos os componentes UI personalizados devem ser construídos usando shadcn studio pro como biblioteca base.
  - Componentes devem ser reutilizáveis, acessíveis (WCAG 2.1 AA) e seguir convenções do shadcn.
  - Evitar estilos inline; usar classes Tailwind e variáveis CSS do design system.
  - Garantir consistência visual através do uso de tokens de design (cores, espaçamentos, tipografia).

## 3. Estrutura de Épicos

**Nota sobre Ordem de Implementação:**
- **Épicos 1, 2, 3 e 4** devem ser implementados sequencialmente primeiro, estabelecendo a base da plataforma.
- **Épico 5 (Autenticação)** será implementado na **fase final**, após toda a funcionalidade principal estar operacional.
- Durante o desenvolvimento inicial, documentos podem ser testados com visibilidade "Pública".

- **Épico 1: Fundação da Plataforma e Renderização de Conteúdo**
- **Épico 2: Implementação do Sistema de Feedback e Governança**
- **Épico 3: Integração e Visualização de Dados**
- **Épico 4: Configuração do Ambiente de Edição e CI/CD**
- **Épico 5: Gestão de Acesso e Autenticação de Usuários**

## 4. Índice de Épicos e Histórias

> **Nota sobre Fonte da Verdade:**
> As histórias detalhadas foram extraídas para arquivos individuais em [`/docs/stories`](stories/). Os arquivos individuais são a **fonte única da verdade** para todas as tarefas técnicas, critérios de aceitação e detalhes de implementação. Este documento mantém apenas a visão estratégica de alto nível.

### Épico 1: Fundação da Plataforma e Renderização de Conteúdo

Estabelece a base técnica da plataforma usando Astro Starlight, incluindo configuração inicial, identidade visual, navegação, metadados de governança e busca fundamental.

**Histórias:**
1. [História 1.1: Configuração Inicial do Projeto Astro Starlight](stories/epic-01-fundacao/story-1.1-configuracao-inicial.md)
2. [História 1.2: Personalização da Identidade Visual (Tema)](stories/epic-01-fundacao/story-1.2-personalizacao-tema.md)
3. [História 1.3: Criação da Estrutura de Navegação e Conteúdo](stories/epic-01-fundacao/story-1.3-estrutura-navegacao.md)
4. [História 1.4: Exibição de Documentos com Metadados de Governança](stories/epic-01-fundacao/story-1.4-exibicao-metadados.md)
5. [História 1.5: Implementação da Busca Fundamental](stories/epic-01-fundacao/story-1.5-busca-fundamental.md)
6. [História 1.6 (UX): Criação da Página Inicial Customizada](stories/epic-01-fundacao/story-1.6-homepage-customizada.md)
7. [História 1.7 (UX): Design da Página de Resultados da Busca](stories/epic-01-fundacao/story-1.7-pagina-resultados-busca.md)

### Épico 2: Implementação do Sistema de Feedback e Governança

Desenvolve o sistema de feedback dos usuários, incluindo interface, submissão, notificações para curadores e visualização de status de documentos.

**Histórias:**
1. [História 2.1: Criação do Componente de Feedback](stories/epic-02-feedback/story-2.1-componente-feedback.md)
2. [História 2.2: Submissão e Registro do Feedback](stories/epic-02-feedback/story-2.2-submissao-feedback.md)
3. [História 2.3: Fluxo de Notificação para Curadores](stories/epic-02-feedback/story-2.3-notificacao-curadores.md)
4. [História 2.4: Implementação do Status Visual de Documento](stories/epic-02-feedback/story-2.4-status-visual-documento.md)

### Épico 3: Integração e Visualização de Dados

Integra a plataforma com banco de dados externo para exibição de gráficos e visualizações de dados usando Shadcn Studio Pro, com estratégias de cache e fallback.

**Histórias:**
1. [História 3.1: Configuração da Conexão com o Banco de Dados](stories/epic-03-dados/story-3.1-conexao-banco-dados.md)
2. [História 3.2: Adição de Componentes de Gráfico do Shadcn Studio Pro](stories/epic-03-dados/story-3.2-componentes-grafico.md)
3. [História 3.3: Conexão de Dados Dinâmicos aos Componentes de Gráfico](stories/epic-03-dados/story-3.3-dados-dinamicos-graficos.md)
4. [História 3.4: Implementação da Estratégia de Cache e Fallback](stories/epic-03-dados/story-3.4-cache-fallback.md)

### Épico 4: Configuração do Ambiente de Edição e CI/CD

Configura o ambiente de edição de conteúdo usando TinaCMS, implementa autenticação para editores e estabelece o pipeline de CI/CD para deploy automatizado.

**Histórias:**
1. [História 4.1: Integração do TinaCMS](stories/epic-04-cms-cicd/story-4.1-integracao-tinacms.md)
2. [História 4.2: Configuração da Autenticação do CMS](stories/epic-04-cms-cicd/story-4.2-autenticacao-cms.md)
3. [História 4.3: Configuração do Pipeline de CI/CD](stories/epic-04-cms-cicd/story-4.3-pipeline-cicd.md)

### Épico 5: Gestão de Acesso e Autenticação de Usuários

Implementa autenticação universal via Google OAuth 2.0, controle de acesso baseado em visibilidade de documentos e gestão de papéis de usuários.

**Histórias:**
1. [História 5.1: Implementar Autenticação Universal via Google OAuth 2.0](stories/epic-05-autenticacao/story-5.1-oauth-google.md)
2. [História 5.2: Implementar Controle de Acesso Baseado em Visibilidade](stories/epic-05-autenticacao/story-5.2-controle-acesso.md)
3. [História 5.3: Implementar Gestão de Papéis (Gestor)](stories/epic-05-autenticacao/story-5.3-gestao-papeis.md)