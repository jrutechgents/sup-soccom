import { EventCard } from '../components/EventCard';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Download, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';

export function Schedule() {
  const { content } = useContent();

  const handleDownloadCalendar = () => {
    toast.success('Calendar downloaded!', {
      description: 'Holy Week schedule has been added to your calendar.'
    });
  };

  const handleSetReminder = () => {
    toast.success('Reminder set!', {
      description: 'You will be notified before this service begins.'
    });
  };

  // Group events by category
  const palmSundayEvents = content.events.filter(e => e.category === 'palm-sunday');
  const holyWeekEvents = content.events.filter(e => e.category === 'holy-week');
  const triduumEvents = content.events.filter(e => e.category === 'triduum');
  const easterEvents = content.events.filter(e => e.category === 'easter');
  const allEvents = content.events;
  const weekEvents = content.events.filter(e => ['holy-week', 'triduum'].includes(e.category));
  const weekendEvents = content.events.filter(e => ['easter'].includes(e.category));
  const specialEvents = content.events.filter(e => ['triduum'].includes(e.category));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3 font-bold">
            {content.pages.schedule.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {content.pages.schedule.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleDownloadCalendar} size="lg">
              <Download className="h-4 w-4 mr-2" />
              {content.pages.schedule.downloadButtonText}
            </Button>
            <Button onClick={handleSetReminder} variant="outline" size="lg">
              <Bell className="h-4 w-4 mr-2" />
              {content.pages.schedule.reminderButtonText}
            </Button>
          </div>
        </motion.div>

        {/* Holy Week Timeline */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto mb-6">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="weekend">Weekend</TabsTrigger>
            <TabsTrigger value="special">Special Events</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Palm Sunday */}
            {palmSundayEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-primary">Palm Sunday</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {palmSundayEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.displayDate}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      status={event.status}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Holy Week Days */}
            {holyWeekEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-primary">Holy Week</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {holyWeekEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.displayDate}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      status={event.status}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Triduum */}
            {triduumEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-primary">The Sacred Triduum</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {triduumEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.displayDate}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      status={event.status}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Easter */}
            {easterEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-primary">Easter</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {easterEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.displayDate}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      status={event.status}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weekEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.displayDate}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                  status={event.status}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekend" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weekendEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.displayDate}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                  status={event.status}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.displayDate}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                  status={event.status}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Information Card */}
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All services will be live-streamed in HD quality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Recordings will be available within 24 hours after each service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Please mute your device during live services to avoid disruptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Technical support is available via chat during live broadcasts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Times are shown in Eastern Time (ET)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
