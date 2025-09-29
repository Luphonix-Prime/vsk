
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Save, X, Loader2, Image, FileText, Calendar, Newspaper } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { 
  BlogPost, 
  InsertBlogPost, 
  UpdateBlogPost,
  GalleryItem,
  InsertGalleryItem,
  UpdateGalleryItem,
  Publication,
  InsertPublication,
  UpdatePublication,
  ImportantDay,
  InsertImportantDay,
  UpdateImportantDay
} from "@shared/schema";

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Blog Post Form Component
function BlogPostForm({ 
  post, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  post?: BlogPost; 
  onSave: (data: any) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    coverImage: post?.coverImage || "",
    published: post?.published || false,
    featured: post?.featured || false,
  });

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: post ? prev.slug : generateSlug(title)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter post title"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="post-url-slug"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Brief description of the post"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
          placeholder="https://example.com/image.jpg or /attached_assets/image.png"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write your post content here..."
          rows={12}
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            disabled={isLoading}
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            disabled={isLoading}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {post ? 'Update' : 'Create'} Post
        </Button>
      </div>
    </form>
  );
}

// Gallery Form Component
function GalleryForm({ 
  item, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  item?: GalleryItem; 
  onSave: (data: any) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    description: item?.description || "",
    type: item?.type || "image",
    src: item?.src || "",
    thumbnail: item?.thumbnail || "",
    category: item?.category || "",
    featured: item?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="e.g., Performances, Events"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type *</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="src">Source URL *</Label>
        <Input
          id="src"
          value={formData.src}
          onChange={(e) => setFormData(prev => ({ ...prev, src: e.target.value }))}
          placeholder={formData.type === 'image' ? '/attached_assets/image.png' : 'https://youtube.com/embed/...'}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          value={formData.thumbnail}
          onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
          placeholder="/attached_assets/thumbnail.png"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          disabled={isLoading}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {item ? 'Update' : 'Create'} Item
        </Button>
      </div>
    </form>
  );
}

// Publication Form Component
function PublicationForm({ 
  publication, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  publication?: Publication; 
  onSave: (data: any) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: publication?.title || "",
    description: publication?.description || "",
    category: publication?.category || "",
    fileUrl: publication?.fileUrl || "",
    fileSize: publication?.fileSize || "",
    featured: publication?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter publication title"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="e.g., Guidelines, Reports"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed description"
          rows={4}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fileUrl">File URL *</Label>
          <Input
            id="fileUrl"
            value={formData.fileUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, fileUrl: e.target.value }))}
            placeholder="/attached_assets/document.pdf or external URL"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fileSize">File Size *</Label>
          <Input
            id="fileSize"
            value={formData.fileSize}
            onChange={(e) => setFormData(prev => ({ ...prev, fileSize: e.target.value }))}
            placeholder="e.g., 2.3 MB"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          disabled={isLoading}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {publication ? 'Update' : 'Create'} Publication
        </Button>
      </div>
    </form>
  );
}

// Important Day Form Component
function ImportantDayForm({ 
  day, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  day?: ImportantDay; 
  onSave: (data: any) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: day?.title || "",
    description: day?.description || "",
    date: day?.date || "",
    time: day?.time || "",
    category: day?.category || "",
    featured: day?.featured || false,
    isUpcoming: day?.isUpcoming || true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter event title"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="e.g., Festival, Educational"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Event description"
          rows={4}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            placeholder="e.g., October 15, 2024"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            placeholder="e.g., 6:00 PM"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            disabled={isLoading}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isUpcoming"
            checked={formData.isUpcoming}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isUpcoming: checked }))}
            disabled={isLoading}
          />
          <Label htmlFor="isUpcoming">Upcoming</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {day ? 'Update' : 'Create'} Event
        </Button>
      </div>
    </form>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Data queries
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts?all=true"],
    staleTime: 30 * 1000,
  });

  const { data: galleryItems, isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
    staleTime: 30 * 1000,
  });

  const { data: publications, isLoading: publicationsLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
    staleTime: 30 * 1000,
  });

  const { data: importantDays, isLoading: daysLoading } = useQuery<ImportantDay[]>({
    queryKey: ["/api/important-days"],
    staleTime: 30 * 1000,
  });

  // Mutations
  const createPostMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/posts", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts?all=true"] });
      setIsCreateDialogOpen(false);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/posts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts?all=true"] });
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts?all=true"] });
    },
  });

  const createGalleryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/gallery", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateGalleryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/gallery/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
  });

  const createPublicationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/publications", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      setIsCreateDialogOpen(false);
    },
  });

  const updatePublicationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/publications/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const deletePublicationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/publications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
    },
  });

  const createDayMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/important-days", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-days"] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateDayMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/important-days/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-days"] });
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const deleteDayMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/important-days/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-days"] });
    },
  });

  // Handler functions
  const handleCreate = (data: any) => {
    switch (activeTab) {
      case "news":
        createPostMutation.mutate(data);
        break;
      case "gallery":
        createGalleryMutation.mutate(data);
        break;
      case "publications":
        createPublicationMutation.mutate(data);
        break;
      case "important-days":
        createDayMutation.mutate(data);
        break;
    }
  };

  const handleUpdate = (data: any) => {
    if (!selectedItem) return;
    
    switch (activeTab) {
      case "news":
        updatePostMutation.mutate({ id: selectedItem.id, data });
        break;
      case "gallery":
        updateGalleryMutation.mutate({ id: selectedItem.id, data });
        break;
      case "publications":
        updatePublicationMutation.mutate({ id: selectedItem.id, data });
        break;
      case "important-days":
        updateDayMutation.mutate({ id: selectedItem.id, data });
        break;
    }
  };

  const handleDelete = (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    switch (activeTab) {
      case "news":
        deletePostMutation.mutate(item.id);
        break;
      case "gallery":
        deleteGalleryMutation.mutate(item.id);
        break;
      case "publications":
        deletePublicationMutation.mutate(item.id);
        break;
      case "important-days":
        deleteDayMutation.mutate(item.id);
        break;
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "news": return posts || [];
      case "gallery": return galleryItems || [];
      case "publications": return publications || [];
      case "important-days": return importantDays || [];
      default: return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case "news": return postsLoading;
      case "gallery": return galleryLoading;
      case "publications": return publicationsLoading;
      case "important-days": return daysLoading;
      default: return false;
    }
  };

  const getCurrentForm = () => {
    const isCreating = isCreateDialogOpen;
    const isUpdating = isEditDialogOpen;
    const isLoading = isCreating ? 
      (activeTab === "news" ? createPostMutation.isPending :
       activeTab === "gallery" ? createGalleryMutation.isPending :
       activeTab === "publications" ? createPublicationMutation.isPending :
       createDayMutation.isPending) :
      (activeTab === "news" ? updatePostMutation.isPending :
       activeTab === "gallery" ? updateGalleryMutation.isPending :
       activeTab === "publications" ? updatePublicationMutation.isPending :
       updateDayMutation.isPending);

    switch (activeTab) {
      case "news":
        return <BlogPostForm
          post={isUpdating ? selectedItem : undefined}
          onSave={isCreating ? handleCreate : handleUpdate}
          onCancel={() => {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          }}
          isLoading={isLoading}
        />;
      case "gallery":
        return <GalleryForm
          item={isUpdating ? selectedItem : undefined}
          onSave={isCreating ? handleCreate : handleUpdate}
          onCancel={() => {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          }}
          isLoading={isLoading}
        />;
      case "publications":
        return <PublicationForm
          publication={isUpdating ? selectedItem : undefined}
          onSave={isCreating ? handleCreate : handleUpdate}
          onCancel={() => {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          }}
          isLoading={isLoading}
        />;
      case "important-days":
        return <ImportantDayForm
          day={isUpdating ? selectedItem : undefined}
          onSave={isCreating ? handleCreate : handleUpdate}
          onCancel={() => {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          }}
          isLoading={isLoading}
        />;
      default:
        return null;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "news": return Newspaper;
      case "gallery": return Image;
      case "publications": return FileText;
      case "important-days": return Calendar;
      default: return Newspaper;
    }
  };

  if (getCurrentLoading()) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage all your content from one place</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                New {activeTab === "news" ? "Post" : 
                     activeTab === "gallery" ? "Item" : 
                     activeTab === "publications" ? "Publication" : "Event"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Create New {activeTab === "news" ? "Post" : 
                             activeTab === "gallery" ? "Gallery Item" : 
                             activeTab === "publications" ? "Publication" : "Important Day"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below to create new content.
                </DialogDescription>
              </DialogHeader>
              {getCurrentForm()}
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Publications
            </TabsTrigger>
            <TabsTrigger value="important-days" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Important Days
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid gap-6">
              {getCurrentData().map((item: any) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {item.title}
                          {item.featured && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Featured
                            </span>
                          )}
                          {activeTab === "news" && (
                            item.published ? (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                Draft
                              </span>
                            )
                          )}
                          {activeTab === "important-days" && item.isUpcoming && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Upcoming
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {item.excerpt || item.description || "No description available"}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {activeTab === "gallery" && (
                        <>Type: {item.type} • Category: {item.category}</>
                      )}
                      {activeTab === "publications" && (
                        <>Category: {item.category} • Size: {item.fileSize}</>
                      )}
                      {activeTab === "important-days" && (
                        <>Date: {item.date} at {item.time} • Category: {item.category}</>
                      )}
                      {activeTab === "news" && (
                        <>Category: General • Created: {new Date(item.createdAt).toLocaleDateString()}</>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getCurrentData().length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">
                      No {activeTab === "news" ? "posts" : 
                          activeTab === "gallery" ? "gallery items" : 
                          activeTab === "publications" ? "publications" : "events"} yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first {activeTab === "news" ? "blog post" : 
                                        activeTab === "gallery" ? "gallery item" : 
                                        activeTab === "publications" ? "publication" : "important day"} to get started.
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First {activeTab === "news" ? "Post" : 
                                    activeTab === "gallery" ? "Item" : 
                                    activeTab === "publications" ? "Publication" : "Event"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Edit {activeTab === "news" ? "Post" : 
                      activeTab === "gallery" ? "Gallery Item" : 
                      activeTab === "publications" ? "Publication" : "Important Day"}
              </DialogTitle>
              <DialogDescription>
                Update the details below.
              </DialogDescription>
            </DialogHeader>
            {getCurrentForm()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
