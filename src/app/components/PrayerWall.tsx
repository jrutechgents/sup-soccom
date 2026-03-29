import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Flame, Users } from 'lucide-react';
import { motion } from 'motion/react';

// Mock prayer requests for display
const MOCK_PRAYERS = [
  {
    id: 1,
    category: 'healing',
    icon: '💊',
    label: 'Healing',
    text: 'Please pray for my mother who is undergoing surgery tomorrow.',
    time: '2 minutes ago',
    anonymous: true,
  },
  {
    id: 2,
    category: 'thanksgiving',
    icon: '🙌',
    label: 'Thanksgiving',
    text: 'Thank you all for your prayers - I got the job!',
    time: '15 minutes ago',
    anonymous: false,
    name: 'Maria S.',
  },
  {
    id: 3,
    category: 'guidance',
    icon: '🙏',
    label: 'Guidance',
    text: 'Praying for wisdom as I make a big life decision.',
    time: '1 hour ago',
    anonymous: true,
  },
  {
    id: 4,
    category: 'comfort',
    icon: '🤗',
    label: 'Comfort',
    text: 'Please pray for comfort for my family during this difficult time.',
    time: '2 hours ago',
    anonymous: true,
  },
  {
    id: 5,
    category: 'protection',
    icon: '🛡️',
    label: 'Protection',
    text: 'Prayers for safe travels for my son serving overseas.',
    time: '3 hours ago',
    anonymous: false,
    name: 'Robert M.',
  },
];

interface PrayerWallProps {
  wallTitle?: string;
  wallSubtitle?: string;
  candleTitle?: string;
  candleDescription?: string;
}

export function PrayerWall({
  wallTitle = 'Prayer Wall',
  wallSubtitle = 'Join us in praying for these requests',
  candleTitle = 'Light a Virtual Candle',
  candleDescription = 'Light a candle as a symbol of your prayer',
}: PrayerWallProps) {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div>{wallTitle}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-normal">
                <Users className="h-3 w-3" />
                {wallSubtitle}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prayer Cards */}
        <div className="space-y-3">
          {MOCK_PRAYERS.map((prayer, index) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">{prayer.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {prayer.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{prayer.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-2">
                        "{prayer.text}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {prayer.anonymous ? 'Anonymous' : prayer.name}
                      </p>
                    </div>

                    {/* Pray Button */}
                    <button className="flex-shrink-0 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      Pray
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Candle Lighting Section */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6 text-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            </motion.div>
            <h3 className="font-semibold mb-2">{candleTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {candleDescription}
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 shadow-lg flex items-center justify-center"
                >
                  <Flame className="h-5 w-5 text-orange-600" />
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
