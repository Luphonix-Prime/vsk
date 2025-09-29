import { useState } from "react";
import GalleryCard from "@/components/GalleryCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Image, Video } from "lucide-react";

// Mock data - TODO: replace with real data from JSON files
import culturalEventImage from '@assets/generated_images/Cultural_event_photo_4cfc2141.png';
import danceImage from '@assets/generated_images/Traditional_dance_performance_44f13591.png';
import communityImage from '@assets/generated_images/Community_service_event_7d7cb162.png';

const mockGalleryData = [
  {
    id: "1",
    type: "image" as const,
    src: danceImage,
    thumbnail: danceImage,
    title: "Traditional Dance Performance",
    description: "Annual cultural festival showcasing traditional Gujarati dance forms",
    category: "Performances"
  },
  {
    id: "2",
    type: "image" as const,
    src: culturalEventImage,
    thumbnail: culturalEventImage,
    title: "Cultural Heritage Celebration",
    description: "Community gathering celebrating our rich cultural heritage",
    category: "Events"
  },
  {
    id: "3",
    type: "image" as const,
    src: communityImage,
    thumbnail: communityImage,
    title: "Community Service Event",
    description: "Volunteers working together for community development",
    category: "Community Service"
  },
  {
    id: "4",
    type: "video" as const,
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: danceImage,
    title: "Navratri Dance Tutorial",
    description: "Learn traditional Navratri dance steps with our expert instructors",
    category: "Tutorials"
  },
  {
    id: "5",
    type: "image" as const,
    src: culturalEventImage,
    thumbnail: culturalEventImage,
    title: "Youth Program Graduation",
    description: "Celebrating the achievements of our youth education program graduates",
    category: "Programs"
  },
  {
    id: "6",
    type: "video" as const,
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: communityImage,
    title: "Community Impact Stories",
    description: "Hear from community members about the impact of our programs",
    category: "Testimonials"
  }
];

const categories = ["All", "Events", "Performances", "Community Service", "Programs", "Tutorials", "Testimonials"];
const mediaTypes = ["All", "Images", "Videos"];

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMediaType, setSelectedMediaType] = useState("All");
  const [galleryData] = useState(mockGalleryData);

  const filteredGallery = galleryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesMediaType = selectedMediaType === "All" || 
                           (selectedMediaType === "Images" && item.type === "image") ||
                           (selectedMediaType === "Videos" && item.type === "video");
    return matchesSearch && matchesCategory && matchesMediaType;
  });

  const handleGalleryClick = (id: string) => {
    console.log('Gallery item clicked:', id);
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="gallery-page-title">
            Photo & Video Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore moments from our cultural events, community activities, and educational programs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-gallery"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48" data-testid="select-category">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMediaType} onValueChange={setSelectedMediaType}>
              <SelectTrigger className="w-full lg:w-32" data-testid="select-media-type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {mediaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Media Type Statistics */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Image className="h-4 w-4" />
            <span className="text-sm">
              {galleryData.filter(item => item.type === 'image').length} Photos
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Video className="h-4 w-4" />
            <span className="text-sm">
              {galleryData.filter(item => item.type === 'video').length} Videos
            </span>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            {filteredGallery.length === galleryData.length 
              ? `Showing all ${filteredGallery.length} items`
              : `Showing ${filteredGallery.length} of ${galleryData.length} items`
            }
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredGallery.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => handleGalleryClick(item.id)}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No media found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedMediaType("All");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredGallery.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => console.log('Load more gallery items')}
              data-testid="button-load-more"
            >
              Load More Media
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}