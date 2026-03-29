import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function DonationCard() {
  const handleDonate = () => {
    toast.success('Thank you for your generosity!', {
      description: 'Your support helps us continue providing free streaming services.'
    });
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          Support Our Ministry
        </CardTitle>
        <CardDescription>
          Help us continue providing free streaming services to our global community
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Your generous donations help us maintain high-quality streaming equipment, 
          pay for bandwidth, and expand our reach to serve more people worldwide.
        </p>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleDonate}>
            <CreditCard className="h-4 w-4 mr-2" />
            Make a Donation
          </Button>
          <Button variant="outline" className="flex-1">
            Learn More
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={handleDonate}>$25</Button>
          <Button variant="secondary" size="sm" onClick={handleDonate}>$50</Button>
          <Button variant="secondary" size="sm" onClick={handleDonate}>$100</Button>
        </div>
      </CardContent>
    </Card>
  );
}
