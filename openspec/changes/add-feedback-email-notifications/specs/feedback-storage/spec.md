## MODIFIED Requirements

### Requirement: Feedback Submission Endpoint
The system SHALL provide an API endpoint for submitting user feedback on documents and trigger email notifications.

#### Scenario: Successful feedback submission with notification
- **WHEN** a user submits valid feedback
- **THEN** the system saves the feedback to the database
- **AND** sends an email notification to content curators
- **AND** returns a success response regardless of email delivery status

#### Scenario: Feedback saved despite email failure
- **WHEN** feedback is submitted and database save succeeds
- **AND** email notification fails to send
- **THEN** the system logs the email error
- **AND** returns HTTP 201 success to the user
- **AND** feedback remains saved in the database