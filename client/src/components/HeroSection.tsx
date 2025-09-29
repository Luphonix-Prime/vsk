import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from '@assets/generated_images/VSK_Gujarat_hero_banner_1fc1b96d.png';

const heroSlides = [
  {
    id: 1,
    image: heroImage,
    title: "Welcome to VSK Gujarat",
    subtitle: "Preserving Culture, Building Community",
    description: "Join us in celebrating and preserving our rich cultural heritage while building a stronger community for future generations."
  },
  {
    id: 2,
    image: heroImage,
    title: "Cultural Events & Programs",
    subtitle: "Connecting Communities Through Culture",
    description: "Participate in our diverse range of cultural events, educational programs, and community initiatives throughout the year."
  },
  {
    id: 3,
    image: heroImage,
    title: "Educational Initiatives",
    subtitle: "Learning for All Ages",
    description: "Discover our educational programs designed to promote cultural awareness and community development."
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    console.log('Hero slide changed to:', index);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    setCurrentSlide(next);
    console.log('Next slide:', next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    setCurrentSlide(prev);
    console.log('Previous slide:', prev);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Hero Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="hero-title">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-2 font-medium" data-testid="hero-subtitle">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90" data-testid="hero-description">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary-border"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground backdrop-blur-sm"
              data-testid="button-join-us"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={prevSlide}
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={nextSlide}
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}