import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";

/**
 * Authentication configuration using Better Auth with Drizzle adapter
 * connected to Supabase PostgreSQL database
 */
export const auth = betterAuth({
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
  session: {
    // Adjust session duration as needed
    lifetime: 30 * 24 * 60 * 60, // 30 days
  },
});
