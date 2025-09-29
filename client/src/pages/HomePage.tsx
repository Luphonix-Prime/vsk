import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, Star } from "lucide-react";
import { Link } from "wouter";
import HeroSection from "@/components/HeroSection";
import type { BlogPost } from "@shared/schema";

export default function HomePage() {
  // Fetch published blog posts
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
    staleTime: 30 * 1000, // 30 seconds
  });

  const featuredPosts = posts?.filter(post => post.featured) || [];
  const recentPosts = posts?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured News</h2>
              <p className="text-muted-foreground text-lg">
                Stay updated with our latest announcements and activities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                      <time className="text-sm text-muted-foreground">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                      </time>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/news/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent News Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest News & Updates</h2>
            <p className="text-muted-foreground text-lg">
              Discover what's happening in our community
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading latest news...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <time className="text-sm text-muted-foreground">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                      </time>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/news/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No news yet</h3>
              <p className="text-muted-foreground">
                Check back soon for the latest updates and announcements.
              </p>
            </div>
          )}

          {recentPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/news">View All News</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Community</h2>
            <p className="text-muted-foreground text-lg">
              Discover more about our activities, events, and resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Important Days</CardTitle>
                <CardDescription>
                  Stay informed about upcoming cultural events and celebrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/important-days">View Calendar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Gallery</CardTitle>
                <CardDescription>
                  Browse photos from our events and community activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Publications</CardTitle>
                <CardDescription>
                  Access our newsletters, reports, and educational materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/publications">View Publications</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>About Us</CardTitle>
                <CardDescription>
                  Learn more about our mission, values, and community impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}