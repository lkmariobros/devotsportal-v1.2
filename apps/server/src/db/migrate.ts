import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient } from './index';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Run migrations
async function main() {
  console.log('Running migrations...');
  
  try {
    await migrate(migrationClient, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();
