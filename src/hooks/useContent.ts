import { useState, useEffect } from 'react';
import type { ContentConfig } from '../types/content';
import contentData from '../data/content.json';

// Import the JSON with proper typing assertion
const initialContent = contentData as ContentConfig;

// Storage key for localStorage
const CONTENT_STORAGE_KEY = 'holyweek_content';

// JSONBin configuration
const JSONBIN_URL = import.meta.env.VITE_JSONBIN_URL;
const JSONBIN_KEY = import.meta.env.VITE_JSONBIN_KEY;

/**
 * Hook to manage application content
 * Content is stored in localStorage for instant updates.
 * Falls back to the JSON file for initial data.
 * If JSONBin is configured, it will sync content to the cloud.
 */
export function useContent() {
  const [content, setContent] = useState<ContentConfig>(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      // Try localStorage first
      const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Partial<ContentConfig>;
          // Deep merge to ensure all fields exist - only use defined values from parsed
          const merged: ContentConfig = {
            site: { ...initialContent.site, ...parsed.site },
            live: { ...initialContent.live, ...parsed.live },
            radio: { ...initialContent.radio, ...parsed.radio },
            events: parsed.events ?? initialContent.events,
            services: parsed.services ?? initialContent.services,
            testimonials: parsed.testimonials ?? initialContent.testimonials,
            pages: {
              home: { ...initialContent.pages.home, ...parsed.pages?.home },
              schedule: { ...initialContent.pages.schedule, ...parsed.pages?.schedule },
              services: { ...initialContent.pages.services, ...parsed.pages?.services },
              about: {
                ...initialContent.pages.about,
                ...parsed.pages?.about,
                values: parsed.pages?.about?.values ?? initialContent.pages.about.values,
              },
              prayer: {
                ...initialContent.pages.prayer,
                ...parsed.pages?.prayer,
                stats: {
                  candle: { ...initialContent.pages.prayer.stats.candle, ...parsed.pages?.prayer?.stats?.candle },
                  community: { ...initialContent.pages.prayer.stats.community, ...parsed.pages?.prayer?.stats?.community },
                  available: { ...initialContent.pages.prayer.stats.available, ...parsed.pages?.prayer?.stats?.available },
                },
              },
              stats: { ...initialContent.pages.stats, ...parsed.pages?.stats },
            },
            adminPassword: parsed.adminPassword ?? initialContent.adminPassword,
          };
          setContent(merged);
        } catch (e) {
          console.error('Failed to parse stored content:', e);
        }
      }

      // If JSONBin is configured, fetch from cloud
      if (JSONBIN_URL && JSONBIN_KEY) {
        try {
          const response = await fetch(JSONBIN_URL, {
            headers: {
              'X-Master-Key': JSONBIN_KEY,
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.record) {
              // Merge with initial to ensure all fields exist
              const merged: ContentConfig = {
                site: { ...initialContent.site, ...data.record.site },
                live: { ...initialContent.live, ...data.record.live },
                radio: { ...initialContent.radio, ...data.record.radio },
                events: data.record.events ?? initialContent.events,
                services: data.record.services ?? initialContent.services,
                testimonials: data.record.testimonials ?? initialContent.testimonials,
                pages: {
                  home: { ...initialContent.pages.home, ...data.record.pages?.home },
                  schedule: { ...initialContent.pages.schedule, ...data.record.pages?.schedule },
                  services: { ...initialContent.pages.services, ...data.record.pages?.services },
                  about: {
                    ...initialContent.pages.about,
                    ...data.record.pages?.about,
                    values: data.record.pages?.about?.values ?? initialContent.pages.about.values,
                  },
                  prayer: {
                    ...initialContent.pages.prayer,
                    ...data.record.pages?.prayer,
                    stats: {
                      candle: { ...initialContent.pages.prayer.stats.candle, ...data.record.pages?.prayer?.stats?.candle },
                      community: { ...initialContent.pages.prayer.stats.community, ...data.record.pages?.prayer?.stats?.community },
                      available: { ...initialContent.pages.prayer.stats.available, ...data.record.pages?.prayer?.stats?.available },
                    },
                  },
                  stats: { ...initialContent.pages.stats, ...data.record.pages?.stats },
                },
                adminPassword: data.record.adminPassword ?? initialContent.adminPassword,
              };
              setContent(merged);
              // Also save to localStorage as backup
              localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(merged));
            }
          }
        } catch (e) {
          console.error('Failed to fetch from JSONBin:', e);
        }
      }
    };

    loadContent();
  }, []);

  // Save content to localStorage
  const saveToLocalStorage = (data: ContentConfig) => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(data));
  };

  // Reload content from localStorage or reset to initial
  const reloadContent = () => {
    setIsLoading(true);
    const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ContentConfig>;
        // Deep merge to ensure all fields exist
        const merged: ContentConfig = {
          site: { ...initialContent.site, ...parsed.site },
          live: { ...initialContent.live, ...parsed.live },
          radio: { ...initialContent.radio, ...parsed.radio },
          events: parsed.events ?? initialContent.events,
          services: parsed.services ?? initialContent.services,
          testimonials: parsed.testimonials ?? initialContent.testimonials,
          pages: {
            home: { ...initialContent.pages.home, ...parsed.pages?.home },
            schedule: { ...initialContent.pages.schedule, ...parsed.pages?.schedule },
            services: { ...initialContent.pages.services, ...parsed.pages?.services },
            about: {
              ...initialContent.pages.about,
              ...parsed.pages?.about,
              values: parsed.pages?.about?.values ?? initialContent.pages.about.values,
            },
            prayer: { ...initialContent.pages.prayer, ...parsed.pages?.prayer },
            stats: { ...initialContent.pages.stats, ...parsed.pages?.stats },
          },
          adminPassword: parsed.adminPassword ?? initialContent.adminPassword,
        };
        setContent(merged);
      } catch (e) {
        setContent({ ...initialContent });
      }
    } else {
      setContent({ ...initialContent });
    }
    setIsLoading(false);
  };

  // Reset to initial content (clear localStorage)
  const resetContent = () => {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    setContent({ ...initialContent });
  };

  // Update content and save to localStorage
  const updateContent = (newContent: ContentConfig): string => {
    setContent(newContent);
    saveToLocalStorage(newContent);
    return JSON.stringify(newContent, null, 2);
  };

  // Save content to localStorage and JSONBin (if configured)
  const saveContent = async (contentToSave?: ContentConfig) => {
    const data = contentToSave || content;
    setContent(data);
    saveToLocalStorage(data);

    // Save to JSONBin if configured
    if (JSONBIN_URL && JSONBIN_KEY) {
      try {
        // Extract bin ID from URL (remove /latest suffix for PUT)
        const binUrl = JSONBIN_URL.replace('/latest', '');
        await fetch(binUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_KEY,
          },
          body: JSON.stringify(data),
        });
        console.log('Content saved to JSONBin');
      } catch (e) {
        console.error('Failed to save to JSONBin:', e);
      }
    }
  };

  // Download content as JSON file
  const downloadContentJson = (contentToDownload?: ContentConfig) => {
    const data = contentToDownload || content;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to get events by status
  const getEventsByStatus = (status: Event['status']) => {
    return content.events.filter(e => e.status === status);
  };

  // Helper to get events by category
  const getEventsByCategory = (category: Event['category']) => {
    return content.events.filter(e => e.category === category);
  };

  // Helper to get upcoming events
  const getUpcomingEvents = () => {
    const now = new Date();
    return content.events
      .filter(e => new Date(e.date) >= now && e.status !== 'completed')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  // Helper to get services by category
  const getServicesByCategory = (category: string) => {
    if (category === 'all') return content.services;
    return content.services.filter(s => s.category === category);
  };

  // Helper to search services
  const searchServices = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return content.services.filter(s =>
      s.title.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    content,
    isLoading,
    reloadContent,
    resetContent,
    updateContent,
    saveContent,
    downloadContentJson,
    getEventsByStatus,
    getEventsByCategory,
    getUpcomingEvents,
    getServicesByCategory,
    searchServices,
  };
}

// Type augmentation for the global
declare global {
  interface Event {
    status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  }
}
