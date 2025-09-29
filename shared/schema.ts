
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  categoryId: varchar("category_id").references(() => categories.id),
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'image' or 'video'
  src: text("src").notNull(),
  thumbnail: text("thumbnail"),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const publications = pgTable("publications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const importantDays = pgTable("important_days", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
  isUpcoming: boolean("is_upcoming").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  coverImage: true,
  categoryId: true,
  published: true,
  featured: true,
});

export const updateBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  coverImage: true,
  categoryId: true,
  published: true,
  featured: true,
}).partial();

export const insertGalleryItemSchema = createInsertSchema(galleryItems).pick({
  title: true,
  description: true,
  type: true,
  src: true,
  thumbnail: true,
  category: true,
  featured: true,
});

export const updateGalleryItemSchema = insertGalleryItemSchema.partial();

export const insertPublicationSchema = createInsertSchema(publications).pick({
  title: true,
  description: true,
  category: true,
  fileUrl: true,
  fileSize: true,
  featured: true,
});

export const updatePublicationSchema = insertPublicationSchema.partial();

export const insertImportantDaySchema = createInsertSchema(importantDays).pick({
  title: true,
  description: true,
  date: true,
  time: true,
  category: true,
  featured: true,
  isUpcoming: true,
});

export const updateImportantDaySchema = insertImportantDaySchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type UpdateGalleryItem = z.infer<typeof updateGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type UpdatePublication = z.infer<typeof updatePublicationSchema>;
export type Publication = typeof publications.$inferSelect;
export type InsertImportantDay = z.infer<typeof insertImportantDaySchema>;
export type UpdateImportantDay = z.infer<typeof updateImportantDaySchema>;
export type ImportantDay = typeof importantDays.$inferSelect;
