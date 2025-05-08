import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../lib/trpc";
import { todo } from "../db/schema/todo";
import { eq, and } from "drizzle-orm";

/**
 * Todo router with Drizzle ORM using Supabase PostgreSQL
 * Demonstrates both standard CRUD operations and real-time subscriptions
 */
export const todoRouter = router({
  // Get all todos for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Use the db from context instead of importing directly
    return await ctx.db.select().from(todo).where(
      eq(todo.userId, ctx.session.user.id)
    );
  }),

  // Create a new todo
  create: protectedProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Insert with the current user's ID
      return await ctx.db.insert(todo).values({
        text: input.text,
        userId: ctx.session.user.id,
      }).returning();
    }),

  // Toggle a todo's completed status
  toggle: protectedProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(todo)
        .set({ completed: input.completed })
        .where(
          and(
            eq(todo.id, input.id),
            eq(todo.userId, ctx.session.user.id)
          )
        )
        .returning();
    }),

  // Delete a todo
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(todo)
        .where(
          and(
            eq(todo.id, input.id),
            eq(todo.userId, ctx.session.user.id)
          )
        )
        .returning();
    }),

  // Get real-time subscription URL for todos
  // This endpoint returns the necessary information for the client
  // to set up a real-time subscription using Supabase
  getRealtimeChannel: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    // Return the channel name and filter for the client to use
    return {
      channel: "todos",
      filter: `user_id=eq.${userId}`,
      // Include the Supabase URL and anon key for the client
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    };
  }),
});
