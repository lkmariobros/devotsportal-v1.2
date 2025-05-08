import { pgTable, text, boolean, serial, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

/**
 * Todo table schema with user relationship
 * This demonstrates how to create a table with a foreign key to the user table
 */
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

// Define the todo type for use in TypeScript
export type Todo = typeof todo.$inferSelect;
export type NewTodo = typeof todo.$inferInsert;
