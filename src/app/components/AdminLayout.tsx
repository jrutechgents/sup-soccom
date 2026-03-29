import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  LayoutDashboard,
  Calendar,
  Video,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  MessageSquare,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';
import { toast } from 'sonner';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
  { path: '/admin?tab=general', label: 'General', icon: Settings, tab: 'general' },
  { path: '/admin?tab=live', label: 'Live Stream', icon: Radio, tab: 'live' },
  { path: '/admin?tab=events', label: 'Events', icon: Calendar, tab: 'events' },
  { path: '/admin?tab=services', label: 'Services', icon: Video, tab: 'services' },
  { path: '/admin?tab=testimonials', label: 'Testimonials', icon: MessageSquare, tab: 'testimonials' },
  { path: '/', label: 'View Site', icon: Home, external: true },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('adminAuth');
    if (auth !== 'true') {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }

    // Parse active tab from URL query params
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'dashboard';
    setActiveTab(tab);
  }, [navigate, location]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.external) {
      window.location.href = item.path;
      return;
    }

    // Navigate to the URL with tab parameter
    navigate(item.path, { replace: true });
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Holy Week Live</h1>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 border-r bg-card">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Holy Week Live</h1>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-40 bg-background pt-16"
          >
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8 pt-20 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
