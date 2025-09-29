import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-page-title">
            About VSK Gujarat
          </h1>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <p className="mb-2">વિશ્વ સંસ્કૃત કેન્દ્ર - ગુજરાત</p>
            <p>Preserving Culture, Building Community, Inspiring Future Generations</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To preserve, promote, and celebrate the rich cultural heritage of Gujarat while fostering community unity, 
                educational excellence, and spiritual growth. We strive to bridge tradition with modernity, ensuring our 
                cultural values continue to inspire future generations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To create a vibrant global community where Gujarati culture thrives, where every individual feels 
                connected to their roots, and where traditional wisdom guides us in building a better, more 
                harmonious world for all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover-elevate transition-all duration-300">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Cultural Preservation</h3>
                <p className="text-muted-foreground">
                  Safeguarding our traditions, language, arts, and customs for future generations through 
                  dedicated preservation efforts and educational initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all duration-300">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community Unity</h3>
                <p className="text-muted-foreground">
                  Building strong bonds within our community through shared experiences, mutual support, 
                  and collaborative efforts toward common goals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate transition-all duration-300">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Educational Excellence</h3>
                <p className="text-muted-foreground">
                  Promoting learning and personal growth through quality educational programs, workshops, 
                  and cultural awareness initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Founded with the vision of preserving and promoting Gujarati culture, VSK Gujarat has been 
                    a cornerstone of our community for decades. What began as a small group of dedicated 
                    individuals passionate about their heritage has grown into a thriving organization that 
                    serves thousands of families.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Through the years, we have organized countless cultural events, educational programs, 
                    and community service initiatives. Our festivals bring together people from all walks 
                    of life to celebrate our shared heritage, while our educational programs ensure that 
                    young generations remain connected to their roots.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, VSK Gujarat continues to evolve while staying true to its core mission. We embrace 
                    modern approaches to community building and cultural preservation, using technology and 
                    innovative programs to reach more people and create lasting impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Be part of our mission to preserve culture and build community. Whether you're looking to 
                volunteer, participate in events, or simply stay connected, we welcome you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" data-testid="button-get-involved">
                  Get Involved
                </Button>
                <Button size="lg" variant="outline" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}