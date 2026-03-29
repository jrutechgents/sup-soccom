import { motion } from 'motion/react';
import { PrayerRequest } from '../components/PrayerRequest';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Users, Clock } from 'lucide-react';

export function Prayer() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl mb-3 font-bold">Prayer Requests</h1>
        <p className="text-lg text-muted-foreground">
          Share your prayer intentions with our community.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="text-center p-4">
            <CardContent className="pt-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1 text-sm">Share Your Heart</h3>
              <p className="text-xs text-muted-foreground">Submit your prayer requests</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="pt-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1 text-sm">Community Prayer</h3>
              <p className="text-xs text-muted-foreground">Our community will pray for you</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="pt-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1 text-sm">Always Available</h3>
              <p className="text-xs text-muted-foreground">Submit requests anytime</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PrayerRequest />
      </motion.div>
    </div>
  );
}
