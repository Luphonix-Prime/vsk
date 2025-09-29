
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogPostSchema, 
  updateBlogPostSchema, 
  insertCategorySchema,
  insertGalleryItemSchema,
  updateGalleryItemSchema,
  insertPublicationSchema,
  updatePublicationSchema,
  insertImportantDaySchema,
  updateImportantDaySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const includeUnpublished = req.query.all === "true";
      const posts = includeUnpublished 
        ? await storage.getAllBlogPosts()
        : await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/slug/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const adminUser = await storage.getUserByUsername("admin");
      if (!adminUser) {
        return res.status(400).json({ error: "No admin user found" });
      }
      
      const post = await storage.createBlogPost({
        ...validatedData,
        authorId: adminUser.id
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const validatedData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const items = await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const item = await storage.getGalleryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery item" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/gallery/:id", async (req, res) => {
    try {
      const validatedData = updateGalleryItemSchema.parse(req.body);
      const item = await storage.updateGalleryItem(req.params.id, validatedData);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const success = await storage.deleteGalleryItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery item" });
    }
  });

  // Publications routes
  app.get("/api/publications", async (req, res) => {
    try {
      const publications = await storage.getAllPublications();
      res.json(publications);
    } catch (error) {
      console.error("Error fetching publications:", error);
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.get("/api/publications/:id", async (req, res) => {
    try {
      const publication = await storage.getPublication(req.params.id);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  app.post("/api/publications", async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validatedData);
      res.status(201).json(publication);
    } catch (error) {
      console.error("Error creating publication:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/publications/:id", async (req, res) => {
    try {
      const validatedData = updatePublicationSchema.parse(req.body);
      const publication = await storage.updatePublication(req.params.id, validatedData);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/publications/:id", async (req, res) => {
    try {
      const success = await storage.deletePublication(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete publication" });
    }
  });

  // Important Days routes
  app.get("/api/important-days", async (req, res) => {
    try {
      const days = await storage.getAllImportantDays();
      res.json(days);
    } catch (error) {
      console.error("Error fetching important days:", error);
      res.status(500).json({ error: "Failed to fetch important days" });
    }
  });

  app.get("/api/important-days/:id", async (req, res) => {
    try {
      const day = await storage.getImportantDay(req.params.id);
      if (!day) {
        return res.status(404).json({ error: "Important day not found" });
      }
      res.json(day);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch important day" });
    }
  });

  app.post("/api/important-days", async (req, res) => {
    try {
      const validatedData = insertImportantDaySchema.parse(req.body);
      const day = await storage.createImportantDay(validatedData);
      res.status(201).json(day);
    } catch (error) {
      console.error("Error creating important day:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/important-days/:id", async (req, res) => {
    try {
      const validatedData = updateImportantDaySchema.parse(req.body);
      const day = await storage.updateImportantDay(req.params.id, validatedData);
      if (!day) {
        return res.status(404).json({ error: "Important day not found" });
      }
      res.json(day);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/important-days/:id", async (req, res) => {
    try {
      const success = await storage.deleteImportantDay(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Important day not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete important day" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Simple auth check endpoint
  app.get("/api/auth/me", async (req, res) => {
    // For now, return admin user
    const adminUser = await storage.getUserByUsername("admin");
    if (adminUser) {
      res.json({ id: adminUser.id, username: adminUser.username, isAdmin: adminUser.isAdmin });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
