// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Import only the pipeline for feature extraction
import { pipeline } from 'npm:@xenova/transformers@2.15.1'

// We'll make a direct Postgres connection to update the document
import postgres from 'https://deno.land/x/postgresjs@v3.4.5/mod.js'

// Initialize Postgres client
const sql = postgres(
  // `SUPABASE_DB_URL` is a built-in environment variable
  Deno.env.get('SUPABASE_DB_URL')!
)

// Load the embedding model (e.g., 'Supabase/gte-small')
const embedder = await pipeline('feature-extraction', 'Supabase/gte-small', {
  quantized: true, // Use quantized model for smaller size
  revision: 'main',
  cache_dir: '/tmp/transformers' // Use temporary directory for caching
})

console.log("Hello from Functions!")

// Listen for HTTP requests
Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Expected POST request', { status: 405 })
  }

  const { id, content, schema, table, embeddingColumn } = await req.json()

  if (!id || !content || !schema || !table || !embeddingColumn) {
    return new Response(JSON.stringify({ error: 'Missing required fields: id, content, schema, table, embeddingColumn' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Generate embedding
    const output = await embedder(content, {
      pooling: 'mean',
      normalize: true,
    })
    const embedding = Array.from(output.data)

    // Update the record in the database
    await sql`
      update ${sql(schema)}.${sql(table)}
      set ${sql(embeddingColumn)} = ${JSON.stringify(embedding)}
      where id = ${id}
    `

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Error generating or storing embedding:', error)
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/embed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
