import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  onClick?: () => void;
}

export default function NewsCard({ 
  id, 
  title, 
  excerpt, 
  image, 
  date, 
  author, 
  category,
  onClick 
}: NewsCardProps) {
  const handleClick = () => {
    console.log('News card clicked:', id);
    onClick?.();
  };

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2" data-testid={`news-title-${id}`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3" data-testid={`news-excerpt-${id}`}>
          {excerpt}
        </p>
        
        <div className="flex items-center text-xs text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span data-testid={`news-date-${id}`}>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span data-testid={`news-author-${id}`}>{author}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClick}
          className="w-full"
          data-testid={`button-read-more-${id}`}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}