import { useState, useEffect } from 'react';

interface YouTubeLiveStats {
  title: string;
  viewers: number;
  isLive: boolean;
}

interface UseYouTubeLiveOptions {
  videoId: string;
  apiKey?: string;
  enabled?: boolean;
  fallback?: {
    title: string;
    viewers: number;
  };
  refreshInterval?: number; // in seconds
}

/**
 * Fetches live stream stats from YouTube Data API
 * Requires API key from Google Cloud Console with YouTube Data API v3 enabled
 */
export function useYouTubeLive({
  videoId,
  apiKey,
  enabled = true,
  fallback,
  refreshInterval = 30,
}: UseYouTubeLiveOptions) {
  // Initialize with fallback values
  const [data, setData] = useState<YouTubeLiveStats>({
    title: fallback?.title || '',
    viewers: fallback?.viewers || 0,
    isLive: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if disabled, no API key, or no video ID
    if (!enabled || !videoId || !apiKey) {
      // Use fallback values
      setData({
        title: fallback?.title || '',
        viewers: fallback?.viewers || 0,
        isLive: false,
      });
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch video details from YouTube Data API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${apiKey}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.error?.message === 'API key not valid') {
            throw new Error('Invalid YouTube API key');
          }
          throw new Error('Failed to fetch video data');
        }

        const result = await response.json();

        if (result.items && result.items.length > 0) {
          const video = result.items[0];
          const liveDetails = video.liveStreamingDetails;

          setData({
            title: video.snippet?.title || fallback?.title || '',
            viewers: liveDetails?.concurrentViewers || fallback?.viewers || 0,
            isLive: !!liveDetails?.actualStartTime,
          });
        } else {
          // Video not found, use fallback
          setData({
            title: fallback?.title || '',
            viewers: fallback?.viewers || 0,
            isLive: false,
          });
        }
      } catch (err) {
        console.error('YouTube API error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        // On error, use fallback values
        setData({
          title: fallback?.title || '',
          viewers: fallback?.viewers || 0,
          isLive: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Refresh at specified interval
    const interval = setInterval(fetchStats, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [videoId, apiKey, enabled, refreshInterval, fallback]);

  return {
    data,
    isLoading,
    error,
  };
}
