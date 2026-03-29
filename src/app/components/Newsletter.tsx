import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed!', {
        description: 'You will receive notifications about upcoming services.'
      });
      setEmail('');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Bell className="h-8 w-8" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2">Stay Connected</h3>
            <p className="text-primary-foreground/90">
              Get notifications about upcoming services and special events
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex-shrink-0 w-full md:w-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground min-w-[250px]"
                required
              />
              <Button type="submit" variant="secondary" size="icon" className="flex-shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
