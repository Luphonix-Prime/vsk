import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import GalleryCard from "@/components/GalleryCard";
import PublicationCard from "@/components/PublicationCard";
import ImportantDayCard from "@/components/ImportantDayCard";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

// Mock data - TODO: replace with real data from JSON files
import culturalEventImage from '@assets/generated_images/Cultural_event_photo_4cfc2141.png';
import danceImage from '@assets/generated_images/Traditional_dance_performance_44f13591.png';
import communityImage from '@assets/generated_images/Community_service_event_7d7cb162.png';

const mockNews = [
  {
    id: "1",
    title: "Annual Cultural Festival 2024 Celebrates Rich Heritage",
    excerpt: "Join us for our biggest cultural celebration of the year featuring traditional performances, authentic cuisine, and community activities.",
    image: culturalEventImage,
    date: "March 15, 2024",
    author: "VSK Team",
    category: "Events"
  },
  {
    id: "2",
    title: "Youth Cultural Education Program Launched",
    excerpt: "New initiative to teach traditional arts and cultural values to young community members through interactive workshops.",
    image: danceImage,
    date: "March 10, 2024",
    author: "Education Team",
    category: "Programs"
  },
  {
    id: "3",
    title: "Community Service Drive: Building Stronger Bonds",
    excerpt: "Successful community service initiative brings together families to support local causes and strengthen community ties.",
    image: communityImage,
    date: "March 5, 2024",
    author: "Community Team",
    category: "Community"
  }
];

const mockGallery = [
  {
    id: "1",
    type: "image" as const,
    src: danceImage,
    thumbnail: danceImage,
    title: "Traditional Dance Performance",
    description: "Annual cultural festival showcasing traditional Gujarati dance forms"
  },
  {
    id: "2",
    type: "image" as const,
    src: culturalEventImage,
    thumbnail: culturalEventImage,
    title: "Cultural Heritage Celebration",
    description: "Community gathering celebrating our rich cultural heritage"
  },
  {
    id: "3",
    type: "image" as const,
    src: communityImage,
    thumbnail: communityImage,
    title: "Community Service Event",
    description: "Volunteers working together for community development"
  }
];

const mockPublications = [
  {
    id: "1",
    title: "Cultural Heritage Preservation Guidelines",
    description: "Comprehensive guide on preserving and promoting Gujarati cultural traditions in modern society.",
    publishDate: "February 2024",
    fileSize: "2.3 MB",
    downloadUrl: "#",
    category: "Guidelines"
  },
  {
    id: "2",
    title: "Community Development Handbook",
    description: "Practical strategies for community engagement and development initiatives.",
    publishDate: "January 2024",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    category: "Handbook"
  }
];

const mockImportantDays = [
  {
    id: "1",
    title: "Navratri Celebration",
    date: "October 15, 2024",
    time: "6:00 PM",
    description: "Join us for a vibrant celebration of Navratri with traditional dance, music, and authentic Gujarati cuisine.",
    category: "Festival",
    isUpcoming: true
  },
  {
    id: "2",
    title: "Diwali Community Gathering",
    date: "November 1, 2024",
    time: "7:00 PM",
    description: "Community celebration of the festival of lights with traditional ceremonies and festivities.",
    category: "Festival",
    isUpcoming: true
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Latest News Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-news">Latest News</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest events, programs, and community initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {mockNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/news">
              <Button size="lg" data-testid="button-view-all-news">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-gallery">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore moments from our cultural events and community activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {mockGallery.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/gallery">
              <Button size="lg" variant="secondary" data-testid="button-view-all-gallery">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-publications">Publications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access our educational resources and cultural preservation materials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {mockPublications.map((publication) => (
              <PublicationCard key={publication.id} {...publication} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/publications">
              <Button size="lg" data-testid="button-view-all-publications">
                View All Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Important Days Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-important-days">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for these important cultural celebrations and community events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {mockImportantDays.map((day) => (
              <ImportantDayCard key={day.id} {...day} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/important-days">
              <Button size="lg" variant="secondary" data-testid="button-view-all-events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}