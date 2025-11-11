# Story 4.1: Integração do TinaCMS

**Epic:** Épico 4 - Configuração do Ambiente de Edição e CI/CD
**Priority:** High
**Estimated Effort:** 6 horas
**Dependencies:** Story 1.3 (estrutura de conteúdo)

## User Story

Como um **gestor de conteúdo**, eu quero **editar documentos através de uma interface visual (CMS)** para que **possa atualizar conteúdo sem conhecimento técnico de Markdown ou Git**.

## Acceptance Criteria

- [ ] TinaCMS instalado e inicializado
- [ ] Esquema de conteúdo definido em `.tina/schema.ts`
- [ ] Esquema reflete metadados dos documentos (version, status, etc.)
- [ ] Layout adaptado para modo de edição
- [ ] Hook `useTina` implementado
- [ ] Edição de conteúdo testada e funcional
- [ ] Arquivo Markdown atualizado após salvar no CMS

## Technical Tasks

- [ ] **4.1.1: Instalar e Inicializar TinaCMS:**
  - Instalar as dependências do TinaCMS para Astro (`@tinacms/cli`, `tinacms`, `@tinacms/auth`).
  - Executar `pnpm tinacms init` para criar a estrutura básica do CMS.

- [ ] **4.1.2: Definir Esquema de Conteúdo no TinaCMS:**
  - No arquivo `.tina/schema.ts`, definir uma coleção que espelhe a estrutura de metadados dos documentos (version, status, etc.).

- [ ] **4.1.3: Adaptar Layout para o Modo de Edição:**
  - Envolver o layout principal com o `TinaEditProvider`.
  - Usar o hook `useTina` para carregar os dados do documento no modo de edição do CMS.

- [ ] **4.1.4: Testar Edição de Conteúdo:**
  - Iniciar o servidor com `pnpm dev`.
  - Entrar no modo de edição, modificar um documento e salvar.
  - Verificar se o arquivo Markdown correspondente foi atualizado no repositório.

## Notes

- TinaCMS permite edição visual mas mantém Git como source of truth (NFR4)
- Apenas gestores terão acesso ao modo de edição (Story 4.2)
- Esquema deve incluir todos os metadados definidos em Story 1.4
- Testar em ambiente de desenvolvimento antes de produção

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 4.1](../PR.md#história-41-integração-do-tinacms)
- Architecture: [Tech Stack - TinaCMS 2.x](../Arquitetura.md#3-tech-stack-versão-20---revisada)
- NFR4 (Maintainability): Gerenciar todo o conteúdo via arquivos Markdown em um repositório Git
