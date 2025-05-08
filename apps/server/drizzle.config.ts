import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Use Supabase's PostgreSQL connection string
    url: process.env.SUPABASE_POSTGRES_URL || process.env.DATABASE_URL || "",
  },
  // Verbose logging during migrations
  verbose: true,
  // Strict mode ensures schema validation
  strict: true,
});
