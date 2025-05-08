import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseUrl) {
  console.error('SUPABASE_URL environment variable is not set');
}

const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_KEY environment variable is not set');
}

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseAnonKey) {
  console.error('SUPABASE_ANON_KEY environment variable is not set');
}

// Create a Supabase client for real-time features, storage, etc.
export const supabase = createClient(
  supabaseUrl || 'https://drelzxbshewqkaznwhrn.supabase.co', // Fallback URL for development
  supabaseServiceKey || 'dummy-service-key-for-development'
);

// Create a public client with the anon key for client-side operations
export const supabasePublic = createClient(
  supabaseUrl || 'https://drelzxbshewqkaznwhrn.supabase.co', // Fallback URL for development
  supabaseAnonKey || 'dummy-anon-key-for-development'
);
