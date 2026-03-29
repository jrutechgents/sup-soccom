import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  status?: 'upcoming' | 'live' | 'completed';
}

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  image,
  status = 'upcoming'
}: EventCardProps) {

  const handleWatchClick = () => {
    // For live events, go to home page with live section
    // For completed events, go to services page
    if (status === 'live' || status === 'upcoming') {
      window.location.href = '/#live';
    } else {
      window.location.href = '/services';
    }
  };
  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="gap-2">
          <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
          LIVE NOW
        </Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge>Upcoming</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="pt-2">
          {status === 'live' ? (
            <Button className="w-full" size="lg" onClick={handleWatchClick}>
              Watch Live
            </Button>
          ) : status === 'upcoming' ? (
            <Button variant="outline" className="w-full" onClick={() => {
              // Scroll to live section on home page
              window.location.href = '/#live';
            }}>
              Set Reminder
            </Button>
          ) : (
            <Button variant="secondary" className="w-full" onClick={handleWatchClick}>
              Watch Recording
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
