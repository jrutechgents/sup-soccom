import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Calendar } from 'lucide-react';
import type { Event } from '../types/content';

interface TodayScheduleProps {
  events: Event[];
}

export function TodaySchedule({ events }: TodayScheduleProps) {
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  // Filter events for today
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= todayEnd;
  });

  // Sort by time
  const sortedEvents = [...todayEvents].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get current time to determine what's live
  const now = new Date();
  const currentEvent = sortedEvents.find(event => {
    const eventDate = new Date(event.date);
    // Event is "live" if it's within 2 hours of start time and hasn't ended yet
    const eventStart = new Date(eventDate);
    const eventEnd = new Date(eventStart.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    return now >= eventStart && now <= eventEnd;
  });

  // Format time for display
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (event: Event, isLive: boolean) => {
    if (isLive) {
      return <Badge className="bg-red-500 text-white"><span className="h-2 w-2 bg-white rounded-full animate-pulse mr-1" />LIVE NOW</Badge>;
    }
    if (event.status === 'completed') {
      return <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">Completed</Badge>;
    }
    const eventDate = new Date(event.date);
    if (eventDate < now) {
      return <Badge variant="secondary" className="bg-gray-500/20 text-gray-700">Ended</Badge>;
    }
    return <Badge variant="outline" className="bg-blue-500/20 text-blue-700 border-blue-500/30">Upcoming</Badge>;
  };

  if (sortedEvents.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {currentEvent && (
            <Badge className="bg-red-500 text-white animate-pulse hidden sm:flex">
              <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
              LIVE NOW
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {sortedEvents.map((event, index) => {
            const isLive = currentEvent?.id === event.id;
            return (
              <div
                key={event.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isLive
                    ? 'bg-red-500/10 border border-red-500/30 shadow-md shadow-red-500/10'
                    : 'bg-background border border-border hover:border-primary/30'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    isLive ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${isLive ? 'text-red-700 dark:text-red-400' : ''}`}>
                      {event.title}
                    </h4>
                    {getStatusBadge(event, isLive)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(event.date)}
                    </span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
