import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";

/**
 * Authentication configuration using Better Auth with Drizzle adapter
 * connected to Supabase PostgreSQL database
 */
export const auth = betterAuth({
  // Use environment variable for secret or use the provided secure secret
  secret: process.env.BETTER_AUTH_SECRET || "udD8TtXBYB35WkFoIrHkROh3nc3j7r9Z",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [
    process.env.CORS_ORIGIN || "",
  ],
  emailAndPassword: {
    enabled: true,
    // You can add additional email configuration here
    // verificationRequired: true,
  },
  // Uncomment to enable additional providers
  // providers: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID || "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  //   },
  // },
  // Rate limiting configuration
  rateLimit: {
    window: 60, // time window in seconds
    max: 100, // max requests in the window
  },
});
