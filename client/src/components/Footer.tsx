import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" }
];

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Gallery", path: "/gallery" },
  { name: "Publications", path: "/publications" },
  { name: "Contact", path: "/contact" }
];

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    console.log('Social media clicked:', platform);
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">V</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">VSK Gujarat</h3>
                <p className="text-sm text-muted-foreground">વિશ્વ સંસ્કૃત કેન્દ્ર</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Preserving and promoting Gujarati culture while building stronger communities for future generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground text-left justify-start"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>VSK Gujarat</p>
                  <p>123 Cultural Center</p>
                  <p>Ahmedabad, Gujarat 380001</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@vskgujarat.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSocialClick(social.name)}
                    data-testid={`social-${social.name.toLowerCase()}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Stay connected with our community and get updates on upcoming events and programs.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 VSK Gujarat. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <Button 
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              data-testid="link-privacy"
            >
              Privacy Policy
            </Button>
            <Button 
              variant="ghost" 
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              data-testid="link-terms"
            >
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}