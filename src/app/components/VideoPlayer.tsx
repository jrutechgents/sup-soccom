import { Badge } from './ui/badge';
import type { LiveConfig } from '../types/content';
import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  title?: string;
  isLive?: boolean;
  thumbnail?: string;
  liveConfig?: LiveConfig;
  videoId?: string;
}

export function VideoPlayer({
  title,
  isLive = false,
  thumbnail,
  liveConfig,
  videoId
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Determine if we should embed YouTube player
  const shouldEmbedYouTube = liveConfig?.platform === 'youtube' && liveConfig.youtube.videoId;
  const youtubeVideoId = videoId || liveConfig?.youtube.videoId;

  // Determine if we should embed Facebook player
  const shouldEmbedFacebook = liveConfig?.platform === 'facebook' && liveConfig.facebook.videoId;
  const facebookVideoId = liveConfig?.facebook.videoId;

  // Handle click outside to release iframe focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Blur the iframe when clicking outside
        if (iframeRef.current) {
          iframeRef.current.blur();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If YouTube is configured with a video ID, embed the YouTube player
  if (shouldEmbedYouTube && youtubeVideoId) {
    return (
      <div ref={containerRef} className="relative w-full bg-black rounded-lg overflow-hidden" onClick={(e) => {
        // Release iframe focus on container click
        if (iframeRef.current && e.target === containerRef.current) {
          iframeRef.current.blur();
        }
      }}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
          title={title || 'Live Stream'}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          // Prevent iframe from capturing keyboard shortcuts that might block navigation
          onLoad={(e) => {
            const iframe = e.target as HTMLIFrameElement;
            iframe.style.pointerEvents = 'auto';
          }}
        />
        {isLive && (
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <Badge variant="destructive" className="gap-2">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
              LIVE
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // If Facebook is configured with a video ID, embed the Facebook player
  if (shouldEmbedFacebook && facebookVideoId) {
    return (
      <div ref={containerRef} className="relative w-full bg-black rounded-lg overflow-hidden" onClick={(e) => {
        // Release iframe focus on container click
        if (iframeRef.current && e.target === containerRef.current) {
          iframeRef.current.blur();
        }
      }}>
        <iframe
          ref={iframeRef}
          src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${facebookVideoId}&show_text=false`}
          title={title || 'Live Stream'}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {isLive && (
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <Badge variant="destructive" className="gap-2">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
              LIVE
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // Fallback placeholder player
  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      {/* Video Container */}
      <div className="aspect-video relative">
        {/* Thumbnail/Video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="h-20 w-20 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" />
              </svg>
              {title && <p className="text-lg font-semibold">{title}</p>}
              {liveConfig?.platform === 'youtube' && !liveConfig?.youtube.videoId && (
                <p className="text-sm text-white/70 mt-2">
                  Configure YouTube Video ID in admin settings
                </p>
              )}
              {liveConfig?.platform === 'facebook' && !liveConfig?.facebook.videoId && (
                <p className="text-sm text-white/70 mt-2">
                  Configure Facebook Video ID in admin settings
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <Badge variant="destructive" className="gap-2">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
              LIVE
            </Badge>
          </div>
        )}
      </div>

      {/* Title Bar */}
      {title && (
        <div className="p-4 bg-card">
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
    </div>
  );
}
