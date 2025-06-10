# Advanced Gift Suggestion Algorithm Progress

This document summarizes our progress on implementing an advanced gift suggestion algorithm using vector embeddings.

## Goal
To move beyond a simple keyword-based recommendation system and create a more sophisticated, semantic understanding of user preferences and products to provide truly unique and relevant gift suggestions.

## Core Concept: Vector Embeddings and Semantic Search
Instead of direct keyword matching, we are converting both product descriptions and user preferences into numerical representations called **vector embeddings**. These embeddings capture the 'meaning' of the text, allowing us to find products that are semantically similar to a user's preferences, even if exact keywords don't match.

## Steps Completed So Far:

1.  **Database Preparation (`products` table):**
    *   Enabled the `pgvector` extension in your Supabase database (`ibpnlhhhmxbqdxdleodu`). This allows PostgreSQL to handle vector data.
    *   Added a new `embedding` column of type `vector(1536)` to your `products` table. This column will store the numerical vector for each product.

2.  **Edge Function Setup (`embed`):**
    *   Created a Supabase Edge Function named `embed` in `supabase/functions/embed/index.ts`. This function is intended to take product content and generate its vector embedding.
    *   Initially attempted to use `npm:@xenova/transformers` directly within the Edge Function, but encountered size limitations (51.05MB, exceeding Supabase's limit).
    *   **Current Status of `embed` function:** The code is structured to generate embeddings, but its local deployment using `npx supabase functions deploy` failed due to size constraints and Docker Desktop requirement. The TypeScript errors in your local environment are expected due to the Deno/Node.js environment differences and will not affect deployment on Supabase.

3.  **Database Utility Functions and Queueing:**
    *   Created a `util` schema in your Supabase database.
    *   Enabled the `pgmq` and `pg_net` extensions for message queueing and HTTP requests from the database.
    *   Enabled the `pg_cron` extension for scheduling background jobs.
    *   Created `util.project_url()`: A SQL function to retrieve your Supabase project URL.
    *   Created `util.invoke_edge_function()`: A SQL function to securely call Edge Functions from the database.
    *   Created `util.queue_embeddings()`: A SQL trigger function that sends product embedding jobs to a queue (`embedding_jobs`) whenever a product is inserted or updated.
    *   Created the `embedding_jobs` queue using `pgmq`.
    *   Created `util.process_embeddings()`: A SQL function to read jobs from the `embedding_jobs` queue and invoke the `embed` Edge Function in batches.
    *   Scheduled `util.process_embeddings()` to run every 10 seconds using `pg_cron`.

## Next Steps:

The current bottleneck is the size of the `embed` Edge Function due to the `transformers` library when bundled locally. To resolve this and enable a truly advanced algorithm without budget overruns:

*   **Decision needed:** Choose a remote embedding API (e.g., OpenAI's embedding API) that offers a free tier. This offloads the heavy model to an external service, significantly reducing your Edge Function's size and complexity while maintaining high quality.
*   **Implementation:**
    *   Obtain an API key from the chosen embedding service.
    *   Securely store this API key in Supabase secrets.
    *   Modify the `embed` Edge Function to make an HTTP request to the remote embedding API, sending the product content and receiving the embedding in return.
    *   Retry deployment of the `embed` Edge Function.

Once the `embed` Edge Function is deployed and correctly calling the remote API, products will automatically get their embeddings, and we can then modify `app/results/page.tsx` to use vector similarity search for recommendations. 