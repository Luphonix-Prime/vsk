import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Gallery", path: "/gallery" },
  { name: "Publications", path: "/publications" },
  { name: "Important Days", path: "/important-days" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/admin" }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log('Mobile menu toggled:', !isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <img 
                src="/123.jpg" 
                alt="VSK Gujarat Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">VSK Gujarat</span>
              <span className="text-xs text-muted-foreground">વિશ્વ સંસ્કૃત કેન્દ્ર</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className="text-sm font-medium"
                  data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}