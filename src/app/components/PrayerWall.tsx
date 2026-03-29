import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';

// Mock prayer requests for display
const MOCK_PRAYERS = [
  {
    id: 1,
    category: 'healing',
    icon: '💊',
    text: 'Please pray for my mother who is undergoing surgery tomorrow.',
    time: '2 minutes ago',
    anonymous: true,
  },
  {
    id: 2,
    category: 'thanksgiving',
    icon: '🙌',
    text: 'Thank you all for your prayers - I got the job!',
    time: '15 minutes ago',
    anonymous: false,
    name: 'Maria S.',
  },
  {
    id: 3,
    category: 'guidance',
    icon: '🙏',
    text: 'Praying for wisdom as I make a big life decision.',
    time: '1 hour ago',
    anonymous: true,
  },
  {
    id: 4,
    category: 'comfort',
    icon: '🤗',
    text: 'Please pray for comfort for my family during this difficult time.',
    time: '2 hours ago',
    anonymous: true,
  },
  {
    id: 5,
    category: 'protection',
    icon: '🛡️',
    text: 'Prayers for safe travels for my son serving overseas.',
    time: '3 hours ago',
    anonymous: false,
    name: 'Robert M.',
  },
];

const CATEGORY_COLORS = {
  healing: 'from-red-500 to-orange-500',
  guidance: 'from-blue-500 to-cyan-500',
  thanksgiving: 'from-green-500 to-emerald-500',
  protection: 'from-purple-500 to-violet-500',
  comfort: 'from-pink-500 to-rose-500',
  other: 'from-yellow-500 to-amber-500',
};

export function PrayerWall() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-3"
        >
          <Heart className="h-7 w-7 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Prayer Wall</h2>
        <p className="text-sm text-muted-foreground">
          Join us in praying for these requests
        </p>
      </div>

      {/* Prayer Cards */}
      <div className="space-y-3">
        {MOCK_PRAYERS.map((prayer, index) => (
          <motion.div
            key={prayer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br",
                      CATEGORY_COLORS[prayer.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.other
                    )}
                  >
                    <span className="flex items-center justify-center h-full text-lg">
                      {prayer.icon}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed mb-2">
                      "{prayer.text}"
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{prayer.time}</span>
                      <span>•</span>
                      <span>{prayer.anonymous ? 'Anonymous' : prayer.name}</span>
                    </div>
                  </div>

                  {/* Pray Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Could add functionality to "pray" for a request
                    }}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    <Heart className="h-3 w-3 mr-1 fill-white" />
                    Pray
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Candle Lighting Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-900">
          <CardContent className="p-6 text-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            </motion.div>
            <h3 className="font-semibold mb-2">Light a Virtual Candle</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Light a candle as a symbol of your prayer
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 shadow-lg shadow-orange-500/25 flex items-center justify-center"
                >
                  <Flame className="h-5 w-5 text-orange-600" />
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        <Sparkles className="h-4 w-4 inline-block mr-1 text-primary" />
        <span className="italic">"For where two or three gather in my name, there am I with them."</span>
      </motion.div>
    </div>
  );
}
