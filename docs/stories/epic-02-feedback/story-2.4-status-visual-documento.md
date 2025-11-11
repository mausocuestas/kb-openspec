# Story 2.4: Implementação do Status Visual de Documento

**Epic:** Épico 2 - Implementação do Sistema de Feedback e Governança
**Priority:** Medium
**Estimated Effort:** 4 horas
**Dependencies:** Story 1.4

## User Story

Como um **profissional de saúde**, eu quero **identificar visualmente o status dos documentos** para que **possa confiar que estou usando informação válida e atualizada**.

## Acceptance Criteria

- [ ] Banner "Revogado" refinado e acessível (WCAG AA)
- [ ] Componente `StatusBadge.astro` criado com shadcn Badge
- [ ] Mapeamento de status para cores/variants implementado
- [ ] Ícones apropriados para cada status
- [ ] Badge integrado no componente `DocumentMetadata.astro`
- [ ] Todos os status validados visualmente
- [ ] Design responsivo em diferentes tamanhos de tela

## Technical Tasks

- [ ] **2.4.1: Refinar Banner de 'Revogado' usando shadcn Alert (FR7):**
  - Garantir que o `Alert` do shadcn para o status 'Revogado' (da História 1.4.4) seja claro, acessível e responsivo.
  - Validar contraste de cores (WCAG AA).

- [ ] **2.4.2: Criar Componente de Badge para Status (usando shadcn):**
  - Criar um componente `StatusBadge.astro` baseado no `Badge` do shadcn.
  - O componente deve aceitar o `status` como propriedade.
  - Mapear status para variants do Badge:
    - 'Rascunho' → variant="secondary" + cor cinza
    - 'Publicado' → variant="default" + cor verde
    - 'Revisão' → variant="outline" + cor amarela
    - 'Revogado' → variant="destructive" + cor vermelha
  - Adicionar ícones correspondentes (lucide-react: FileEdit, Check, AlertCircle, XCircle).

- [ ] **2.4.3: Integrar Badge na UI:**
  - Adicionar o `StatusBadge.astro` ao componente `DocumentMetadata.astro`, passando o status do documento.
  - Posicionar ao lado do título ou dentro do Card de metadados.

- [ ] **2.4.4: Validar Exibição dos Status:**
  - Criar documentos de exemplo com cada um dos status.
  - Verificar se os badges e o Alert são exibidos corretamente para cada caso.
  - Testar responsividade em diferentes tamanhos de tela.

## Notes

- Cores devem ser consistentes com identidade visual (Story 1.2)
- Status "Revogado" é mais crítico - merece Alert além de Badge
- Ícones ajudam reconhecimento rápido
- Validar acessibilidade: contraste, screen readers, navegação por teclado

## References

- PRD Section: [4. Detalhamento dos Épicos e Histórias - História 2.4](../PR.md#história-24-implementação-do-status-visual-de-documento)
- Architecture: [Component Strategy - Badge, Alert](../Arquitetura.md#35-estratégia-de-componentização-com-shadcn-studio-pro)
- FR7 (Status Banner): Exibir banner de alerta visual para documentos com status "Revogado"
- NFR7 (Componentização): WCAG 2.1 AA compliance
