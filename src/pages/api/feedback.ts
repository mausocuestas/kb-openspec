import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

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

      console.log('Feedback inserted successfully:', result);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Feedback submitted successfully',
          feedbackId: result[0]?.id
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