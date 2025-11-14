# Change: Display Document Metadata

## Why
Document metadata (status, version, last_updated, author) is not immediately visible to users, making it difficult for healthcare professionals to quickly assess the relevance and currency of documents.

## What Changes
- Add metadata display component to show document governance information
- Display metadata as badges below the document title
- **BREAKING**: None - this is an additive feature

## Impact
- Affected specs: document-display
- Affected code: DocumentMetadata.astro, PageTitle.astro