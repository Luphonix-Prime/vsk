import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";

interface PublicationCardProps {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  fileSize: string;
  downloadUrl: string;
  category: string;
  onDownload?: () => void;
}

export default function PublicationCard({
  id,
  title,
  description,
  publishDate,
  fileSize,
  downloadUrl,
  category,
  onDownload
}: PublicationCardProps) {
  const handleDownload = () => {
    console.log('Publication download started:', id);
    // In a real app, this would initiate the download
    window.open(downloadUrl, '_blank');
    onDownload?.();
  };

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg leading-tight" data-testid={`publication-title-${id}`}>
                {title}
              </h3>
              <span className="bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium rounded whitespace-nowrap ml-2">
                {category}
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3" data-testid={`publication-description-${id}`}>
              {description}
            </p>
            
            <div className="flex items-center text-xs text-muted-foreground space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span data-testid={`publication-date-${id}`}>{publishDate}</span>
              </div>
              <span data-testid={`publication-size-${id}`}>Size: {fileSize}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleDownload}
          className="w-full"
          data-testid={`button-download-${id}`}
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
}