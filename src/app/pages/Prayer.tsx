import { motion } from 'motion/react';
import { PrayerRequestForm } from '../components/PrayerRequestForm';
import { PrayerWall } from '../components/PrayerWall';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Users, Flame, Church } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

export function Prayer() {
  const { content } = useContent();
  const prayer = content.pages.prayer;

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
            {prayer.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {prayer.subtitle}
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{prayer.stats.candle.title}</h3>
                <p className="text-sm text-muted-foreground">{prayer.stats.candle.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{prayer.stats.community.title}</h3>
                <p className="text-sm text-muted-foreground">{prayer.stats.community.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{prayer.stats.available.title}</h3>
                <p className="text-sm text-muted-foreground">{prayer.stats.available.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prayer Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PrayerRequestForm formTitle={prayer.formTitle} />
          </motion.div>

          {/* Prayer Wall */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PrayerWall
              wallTitle={prayer.wallTitle}
              wallSubtitle={prayer.wallSubtitle}
              candleTitle={prayer.candleTitle}
              candleDescription={prayer.candleDescription}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
