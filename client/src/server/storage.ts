
import { 
  type User, 
  type InsertUser, 
  type BlogPost, 
  type InsertBlogPost, 
  type UpdateBlogPost,
  type Category,
  type InsertCategory,
  type GalleryItem,
  type InsertGalleryItem,
  type UpdateGalleryItem,
  type Publication,
  type InsertPublication,
  type UpdatePublication,
  type ImportantDay,
  type InsertImportantDay,
  type UpdateImportantDay,
  users, 
  blogPosts, 
  categories,
  galleryItems,
  publications,
  importantDays
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

// Database connection
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  // For development without database, use memory storage
  return null;
};

let db: any = null;
const databaseUrl = getDatabaseUrl();

if (databaseUrl) {
  const sql = neon(databaseUrl);
  db = drizzle(sql);
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost>;
  updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Gallery methods
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: string, item: UpdateGalleryItem): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: string): Promise<boolean>;

  // Publication methods
  getAllPublications(): Promise<Publication[]>;
  getPublication(id: string): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: string, publication: UpdatePublication): Promise<Publication | undefined>;
  deletePublication(id: string): Promise<boolean>;

  // Important Days methods
  getAllImportantDays(): Promise<ImportantDay[]>;
  getImportantDay(id: string): Promise<ImportantDay | undefined>;
  createImportantDay(day: InsertImportantDay): Promise<ImportantDay>;
  updateImportantDay(id: string, day: UpdateImportantDay): Promise<ImportantDay | undefined>;
  deleteImportantDay(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      throw new Error('Failed to fetch blog posts');
    }
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    try {
      return await db.select().from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt));
    } catch (error) {
      console.error('Error fetching published blog posts:', error);
      throw new Error('Failed to fetch published blog posts');
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    try {
      const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
      return result[0];
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  async createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values({
      ...post,
      publishedAt: post.published ? new Date() : null
    }).returning();
    return result[0];
  }

  async updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost | undefined> {
    const result = await db.update(blogPosts)
      .set({ 
        ...post, 
        updatedAt: new Date(),
        publishedAt: post.published !== undefined && post.published ? new Date() : undefined
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  // Gallery methods
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
  }

  async getGalleryItem(id: string): Promise<GalleryItem | undefined> {
    const result = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return result[0];
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const result = await db.insert(galleryItems).values(item).returning();
    return result[0];
  }

  async updateGalleryItem(id: string, item: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const result = await db.update(galleryItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(galleryItems.id, id))
      .returning();
    return result[0];
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    const result = await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return result.rowCount > 0;
  }

  // Publication methods
  async getAllPublications(): Promise<Publication[]> {
    return await db.select().from(publications).orderBy(desc(publications.createdAt));
  }

  async getPublication(id: string): Promise<Publication | undefined> {
    const result = await db.select().from(publications).where(eq(publications.id, id));
    return result[0];
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const result = await db.insert(publications).values(publication).returning();
    return result[0];
  }

  async updatePublication(id: string, publication: UpdatePublication): Promise<Publication | undefined> {
    const result = await db.update(publications)
      .set({ ...publication, updatedAt: new Date() })
      .where(eq(publications.id, id))
      .returning();
    return result[0];
  }

  async deletePublication(id: string): Promise<boolean> {
    const result = await db.delete(publications).where(eq(publications.id, id));
    return result.rowCount > 0;
  }

  // Important Days methods
  async getAllImportantDays(): Promise<ImportantDay[]> {
    return await db.select().from(importantDays).orderBy(desc(importantDays.createdAt));
  }

  async getImportantDay(id: string): Promise<ImportantDay | undefined> {
    const result = await db.select().from(importantDays).where(eq(importantDays.id, id));
    return result[0];
  }

  async createImportantDay(day: InsertImportantDay): Promise<ImportantDay> {
    const result = await db.insert(importantDays).values(day).returning();
    return result[0];
  }

  async updateImportantDay(id: string, day: UpdateImportantDay): Promise<ImportantDay | undefined> {
    const result = await db.update(importantDays)
      .set({ ...day, updatedAt: new Date() })
      .where(eq(importantDays.id, id))
      .returning();
    return result[0];
  }

  async deleteImportantDay(id: string): Promise<boolean> {
    const result = await db.delete(importantDays).where(eq(importantDays.id, id));
    return result.rowCount > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private categories: Map<string, Category>;
  private galleryItems: Map<string, GalleryItem>;
  private publications: Map<string, Publication>;
  private importantDays: Map<string, ImportantDay>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.categories = new Map();
    this.galleryItems = new Map();
    this.publications = new Map();
    this.importantDays = new Map();

    // Add default admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "$2b$10$example",
      isAdmin: true,
      createdAt: new Date()
    });

    // Add default category
    const categoryId = randomUUID();
    this.categories.set(categoryId, {
      id: categoryId,
      name: "General",
      slug: "general",
      description: "General blog posts",
      createdAt: new Date()
    });

    // Add sample data
    this.initializeSampleData(adminId, categoryId);
  }

  private initializeSampleData(adminId: string, categoryId: string) {
    // Sample blog post
    const postId = randomUUID();
    this.blogPosts.set(postId, {
      id: postId,
      title: "Welcome to Our Blog",
      slug: "welcome-to-our-blog",
      content: "This is a sample blog post. You can create, edit, and manage posts through the admin panel.",
      excerpt: "This is a sample blog post.",
      coverImage: null,
      authorId: adminId,
      categoryId: categoryId,
      published: true,
      featured: true,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Sample gallery items
    const galleryId1 = randomUUID();
    this.galleryItems.set(galleryId1, {
      id: galleryId1,
      title: "Traditional Dance Performance",
      description: "Annual cultural festival showcasing traditional Gujarati dance forms",
      type: "image",
      src: "/attached_assets/generated_images/Traditional_dance_performance_44f13591.png",
      thumbnail: "/attached_assets/generated_images/Traditional_dance_performance_44f13591.png",
      category: "Performances",
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Sample publication
    const pubId = randomUUID();
    this.publications.set(pubId, {
      id: pubId,
      title: "Cultural Heritage Preservation Guidelines",
      description: "Comprehensive guide on preserving and promoting Gujarati cultural traditions in modern society.",
      category: "Guidelines",
      fileUrl: "#",
      fileSize: "2.3 MB",
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Sample important day
    const dayId = randomUUID();
    this.importantDays.set(dayId, {
      id: dayId,
      title: "Navratri Celebration",
      description: "Join us for a vibrant celebration of Navratri with traditional dance, music, and authentic Gujarati cuisine.",
      date: "October 15, 2024",
      time: "6:00 PM",
      category: "Festival",
      featured: true,
      isUpcoming: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: false, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => 
        new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost & { authorId: string }): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = {
      ...post,
      id,
      excerpt: post.excerpt || null,
      coverImage: post.coverImage || null,
      categoryId: post.categoryId || null,
      publishedAt: post.published ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = {
      ...existing,
      ...post,
      updatedAt: new Date(),
      publishedAt: post.published !== undefined && post.published ? new Date() : existing.publishedAt
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const cat: Category = {
      ...category,
      id,
      description: category.description || null,
      createdAt: new Date()
    };
    this.categories.set(id, cat);
    return cat;
  }

  // Gallery methods
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getGalleryItem(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const galleryItem: GalleryItem = {
      ...item,
      id,
      description: item.description || null,
      thumbnail: item.thumbnail || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }

  async updateGalleryItem(id: string, item: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const existing = this.galleryItems.get(id);
    if (!existing) return undefined;

    const updated: GalleryItem = {
      ...existing,
      ...item,
      updatedAt: new Date()
    };
    this.galleryItems.set(id, updated);
    return updated;
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    return this.galleryItems.delete(id);
  }

  // Publication methods
  async getAllPublications(): Promise<Publication[]> {
    return Array.from(this.publications.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPublication(id: string): Promise<Publication | undefined> {
    return this.publications.get(id);
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const id = randomUUID();
    const pub: Publication = {
      ...publication,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.publications.set(id, pub);
    return pub;
  }

  async updatePublication(id: string, publication: UpdatePublication): Promise<Publication | undefined> {
    const existing = this.publications.get(id);
    if (!existing) return undefined;

    const updated: Publication = {
      ...existing,
      ...publication,
      updatedAt: new Date()
    };
    this.publications.set(id, updated);
    return updated;
  }

  async deletePublication(id: string): Promise<boolean> {
    return this.publications.delete(id);
  }

  // Important Days methods
  async getAllImportantDays(): Promise<ImportantDay[]> {
    return Array.from(this.importantDays.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getImportantDay(id: string): Promise<ImportantDay | undefined> {
    return this.importantDays.get(id);
  }

  async createImportantDay(day: InsertImportantDay): Promise<ImportantDay> {
    const id = randomUUID();
    const importantDay: ImportantDay = {
      ...day,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.importantDays.set(id, importantDay);
    return importantDay;
  }

  async updateImportantDay(id: string, day: UpdateImportantDay): Promise<ImportantDay | undefined> {
    const existing = this.importantDays.get(id);
    if (!existing) return undefined;

    const updated: ImportantDay = {
      ...existing,
      ...day,
      updatedAt: new Date()
    };
    this.importantDays.set(id, updated);
    return updated;
  }

  async deleteImportantDay(id: string): Promise<boolean> {
    return this.importantDays.delete(id);
  }
}

// Database initialization function
async function initializeDatabase() {
  if (!db) return;
  
  try {
    // Check if admin user exists, create if not
    const adminUser = await db.select().from(users).where(eq(users.username, "admin"));
    if (adminUser.length === 0) {
      await db.insert(users).values({
        username: "admin",
        password: "$2b$10$example",
        isAdmin: true
      });
      console.log("Created default admin user");
    }

    // Check if default category exists, create if not
    const generalCategory = await db.select().from(categories).where(eq(categories.slug, "general"));
    if (generalCategory.length === 0) {
      await db.insert(categories).values({
        name: "General",
        slug: "general",
        description: "General blog posts"
      });
      console.log("Created default category");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Use database storage if available, otherwise fall back to memory storage
export const storage: IStorage = db ? new DatabaseStorage() : new MemStorage();

// Initialize database if using database storage
if (db) {
  initializeDatabase();
}
