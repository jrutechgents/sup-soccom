import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-9xl font-bold text-muted-foreground/20 mb-4">404</div>
        <h1 className="text-4xl mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
