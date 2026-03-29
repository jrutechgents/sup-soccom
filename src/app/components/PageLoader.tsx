import { useEffect, useState } from 'react';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader when page is fully loaded
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      // Small delay for smooth transition
      setTimeout(handleLoad, 300);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 border-4 border-primary/20 rounded-full" />
          <div className="absolute top-0 left-0 h-16 w-16 border-4 border-primary rounded-full border-t-transparent animate-spin" />
        </div>
        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
