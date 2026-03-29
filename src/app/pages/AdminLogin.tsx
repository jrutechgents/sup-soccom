import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    if (sessionStorage.getItem('adminAuth') === 'true') {
      navigate('/admin');
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get the admin password from content.json
    // In production, this should be validated on the backend
    const content = (await import('../../data/content.json')).default;
    const correctPassword = content.adminPassword || 'admin123';

    if (password === correctPassword) {
      sessionStorage.setItem('adminAuth', 'true');
      toast.success('Login successful', {
        description: 'Welcome to the admin dashboard',
      });
      navigate('/admin');
    } else {
      toast.error('Invalid password', {
        description: 'Please check your password and try again',
      });
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your password to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={!password || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
