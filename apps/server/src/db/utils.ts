import { db } from './index';
import { supabase } from '../lib/supabase';
import { SQL, sql } from 'drizzle-orm';

/**
 * Utility function to execute raw SQL queries with Drizzle
 */
export async function executeRawQuery<T = unknown>(query: SQL<unknown>): Promise<T[]> {
  try {
    return await db.execute(query) as T[];
  } catch (error) {
    console.error('Error executing raw query:', error);
    throw error;
  }
}

/**
 * Utility function to check if a table exists
 */
export async function tableExists(tableName: string): Promise<boolean> {
  const query = sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = ${tableName}
    );
  `;
  
  const result = await executeRawQuery<{ exists: boolean }>(query);
  return result[0]?.exists || false;
}

/**
 * Utility function to get a real-time subscription using Supabase
 * This demonstrates how to use Supabase for real-time features while using Drizzle for queries
 */
export function createRealtimeSubscription<T>(
  tableName: string, 
  filter: string,
  onUpdate: (payload: T) => void
) {
  return supabase
    .channel(`${tableName}-changes`)
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: tableName,
      filter
    }, (payload) => {
      onUpdate(payload.new as T);
    })
    .subscribe();
}
