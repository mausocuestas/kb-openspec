# Proposta de Alteração: Exibição de Metadados de Documentos

## Descrição da Mudança
Esta proposta visa adicionar a exibição dos metadados do frontmatter (como `status`, `version`, `last_updated`, `author`) logo abaixo do título principal de cada página de documento.

## Motivação
Atualmente, informações cruciais sobre a governança de um documento (como seu status, versão e data de atualização) não estão imediatamente visíveis para o usuário. Exibir esses metadados de forma proeminente melhora a transparência e a confiança no conteúdo, permitindo que os profissionais de saúde avaliem rapidamente a relevância e a atualidade do documento.

## Implementação Proposta

### 1. Local da Alteração
A alteração principal será focada no componente `src/components/DocumentMetadata.astro`. Este componente será responsável por extrair e renderizar os metadados.

### 2. Extração de Metadados
O componente irá acessar os metadados do frontmatter da página atual, que já são disponibilizados pelo Astro.

```astro
---
// src/components/DocumentMetadata.astro
const { frontmatter } = Astro.props;
---
```

### 3. Renderização dos Metadados
Os metadados serão exibidos como uma série de "badges" ou "tags" utilizando o componente `Badge` de `shadcn/ui`. Isso garante consistência visual com o design system existente.

Exemplo de como os metadados seriam renderizados:

```html
<div class="flex items-center gap-2 mt-2 mb-4 text-sm text-gray-500">
  {frontmatter.status && <Badge variant="outline">Status: {frontmatter.status}</Badge>}
  {frontmatter.version && <Badge variant="outline">Versão: {frontmatter.version}</Badge>}
  {frontmatter.last_updated && <Badge variant="outline">Atualizado em: {new Date(frontmatter.last_updated).toLocaleDateString('pt-BR')}</Badge>}
  {frontmatter.author && <Badge variant="outline">Autor: {frontmatter.author}</Badge>}
</div>
```

### 4. Integração no Layout
O componente `DocumentMetadata.astro` será então inserido no layout principal dos documentos (provavelmente em `src/layouts/DocLayout.astro` ou similar, que é o layout padrão do Starlight), logo após o título do documento (`<h1>`).

Isso garantirá que os metadados apareçam de forma consistente em todas as páginas de documentação.
