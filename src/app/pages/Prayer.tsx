import { motion } from 'motion/react';
import { PrayerRequestForm } from '../components/PrayerRequestForm';
import { PrayerWall } from '../components/PrayerWall';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Users, Clock, Sparkles, Flame, Church } from 'lucide-react';

export function Prayer() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-primary/20 via-purple-50/50 to-pink-50/50 dark:from-primary/10 dark:via-purple-950/20 dark:to-pink-950/20 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-primary/25 mb-6"
            >
              <Church className="h-10 w-10" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Prayer Requests
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              "Where two or three gather in my name, there am I with them." - Matthew 18:20
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg hover:shadow-primary/10 transition-all">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4"
                >
                  <Flame className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-1">Light a Candle</h3>
                <p className="text-sm text-muted-foreground">Share your prayer intentions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-purple-500/5 to-transparent hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Community Prayer</h3>
                <p className="text-sm text-muted-foreground">We pray for each request</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-pink-500/5 to-transparent hover:shadow-lg hover:shadow-pink-500/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Always Available</h3>
                <p className="text-sm text-muted-foreground">Submit anytime, day or night</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Two Columns */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Prayer Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PrayerRequestForm />
          </motion.div>

          {/* Prayer Wall */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PrayerWall />
          </motion.div>
        </div>
      </section>

      {/* Bible Verse Section */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
              <blockquote className="text-lg italic text-foreground/90 mb-4">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
              </blockquote>
              <p className="text-sm text-muted-foreground">— Philippians 4:6 (NIV)</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
