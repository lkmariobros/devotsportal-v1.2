import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { db } from "../db";
import { supabase } from "./supabase";

/**
 * Create a context for tRPC requests
 * This provides access to the database, authentication, and Supabase client
 */
export async function createContext(req: NextRequest) {
  // Get the user's session from the request
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

export type Context = Awaited<ReturnType<typeof createContext>>;
