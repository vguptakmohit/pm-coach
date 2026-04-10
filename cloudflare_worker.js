// ============================================================
// PM Coach — Cloudflare Worker API Proxy
// Hides your Anthropic API key from the browser
// Deploy at: workers.cloudflare.com (free, 100k req/day)
// ============================================================
//
// SETUP STEPS:
// 1. Go to workers.cloudflare.com → Create Worker
// 2. Paste this entire file
// 3. Go to Settings → Variables → Add secret:
//    Name: ANTHROPIC_API_KEY
//    Value: your sk-ant-... key
// 4. Deploy → copy your worker URL (e.g. https://pm-coach.your-name.workers.dev)
// 5. Paste that URL into pm_coach_app.html as PROXY_URL
// ============================================================

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();

      // Forward to Anthropic (strip out the apiKey field if sent from frontend)
      const { apiKey, ...anthropicBody } = body;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,       // secret from Worker env
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(anthropicBody)
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',        // allow any origin
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: { message: err.message } }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
};
