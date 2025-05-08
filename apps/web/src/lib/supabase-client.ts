import { createClient } from '@supabase/supabase-js';
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';

// Create a Supabase client for real-time features
export function createSupabaseClient(url: string, key: string) {
  return createClient(url, key);
}

/**
 * Hook to subscribe to real-time updates for todos
 * This demonstrates how to use Supabase for real-time features while using tRPC for queries
 */
export function useTodoRealtime<T>(
  onUpdate: (data: T) => void
) {
  const [supabase, setSupabase] = useState<ReturnType<typeof createSupabaseClient> | null>(null);
  const channelInfo = trpc.todo.getRealtimeChannel.useQuery();
  
  useEffect(() => {
    if (!channelInfo.data) return;
    
    const { supabaseUrl, supabaseAnonKey, channel, filter } = channelInfo.data;
    
    // Create Supabase client
    const client = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    setSupabase(client);
    
    // Create subscription
    const subscription = client
      .channel(channel)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'todo',
        filter
      }, (payload) => {
        onUpdate(payload.new as T);
      })
      .subscribe();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [channelInfo.data, onUpdate]);
  
  return { supabase };
}
