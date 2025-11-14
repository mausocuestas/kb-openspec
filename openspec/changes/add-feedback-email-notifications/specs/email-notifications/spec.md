## ADDED Requirements

### Requirement: Email Notification on Feedback Submission
The system SHALL send automated email notifications to content curators when new feedback is submitted.

#### Scenario: Successful email notification
- **WHEN** a feedback is successfully saved to the database
- **THEN** the system sends an email notification to the configured curator email address
- **AND** the email contains feedback rating, comment, page URL, page title, and timestamp
- **AND** the email is formatted in a clear, readable manner

#### Scenario: Email includes rating indicator
- **WHEN** feedback has a positive rating
- **THEN** the email displays "👍 Útil" in the evaluation field
- **WHEN** feedback has a negative rating
- **THEN** the email displays "👎 Não útil" in the evaluation field

#### Scenario: Email includes comment handling
- **WHEN** feedback includes a comment
- **THEN** the email displays the full comment text
- **WHEN** feedback has no comment
- **THEN** the email displays "Nenhum comentário fornecido"

### Requirement: Non-Blocking Email Delivery
The system SHALL ensure email failures do not prevent feedback submission from succeeding.

#### Scenario: Email service unavailable
- **WHEN** the email service is unavailable or returns an error
- **THEN** the system logs the error
- **AND** the feedback is still saved successfully to the database
- **AND** the API returns success response to the user

#### Scenario: Email delivery logging
- **WHEN** email is sent successfully
- **THEN** the system logs the success with feedback ID and recipient
- **WHEN** email sending fails
- **THEN** the system logs the error with details for debugging

### Requirement: Email Service Configuration
The system SHALL use Resend as the transactional email service with proper configuration.

#### Scenario: Environment configuration
- **WHEN** the API endpoint is invoked
- **THEN** the system reads RESEND_API_KEY from environment variables
- **AND** reads FEEDBACK_NOTIFICATION_EMAIL for the recipient address
- **AND** validates both variables are configured before attempting to send

#### Scenario: Missing configuration handling
- **WHEN** RESEND_API_KEY or FEEDBACK_NOTIFICATION_EMAIL is not configured
- **THEN** the system logs a warning about missing email configuration
- **AND** skips email sending without throwing an error
- **AND** feedback submission continues successfully