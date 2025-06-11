import { 
  users, content, upcomingContent, analytics,
  type User, type InsertUser,
  type Content, type InsertContent,
  type UpcomingContent, type InsertUpcomingContent,
  type Analytics, type InsertAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Content methods
  getAllContent(): Promise<Content[]>;
  getContentById(id: number): Promise<Content | undefined>;
  getPublishedContent(): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;

  // Upcoming content methods
  getAllUpcomingContent(): Promise<UpcomingContent[]>;
  getUpcomingContentById(id: number): Promise<UpcomingContent | undefined>;
  createUpcomingContent(content: InsertUpcomingContent): Promise<UpcomingContent>;
  updateUpcomingContent(id: number, content: Partial<InsertUpcomingContent>): Promise<UpcomingContent | undefined>;
  deleteUpcomingContent(id: number): Promise<boolean>;

  // Analytics methods
  createAnalyticsEvent(event: InsertAnalytics): Promise<Analytics>;
  getAnalytics(): Promise<{
    totalViews: number;
    totalContent: number;
    popularContent: Content[];
    recentViews: Analytics[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Content methods
  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(desc(content.createdAt));
  }

  async getContentById(id: number): Promise<Content | undefined> {
    const [contentItem] = await db.select().from(content).where(eq(content.id, id));
    return contentItem || undefined;
  }

  async getPublishedContent(): Promise<Content[]> {
    return await db.select().from(content)
      .where(eq(content.status, "published"))
      .orderBy(desc(content.createdAt));
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [contentItem] = await db
      .insert(content)
      .values(insertContent)
      .returning();
    return contentItem;
  }

  async updateContent(id: number, updateContent: Partial<InsertContent>): Promise<Content | undefined> {
    const [contentItem] = await db
      .update(content)
      .set({ ...updateContent, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return contentItem || undefined;
  }

  async deleteContent(id: number): Promise<boolean> {
    const result = await db.delete(content).where(eq(content.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Upcoming content methods
  async getAllUpcomingContent(): Promise<UpcomingContent[]> {
    return await db.select().from(upcomingContent).orderBy(upcomingContent.sectionOrder);
  }

  async getUpcomingContentById(id: number): Promise<UpcomingContent | undefined> {
    const [item] = await db.select().from(upcomingContent).where(eq(upcomingContent.id, id));
    return item || undefined;
  }

  async createUpcomingContent(insertUpcoming: InsertUpcomingContent): Promise<UpcomingContent> {
    const [item] = await db
      .insert(upcomingContent)
      .values(insertUpcoming)
      .returning();
    return item;
  }

  async updateUpcomingContent(id: number, updateUpcoming: Partial<InsertUpcomingContent>): Promise<UpcomingContent | undefined> {
    const [item] = await db
      .update(upcomingContent)
      .set(updateUpcoming)
      .where(eq(upcomingContent.id, id))
      .returning();
    return item || undefined;
  }

  async deleteUpcomingContent(id: number): Promise<boolean> {
    const result = await db.delete(upcomingContent).where(eq(upcomingContent.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Analytics methods
  async createAnalyticsEvent(event: InsertAnalytics): Promise<Analytics> {
    const [analyticsEvent] = await db
      .insert(analytics)
      .values(event)
      .returning();
    return analyticsEvent;
  }

  async getAnalytics(): Promise<{
    totalViews: number;
    totalContent: number;
    popularContent: Content[];
    recentViews: Analytics[];
  }> {
    const [totalViewsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(analytics)
      .where(eq(analytics.eventType, "view"));

    const [totalContentResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(content);

    const popularContent = await db
      .select()
      .from(content)
      .orderBy(desc(content.views))
      .limit(10);

    const recentViews = await db
      .select()
      .from(analytics)
      .where(eq(analytics.eventType, "view"))
      .orderBy(desc(analytics.timestamp))
      .limit(50);

    return {
      totalViews: totalViewsResult?.count || 0,
      totalContent: totalContentResult?.count || 0,
      popularContent,
      recentViews,
    };
  }
}

export const storage = new DatabaseStorage();
