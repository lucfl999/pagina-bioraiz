// Cloudflare Worker - API Gateway
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimit = await checkRateLimit(clientIP, env);
    if (!rateLimit.allowed) {
      return new Response('Too many requests', {
        status: 429,
        headers: corsHeaders,
      });
    }

    // Route to backend API
    const backendURL = new URL(path, env.API_URL);
    backendURL.search = url.search;

    const response = await fetch(new Request(backendURL, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    }));

    return new Response(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        ...corsHeaders,
      },
    });
  },
};

async function checkRateLimit(ip, env) {
  const key = `ratelimit:${ip}`;
  const current = await env.RATE_LIMIT.get(key) || 0;
  const limit = 100; // requests per minute
  
  if (current >= limit) {
    return { allowed: false };
  }

  await env.RATE_LIMIT.put(key, parseInt(current) + 1, {
    expirationTtl: 60,
  });

  return { allowed: true };
}
