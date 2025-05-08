import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for real-time features, storage, etc.
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// Create a public client with the anon key for client-side operations
export const supabasePublic = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);
