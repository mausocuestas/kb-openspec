## ADDED Requirements
### Requirement: Document Metadata Display
The system SHALL display document metadata below the title of each document page.

#### Scenario: Metadata displayed for document with all fields
- **WHEN** a document has status, version, last_updated, and author metadata
- **THEN** all metadata fields are displayed as badges below the title

#### Scenario: Metadata displayed for document with partial fields
- **WHEN** a document has only some metadata fields (e.g., only version and last_updated)
- **THEN** only the available metadata fields are displayed as badges

#### Scenario: No metadata displayed for document without metadata
- **WHEN** a document has no metadata fields
- **THEN** no metadata badges are displayed

#### Scenario: Metadata formatting
- **WHEN** metadata is displayed
- **THEN** dates are formatted in Brazilian Portuguese format (dd/mm/yyyy)
- **AND** metadata is displayed using shadcn Badge components
- **AND** badges are styled consistently with the design system