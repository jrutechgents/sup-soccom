import { useState, useEffect } from 'react';
import type { ContentConfig } from '../types/content';
import contentData from '../data/content.json';

const initialContent = contentData as ContentConfig;
const CONTENT_STORAGE_KEY = 'holyweek_content';
const JSONBIN_URL = import.meta.env.VITE_JSONBIN_URL;
const JSONBIN_KEY = import.meta.env.VITE_JSONBIN_KEY;

export function useContentJsonBin() {
  const [content, setContent] = useState<ContentConfig>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load content - try localStorage first, then JSONBin
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);

      // Try localStorage first
      const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as ContentConfig;
          const merged = { ...initialContent, ...parsed };
          setContent(merged);
        } catch (e) {
          console.error('Failed to parse stored content:', e);
        }
      }

      // If JSONBin is configured, fetch from there
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
              const merged = {
                ...initialContent,
                ...data.record,
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

      setIsLoading(false);
    };

    loadContent();
  }, []);

  // Save content - save to both localStorage and JSONBin
  const saveContent = async (contentToSave?: ContentConfig) => {
    const data = contentToSave || content;
    setIsSaving(true);

    // Always save to localStorage first (fast)
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(data));
    setContent(data);

    // If JSONBin is configured, save there too
    if (JSONBIN_URL && JSONBIN_KEY) {
      try {
        await fetch(JSONBIN_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_KEY,
          },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error('Failed to save to JSONBin:', e);
      }
    }

    setIsSaving(false);
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

  // Helper functions
  const getEventsByStatus = (status: Event['status']) => {
    return content.events.filter(e => e.status === status);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return content.events
      .filter(e => new Date(e.date) >= now && e.status !== 'completed')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  const searchServices = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return content.services.filter(s =>
      s.title.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    content,
    isLoading,
    isSaving,
    saveContent,
    downloadContentJson,
    getEventsByStatus,
    getUpcomingEvents,
    searchServices,
  };
}
