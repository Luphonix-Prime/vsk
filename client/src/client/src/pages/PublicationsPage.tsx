import { useState } from "react";
import PublicationCard from "@/components/PublicationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileText, Download } from "lucide-react";

// Mock data - TODO: replace with real data from JSON files
const mockPublicationsData = [
  {
    id: "1",
    title: "Cultural Heritage Preservation Guidelines",
    description: "Comprehensive guide on preserving and promoting Gujarati cultural traditions in modern society. Includes practical strategies for community engagement and cultural education.",
    publishDate: "February 2024",
    fileSize: "2.3 MB",
    downloadUrl: "#",
    category: "Guidelines"
  },
  {
    id: "2",
    title: "Community Development Handbook",
    description: "Practical strategies for community engagement and development initiatives. Learn how to organize events, build partnerships, and create lasting community impact.",
    publishDate: "January 2024",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    category: "Handbook"
  },
  {
    id: "3",
    title: "Traditional Arts and Crafts Manual",
    description: "Step-by-step instructions for traditional Gujarati arts and crafts. Perfect for educators, parents, and anyone interested in learning traditional skills.",
    publishDate: "December 2023",
    fileSize: "4.2 MB",
    downloadUrl: "#",
    category: "Educational"
  },
  {
    id: "4",
    title: "Annual Report 2023",
    description: "Comprehensive overview of our activities, achievements, and community impact throughout 2023. Includes financial summaries and future planning initiatives.",
    publishDate: "December 2023",
    fileSize: "3.1 MB",
    downloadUrl: "#",
    category: "Reports"
  },
  {
    id: "5",
    title: "Youth Program Curriculum",
    description: "Complete curriculum for our youth cultural education program. Designed for ages 5-18 with age-appropriate activities and learning objectives.",
    publishDate: "November 2023",
    fileSize: "2.7 MB",
    downloadUrl: "#",
    category: "Educational"
  },
  {
    id: "6",
    title: "Event Planning Guide",
    description: "Comprehensive guide for organizing cultural events and community gatherings. Includes checklists, timelines, and best practices from our experience.",
    publishDate: "October 2023",
    fileSize: "1.9 MB",
    downloadUrl: "#",
    category: "Guidelines"
  },
  {
    id: "7",
    title: "Traditional Recipe Collection",
    description: "Authentic Gujarati recipes passed down through generations. Includes preparation instructions, nutritional information, and cultural significance.",
    publishDate: "September 2023",
    fileSize: "3.5 MB",
    downloadUrl: "#",
    category: "Cultural"
  },
  {
    id: "8",
    title: "Volunteer Training Manual",
    description: "Complete training guide for new volunteers. Covers our mission, values, event procedures, and communication guidelines.",
    publishDate: "August 2023",
    fileSize: "1.6 MB",
    downloadUrl: "#",
    category: "Training"
  }
];

const categories = ["All", "Guidelines", "Handbook", "Educational", "Reports", "Cultural", "Training"];

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [publicationsData] = useState(mockPublicationsData);

  const filteredPublications = publicationsData.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || publication.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (id: string, title: string) => {
    console.log('Publication download started:', id, title);
    // TODO: Implement actual download functionality
  };

  const totalDownloads = 1234; // Mock total downloads

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="publications-page-title">
            Publications & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our educational materials, guides, and cultural preservation resources
          </p>
        </div>

        {/* Statistics */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{publicationsData.length}</div>
            <div className="text-sm text-muted-foreground">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">{totalDownloads}</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-publications"
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
            {filteredPublications.length === publicationsData.length 
              ? `Showing all ${filteredPublications.length} publications`
              : `Showing ${filteredPublications.length} of ${publicationsData.length} publications`
            }
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredPublications.map((publication) => (
            <PublicationCard
              key={publication.id}
              {...publication}
              onDownload={() => handleDownload(publication.id, publication.title)}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No publications found</h3>
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

        {/* Download All Button */}
        {filteredPublications.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => console.log('Download all publications')}
              data-testid="button-download-all"
            >
              <Download className="mr-2 h-4 w-4" />
              Download All Publications
            </Button>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Need Something Specific?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help you access the resources you need 
              for your cultural education and community development initiatives.
            </p>
            <Button data-testid="button-contact-resources">
              Contact Our Resources Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}