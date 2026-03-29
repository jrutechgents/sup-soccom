import { useState, useEffect } from 'react';
import type { ContentConfig } from '../types/content';
import contentData from '../data/content.json';

// Import the JSON with proper typing assertion
const initialContent = contentData as ContentConfig;

// Storage key for localStorage
const CONTENT_STORAGE_KEY = 'holyweek_content';

/**
 * Hook to manage application content
 * Content is stored in localStorage for instant updates.
 * Falls back to the JSON file for initial data.
 */
export function useContent() {
  const [content, setContent] = useState<ContentConfig>(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  // Load content from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ContentConfig>;
        // Deep merge to ensure all fields exist - only use defined values from parsed
        const merged: ContentConfig = {
          site: { ...initialContent.site, ...parsed.site },
          live: { ...initialContent.live, ...parsed.live },
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
            stats: { ...initialContent.pages.stats, ...parsed.pages?.stats },
          },
          adminPassword: parsed.adminPassword ?? initialContent.adminPassword,
        };
        setContent(merged);
      } catch (e) {
        console.error('Failed to parse stored content:', e);
      }
    }
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

  // Save content to localStorage only (no download)
  const saveContent = (contentToSave?: ContentConfig) => {
    const data = contentToSave || content;
    setContent(data);
    saveToLocalStorage(data);
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
