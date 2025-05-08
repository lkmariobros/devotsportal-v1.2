import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use Supabase's PostgreSQL connection string
const connectionString = process.env.SUPABASE_POSTGRES_URL || process.env.DATABASE_URL || "";

// For migrations and queries
const queryClient = postgres(connectionString, { max: 1 });

// For pooled connections (regular app usage)
const poolClient = postgres(connectionString);

// Export both clients for different use cases
export const db = drizzle(poolClient);
export const migrationClient = drizzle(queryClient);
