import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useState } from 'react';
import { toast } from 'sonner';
import { Heart, Send, CheckCircle2, Flame, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';

const PRAYER_CATEGORIES = [
  { value: 'healing', label: 'Healing', icon: '💊' },
  { value: 'guidance', label: 'Guidance', icon: '🙏' },
  { value: 'thanksgiving', label: 'Thanksgiving', icon: '🙌' },
  { value: 'protection', label: 'Protection', icon: '🛡️' },
  { value: 'comfort', label: 'Comfort', icon: '🤗' },
  { value: 'other', label: 'Other', icon: '✨' },
];

export function PrayerRequestForm() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [category, setCategory] = useState('other');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) {
      toast.error('Please enter your prayer request');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast.success('Prayer request submitted', {
      description: 'Your prayer request has been received. Our community will keep you in prayer.',
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setRequest('');
      setName('');
      setCategory('other');
      setIsAnonymous(false);
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card className="border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Prayer Received</h3>
            <p className="text-muted-foreground mb-4">
              Your prayer request has been shared with our community.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "The prayer of a righteous person is powerful and effective." - James 5:16
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="border-primary/20 shadow-xl shadow-primary/5 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 px-6 py-8 text-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
        >
          <Flame className="h-8 w-8 text-white" />
        </motion.div>
        <CardTitle className="text-2xl font-bold text-white">Submit Prayer Request</CardTitle>
        <CardDescription className="text-white/80 mt-2">
          Share your heart with our community
        </CardDescription>
      </div>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Prayer Category</Label>
            <div className="grid grid-cols-3 gap-2">
              {PRAYER_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-lg border-2 text-center transition-all",
                    category === cat.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  )}
                >
                  <span className="text-2xl block mb-1">{cat.icon}</span>
                  <span className="text-xs font-medium">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name Field with Anonymous Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name {isAnonymous && "(Optional)"}
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Anonymous
                </Label>
              </div>
            </div>
            {!isAnonymous && (
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            )}
            {isAnonymous && (
              <div className="text-sm text-muted-foreground italic p-3 bg-muted/50 rounded-lg border border-dashed">
                Your name will not be shared with the community
              </div>
            )}
          </div>

          {/* Prayer Request Textarea */}
          <div className="space-y-2">
            <Label htmlFor="request" className="text-sm font-medium">
              Your Prayer Request *
            </Label>
            <Textarea
              id="request"
              placeholder="Share what's on your heart... Our community will pray for you."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={5}
              required
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {request.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !request.trim()}
            className="w-full h-12 text-base bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Prayer Request
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            🔒 Your prayer requests are private and only visible to our prayer team
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
