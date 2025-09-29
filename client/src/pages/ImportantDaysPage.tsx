import { useState } from "react";
import ImportantDayCard from "@/components/ImportantDayCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Calendar, Clock, MapPin } from "lucide-react";

// Mock data - TODO: replace with real data from JSON files
const mockImportantDaysData = [
  {
    id: "1",
    title: "Navratri Celebration",
    date: "October 15, 2024",
    time: "6:00 PM",
    description: "Join us for a vibrant celebration of Navratri with traditional dance, music, and authentic Gujarati cuisine. All community members and families are welcome.",
    category: "Festival",
    isUpcoming: true
  },
  {
    id: "2",
    title: "Diwali Community Gathering",
    date: "November 1, 2024",
    time: "7:00 PM",
    description: "Community celebration of the festival of lights with traditional ceremonies, fireworks display, and festive meals for all attendees.",
    category: "Festival",
    isUpcoming: true
  },
  {
    id: "3",
    title: "Youth Cultural Workshop",
    date: "October 28, 2024",
    time: "10:00 AM",
    description: "Interactive workshop for young community members to learn traditional arts, crafts, and cultural practices from expert instructors.",
    category: "Educational",
    isUpcoming: true
  },
  {
    id: "4",
    title: "Community Service Day",
    date: "November 15, 2024",
    time: "9:00 AM",
    description: "Monthly community service initiative where volunteers come together to support local causes and strengthen community bonds.",
    category: "Community Service",
    isUpcoming: true
  },
  {
    id: "5",
    title: "Makar Sankranti Kite Festival",
    date: "January 14, 2025",
    time: "11:00 AM",
    description: "Traditional kite flying festival celebrating the harvest season with competitions, food stalls, and cultural performances.",
    category: "Festival",
    isUpcoming: true
  },
  {
    id: "6",
    title: "Annual Cultural Night",
    date: "March 20, 2025",
    time: "6:30 PM",
    description: "Showcase of community talent featuring traditional and contemporary performances, art exhibitions, and cultural displays.",
    category: "Cultural",
    isUpcoming: true
  },
  {
    id: "7",
    title: "Holi Color Festival",
    date: "March 13, 2025",
    time: "2:00 PM",
    description: "Vibrant celebration of colors marking the arrival of spring with traditional music, dance, and organic color play.",
    category: "Festival",
    isUpcoming: true
  },
  {
    id: "8",
    title: "Senior Citizens Appreciation Day",
    date: "April 10, 2025",
    time: "11:00 AM",
    description: "Special event honoring our elderly community members with cultural programs, health screenings, and appreciation ceremonies.",
    category: "Community",
    isUpcoming: true
  }
];

const categories = ["All", "Festival", "Educational", "Community Service", "Cultural", "Community"];
const timeFilters = ["All", "Upcoming", "This Month", "Next Month"];

export default function ImportantDaysPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All");
  const [importantDaysData] = useState(mockImportantDaysData);

  const filteredEvents = importantDaysData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    // Simple time filtering logic (in real app, would use proper date comparison)
    let matchesTimeFilter = true;
    if (selectedTimeFilter === "Upcoming") {
      matchesTimeFilter = event.isUpcoming;
    }
    // Additional time filter logic would go here for "This Month", "Next Month"
    
    return matchesSearch && matchesCategory && matchesTimeFilter;
  });

  const upcomingEventsCount = importantDaysData.filter(event => event.isUpcoming).length;

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="important-days-page-title">
            Important Days & Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar for cultural celebrations, educational programs, and community events
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{importantDaysData.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">{upcomingEventsCount}</div>
              <div className="text-sm text-muted-foreground">Upcoming Events</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">VSK Center</div>
              <div className="text-sm text-muted-foreground">Main Venue</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-events"
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
            <Select value={selectedTimeFilter} onValueChange={setSelectedTimeFilter}>
              <SelectTrigger className="w-full lg:w-40" data-testid="select-time-filter">
                <SelectValue placeholder="When" />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            {filteredEvents.length === importantDaysData.length 
              ? `Showing all ${filteredEvents.length} events`
              : `Showing ${filteredEvents.length} of ${importantDaysData.length} events`
            }
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredEvents.map((event) => (
            <ImportantDayCard key={event.id} {...event} />
          ))}
        </div>

        {/* No results message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedTimeFilter("All");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Subscribe to Calendar */}
        <div className="mt-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Subscribe to our calendar to receive notifications about upcoming events and never miss 
                an important cultural celebration or community gathering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" data-testid="button-subscribe-calendar">
                  Subscribe to Calendar
                </Button>
                <Button size="lg" variant="outline" data-testid="button-view-calendar">
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}