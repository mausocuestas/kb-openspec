# Change: Add Email Notifications for Feedback Submissions

## Why
Content curators and managers need to be notified when users submit feedback on documents to respond quickly and keep content updated based on user input. Currently, feedback is stored but curators have no visibility into new submissions.

## What Changes
- Integrate Resend email service for transactional emails
- Send automated email notifications to curators when feedback is submitted
- Include feedback details (rating, comment, page URL, timestamp) in notifications
- Add environment variable for curator notification email address
- **BREAKING**: None - this extends existing feedback functionality

## Impact
- Affected specs: email-notifications, feedback-storage (modified)
- Affected code: src/pages/api/feedback.ts (email integration after DB save)
- New dependencies: resend (already installed)
- New environment variables: RESEND_API_KEY, FEEDBACK_NOTIFICATION_EMAIL