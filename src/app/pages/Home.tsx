import { VideoPlayer } from '../components/VideoPlayer';
import { EventCard } from '../components/EventCard';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Users, Calendar, Video } from 'lucide-react';
import { LiveChat } from '../components/LiveChat';
import { Testimonials } from '../components/Testimonials';
import { ShareButtons } from '../components/ShareButtons';
import { AnimatedStats } from '../components/AnimatedStats';
import { TodaySchedule } from '../components/TodaySchedule';
import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';
import { useYouTubeLive } from '../../hooks/useYouTubeLive';

export function Home() {
  const { content, getUpcomingEvents } = useContent();
  const upcomingEvents = getUpcomingEvents();
  const liveEvents = content.events.filter(e => e.status === 'live');
  const currentLiveEvent = liveEvents.length > 0 ? liveEvents[0] : null;

  // Fetch live stats from YouTube if autoFetch is enabled
  const shouldAutoFetch = content.live.autoFetch &&
    content.live.platform === 'youtube' &&
    content.live.youtube.apiKey &&
    content.live.youtube.videoId;

  const { data: liveStats } = useYouTubeLive({
    videoId: content.live.youtube.videoId,
    apiKey: content.live.youtube.apiKey,
    enabled: shouldAutoFetch,
    fallback: {
      title: content.live.title,
      viewers: content.live.viewers,
    },
  });

  // Use fetched stats or fallback to config values
  const displayTitle = liveStats.title;
  const displayViewers = liveStats.viewers;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {content.pages.home.heroBadge && (
              <Badge className="mb-6 text-sm px-4 py-1">{content.pages.home.heroBadge}</Badge>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {content.pages.home.heroTitle}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content.pages.home.heroDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a href="#live" className="inline-block">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
                    Watch Live Now
                  </button>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a href="/schedule" className="inline-block">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-12 px-8">
                    View Full Schedule
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Today's Schedule */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TodaySchedule events={content.events} />
        </motion.div>
      </section>

      {/* Live Stream Section */}
      {content.live.enabled && (
        <section className="container mx-auto px-4" id="live">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">{content.pages.home.liveSectionTitle}</h2>
            </div>
            <ShareButtons title={`${displayTitle} - ${content.site.name}`} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <VideoPlayer
                title={displayTitle}
                isLive={true}
                thumbnail={content.live.thumbnail}
                liveConfig={content.live}
              />
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{displayViewers.toLocaleString()} viewers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">HD Quality</span>
                      </div>
                      {shouldAutoFetch && (
                        <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                          Auto
                        </span>
                      )}
                    </div>
                    <ShareButtons title={displayTitle} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{displayTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {content.live.description}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <LiveChat config={content.live} />
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">{content.pages.home.upcomingTitle}</h2>
            <a href="/schedule" className="text-primary hover:underline font-medium">
              View Full Schedule →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard
                  title={event.title}
                  date={event.displayDate}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                  status={event.status}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedStats
            icon={Users}
            title="Community"
            value={content.pages.stats.community.value}
            suffix={content.pages.stats.community.suffix}
            description={content.pages.stats.community.description}
          />
          <AnimatedStats
            icon={Calendar}
            title="Services"
            value={content.pages.stats.services.value}
            suffix={content.pages.stats.services.suffix}
            description={content.pages.stats.services.description}
          />
          <AnimatedStats
            icon={Video}
            title="Archive"
            value={content.pages.stats.archive.value}
            suffix={content.pages.stats.archive.suffix}
            description={content.pages.stats.archive.description}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4 font-bold">{content.pages.home.testimonialsTitle}</h2>
          <p className="text-xl text-muted-foreground">
            {content.pages.home.testimonialsDescription}
          </p>
        </div>
        <Testimonials />
      </section>

    </div>
  );
}
