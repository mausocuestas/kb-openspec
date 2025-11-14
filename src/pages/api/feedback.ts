import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

export const prerender = false;

// Rate limiting: simple in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per hour per IP

function getRateLimitKey(ip: string): string {
  return `feedback:${ip}`;
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function getClientIP(request: Request): string {
  // Try various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP.trim();
  }
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback to a generic identifier
  return 'unknown';
}

// Helper function to encode special characters as HTML entities
function encodeHTMLEntities(str: string): string {
  const entities: Record<string, string> = {
    'á': '&aacute;', 'à': '&agrave;', 'â': '&acirc;', 'ã': '&atilde;', 'ä': '&auml;',
    'Á': '&Aacute;', 'À': '&Agrave;', 'Â': '&Acirc;', 'Ã': '&Atilde;', 'Ä': '&Auml;',
    'é': '&eacute;', 'è': '&egrave;', 'ê': '&ecirc;', 'ë': '&euml;',
    'É': '&Eacute;', 'È': '&Egrave;', 'Ê': '&Ecirc;', 'Ë': '&Euml;',
    'í': '&iacute;', 'ì': '&igrave;', 'î': '&icirc;', 'ï': '&iuml;',
    'Í': '&Iacute;', 'Ì': '&Igrave;', 'Î': '&Icirc;', 'Ï': '&Iuml;',
    'ó': '&oacute;', 'ò': '&ograve;', 'ô': '&ocirc;', 'õ': '&otilde;', 'ö': '&ouml;',
    'Ó': '&Oacute;', 'Ò': '&Ograve;', 'Ô': '&Ocirc;', 'Õ': '&Otilde;', 'Ö': '&Ouml;',
    'ú': '&uacute;', 'ù': '&ugrave;', 'û': '&ucirc;', 'ü': '&uuml;',
    'Ú': '&Uacute;', 'Ù': '&Ugrave;', 'Û': '&Ucirc;', 'Ü': '&Uuml;',
    'ç': '&ccedil;', 'Ç': '&Ccedil;',
    'ñ': '&ntilde;', 'Ñ': '&Ntilde;'
  };

  return str.replace(/[áàâãäÁÀÂÃÄéèêëÉÈÊËíìîïÍÌÎÏóòôõöÓÒÔÕÖúùûüÚÙÛÜçÇñÑ]/g, (char) => entities[char] || char);
}

function formatFeedbackEmail(data: {
  rating: string;
  comment: string | null;
  pageUrl: string;
  pageTitle: string;
  ip: string;
}): { subject: string; text: string; html: string } {
  const ratingIcon = data.rating === 'positive' ? '👍 Útil' : '👎 Não útil';
  const ratingColor = data.rating === 'positive' ? '#00a651' : '#dc2626';
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short'
  });

  // Prepare text versions (normal UTF-8)
  const pageTitle = data.pageTitle;
  const pageUrl = data.pageUrl;
  const commentText = data.comment || 'Nenhum comentário fornecido';

  // Prepare HTML versions (with HTML entities for special characters)
  const pageTitleHTML = encodeHTMLEntities(data.pageTitle);
  const pageUrlHTML = encodeHTMLEntities(data.pageUrl);
  const commentTextHTML = data.comment ? encodeHTMLEntities(data.comment) : 'Nenhum coment&aacute;rio fornecido';

  const textVersion = `Novo feedback foi submetido na Base de Conhecimento:

📄 Documento: ${pageTitle}
🔗 URL: ${pageUrl}
⏰ Data: ${timestamp}

Avaliação: ${ratingIcon}

Comentário:
${commentText}

---
IP do usuário: ${data.ip}
Este é um email automático da Base de Conhecimento.`;

  const htmlVersion = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Feedback Recebido</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background-color: #f8f9fa; border-left: 4px solid ${ratingColor}; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #1a1a1a;">Novo feedback foi submetido na Base de Conhecimento</h2>
  </div>

  <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 20px; margin-bottom: 20px;">

    <p style="margin: 10px 0;">
      <strong>&#128196; Documento:</strong><br>
      ${pageTitleHTML}
    </p>

    <p style="margin: 10px 0;">
      <strong>&#128279; URL:</strong><br>
      <a href="${pageUrl}" style="color: #0066cc; text-decoration: none;">${pageUrlHTML}</a>
    </p>

    <p style="margin: 10px 0;">
      <strong>&#9200; Data:</strong><br>
      ${timestamp}
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

    <p style="margin: 10px 0;">
      <strong>Avalia&ccedil;&atilde;o:</strong><br>
      <span style="display: inline-block; background-color: ${ratingColor}; color: white; padding: 6px 12px; border-radius: 4px; font-weight: 500;">
        ${ratingIcon}
      </span>
    </p>

    <p style="margin: 10px 0;">
      <strong>Coment&aacute;rio:</strong><br>
      <span style="display: block; background-color: #f8f9fa; padding: 12px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap;">${commentTextHTML}</span>
    </p>

  </div>

  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; font-size: 12px; color: #6b7280;">
    <p style="margin: 5px 0;">IP do usuário: <code style="background-color: #e5e7eb; padding: 2px 6px; border-radius: 3px;">${data.ip}</code></p>
    <p style="margin: 5px 0;">Este é um email automático da Base de Conhecimento.</p>
  </div>

</body>
</html>`;

  return {
    subject: `Novo Feedback Recebido - ${pageTitle}`,
    text: textVersion,
    html: htmlVersion
  };
}

async function sendEmailNotification(feedbackData: {
  rating: string;
  comment: string | null;
  pageUrl: string;
  pageTitle: string;
  ip: string;
  feedbackId: number;
}): Promise<void> {
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const notificationEmail = import.meta.env.FEEDBACK_NOTIFICATION_EMAIL;

  // Skip if not configured
  if (!resendApiKey || !notificationEmail) {
    console.warn('Email notification skipped: RESEND_API_KEY or FEEDBACK_NOTIFICATION_EMAIL not configured');
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    const emailContent = formatFeedbackEmail(feedbackData);

    const { data, error } = await resend.emails.send({
      from: 'Base de Conhecimento <onboarding@resend.dev>', // Will be replaced with your domain
      to: [notificationEmail],
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    });

    if (error) {
      console.error('Failed to send email notification:', error);
      return;
    }

    console.log(`Email notification sent successfully for feedback ID ${feedbackData.feedbackId}:`, data);
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw - email failures should not block feedback submission
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check rate limiting
    const ip = getClientIP(request);
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many feedback submissions. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000 // seconds
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(RATE_LIMIT_WINDOW / 1000).toString()
          }
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required fields
    const { rating, comment, pageUrl, pageTitle } = body;

    if (!rating || !pageUrl || !pageTitle) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          message: 'Missing required fields: rating, pageUrl, pageTitle are required',
          fields: {
            rating: !rating ? 'Rating is required' : null,
            pageUrl: !pageUrl ? 'Page URL is required' : null,
            pageTitle: !pageTitle ? 'Page title is required' : null
          }
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate rating value
    if (rating !== 'positive' && rating !== 'negative') {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          message: 'Invalid rating value. Must be "positive" or "negative"',
          fields: {
            rating: 'Rating must be "positive" or "negative"'
          }
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate URL format
    try {
      new URL(pageUrl);
    } catch {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          message: 'Invalid page URL format',
          fields: {
            pageUrl: 'Page URL must be a valid URL'
          }
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Sanitize inputs
    const sanitizedRating = rating.trim();
    const sanitizedComment = comment ? comment.trim().substring(0, 1000) : null; // Max 1000 chars
    const sanitizedPageUrl = pageUrl.trim().substring(0, 500);
    const sanitizedPageTitle = pageTitle.trim().substring(0, 200);
    const userAgent = request.headers.get('user-agent') || null;

    // Get database connection
    const databaseUrl = import.meta.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error('DATABASE_URL environment variable not set');
      return new Response(
        JSON.stringify({
          error: 'Server configuration error',
          message: 'Database connection not configured'
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const sql = neon(databaseUrl);

    try {
      // Insert feedback into database
      const result = await sql`
        INSERT INTO kb.feedback (rating, comment, page_url, page_title, user_agent, ip_address)
        VALUES (
          ${sanitizedRating},
          ${sanitizedComment},
          ${sanitizedPageUrl},
          ${sanitizedPageTitle},
          ${userAgent},
          ${ip}
        )
        RETURNING id
      `;

      const feedbackId = result[0]?.id;
      console.log('Feedback inserted successfully:', result);

      // Send email notification (non-blocking)
      sendEmailNotification({
        rating: sanitizedRating,
        comment: sanitizedComment,
        pageUrl: sanitizedPageUrl,
        pageTitle: sanitizedPageTitle,
        ip,
        feedbackId
      }).catch(error => {
        // Email errors are already logged in sendEmailNotification
        console.error('Email notification failed for feedback ID', feedbackId, ':', error);
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Feedback submitted successfully',
          feedbackId
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );

    } catch (dbError) {
      console.error('Database error:', dbError);

      // Check if it's a connection error
      if (dbError instanceof Error) {
        if (dbError.message.includes('connection') || dbError.message.includes('connect')) {
          return new Response(
            JSON.stringify({
              error: 'Database connection error',
              message: 'Unable to connect to database. Please try again later.'
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }

      return new Response(
        JSON.stringify({
          error: 'Database error',
          message: 'Failed to save feedback. Please try again later.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('API Error:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Handle unsupported methods
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      error: 'Method not allowed',
      message: 'Only POST requests are supported for this endpoint'
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      }
    }
  );
};