import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  description?: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleClick = () => {
    setIsLightboxOpen(true);
    console.log('Gallery item opened:', item.id);
    onClick?.();
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    console.log('Lightbox closed');
  };

  return (
    <>
      <Card className="overflow-hidden group cursor-pointer hover-elevate transition-all duration-300">
        <div className="relative" onClick={handleClick}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play button for videos */}
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <div className="bg-primary rounded-full p-3">
                <Play className="h-6 w-6 text-primary-foreground fill-current" />
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-medium text-sm" data-testid={`gallery-title-${item.id}`}>
              {item.title}
            </h3>
          </div>
        </div>
      </Card>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={closeLightbox}
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.title}
                className="max-w-full max-h-full object-contain"
                data-testid={`lightbox-image-${item.id}`}
              />
            ) : (
              <div className="aspect-video w-full max-w-3xl">
                <iframe
                  src={item.src}
                  className="w-full h-full"
                  allowFullScreen
                  data-testid={`lightbox-video-${item.id}`}
                />
              </div>
            )}
            
            {item.description && (
              <div className="text-center mt-4 text-white">
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-sm opacity-80">{item.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}