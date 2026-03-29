import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, ExternalLink } from 'lucide-react';
import type { LiveConfig } from '../types/content';
import { useState, useEffect } from 'react';

interface LiveChatProps {
  config?: LiveConfig;
}

export function LiveChat({ config }: LiveChatProps) {
  const [chatSrc, setChatSrc] = useState<string>('');
  const [useEmbed, setUseEmbed] = useState(false);

  useEffect(() => {
    // Reset state when platform changes
    setUseEmbed(false);
    setChatSrc('');

    if (config?.platform === 'youtube' && config.youtube.videoId) {
      setChatSrc(`https://www.youtube.com/live_chat?v=${config.youtube.videoId}&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&dark_theme=0`);
    } else if (config?.platform === 'facebook' && config.facebook.videoId) {
      // For Facebook, try multiple embed approaches
      // Option 1: Comments plugin with video URL
      const videoUrl = `https://www.facebook.com/videos/${config.facebook.videoId}/`;
      setChatSrc(`https://www.facebook.com/plugins/comments.php?href=${encodeURIComponent(videoUrl)}&width=400&numposts=10`);
      setUseEmbed(true);
    }
  }, [config?.youtube.videoId, config?.facebook.videoId, config?.platform]);

  // If YouTube is configured with a video ID, embed the live chat
  if (config?.platform === 'youtube' && config.youtube.videoId) {
    return (
      <div className="border rounded-lg overflow-hidden h-full flex flex-col">
        <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Live Chat</span>
        </div>
        <div className="flex-1 bg-background">
          <iframe
            src={chatSrc}
            className="w-full h-full border-0"
            title="YouTube Live Chat"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    );
  }

  // If Facebook is configured with a video ID, show embedded comments
  if (config?.platform === 'facebook' && config.facebook.videoId) {
    const fbUrl = `https://www.facebook.com/videos/${config.facebook.videoId}/`;
    const fbVideoEmbed = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fbUrl)}&show_text=true&width=400&height=400`;

    return (
      <div className="border rounded-lg overflow-hidden h-full flex flex-col">
        <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Live Chat</span>
        </div>
        <div className="flex-1 bg-background">
          {chatSrc ? (
            <iframe
              src={chatSrc}
              className="w-full h-full border-0"
              title="Facebook Comments"
              scrolling="yes"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          )}
        </div>
        {config.facebook.apiKey && (
          <div className="p-2 border-t bg-muted/30 text-xs text-center text-muted-foreground">
              <button
                onClick={() => window.open(fbUrl, '_blank')}
                className="text-primary hover:underline"
              >
                Open on Facebook →
              </button>
            </div>
        )}
      </div>
    );
  }

  // Fallback chat for other platforms or when no video ID is configured
  return (
    <Card className="flex flex-col aspect-video">
      <div className="bg-muted px-4 py-3 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">Live Chat</span>
        <span className="text-xs text-muted-foreground">
          {config?.platform === 'youtube' ? 'Configure YouTube video ID' :
           config?.platform === 'facebook' ? 'Configure Facebook video ID' :
           'Configure streaming platform'}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="space-y-3">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">
            {config?.platform === 'youtube'
              ? 'Live chat will appear here when a YouTube stream is configured'
              : config?.platform === 'facebook'
              ? 'Live chat will appear here when a Facebook video is configured'
              : 'Live chat will appear here when a stream is configured'}
          </p>
          <p className="text-xs text-muted-foreground">
            Go to{' '}
            <a href="/admin?tab=live" className="text-primary hover:underline">
              Admin Dashboard → Live Stream
            </a>{' '}
            to configure
          </p>
        </div>
      </div>
    </Card>
  );
}
