import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';
import { Send, CheckCircle2, Church } from 'lucide-react';
import { motion } from 'motion/react';

const PRAYER_CATEGORIES = [
  { value: 'healing', label: 'Healing', icon: '💊' },
  { value: 'guidance', label: 'Guidance', icon: '🙏' },
  { value: 'thanksgiving', label: 'Thanksgiving', icon: '🙌' },
  { value: 'protection', label: 'Protection', icon: '🛡️' },
  { value: 'comfort', label: 'Comfort', icon: '🤗' },
  { value: 'other', label: 'Other', icon: '✨' },
];

interface PrayerRequestFormProps {
  formTitle?: string;
}

export function PrayerRequestForm({ formTitle = 'Submit Prayer Request' }: PrayerRequestFormProps) {
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    toast.success('Prayer request submitted', {
      description: 'Your prayer request has been received. Our community will keep you in prayer.',
    });

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Prayer Received</h3>
            <p className="text-muted-foreground mb-4">
              Your prayer request has been shared with our community.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "The prayer of a righteous person is powerful and effective." — James 5:16
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Church className="h-5 w-5 text-primary" />
          </div>
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Prayer Category</Label>
            <div className="grid grid-cols-3 gap-2">
              {PRAYER_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    category === cat.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <span className="text-2xl block mb-1">{cat.icon}</span>
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Field with Anonymous Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name">Your Name {isAnonymous && '(Optional)'}</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
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
            <Label htmlFor="request">Your Prayer Request *</Label>
            <Textarea
              id="request"
              placeholder="Share what's on your heart... Our community will pray for you."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={5}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {request.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !request.trim()}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {formTitle}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your prayer requests are private and only visible to our prayer team
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
