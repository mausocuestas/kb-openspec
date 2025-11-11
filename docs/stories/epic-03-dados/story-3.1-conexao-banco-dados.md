# Story 3.1: Configuração da Conexão com o Banco de Dados

**Epic:** Épico 3 - Integração e Visualização de Dados
**Priority:** High
**Estimated Effort:** 3 horas
**Dependencies:** Nenhuma (pode ser paralela a Epics 1-2)

## User Story

Como um **sistema**, eu quero **conectar ao banco de dados Neon PostgreSQL** para que **possa buscar dados epidemiológicos para os gráficos**.

## Acceptance Criteria

- [ ] Driver PostgreSQL (pg) instalado
- [ ] Credenciais de acesso configuradas em `.env`
- [ ] Módulo `src/lib/db.ts` criado
- [ ] Função de busca de dados implementada
- [ ] Conexão testada com query simples
- [ ] Script de teste validado

## Technical Tasks

- [ ] **3.1.1: Identificar e Instalar Driver do BD:**
  - Confirmar o tipo de banco de dados (e.g., PostgreSQL) e instalar o driver Node.js correspondente (e.g., `pnpm install pg`).

- [ ] **3.1.2: Configurar Variáveis de Ambiente:**
  - Adicionar as credenciais de acesso ao banco de dados de forma segura em um arquivo `.env`.

- [ ] **3.1.3: Criar Módulo de Conexão:**
  - Desenvolver um módulo em `src/lib/db.ts` para gerenciar a conexão com o banco de dados.
  - Exportar uma função para buscar os dados necessários para os gráficos.

- [ ] **3.1.4: Testar Conexão:**
  - Criar um script de teste para executar uma query simples e validar a conexão.

## Notes

- Usar Neon PostgreSQL conforme especificado na arquitetura
- Connection string deve estar em DATABASE_URL no .env
- Implementar connection pooling se necessário
- Tratar erros de conexão gracefully
- Esta história é pré-requisito para Stories 3.2-3.4

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 3.1](../PR.md#história-31-configuração-da-conexão-com-o-banco-de-dados)
- Architecture: [Tech Stack - Neon PostgreSQL](../Arquitetura.md#3-tech-stack-versão-20---revisada)
- Architecture: [Environment Variables - DATABASE_URL](../Arquitetura.md#7-fluxo-de-trabalho-de-desenvolvimento-e-implantação)
