# Stories - Base de Conhecimento da Saúde

Este diretório contém todas as histórias de usuário do projeto **kb-saude**, organizadas por épicos.

## Estrutura

```
stories/
├── epic-01-fundacao/       # 7 histórias - Fundação da Plataforma e Renderização de Conteúdo
├── epic-02-feedback/       # 4 histórias - Sistema de Feedback e Governança
├── epic-03-dados/          # 4 histórias - Integração e Visualização de Dados
├── epic-04-cms-cicd/       # 3 histórias - Ambiente de Edição e CI/CD
└── epic-05-autenticacao/   # 3 histórias - Gestão de Acesso e Autenticação
```

**Total:** 21 histórias com 103 tarefas técnicas detalhadas

## Ordem de Implementação

### Fase 1: Épicos 1-4 (Sequencial)
1. **Epic 1** - Fundação (Stories 1.1 → 1.7)
2. **Epic 2** - Feedback (Stories 2.1 → 2.4)
3. **Epic 3** - Dados (Stories 3.1 → 3.4)
4. **Epic 4** - CMS/CI/CD (Stories 4.1 → 4.3)

### Fase 2: Epic 5 (Final)
5. **Epic 5** - Autenticação (Stories 5.1 → 5.3)

> **Nota:** Epic 5 (Autenticação) é propositalmente diferido para a fase final. Durante o desenvolvimento inicial (Epics 1-4), documentos podem ser testados com visibilidade "Pública".

## Formato das Histórias

Cada história segue o template:
- **User Story:** Descrição no formato "Como [papel], eu quero [feature] para que [benefício]"
- **Acceptance Criteria:** Lista de critérios de aceitação (checkboxes)
- **Technical Tasks:** Tarefas técnicas detalhadas com comandos e file paths
- **Notes:** Notas adicionais e considerações
- **References:** Links para PRD e Architecture

## Dependências entre Stories

### Epic 1 - Fundação
- Story 1.1: Nenhuma (primeira história)
- Story 1.2: Depende de 1.1
- Story 1.3: Depende de 1.1, 1.2
- Story 1.4: Depende de 1.2, 1.3
- Story 1.5: Depende de 1.3, 1.4
- Story 1.6: Depende de 1.2, 1.3, 1.5
- Story 1.7: Depende de 1.5, 1.6

### Epic 2 - Feedback
- Story 2.1: Depende de 1.2 (shadcn components)
- Story 2.2: Depende de 2.1
- Story 2.3: Depende de 2.2
- Story 2.4: Depende de 1.4

### Epic 3 - Dados
- Story 3.1: Nenhuma (pode ser paralela a Epics 1-2)
- Story 3.2: Depende de 1.2 (shadcn setup)
- Story 3.3: Depende de 3.1, 3.2
- Story 3.4: Depende de 3.3

### Epic 4 - CMS/CI/CD
- Story 4.1: Depende de 1.3 (estrutura de conteúdo)
- Story 4.2: Depende de 4.1
- Story 4.3: Depende de 1.1 (projeto base)

### Epic 5 - Autenticação
- Story 5.1: Depende de todas as histórias anteriores
- Story 5.2: Depende de 5.1
- Story 5.3: Depende de 5.1, 5.2

## Oportunidades de Paralelização

Algumas histórias podem ser trabalhadas em paralelo por diferentes desenvolvedores:
- Story 1.2 e 1.3 (com boa comunicação)
- Story 2.1 e 3.2 (componentes independentes)
- Story 4.1 e 4.3 (TinaCMS e CI/CD são relativamente independentes)

## Métricas

- **Total de Histórias:** 21
- **Total de Tarefas Técnicas:** 103
- **Épicos:** 5
- **Tempo Estimado Total:** ~90-110 horas
- **Cobertura de Requisitos:** 100% (10 FRs + 7 NFRs)

## Referências

- **PRD:** [../PR.md](../PR.md)
- **Architecture:** [../Arquitetura.md](../Arquitetura.md)
- **Readiness Report:** [../implementation-readiness-report-2025-11-06.md](../implementation-readiness-report-2025-11-06.md)

## Status

✅ **Todas as histórias extraídas do PRD e prontas para sprint planning**

Para iniciar o sprint planning, execute:
```bash
/bmad:bmm:workflows:sprint-planning
```

---

_Histórias extraídas do PRD em 2025-11-06 por Winston (Architect agent)_
