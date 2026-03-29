import { Outlet, useLocation } from 'react-router';
import { Cross, Menu, X, Radio as RadioIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
import { MiniRadioPlayer } from './MiniRadioPlayer';

export function Layout() {
  const { content } = useContent();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Use regular link navigation with page reload
  const navigateTo = (path: string) => {
    setMobileMenuOpen(false);
    window.location.href = path;
  };

  // Ensure iframes don't block navigation
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          (iframe as HTMLIFrameElement).blur();
        });
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - with isolation to ensure it stays above iframes */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 isolate">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 bg-transparent border-0 cursor-pointer">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <Cross className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">{content.site.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Live
            </a>
            <a
              href="/schedule"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/schedule') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Schedule
            </a>
            <a
              href="/services"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/services') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Services
            </a>
            <a
              href="/radio"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/radio') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <RadioIcon className="h-4 w-4 mr-1" />
              Radio
            </a>
            <a
              href="/about"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/about') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              About
            </a>
            <a
              href="/prayer"
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${isActive('/prayer') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Prayer
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <a
                href="/"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                Live
              </a>
              <a
                href="/schedule"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/schedule') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                Schedule
              </a>
              <a
                href="/services"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/services') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                Services
              </a>
              <a
                href="/radio"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/radio') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                <RadioIcon className="h-4 w-4 mr-2" />
                Radio
              </a>
              <a
                href="/about"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/about') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                About
              </a>
              <a
                href="/prayer"
                className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 w-full ${isActive('/prayer') ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
              >
                Prayer
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1" key={location.pathname}>
        <Outlet key={location.pathname} />
      </main>

      {/* Mini Radio Player (shown when radio is playing) */}
      <MiniRadioPlayer />

      {/* Main Content */}
      <main className="flex-1" key={location.pathname}>
        <Outlet key={location.pathname} />
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <Cross className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">Holy Week Live</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {content.site.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">Live Stream</a></li>
                <li><a href="/schedule" className="hover:text-foreground transition-colors">Schedule</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">Past Services</a></li>
                <li><a href="/prayer" className="hover:text-foreground transition-colors">Prayer Request</a></li>
                <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Questions or technical support?<br />
                Email: {content.pages.about.contactEmail}<br />
                Phone: {content.pages.about.contactPhone}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {content.site.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
