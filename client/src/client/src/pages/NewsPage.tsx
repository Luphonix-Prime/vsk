
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

// Individual post page
function NewsPostPage({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/posts/slug/${slug}`],
    staleTime: 30 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-muted-foreground mb-4">Article not found</h1>
            <Button asChild>
              <Link href="/news">Back to News</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>

        <article className="prose prose-lg max-w-none">
          <header className="mb-8 not-prose">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Draft'}</time>
              </div>
              {post.featured && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.coverImage && (
            <div className="mb-8 not-prose">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}

// News listing page
export default function NewsPage() {
  const [match, params] = useRoute("/news/:slug");
  
  if (match && params?.slug) {
    return <NewsPostPage slug={params.slug} />;
  }

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
    staleTime: 30 * 1000,
  });

  const featuredPosts = posts?.filter(post => post.featured) || [];
  const regularPosts = posts?.filter(post => !post.featured) || [];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Latest News & Updates</h1>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest happenings in our community
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading news...</p>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      {post.coverImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Featured
                          </Badge>
                          <time className="text-sm text-muted-foreground">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                          </time>
                        </div>
                        <CardTitle className="line-clamp-2">
                          <Link href={`/news/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt || post.content.substring(0, 200) + '...'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/news/${post.slug}`}>Read Full Story</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-8">All News</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      {post.coverImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <time className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                          </time>
                        </div>
                        <CardTitle className="line-clamp-2">
                          <Link href={`/news/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
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
              </section>
            )}

            {/* Empty State */}
            {(!posts || posts.length === 0) && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <h2 className="text-2xl font-semibold mb-4">No news available</h2>
                <p className="text-muted-foreground mb-8">
                  Check back soon for the latest updates and announcements.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
