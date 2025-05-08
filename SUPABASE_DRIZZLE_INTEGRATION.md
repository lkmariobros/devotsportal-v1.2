# Drizzle ORM with Supabase Integration Guide

This guide explains how we've integrated Drizzle ORM with Supabase in the Devots Portal application.

## Architecture Overview

Our application uses:

1. **Drizzle ORM** for schema definition, migrations, and database queries
2. **Supabase PostgreSQL** as the database provider
3. **Supabase Realtime** for real-time updates
4. **Better Auth** for authentication, connected to the Supabase database

## Integration Components

### 1. Database Connection

We connect Drizzle directly to Supabase's PostgreSQL database:

```typescript
// apps/server/src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use Supabase's PostgreSQL connection string
const connectionString = process.env.SUPABASE_POSTGRES_URL || process.env.DATABASE_URL || "";

// For pooled connections (regular app usage)
const poolClient = postgres(connectionString);

// Export the Drizzle instance
export const db = drizzle(poolClient);
```

### 2. Schema Definition

We define our database schema using Drizzle ORM:

```typescript
// apps/server/src/db/schema/todo.ts
import { pgTable, text, boolean, serial, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 3. Migrations

We use Drizzle's migration tools to manage database schema changes:

```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:run-migrations
```

### 4. Supabase Client for Real-time Features

We use the Supabase client for real-time features:

```typescript
// apps/server/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for real-time features, storage, etc.
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);
```

### 5. tRPC Integration

We integrate Drizzle and Supabase with tRPC for type-safe API calls:

```typescript
// apps/server/src/lib/context.ts
export async function createContext(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    db,         // Drizzle ORM instance
    supabase,   // Supabase client for real-time features
    session,    // User session if authenticated
    req,        // Original request object
  };
}
```

### 6. Client-Side Real-time Integration

We create a React hook for real-time updates:

```typescript
// apps/web/src/lib/supabase-client.ts
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
```

## Best Practices

### 1. Schema Management

- Define all schemas in Drizzle and use its migration tools
- Keep schema definitions in sync with Supabase
- Use Drizzle's introspection tools if you need to import existing Supabase tables

### 2. Row-Level Security (RLS)

- Define RLS policies in Supabase for security
- Example policy for todos:

```sql
-- Enable RLS on the table
ALTER TABLE "todo" ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own todos
CREATE POLICY "Users can only view their own todos" 
ON "todo" FOR SELECT 
USING (auth.uid() = user_id);
```

### 3. Authentication

- Use Better Auth with Drizzle adapter for authentication
- Store user data in the Supabase PostgreSQL database
- Use session-based authentication with cookies

### 4. Real-time Features

- Use Supabase for real-time subscriptions
- Use tRPC for regular CRUD operations
- Create a clean abstraction layer for real-time features

### 5. Environment Variables

Required environment variables:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_POSTGRES_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres
```

## Troubleshooting

### Connection Issues

- Ensure your Supabase connection string is correct
- Check that your Supabase service is running
- Verify that your IP is allowed in Supabase's network restrictions

### Migration Failures

- Check the SQL generated by Drizzle before applying migrations
- Use `drizzle-kit push:pg` with the `--dry-run` flag to preview changes
- Back up your database before applying migrations

### Schema Conflicts

- If you modify the schema in Supabase directly, run introspection to update your Drizzle schema files
- Avoid making schema changes in both Supabase and Drizzle simultaneously

## Conclusion

This integration gives you the best of both worlds:

- Drizzle's type-safety and query building capabilities
- Supabase's real-time features and managed PostgreSQL database

By following this architecture, you can build robust, type-safe applications with real-time capabilities while maintaining a clean separation of concerns.
