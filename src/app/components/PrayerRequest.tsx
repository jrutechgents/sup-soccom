import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { Heart, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function PrayerRequest() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && request) {
      toast.success('Prayer request submitted', {
        description: 'Your prayer request has been received. Our community will keep you in prayer.'
      });
      setName('');
      setRequest('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/10">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl flex items-center justify-center gap-2">
            Submit a Prayer Request
          </CardTitle>
          <CardDescription className="text-sm mt-2">
            Share your prayer intentions with our community.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Your Name (Optional)</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request" className="text-sm">Prayer Request *</Label>
              <Textarea
                id="request"
                placeholder="Share your prayer request..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                rows={4}
                required
                className="resize-none"
              />
            </div>
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Submit Prayer Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
