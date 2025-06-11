import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // "movie" or "tv_show"
  genres: text("genres").array().notNull(),
  duration: text("duration"),
  rating: text("rating").notNull(),
  status: text("status").notNull().default("draft"), // "published" or "draft"
  views: integer("views").default(0),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url"),
  trailerUrl: text("trailer_url"),
  releaseYear: integer("release_year"),
  director: text("director"),
  writer: text("writer"),
  cast: text("cast").array(),
  tags: text("tags").array(),
  episodes: integer("episodes"), // Only for TV shows
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const upcomingContent = pgTable("upcoming_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // "movie" or "tv_show"
  genres: text("genres").array().notNull(),
  episodes: integer("episodes"), // Only for TV shows
  releaseDate: timestamp("release_date").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  trailerUrl: text("trailer_url"),
  sectionOrder: integer("section_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id").references(() => content.id),
  eventType: text("event_type").notNull(), // "view", "play", "like", "add_to_list"
  userId: integer("user_id").references(() => users.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: json("metadata"), // Additional event data
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});

export const insertUpcomingContentSchema = createInsertSchema(upcomingContent).omit({
  id: true,
  createdAt: true,
}).extend({
  releaseDate: z.string().transform((str) => new Date(str))
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;

export type UpcomingContent = typeof upcomingContent.$inferSelect;
export type InsertUpcomingContent = z.infer<typeof insertUpcomingContentSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
