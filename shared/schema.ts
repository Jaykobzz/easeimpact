import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  timeRating: integer("time_rating").notNull(), // 1-10 scale (1 = time-consuming, 10 = quick)
  valueRating: integer("value_rating").notNull(), // 1-10 scale (1 = low value, 10 = high value)
  category: text("category").notNull(), // A, B, C, D
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  category: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Category calculation helper
export function calculateCategory(timeRating: number, valueRating: number): string {
  const isQuick = timeRating >= 8; // 8-10 = quick (higher score = quicker)
  const isHighValue = valueRating >= 8; // 8-10 = high value
  
  if (isQuick && isHighValue) return 'A';
  if (!isQuick && isHighValue) return 'B';
  if (isQuick && !isHighValue) return 'C';
  return 'D';
}
