import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Filter } from "lucide-react";

// Mock data - TODO: replace with real data from JSON files
import culturalEventImage from '@assets/generated_images/Cultural_event_photo_4cfc2141.png';
import danceImage from '@assets/generated_images/Traditional_dance_performance_44f13591.png';
import communityImage from '@assets/generated_images/Community_service_event_7d7cb162.png';

const mockNewsData = [
  {
    id: "1",
    title: "Annual Cultural Festival 2024 Celebrates Rich Heritage",
    excerpt: "Join us for our biggest cultural celebration of the year featuring traditional performances, authentic cuisine, and community activities that bring together families from across Gujarat.",
    image: culturalEventImage,
    date: "March 15, 2024",
    author: "VSK Team",
    category: "Events"
  },
  {
    id: "2",
    title: "Youth Cultural Education Program Launched",
    excerpt: "New initiative to teach traditional arts and cultural values to young community members through interactive workshops and mentorship programs.",
    image: danceImage,
    date: "March 10, 2024",
    author: "Education Team",
    category: "Programs"
  },
  {
    id: "3",
    title: "Community Service Drive: Building Stronger Bonds",
    excerpt: "Successful community service initiative brings together families to support local causes and strengthen community ties through volunteer work.",
    image: communityImage,
    date: "March 5, 2024",
    author: "Community Team",
    category: "Community"
  },
  {
    id: "4",
    title: "Traditional Arts Workshop Series Begins",
    excerpt: "Learn traditional Gujarati crafts, music, and dance in our comprehensive workshop series designed for all skill levels and ages.",
    image: danceImage,
    date: "February 28, 2024",
    author: "Arts Team",
    category: "Programs"
  },
  {
    id: "5",
    title: "Scholarship Program Announces New Recipients",
    excerpt: "VSK Gujarat proudly announces the recipients of this year's educational scholarships, supporting academic excellence in our community.",
    image: culturalEventImage,
    date: "February 20, 2024",
    author: "Education Team",
    category: "Announcements"
  },
  {
    id: "6",
    title: "Monthly Community Gathering Success",
    excerpt: "Another successful monthly gathering brings together community members for cultural discussions, networking, and shared meals.",
    image: communityImage,
    date: "February 15, 2024",
    author: "Community Team",
    category: "Community"
  }
];

const categories = ["All", "Events", "Programs", "Community", "Announcements"];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsData] = useState(mockNewsData);

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsClick = (id: string) => {
    console.log('News article clicked:', id);
    // TODO: Navigate to news detail page
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="news-page-title">
            Latest News & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest events, programs, and community initiatives
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-news"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-category">
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
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            {filteredNews.length === mockNewsData.length 
              ? `Showing all ${filteredNews.length} articles`
              : `Showing ${filteredNews.length} of ${mockNewsData.length} articles`
            }
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredNews.map((news) => (
            <NewsCard
              key={news.id}
              {...news}
              onClick={() => handleNewsClick(news.id)}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredNews.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => console.log('Load more articles')}
              data-testid="button-load-more"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}