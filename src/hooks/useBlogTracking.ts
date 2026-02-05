"use client";

import { useEffect, useRef, useCallback } from 'react';
import {
  trackBlogEvent,
  estimateReadingTime,
  countWords,
  type BlogEventData,
} from '@/lib/analytics';

interface UseBlogTrackingProps {
  slug: string;
  title: string;
  category: string;
  content: string;
  locale?: string;
  authorName?: string;
}

interface TrackingState {
  hasTrackedImpression: boolean;
  hasTrackedReadStart: boolean;
  hasTrackedReadComplete: boolean;
  startTime: number;
  maxScrollDepth: number;
  lastDurationUpdate: number;
}

// Duration tracking interval (30 seconds)
const DURATION_TRACK_INTERVAL = 30000;

export function useBlogTracking({
  slug,
  title,
  category,
  content,
  locale,
  authorName,
}: UseBlogTrackingProps) {
  const stateRef = useRef<TrackingState>({
    hasTrackedImpression: false,
    hasTrackedReadStart: false,
    hasTrackedReadComplete: false,
    startTime: 0,
    maxScrollDepth: 0,
    lastDurationUpdate: 0,
  });

  const articleRef = useRef<HTMLElement | null>(null);
  const estimatedReadTime = estimateReadingTime(content);

  // Base event data
  const getEventData = useCallback((): BlogEventData => {
    const state = stateRef.current;
    const timeOnPage = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
    const engagementRate = estimatedReadTime > 0
      ? Math.round((timeOnPage / estimatedReadTime) * 100)
      : 0;

    return {
      slug,
      title,
      category,
      locale,
      authorName,
      scrollDepth: Math.round(state.maxScrollDepth),
      timeOnPage,
      wordCount: countWords(content),
      readingTime: estimatedReadTime,
      viewDuration: timeOnPage,
      engagementRate,
    };
  }, [slug, title, category, locale, authorName, content, estimatedReadTime]);

  // Track impression (page view)
  useEffect(() => {
    const state = stateRef.current;

    if (!state.hasTrackedImpression) {
      state.hasTrackedImpression = true;
      state.startTime = Date.now();
      state.lastDurationUpdate = Date.now();

      trackBlogEvent('blog_impression', getEventData());
    }
  }, [getEventData]);

  // Periodic duration tracking
  useEffect(() => {
    const state = stateRef.current;

    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - state.lastDurationUpdate >= DURATION_TRACK_INTERVAL) {
        state.lastDurationUpdate = now;
        trackBlogEvent('blog_view_duration', getEventData());
      }
    }, DURATION_TRACK_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [getEventData]);

  // Track scroll progress
  useEffect(() => {
    const state = stateRef.current;

    const handleScroll = () => {
      const article = articleRef.current;
      if (!article) return;

      const articleRect = article.getBoundingClientRect();
      const articleTop = articleRect.top + window.scrollY;
      const articleHeight = articleRect.height;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate how much of the article has been scrolled
      const scrolledPastHeader = scrollY > articleTop + 200; // Past header area
      const scrolledIntoArticle = scrollY + viewportHeight - articleTop;
      const scrollDepth = Math.min(100, Math.max(0, (scrolledIntoArticle / articleHeight) * 100));

      // Update max scroll depth
      if (scrollDepth > state.maxScrollDepth) {
        state.maxScrollDepth = scrollDepth;
      }

      // Track read start (scrolled past header)
      if (scrolledPastHeader && !state.hasTrackedReadStart) {
        state.hasTrackedReadStart = true;
        trackBlogEvent('blog_read_start', getEventData());
      }

      // Track read complete (scrolled to 90% or more)
      if (scrollDepth >= 90 && !state.hasTrackedReadComplete) {
        state.hasTrackedReadComplete = true;
        trackBlogEvent('blog_read_complete', getEventData());
      }
    };

    // Debounce scroll handler
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getEventData]);

  // Track exit event when leaving page (for view duration)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User is leaving the page or switching tabs
        const eventData = getEventData();

        // Use sendBeacon for reliable delivery
        const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
        if (analyticsEndpoint && navigator.sendBeacon) {
          navigator.sendBeacon(
            analyticsEndpoint,
            JSON.stringify({
              event: 'blog_exit',
              data: eventData,
              timestamp: Date.now(),
            })
          );
        }

        // Also track via regular method as backup
        trackBlogEvent('blog_exit', eventData);
      }
    };

    const handleBeforeUnload = () => {
      const eventData = getEventData();

      // Use sendBeacon for reliable delivery on page unload
      const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
      if (analyticsEndpoint && navigator.sendBeacon) {
        navigator.sendBeacon(
          analyticsEndpoint,
          JSON.stringify({
            event: 'blog_exit',
            data: eventData,
            timestamp: Date.now(),
          })
        );
      }

      // Also track via regular method as backup
      trackBlogEvent('blog_exit', eventData);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [getEventData]);

  // Return ref to attach to article element
  const setArticleRef = useCallback((element: HTMLElement | null) => {
    articleRef.current = element;
  }, []);

  // Manual click tracking function
  const trackClick = useCallback((elementId?: string) => {
    trackBlogEvent('blog_click', {
      ...getEventData(),
      // Add element ID to data if provided
      slug: elementId ? `${slug}#${elementId}` : slug,
    });
  }, [getEventData, slug]);

  return {
    articleRef: setArticleRef,
    trackClick,
  };
}
