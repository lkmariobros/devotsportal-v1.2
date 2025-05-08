import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Use Supabase's PostgreSQL connection string
const connectionString = process.env.SUPABASE_POSTGRES_URL || process.env.DATABASE_URL || '';

// For introspection
const queryClient = postgres(connectionString, { max: 1 });
const db = drizzle(queryClient);

// Function to introspect schema
async function introspectSchema() {
  console.log('Introspecting schema from Supabase...');
  
  try {
    // Query to get all tables
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    const tables = await queryClient.unsafe(tablesQuery);
    
    console.log('Found tables:');
    tables.forEach((table: any) => {
      console.log(`- ${table.table_name}`);
    });
    
    // For each table, get columns
    for (const table of tables) {
      const tableName = table.table_name;
      
      const columnsQuery = `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '${tableName}'
        ORDER BY ordinal_position;
      `;
      
      const columns = await queryClient.unsafe(columnsQuery);
      
      console.log(`\nTable: ${tableName}`);
      console.log('Columns:');
      columns.forEach((column: any) => {
        console.log(`- ${column.column_name} (${column.data_type}, ${column.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
      });
    }
    
    console.log('\nIntrospection complete. You can now run "npm run db:introspect" to generate Drizzle schema files.');
  } catch (error) {
    console.error('Introspection failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

introspectSchema();
