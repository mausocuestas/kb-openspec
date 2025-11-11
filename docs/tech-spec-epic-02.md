# Epic Technical Specification: Implementação do Sistema de Feedback e Governança

Date: 2025-11-09
Author: mauso
Epic ID: 02
Status: Draft

---

## Overview

Epic 2 implements the user feedback and document governance system for the Public Health Knowledge Base, building on the foundation established in Epic 1. This epic introduces the first user-interactive features of the platform, enabling healthcare professionals to submit feedback (positive/negative ratings with comments) on documents and establishing visual governance indicators for document lifecycle status.

The primary deliverables include: a reusable feedback component built with shadcn UI elements, backend API endpoints for feedback submission and storage in Neon PostgreSQL, email notification workflow via Resend to alert curators of new feedback, and enhanced document status visualization with prominent alerts for revoked documents. This epic directly addresses PRD requirements FR4 (Feedback Interface), FR5 (Curator Notifications), and FR7 (Status Visualization), while supporting the overarching goal of continuous improvement through direct user-to-curator communication channels.

## Objectives and Scope

**In Scope:**
- Feedback UI component with thumbs up/down buttons and optional comment field using shadcn Button, Textarea, and Toast (Story 2.1)
- Client-side feedback submission logic and validation (Story 2.1)
- Backend API endpoint `POST /api/feedback` for receiving and storing feedback (Story 2.2)
- Database schema and table creation for `feedbacks` table in Neon PostgreSQL (Story 2.2)
- Server-side email notification workflow using Resend API to notify curators when feedback is submitted (Story 2.3)
- Enhanced document status badges with visual hierarchy (Story 2.4)
- Prominent alert banner (shadcn Alert component, destructive variant) for "Revogado" status documents (Story 2.4)
- Integration of feedback component into document page layout (non-intrusive positioning)

**Out of Scope (Deferred to Later Epics or Future Iterations):**
- Curator dashboard for viewing aggregated feedback (future enhancement)
- Feedback moderation or approval workflow (assumed all feedback is valid)
- Sentiment analysis or automated categorization of comments (future enhancement)
- User authentication for feedback submission (Epic 5 will add auth, feedback will be anonymous in Epic 2)
- Feedback analytics or reporting (future enhancement)
- Email templates with rich HTML formatting (using plain text/simple HTML in Epic 2)
- Multi-language support for notifications (Portuguese only)

**Success Criteria:**
- Feedback component renders correctly on all document pages without layout disruption
- Users can successfully submit feedback (thumbs up/down + comment) and receive confirmation
- All feedback submissions are persisted to database with correct metadata (document path, timestamp, rating, comment)
- Curator receives email notification within 5 minutes of feedback submission
- "Revogado" status documents display prominent, visually distinct alert banner
- All status badges follow consistent color coding and iconography established in Epic 1
- WCAG 2.1 AA accessibility maintained for all new interactive elements

## System Architecture Alignment

This epic extends the Jamstack architecture with the first server-side API endpoints and database integration:

**Backend API Layer (NEW):**
- Astro API routes in `src/pages/api/` directory
- `POST /api/feedback` endpoint using Astro's server-side rendering capabilities
- Node.js runtime for server-side execution (Vercel Serverless Functions)
- Integration with Neon PostgreSQL via `postgres` (node-postgres) client library

**Database Layer (NEW):**
- Neon PostgreSQL database (version 17) hosted on Neon cloud platform
- `feedbacks` table with schema: id (serial), document_path (text), rating (boolean), comment (text), submitted_at (timestamp)
- Connection pooling via Neon's serverless driver for optimal performance
- Database credentials managed via environment variables (DATABASE_URL)

**Email Notification Service (NEW):**
- Resend API integration for transactional email delivery
- Curator email address stored in environment variable (FEEDBACK_NOTIFICATION_EMAIL)
- Email content includes: document title, document path, rating (👍/👎), comment text, timestamp
- Resend API key stored securely in environment variables (RESEND_API_KEY)

**Frontend Enhancement:**
- Feedback component (`FeedbackWidget.astro`) integrated into document page layout
- Client-side interactivity using minimal JavaScript for form submission
- shadcn Toast component for user feedback confirmation
- shadcn Alert component (destructive variant) for "Revogado" document banners

**Architecture Constraints:**
- API endpoints must be stateless (serverless-friendly)
- Database connections must use connection pooling (Neon serverless driver)
- Email sending must be asynchronous (non-blocking for user experience)
- All environment variables must follow secure storage practices (no hardcoding)

**Component Stack Additions:**
- shadcn components: Textarea, Toast (new in Epic 2)
- Database client: `postgres` (node-postgres) version ^8.x
- Email service: Resend SDK latest version
- Validation library: Zod ^3.x (already present from Epic 1)

## Detailed Design

### Services and Modules

Epic 2 introduces backend services and database integration alongside frontend components:

| Module/Component | Responsibility | Inputs | Outputs | Owner/Location |
|:-----------------|:---------------|:-------|:--------|:---------------|
| `FeedbackWidget.astro` | Reusable feedback UI component with thumbs up/down and comment field | Document metadata (path, title) from page context | Rendered feedback form with submit handler | `src/components/` |
| `POST /api/feedback` | API endpoint for receiving feedback submissions | Request body: { documentPath, rating, comment } | Response: { success: boolean, message: string } | `src/pages/api/feedback.ts` |
| Database Connection Module | Manages Neon PostgreSQL connection pooling | DATABASE_URL environment variable | Connected postgres client instance | `src/lib/db.ts` |
| Email Notification Service | Sends curator notifications via Resend API | Feedback data object | Email send result | `src/lib/email.ts` |
| `RevokedDocumentAlert.astro` | Prominent alert banner for revoked documents | Document status from frontmatter | Rendered Alert component (shadcn) | `src/components/` |
| `EnhancedStatusBadge.astro` | Improved status badge with visual hierarchy | Document status enum | Colored badge with icon (shadcn Badge) | `src/components/` (enhanced from Epic 1) |
| Feedback Validation Schema | Zod schema for validating feedback submissions | Raw request data | Validated or error thrown | `src/lib/validation.ts` |

**Component Hierarchy:**

```
Document Page Layout
├── DocumentMetadata (from Epic 1)
│   ├── EnhancedStatusBadge.astro (improved)
│   └── ... other metadata
├── RevokedDocumentAlert.astro (if status === 'Revogado')
│   └── Alert (shadcn, destructive variant)
├── Document Content (MDX)
└── FeedbackWidget.astro
    ├── Button (shadcn) - Thumbs Up
    ├── Button (shadcn) - Thumbs Down
    ├── Textarea (shadcn) - Comment field
    └── Toast (shadcn) - Confirmation message
```

**Backend Service Flow:**

```
Client (Browser)
    ↓ POST request
API Endpoint (/api/feedback.ts)
    ↓ validates input (Zod)
    ↓ stores in database
Database Connection Module (db.ts)
    ↓ INSERT into feedbacks table
Neon PostgreSQL
    ↓ success response
Email Notification Service (email.ts)
    ↓ sends email
Resend API
    ↓ delivers to curator
Curator Email Inbox
```

### Data Models and Contracts

**Database Schema** - `feedbacks` table (Neon PostgreSQL):

```sql
CREATE TABLE IF NOT EXISTS feedbacks (
  id SERIAL PRIMARY KEY,
  document_path TEXT NOT NULL,
  document_title TEXT,
  rating BOOLEAN NOT NULL,  -- true = 👍 (positive), false = 👎 (negative)
  comment TEXT,
  user_email TEXT,  -- NULL for anonymous (Epic 2), populated in Epic 5
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,  -- Browser user agent for analytics
  ip_address TEXT   -- For abuse prevention (anonymized)
);

-- Indexes for query performance
CREATE INDEX idx_feedbacks_document_path ON feedbacks(document_path);
CREATE INDEX idx_feedbacks_submitted_at ON feedbacks(submitted_at DESC);
```

**TypeScript Interfaces:**

```typescript
// Feedback submission payload (client → API)
interface FeedbackSubmissionPayload {
  documentPath: string;      // e.g., "/protocolos/covid-19"
  documentTitle: string;      // e.g., "Protocolo de Atendimento COVID-19"
  rating: boolean;            // true = positive, false = negative
  comment?: string;           // Optional comment (max 1000 chars)
}

// Feedback record (database model)
interface FeedbackRecord {
  id: number;
  document_path: string;
  document_title: string | null;
  rating: boolean;
  comment: string | null;
  user_email: string | null;
  submitted_at: Date;
  user_agent: string | null;
  ip_address: string | null;
}

// API response
interface FeedbackAPIResponse {
  success: boolean;
  message: string;
  error?: string;  // Present only on failure
}

// Email notification payload
interface CuratorNotificationPayload {
  documentTitle: string;
  documentPath: string;
  rating: boolean;
  comment: string | null;
  submittedAt: Date;
  documentUrl: string;  // Full URL to document
}
```

**Zod Validation Schema:**

```typescript
import { z } from 'zod';

export const feedbackSubmissionSchema = z.object({
  documentPath: z.string()
    .min(1, "Document path is required")
    .max(500, "Document path too long"),
  documentTitle: z.string()
    .min(1, "Document title is required")
    .max(200, "Document title too long"),
  rating: z.boolean({
    required_error: "Rating (thumbs up/down) is required"
  }),
  comment: z.string()
    .max(1000, "Comment cannot exceed 1000 characters")
    .optional()
    .transform(val => val?.trim() || null),
});

export type FeedbackSubmission = z.infer<typeof feedbackSubmissionSchema>;
```

**Enhanced Status Enum (Extended from Epic 1):**

```typescript
type DocumentStatus = 'Rascunho' | 'Publicado' | 'Revisão' | 'Revogado';

// Status configuration with enhanced visual properties
const statusConfig: Record<DocumentStatus, {
  variant: 'default' | 'secondary' | 'outline' | 'destructive';
  color: string;
  icon: string;
  showAlert: boolean;
  alertMessage?: string;
}> = {
  'Rascunho': {
    variant: 'secondary',
    color: 'gray',
    icon: 'FileEdit',
    showAlert: false
  },
  'Publicado': {
    variant: 'default',
    color: 'green',
    icon: 'Check',
    showAlert: false
  },
  'Revisão': {
    variant: 'outline',
    color: 'yellow',
    icon: 'AlertCircle',
    showAlert: false
  },
  'Revogado': {
    variant: 'destructive',
    color: 'red',
    icon: 'XCircle',
    showAlert: true,
    alertMessage: '⚠️ Este documento foi revogado e não deve mais ser utilizado. Consulte a versão atualizada.'
  },
};
```

### APIs and Interfaces

**API Endpoint: POST /api/feedback**

**Request Specification:**

```
POST /api/feedback
Content-Type: application/json

{
  "documentPath": "/protocolos/covid-19",
  "documentTitle": "Protocolo de Atendimento COVID-19",
  "rating": true,
  "comment": "Documento muito útil, mas poderia incluir mais exemplos práticos."
}
```

**Response Specification:**

Success (HTTP 200):
```json
{
  "success": true,
  "message": "Feedback recebido com sucesso. Obrigado pela sua contribuição!"
}
```

Validation Error (HTTP 400):
```json
{
  "success": false,
  "message": "Dados inválidos",
  "error": "Comment cannot exceed 1000 characters"
}
```

Server Error (HTTP 500):
```json
{
  "success": false,
  "message": "Erro ao processar feedback. Tente novamente mais tarde.",
  "error": "Database connection failed"
}
```

**API Implementation Details:**

- **Authentication**: None (anonymous feedback in Epic 2; Epic 5 will add auth)
- **Rate Limiting**: Not implemented in Epic 2 (future enhancement)
- **CORS**: Configured to accept same-origin requests only
- **Request Size Limit**: 10KB maximum payload
- **Timeout**: 10 seconds for database + email operations
- **Error Handling**: All errors logged server-side; sanitized messages returned to client

**Database Interface (postgres client):**

```typescript
// src/lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
  max: 10,  // Maximum 10 connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export async function insertFeedback(
  feedback: FeedbackSubmission,
  metadata: { userAgent: string; ipAddress: string }
): Promise<number> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO feedbacks
       (document_path, document_title, rating, comment, user_agent, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        feedback.documentPath,
        feedback.documentTitle,
        feedback.rating,
        feedback.comment,
        metadata.userAgent,
        metadata.ipAddress,
      ]
    );
    return result.rows[0].id;
  } finally {
    client.release();
  }
}
```

**Email Service Interface (Resend):**

```typescript
// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendCuratorNotification(
  payload: CuratorNotificationPayload
): Promise<void> {
  const ratingEmoji = payload.rating ? '👍 Positivo' : '👎 Negativo';

  await resend.emails.send({
    from: 'Base de Conhecimento <noreply@seu-dominio.com>',
    to: import.meta.env.FEEDBACK_NOTIFICATION_EMAIL,
    subject: `Novo Feedback: ${payload.documentTitle}`,
    text: `
Novo feedback recebido:

Documento: ${payload.documentTitle}
URL: ${payload.documentUrl}
Avaliação: ${ratingEmoji}
Comentário: ${payload.comment || '(sem comentário)'}
Data: ${payload.submittedAt.toLocaleString('pt-BR')}

---
Enviado automaticamente pelo sistema de feedback da Base de Conhecimento.
    `.trim(),
  });
}
```

### Workflows and Sequencing

**User Journey 1: Submitting Positive Feedback**

```
1. User reads document page
2. User scrolls to FeedbackWidget component (bottom of page)
3. User clicks "👍 Útil" button (shadcn Button)
4. System displays Textarea for optional comment
5. User types comment: "Muito útil, obrigado!"
6. User clicks "Enviar Feedback" button
7. Client-side JavaScript:
   - Disables submit button (prevents double-submit)
   - Validates input (comment length < 1000 chars)
   - Sends POST request to /api/feedback
8. Server-side API endpoint:
   - Validates payload with Zod schema
   - Connects to Neon PostgreSQL
   - Inserts feedback record to database
   - Calls email service to notify curator
   - Returns success response
9. Client receives success response:
   - Displays Toast notification: "✓ Feedback enviado. Obrigado!"
   - Hides feedback form (prevents duplicate submissions)
10. Curator receives email notification within 5 minutes
```

**User Journey 2: Viewing Revoked Document**

```
1. User navigates to document with status = "Revogado"
2. System renders page with:
   - Standard header/sidebar navigation
   - DocumentMetadata component showing:
     - Version badge
     - EnhancedStatusBadge (red, "Revogado", XCircle icon)
   - RevokedDocumentAlert component (prominent, at top of content):
     - Alert (shadcn, destructive variant)
     - Icon: AlertTriangle (lucide-react)
     - Message: "⚠️ Este documento foi revogado..."
     - Optional: Link to replacement document
3. User sees clear visual warning before reading content
4. User may still access document content (read-only)
5. FeedbackWidget is still present (users can report issues)
```

**Backend Process Flow: Feedback Submission**

```
POST /api/feedback receives request
    ↓
1. Extract request body and headers
   - documentPath, documentTitle, rating, comment
   - User-Agent header
   - IP address (X-Forwarded-For or remoteAddress)
    ↓
2. Validate payload with Zod schema
   - If invalid → return HTTP 400 with error
    ↓
3. Connect to Neon PostgreSQL via pool
   - If connection fails → return HTTP 500
    ↓
4. Execute INSERT query
   - If database error → return HTTP 500
   - If success → continue
    ↓
5. Trigger email notification (async, non-blocking)
   - Construct CuratorNotificationPayload
   - Call sendCuratorNotification()
   - If email fails → log error but still return success to user
    ↓
6. Return HTTP 200 success response
    ↓
7. Email service (parallel process):
   - Resend API sends email
   - Curator receives notification
```

**Build-Time vs Runtime Execution:**

Epic 2 introduces **runtime server-side execution** (different from Epic 1's build-time only approach):

| Feature | Execution Time | Environment |
|:--------|:---------------|:------------|
| FeedbackWidget component rendering | Build-time (SSG) | Astro build process |
| Feedback submission API | Runtime | Vercel Serverless Function |
| Database INSERT operation | Runtime | Neon PostgreSQL cloud |
| Email sending | Runtime | Resend API |
| RevokedDocumentAlert rendering | Build-time (SSG) | Astro build process |

## Non-Functional Requirements

### Performance

**Target Metrics:**

| Metric | Target | Measurement Method |
|:-------|:-------|:-------------------|
| API Response Time (POST /api/feedback) | < 500ms (p95) | Server-side logging |
| Database INSERT latency | < 200ms | Neon dashboard monitoring |
| Email sending latency | < 3 seconds | Resend API metrics |
| FeedbackWidget render time | < 100ms | Lighthouse performance audit |
| Page load impact (with widget) | No degradation vs Epic 1 | Comparative Lighthouse scores |
| Toast notification display | < 50ms after API response | User perception testing |

**Implementation Strategy:**

- **Database Performance:**
  - Use Neon's serverless driver with connection pooling (max 10 connections)
  - Parameterized queries to prevent SQL injection and enable query plan caching
  - Database indexes on `document_path` and `submitted_at` columns
  - Monitor query execution time via Neon dashboard

- **API Optimization:**
  - Email sending runs asynchronously (non-blocking for user response)
  - If email fails, still return success to user (email failure logged but doesn't block feedback)
  - Minimal validation overhead (Zod schema optimized for performance)
  - Connection pooling prevents connection overhead per request

- **Frontend Performance:**
  - FeedbackWidget uses client-side hydration only when needed (Astro island pattern)
  - Toast component lazy-loaded (not in initial bundle unless feedback submitted)
  - Form validation runs client-side before API call (reduces unnecessary requests)
  - Submit button disabled during API call prevents double-submit overhead

**Performance Degradation Scenarios:**

- **High Feedback Volume**: If feedback submissions exceed 100/minute, database connection pool may saturate
  - **Mitigation**: Monitor pool usage; increase pool size or implement queue system if needed
- **Resend API Latency**: Email sending may take >3s during peak times
  - **Mitigation**: Already async; user experience unaffected; consider retry mechanism

### Security

**API Security (POST /api/feedback):**

- **Input Validation**: All inputs validated with Zod schema before database insertion
  - Prevents SQL injection via parameterized queries (postgres client)
  - Comment length limited to 1000 chars (prevents DoS via large payloads)
  - Document path validated as string (prevents path traversal attacks)

- **Data Sanitization**:
  - User comments stored as-is (no HTML rendering in curator emails = no XSS risk)
  - IP addresses anonymized (last octet zeroed: `192.168.1.0` instead of `192.168.1.123`)
  - User-Agent stored for analytics only (no sensitive data)

- **Anonymous Submission**:
  - No authentication required in Epic 2 (reduces friction, increases feedback volume)
  - `user_email` field NULL in database (will be populated in Epic 5)
  - Potential for spam/abuse acknowledged; moderation tools deferred to future

- **Environment Variable Security**:
  - `DATABASE_URL` contains database credentials (must be stored in Vercel environment variables)
  - `RESEND_API_KEY` secret key (must not be exposed in client-side code)
  - `FEEDBACK_NOTIFICATION_EMAIL` not sensitive but should not be hardcoded
  - All secrets loaded via `import.meta.env` (Astro's secure environment variable system)

- **CORS Configuration**:
  - API endpoints accept same-origin requests only
  - No cross-origin requests allowed (prevents external sites from submitting fake feedback)

- **Rate Limiting**:
  - Not implemented in Epic 2 (accepted risk)
  - **Future Enhancement**: Implement per-IP rate limiting (e.g., 10 submissions/hour)

**Database Security:**

- **Connection Security**:
  - Neon PostgreSQL enforces SSL/TLS connections by default
  - Connection string includes SSL parameters
  - No plaintext credentials in code (environment variables only)

- **Access Control**:
  - Database user has INSERT-only permissions on `feedbacks` table
  - No UPDATE or DELETE permissions (prevents accidental data loss)
  - Curator dashboard (future) will use separate read-only credentials

**Email Security:**

- **Resend API Authentication**:
  - API key-based authentication (not exposed to clients)
  - "From" address domain must be verified in Resend dashboard
  - SPF/DKIM records configured to prevent email spoofing

- **Content Security**:
  - Curator emails contain plain text only (no HTML = no email-based XSS)
  - User-submitted comments included verbatim (curator reviews all feedback manually)

### Reliability/Availability

**Target Availability:**

- **API Endpoint Uptime**: 99.5% (inherits Vercel Serverless Functions SLA)
- **Database Availability**: 99.95% (Neon's SLA for Pro tier)
- **Email Delivery Rate**: 98% (Resend's delivery rate)

**Failure Modes & Mitigation:**

| Failure Scenario | Impact | Mitigation | User Experience |
|:-----------------|:-------|:-----------|:----------------|
| Database connection timeout | Feedback not saved | Retry logic (3 attempts with exponential backoff) | Error message: "Erro ao salvar. Tente novamente." |
| Database INSERT error | Feedback not saved | Log error, return HTTP 500 | Error toast displayed to user |
| Email sending failure (Resend API down) | Curator not notified | Feedback still saved; error logged | User sees success (feedback saved), curator notified later via manual check |
| Neon database region outage | All feedback submissions fail | No automatic failover in Epic 2; manual intervention required | Users see error message |
| Vercel Serverless Function cold start | First request after idle period takes 1-2s | Acceptable latency; consider provisioned concurrency if critical | Slight delay on first feedback submission |

**Graceful Degradation:**

- **Email Failure**: If Resend API fails, feedback is still saved to database
  - Curators can manually query database for new feedback
  - Email notifications resume automatically when Resend recovers

- **Database Failure**: If Neon is unavailable, API returns HTTP 500
  - User receives clear error message
  - User can retry submission later
  - No data loss (feedback never partially saved)

**Data Durability:**

- **Database Backups**: Neon provides automated daily backups with 7-day retention
- **Point-in-Time Recovery**: Neon supports PITR for accidental data deletion
- **Replication**: Neon uses multi-AZ replication (3 replicas minimum)

### Observability

**Logging Strategy:**

Epic 2 introduces server-side logging for API endpoints and database operations:

- **API Request Logs** (Vercel Functions):
  - Log level: INFO for successful requests, ERROR for failures
  - Logged data: timestamp, HTTP method, path, status code, response time, IP address (anonymized)
  - Retention: 7 days in Vercel dashboard (free tier)
  - Sample log entry:
    ```
    [2025-11-09T14:23:45Z] INFO POST /api/feedback 200 324ms ip=192.168.1.0
    ```

- **Database Operation Logs**:
  - Log successful INSERTs: `Feedback saved: id=123, document=/protocolos/covid-19`
  - Log connection errors: `Database connection failed: timeout after 10s`
  - Logs stored in application logs (Vercel Functions stdout)

- **Email Notification Logs**:
  - Log successful sends: `Email sent to curator: feedbackId=123`
  - Log failures: `Email failed: Resend API error 500`
  - Include Resend message ID for tracking in Resend dashboard

**Metrics to Track:**

- **Feedback Submission Rate**:
  - Metric: Submissions per hour/day
  - Source: Database query (COUNT with GROUP BY date)
  - Use case: Identify high-traffic documents, monitor for spam

- **API Performance**:
  - Metric: P50, P95, P99 response times
  - Source: Vercel Analytics (automatic)
  - Alert threshold: P95 > 1 second

- **Database Connection Pool Usage**:
  - Metric: Active connections vs pool max
  - Source: Neon dashboard
  - Alert threshold: >80% pool utilization

- **Email Delivery Rate**:
  - Metric: Sent vs failed emails
  - Source: Resend dashboard
  - Alert threshold: Failure rate >5%

**Error Tracking:**

- **Unhandled Exceptions**:
  - Epic 2 uses basic console.error logging
  - **Future Enhancement**: Integrate Sentry or similar for production error tracking

- **User-Reported Errors**:
  - Users can submit negative feedback on error pages
  - Error messages logged client-side (browser console)

**Monitoring Dashboards:**

- **Vercel Dashboard**: API request volume, response times, error rates
- **Neon Dashboard**: Database query performance, connection pool usage, storage usage
- **Resend Dashboard**: Email delivery rate, bounce rate, spam complaints

**Alerting (Future Enhancement):**

Epic 2 does not include proactive alerting. Recommended for future:
- Alert if feedback API error rate >10% over 5 minutes
- Alert if database connection pool saturated
- Alert if email delivery rate drops below 95%

## Dependencies and Integrations

**New NPM Dependencies for Epic 2:**

```json
{
  "dependencies": {
    // Existing from Epic 1 (maintained)
    "astro": "^5.6.1",
    "@astrojs/starlight": "^0.36.2",
    "@astrojs/react": "^4.4.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^0.553.0",
    "tailwindcss": "^4.1.17",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "sharp": "^0.34.2",

    // NEW in Epic 2
    "pg": "^8.13.0",              // PostgreSQL client (node-postgres)
    "resend": "^4.0.0",           // Email service SDK
    "zod": "^3.23.0"              // Already present from Epic 1, used for validation
  }
}
```

**Dependency Analysis:**

| Dependency | Version | Purpose | Risk Level | Notes |
|:-----------|:--------|:--------|:-----------|:------|
| pg (node-postgres) | ^8.13.0 | PostgreSQL database client | Low | Mature library, widely used, stable API |
| resend | ^4.0.0 | Transactional email API | Medium | Newer service; monitor for API changes |
| zod | ^3.23.0 | Runtime schema validation | Low | Already in use from Epic 1 |

**External Service Dependencies:**

| Service | Purpose | Configuration Required | Cost Implications |
|:--------|:--------|:-----------------------|:------------------|
| **Neon PostgreSQL** | Feedback data storage | DATABASE_URL environment variable | Free tier: 3 GB storage, 100 hours compute/month; may need Pro tier ($19/month) for production |
| **Resend** | Curator email notifications | RESEND_API_KEY, verified sending domain | Free tier: 100 emails/day; Pro tier ($20/month) for 50k emails/month |
| **Vercel** | Serverless function hosting | Automatic with deployment | Free tier includes serverless functions; no changes from Epic 1 |

**Environment Variables Required:**

```bash
# .env.example (add to existing from Epic 1)

# Database Configuration
DATABASE_URL="postgresql://username:password@hostname.neon.tech/database?sslmode=require"

# Email Notification
RESEND_API_KEY="re_abc123xyz..."
FEEDBACK_NOTIFICATION_EMAIL="curadores@secretaria-saude.gov.br"
```

**Integration Points:**

- **Frontend ↔ API**: FeedbackWidget component sends POST requests to `/api/feedback`
- **API ↔ Database**: postgres client connects to Neon via connection pool
- **API ↔ Email Service**: Resend SDK sends emails via HTTPS API calls
- **No changes to existing Epic 1 integrations** (Pagefind, Starlight)

**Dependency Constraints:**

- **Node.js**: Requires Node.js 18+ (for native fetch in Astro API routes)
- **PostgreSQL**: Neon requires PostgreSQL 14+ drivers (pg@^8.x compatible)
- **Vercel Runtime**: Serverless functions must complete within 10s (Hobby tier) or 60s (Pro tier)

## Acceptance Criteria (Authoritative)

**AC1: Feedback Component Creation (Story 2.1)**
- FeedbackWidget.astro component exists in `src/components/`
- Component includes two shadcn Button elements: "👍 Útil" and "👎 Não útil"
- Component includes shadcn Textarea for optional comment (max 1000 characters)
- Component includes "Enviar Feedback" submit button
- Component integrated into document page layout (bottom of content, before footer)
- Component is visually consistent with site theme (follows shadcn design system)
- Component has hover states and focus indicators for accessibility
- Client-side validation prevents empty submissions and enforces character limit
- Toast notification (shadcn Toast) displays on successful submission
- Submit button disabled during API request to prevent double-submit

**AC2: Backend API Implementation (Story 2.2)**
- API endpoint exists at `src/pages/api/feedback.ts`
- Endpoint accepts POST requests with JSON payload: { documentPath, documentTitle, rating, comment }
- Input validation using Zod schema (feedbackSubmissionSchema) with descriptive error messages
- Successful submissions return HTTP 200 with JSON: { success: true, message: "..." }
- Validation errors return HTTP 400 with JSON: { success: false, error: "..." }
- Server errors return HTTP 500 with JSON: { success: false, message: "..." }
- Database connection module (`src/lib/db.ts`) uses connection pooling (max 10 connections)
- Feedback records stored in `feedbacks` table with all required fields (document_path, rating, comment, submitted_at, user_agent, ip_address)
- IP addresses anonymized (last octet zeroed) before storage
- Database INSERT operation completes in <200ms (p95)
- API response time <500ms (p95) including database write

**AC3: Database Schema (Story 2.2)**
- `feedbacks` table created in Neon PostgreSQL with correct schema:
  - `id` (SERIAL PRIMARY KEY)
  - `document_path` (TEXT NOT NULL)
  - `document_title` (TEXT)
  - `rating` (BOOLEAN NOT NULL)
  - `comment` (TEXT)
  - `user_email` (TEXT, NULL for Epic 2)
  - `submitted_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW())
  - `user_agent` (TEXT)
  - `ip_address` (TEXT)
- Indexes created on `document_path` and `submitted_at` columns
- Database connection uses SSL/TLS encryption
- Database user has INSERT-only permissions on feedbacks table

**AC4: Email Notification Workflow (Story 2.3)**
- Email service module (`src/lib/email.ts`) uses Resend SDK
- sendCuratorNotification function sends email on every feedback submission
- Email includes: document title, document URL, rating (👍/👎 emoji), comment text, timestamp
- Email sent to address specified in FEEDBACK_NOTIFICATION_EMAIL environment variable
- Email sending runs asynchronously (non-blocking for user response)
- If email fails, feedback still saved; error logged but user sees success message
- Curator receives email within 5 minutes of feedback submission (under normal conditions)
- Email subject format: "Novo Feedback: [Document Title]"
- Email body formatted in plain text with clear structure

**AC5: Enhanced Status Badge (Story 2.4)**
- EnhancedStatusBadge.astro component extends existing StatusBadge from Epic 1
- Visual hierarchy maintained from Epic 1 status configuration
- "Revogado" status displays in red with XCircle icon (lucide-react)
- Badge uses shadcn Badge component with destructive variant for "Revogado"
- All other statuses (Rascunho, Publicado, Revisão) maintain Epic 1 styling
- Status badge visible in DocumentMetadata component on all document pages

**AC6: Revoked Document Alert (Story 2.4)**
- RevokedDocumentAlert.astro component created
- Component uses shadcn Alert component with destructive variant
- Alert displays only when document status === "Revogado"
- Alert positioned at top of document content (before MDX body)
- Alert includes: AlertTriangle icon, warning message, optional link to replacement document
- Alert message: "⚠️ Este documento foi revogado e não deve mais ser utilizado. Consulte a versão atualizada."
- Alert is visually prominent (red background, high contrast)
- Alert does not block access to document content (informational, not restrictive)

**AC7: Accessibility Compliance (NFR7)**
- FeedbackWidget meets WCAG 2.1 AA standards:
  - All buttons have visible focus indicators
  - Form labels properly associated with inputs
  - Toast notifications announced to screen readers (aria-live region)
  - Color contrast ratios meet 4.5:1 minimum for normal text
  - Keyboard navigation works for all interactive elements
- RevokedDocumentAlert meets WCAG 2.1 AA standards:
  - Sufficient color contrast for warning text
  - Icon includes aria-label for screen reader users
  - Semantic HTML (proper use of <section> or <aside>)

**AC8: Performance Targets (NFR1)**
- API response time: p95 < 500ms (measured via Vercel Analytics)
- Database INSERT latency: < 200ms (measured via Neon dashboard)
- FeedbackWidget render time: < 100ms (Lighthouse audit)
- Page load time: No degradation compared to Epic 1 baseline (Lighthouse Performance score >90)
- Email sending: < 3 seconds (Resend API metrics)

**AC9: Security Validation (NFR6)**
- Environment variables (DATABASE_URL, RESEND_API_KEY) not exposed in client-side code
- SQL injection prevented via parameterized queries
- Input validation prevents excessively large payloads (comment max 1000 chars)
- CORS configured to accept same-origin requests only
- IP addresses anonymized before storage
- Database connection uses SSL/TLS encryption

## Traceability Mapping

| AC # | Requirement (PRD) | Tech Spec Section | Component(s) | Story | Test Approach |
|:-----|:------------------|:------------------|:-------------|:------|:--------------|
| AC1 | FR4 (Feedback Interface) | Services & Modules, Data Models | FeedbackWidget.astro, shadcn Button/Textarea/Toast | 2.1 | Visual test: component renders correctly; Functional test: UI interactions work |
| AC2 | FR4 (Feedback submission) | APIs & Interfaces, Workflows | POST /api/feedback, src/lib/db.ts | 2.2 | Integration test: API accepts valid requests, rejects invalid; Unit test: Zod validation |
| AC3 | Database infrastructure | Data Models | feedbacks table schema | 2.2 | Manual verification: table exists with correct schema; Query test: INSERT operation works |
| AC4 | FR5 (Curator Notifications) | APIs & Interfaces, Workflows | src/lib/email.ts, Resend integration | 2.3 | Integration test: email sent on submission; Manual test: verify email content and delivery |
| AC5 | FR7 (Status visualization) | Data Models | EnhancedStatusBadge.astro | 2.4 | Visual test: status badges display correctly; Regression test: Epic 1 statuses unchanged |
| AC6 | FR7 (Revoked document alerts) | Services & Modules, Workflows | RevokedDocumentAlert.astro, shadcn Alert | 2.4 | Visual test: alert displays on revoked docs; Conditional test: alert hidden on non-revoked docs |
| AC7 | NFR7 (Accessibility) | NFR: Security | All new components | 2.1, 2.4 | Automated: Lighthouse accessibility audit (score >95); Manual: screen reader testing, keyboard nav |
| AC8 | NFR1 (Performance) | NFR: Performance | All components, API endpoint | 2.1-2.3 | Automated: Lighthouse performance audit; Load test: API response times under load |
| AC9 | NFR6 (Security) | NFR: Security | API endpoint, database connection | 2.2, 2.3 | Security review: environment variable usage; Penetration test: SQL injection attempts; Code review: CORS config |

**Requirements Coverage Summary:**
- **FR4** (Feedback Interface): ✅ AC1, AC2
- **FR5** (Curator Notifications): ✅ AC4
- **FR7** (Status Visualization): ✅ AC5, AC6
- **NFR1** (Performance): ✅ AC8
- **NFR6** (Security): ✅ AC9
- **NFR7** (Accessibility): ✅ AC7

## Risks, Assumptions, Open Questions

**Risks:**

| ID | Risk Description | Severity | Likelihood | Mitigation Strategy |
|:---|:-----------------|:---------|:-----------|:-------------------|
| R1 | Neon PostgreSQL free tier limits exceeded (3GB storage, 100 hours compute) | High | Medium | Monitor usage in Neon dashboard; upgrade to Pro tier ($19/month) before limits reached; estimate ~10k feedback entries = ~1MB storage |
| R2 | Resend free tier limits exceeded (100 emails/day) | Medium | Low | Monitor email volume; upgrade to Pro tier ($20/month) if feedback exceeds 100/day; implement batching for high-volume scenarios |
| R3 | Anonymous feedback leads to spam or abuse | Medium | Medium | Accept risk for Epic 2; implement rate limiting and moderation tools in future iteration; Epic 5 authentication will reduce spam |
| R4 | Database connection pool saturation under high load | Medium | Low | Monitor pool usage via Neon dashboard; increase pool size from 10 to 20 if >80% utilization; implement queue for async processing if needed |
| R5 | Email delivery failures not detected (silent failures) | Low | Low | Implement email delivery monitoring via Resend webhooks (future enhancement); log all email errors for manual review |
| R6 | Vercel serverless function cold starts cause timeout | Low | Low | Acceptable latency for user feedback; consider provisioned concurrency if critical; warm-up requests can mitigate |
| R7 | shadcn Textarea component compatibility issues with Astro | Low | Low | Test early in Story 2.1; shadcn-astro is maintained and compatible; fallback to native HTML textarea if needed |

**Assumptions:**

| ID | Assumption | Validation Needed | Impact if Invalid |
|:---|:-----------|:------------------|:------------------|
| A1 | Neon free tier sufficient for initial deployment (feedback volume <100/day) | Monitor feedback submission rate in production | Need to budget for Neon Pro tier ($19/month) earlier than planned |
| A2 | Resend free tier sufficient for initial deployment (<100 feedback/day) | Monitor email sending volume | Need to budget for Resend Pro tier ($20/month) earlier than planned |
| A3 | Curator team has single shared email address for feedback notifications | Confirm with stakeholders before Story 2.3 | May need to support multiple curator emails or distribution list |
| A4 | Anonymous feedback acceptable in Epic 2; authentication deferred to Epic 5 | Confirm with Product Owner | If auth required sooner, Epic 2 scope increases significantly |
| A5 | Plain text email notifications sufficient (no HTML templates) | Confirm with curator team | If rich HTML needed, requires additional development time |
| A6 | Feedback data retention unlimited (no automatic deletion) | Confirm compliance/legal requirements | May need data retention policy and automated cleanup |
| A7 | Database user credentials have INSERT-only permissions on feedbacks table | Verify during Story 2.2 setup | Over-permissioned credentials create security risk |
| A8 | All document pages will include FeedbackWidget (no exceptions) | Confirm with UX team | May need conditional rendering based on document type or status |

**Open Questions:**

| ID | Question | Stakeholder | Priority | Decision Needed By |
|:---|:---------|:-----------|:---------|:-------------------|
| Q1 | Should feedback be disabled on "Revogado" documents? | Product Owner, UX | Medium | Before Story 2.1 |
| Q2 | What is the curator team's preferred email address for notifications? | Curator team lead | High | Before Story 2.3 |
| Q3 | Should curators receive immediate emails (per feedback) or digest (daily summary)? | Curator team | Medium | Before Story 2.3 |
| Q4 | Do we need to store any additional metadata (e.g., browser type, device)? | Product Owner, Analytics team | Low | Before Story 2.2 |
| Q5 | Should there be a character minimum for comments (e.g., 10 chars)? | UX team | Low | Before Story 2.1 |
| Q6 | What is the data retention policy for feedback (indefinite or auto-delete after X months)? | Legal/Compliance team | Medium | Before production deployment |
| Q7 | Should feedback widget be hidden on mobile devices or adjusted for smaller screens? | UX team | Low | Before Story 2.1 |
| Q8 | Do we need CAPTCHA or bot detection for feedback submissions? | Security team | Medium | Before Story 2.2 (can defer to future if low risk) |

## Test Strategy Summary

**Testing Approach:**

Epic 2 introduces backend testing alongside frontend component testing, requiring both manual and automated approaches:

**1. Component Testing (Story 2.1):**
- **Visual Testing**: FeedbackWidget renders correctly across browsers (Chrome, Firefox, Safari, Edge)
- **Interaction Testing**: Button clicks, textarea input, form submission work as expected
- **State Management Testing**: Submit button disables during API call, Toast appears on success
- **Accessibility Testing**: Keyboard navigation, screen reader compatibility, WCAG 2.1 AA compliance
- **Responsive Testing**: Component layout adapts to mobile/tablet/desktop viewports

**2. API Testing (Story 2.2):**
- **Unit Testing**: Zod validation schema correctly validates/rejects payloads
  ```typescript
  // Example test cases:
  - Valid payload → passes validation
  - Missing rating field → throws error
  - Comment >1000 chars → throws error
  - Empty documentPath → throws error
  ```
- **Integration Testing**: API endpoint processes requests end-to-end
  ```typescript
  // Test scenarios:
  - POST with valid data → 200 response + database record created
  - POST with invalid data → 400 response + descriptive error
  - Database unavailable → 500 response + error logged
  - Concurrent requests → no race conditions or connection pool exhaustion
  ```
- **Performance Testing**: API response time under load
  - Target: p95 < 500ms for 10 concurrent requests
  - Tool: Apache Bench or k6 for load testing

**3. Database Testing (Story 2.2):**
- **Schema Validation**: Table structure matches specification
  ```sql
  -- Verify:
  - All columns exist with correct types
  - Indexes created on document_path and submitted_at
  - Default value for submitted_at (NOW())
  ```
- **Data Integrity Testing**: Records stored correctly with all fields
- **Connection Pool Testing**: Pool handles concurrent connections without exhaustion
- **Failure Recovery Testing**: Database timeout/error handling works correctly

**4. Email Testing (Story 2.3):**
- **Functional Testing**: Email sent on feedback submission
  - Use Resend test mode or real email to verify delivery
  - Verify email content matches template (document title, rating, comment, timestamp)
- **Error Handling Testing**: Email failure doesn't block feedback submission
  - Simulate Resend API failure (e.g., invalid API key)
  - Verify feedback still saved to database
  - Verify error logged in Vercel function logs
- **Content Testing**: Email formatting correct (plain text, line breaks, emojis)

**5. Status Alert Testing (Story 2.4):**
- **Conditional Rendering**: RevokedDocumentAlert displays only for status="Revogado"
  - Test with document statuses: Rascunho, Publicado, Revisão (alert hidden)
  - Test with status: Revogado (alert displayed)
- **Visual Testing**: Alert styling matches design (destructive variant, prominent placement)
- **Accessibility Testing**: Alert announced to screen readers, proper contrast

**6. End-to-End Testing:**
- **User Journey Test**: Complete feedback submission flow
  ```
  1. Navigate to document page
  2. Click feedback button
  3. Enter comment
  4. Submit
  5. Verify Toast appears
  6. Verify email received
  7. Verify database record exists
  ```
- **Revoked Document Journey**: User sees alert on revoked document
  ```
  1. Navigate to revoked document
  2. Verify alert displays at top of content
  3. Verify can still read document
  4. Verify can still submit feedback
  ```

**7. Security Testing:**
- **SQL Injection Testing**: Attempt malicious payloads (e.g., `' OR '1'='1`)
  - Verify parameterized queries prevent injection
- **XSS Testing**: Submit comment with HTML/JavaScript
  - Verify stored as plain text (no rendering)
- **CORS Testing**: Attempt cross-origin API requests
  - Verify rejected by server
- **Environment Variable Leakage**: Verify secrets not exposed in client bundle

**8. Performance Testing:**
- **Lighthouse Audit**: Run on document pages with FeedbackWidget
  - Target: Performance >90, Accessibility >95
- **API Load Testing**: Simulate 100 concurrent feedback submissions
  - Verify p95 response time <500ms
  - Verify no connection pool exhaustion
- **Page Load Comparison**: Compare to Epic 1 baseline
  - Verify no regression in FCP, LCP, TTI

**Test Environment:**
- **Local Development**: Use local Neon database branch (Neon branching feature) and Resend test mode
- **Staging**: Vercel preview deployment with staging database and test email addresses
- **Production**: Real Neon database and Resend production API

**Test Coverage Goals:**
- **Critical paths**: 100% manual end-to-end testing (feedback submission, email delivery)
- **API endpoints**: 100% unit test coverage for validation logic
- **Component interactions**: 100% visual testing across primary browsers
- **Accessibility**: 100% of new interactive elements tested with screen readers
- **Security**: All OWASP Top 10 vulnerabilities tested (injection, XSS, CORS)

**Defect Management:**
- **Critical defects**: Feedback not saved to database, email not sent → Block story completion
- **Major defects**: Accessibility issues, performance below target → Must fix before epic completion
- **Minor defects**: Visual inconsistencies, non-critical UX issues → Document as technical debt

**Success Metrics:**
- All 9 Acceptance Criteria (AC1-AC9) validated and passed
- Zero critical defects open at epic completion
- Lighthouse scores meet targets (Performance >90, Accessibility >95)
- API performance meets targets (p95 <500ms)
- Email delivery rate >95%
