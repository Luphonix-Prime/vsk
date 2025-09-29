import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface ImportantDayCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  category: string;
  isUpcoming?: boolean;
}

export default function ImportantDayCard({
  id,
  title,
  date,
  time,
  description,
  category,
  isUpcoming = false
}: ImportantDayCardProps) {
  return (
    <Card className={`hover-elevate transition-all duration-300 ${
      isUpcoming ? 'ring-2 ring-primary/20 border-primary/30' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${
            isUpcoming ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            <Calendar className="h-6 w-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg" data-testid={`important-day-title-${id}`}>
                {title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ml-2 ${
                isUpcoming 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {category}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span data-testid={`important-day-date-${id}`}>{date}</span>
              </div>
              {time && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span data-testid={`important-day-time-${id}`}>{time}</span>
                </div>
              )}
            </div>
            
            <p className="text-muted-foreground text-sm" data-testid={`important-day-description-${id}`}>
              {description}
            </p>
            
            {isUpcoming && (
              <div className="mt-3 text-sm font-medium text-primary">
                Upcoming Event
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}