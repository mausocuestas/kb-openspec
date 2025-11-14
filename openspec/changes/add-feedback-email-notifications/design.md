# Design: Email Notifications for Feedback

## Context
Healthcare content curators need timely notifications when users provide feedback on documents to maintain content quality and responsiveness. The feedback is currently stored in the database but there's no proactive notification mechanism.

## Goals / Non-Goals
- Goals:
  - Send email notifications immediately after feedback is saved
  - Include all relevant feedback information in a clear format
  - Use reliable transactional email service (Resend)
  - Handle email failures gracefully without blocking feedback submission
- Non-Goals:
  - Email templates with complex HTML/CSS
  - Digest emails (batching multiple feedbacks)
  - User responses via email (future feature)
  - Email tracking/analytics

## Decisions
- Email Service: Resend (simple, reliable, already installed)
- Notification Timing: Immediate (fire-and-forget after DB save)
- Error Handling: Log failures but don't block feedback submission
- Email Format: Simple text-based with clear structure
- Configuration: Environment variables for API key and recipient email

### Technical Architecture
```
Feedback Submission Flow:
1. API receives feedback
2. Validate and save to database
3. Send email notification (async, non-blocking)
   - If email fails: log error, continue
   - If email succeeds: log success
4. Return success response to user
```

## Email Template Structure
```
Subject: Novo Feedback Recebido - [Page Title]

Body:
Novo feedback foi submetido na Base de Conhecimento:

📄 Documento: [Page Title]
🔗 URL: [Page URL]
⏰ Data: [Timestamp]

Avaliação: [👍 Útil / 👎 Não útil]

Comentário:
[User comment or "Nenhum comentário fornecido"]

---
Este é um email automático da Base de Conhecimento.
```

## Risks / Trade-offs
- Email delivery failures → Log and monitor, don't block user feedback
- Spam to curators if high volume → Future: implement digest mode
- API key exposure → Secure via environment variables
- Email service costs → Resend free tier: 3000 emails/month (sufficient)

## Migration Plan
1. Add RESEND_API_KEY and FEEDBACK_NOTIFICATION_EMAIL to environment
2. Implement email sending function in API endpoint
3. Add try-catch to ensure email failures don't break feedback flow
4. Test with sample feedback submission
5. Monitor email delivery in production

## Open Questions
- Should we send one email per feedback or batch them?
  → Decision: Start with immediate, one per feedback
- What email address should be the sender?
  → Use noreply@[domain] or configured sender in Resend
- Should we include IP address in notifications for spam detection?
  → Yes, include in email body for curator reference