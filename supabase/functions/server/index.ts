import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Handle CORS preflight requests
async function corsify(req: Request, res: Response): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      }
    })
  }

  // Add CORS headers to actual response
  const headers = res.headers
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')

  return res
}

serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return await corsify(req, new Response())
    }

    // Parse request body if POST
    let body = null
    if (req.method === 'POST') {
      body = await req.json()
    }

    // Example response
    const data = {
      message: "Hello from Supabase Edge Function!",
      method: req.method,
      body
    }

    // Return JSON response with CORS headers
    return await corsify(req, new Response(
      JSON.stringify(data),
      { 
        headers: { 
          "Content-Type": "application/json"
        }
      }
    ))

  } catch (error) {
    // Handle errors
    console.error('Error:', error.message)
    return await corsify(req, new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    ))
  }
})