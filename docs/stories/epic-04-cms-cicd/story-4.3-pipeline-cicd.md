# Story 4.3: Configuração do Pipeline de CI/CD

**Epic:** Épico 4 - Configuração do Ambiente de Edição e CI/CD
**Priority:** High
**Estimated Effort:** 5 horas
**Dependencies:** Story 1.1 (projeto base)

## User Story

Como um **desenvolvedor**, eu quero **que o site seja automaticamente construído e implantado ao fazer push** para que **mudanças no conteúdo e código entrem em produção rapidamente e de forma confiável**.

## Acceptance Criteria

- [ ] Workflow do GitHub Actions criado (`.github/workflows/deploy.yml`)
- [ ] Gatilho configurado para push na branch `main`
- [ ] Steps de build definidos (checkout, setup, install, build)
- [ ] Action de deploy configurada (Vercel/Netlify/GitHub Pages)
- [ ] Segredos do ambiente configurados no GitHub
- [ ] Pipeline testado - push aciona deploy automaticamente
- [ ] Site acessível na URL de produção

## Technical Tasks

- [ ] **4.3.1: Criar Workflow do GitHub Actions:**
  - Criar o arquivo `.github/workflows/deploy.yml`.
  - Definir o gatilho do workflow para push na branch `main`.

- [ ] **4.3.2: Definir Passos do Job de Deploy:**
  - Adicionar passos para: checkout do código, setup do Node.js/pnpm, instalação de dependências (`pnpm install`) e build do projeto (`pnpm build`).

- [ ] **4.3.3: Configurar Action de Deploy:**
  - Escolher e configurar uma action do GitHub para fazer o deploy do conteúdo da pasta `dist/` para a plataforma de hospedagem (e.g., Vercel, Netlify, GitHub Pages).

- [ ] **4.3.4: Configurar Segredos do Ambiente:**
  - Adicionar tokens de autenticação da plataforma de hospedagem como segredos no repositório do GitHub.

- [ ] **4.3.5: Testar o Pipeline de CI/CD:**
  - Fazer um push para a branch `main` e monitorar a execução do workflow na aba "Actions".
  - Verificar se o deploy foi bem-sucedido e se o site está acessível na URL de produção.

## Notes

- Vercel é recomendado por simplicidade com Astro
- Pipeline deve incluir testes (se existirem) antes de deploy
- Considerar adicionar deploy preview para branches de feature
- Variáveis de ambiente de produção devem estar configuradas na plataforma
- Documentar processo de rollback se necessário

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 4.3](../PR.md#história-43-configuração-do-pipeline-de-cicd)
- Architecture: [Platform - Vercel](../Arquitetura.md#2-arquitetura-de-alto-nível-revisado)
- NFR5 (CI/CD): Configurar pipeline de CI/CD a partir do GitHub
