// Analytics event types for blog tracking
export type BlogEventType =
  | 'blog_impression'     // 展现 - article page loaded
  | 'blog_click'          // 点击 - user clicked on article
  | 'blog_read_start'     // 阅读 - user started reading (scrolled past header)
  | 'blog_read_complete'  // 完成阅读 - user reached end of article
  | 'blog_view_duration'  // 观看时长 - periodic duration tracking
  | 'blog_exit'           // 离开页面 - user left the page

export interface BlogEventData {
  slug: string;
  title: string;
  category: string;
  locale?: string;
  authorName?: string;
  // Reading progress data
  scrollDepth?: number;      // 0-100 percentage
  timeOnPage?: number;       // seconds (当前观看时长)
  wordCount?: number;
  readingTime?: number;      // estimated reading time in seconds
  // Duration tracking
  viewDuration?: number;     // 实际观看时长（秒）
  engagementRate?: number;   // 参与度 = 实际时长 / 预估阅读时长 (0-100+%)
}

export interface AnalyticsEvent {
  event: BlogEventType;
  data: BlogEventData;
  timestamp: number;
  sessionId?: string;
  userId?: string;
}

// Duration tracking storage key
const DURATION_STORAGE_KEY = 'blog_view_durations';

interface ViewDurationRecord {
  slug: string;
  title: string;
  category: string;
  duration: number;      // seconds
  timestamp: number;
  completed: boolean;    // did user complete reading?
}

// Generate a simple session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Track event - can be extended to send to any analytics backend
export function trackBlogEvent(event: BlogEventType, data: BlogEventData): void {
  const analyticsEvent: AnalyticsEvent = {
    event,
    data,
    timestamp: Date.now(),
    sessionId: getSessionId(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, data);
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag('event', event, {
      event_category: 'blog',
      event_label: data.title,
      slug: data.slug,
      category: data.category,
      locale: data.locale,
      scroll_depth: data.scrollDepth,
      time_on_page: data.timeOnPage,
      view_duration: data.viewDuration,
      engagement_rate: data.engagementRate,
    });
  }

  // Store duration data locally for average calculation
  if (event === 'blog_exit' || event === 'blog_read_complete') {
    storeDurationRecord({
      slug: data.slug,
      title: data.title,
      category: data.category,
      duration: data.viewDuration || data.timeOnPage || 0,
      timestamp: Date.now(),
      completed: event === 'blog_read_complete',
    });
  }

  // Send to custom analytics endpoint
  sendToAnalyticsAPI(analyticsEvent);
}

// Store view duration record for average calculations
function storeDurationRecord(record: ViewDurationRecord): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(DURATION_STORAGE_KEY);
    const records: ViewDurationRecord[] = stored ? JSON.parse(stored) : [];
    records.push(record);

    // Keep only last 500 records
    if (records.length > 500) {
      records.splice(0, records.length - 500);
    }

    localStorage.setItem(DURATION_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Storage full or not available
  }
}

// Get average view duration statistics
export function getAverageViewDuration(slug?: string): {
  avgDuration: number;          // 平均观看时长（秒）
  totalViews: number;           // 总浏览次数
  completionRate: number;       // 完成阅读率 (0-100%)
  avgEngagementRate: number;    // 平均参与度
} {
  if (typeof window === 'undefined') {
    return { avgDuration: 0, totalViews: 0, completionRate: 0, avgEngagementRate: 0 };
  }

  try {
    const stored = localStorage.getItem(DURATION_STORAGE_KEY);
    if (!stored) {
      return { avgDuration: 0, totalViews: 0, completionRate: 0, avgEngagementRate: 0 };
    }

    let records: ViewDurationRecord[] = JSON.parse(stored);

    // Filter by slug if provided
    if (slug) {
      records = records.filter(r => r.slug === slug);
    }

    if (records.length === 0) {
      return { avgDuration: 0, totalViews: 0, completionRate: 0, avgEngagementRate: 0 };
    }

    const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
    const completedCount = records.filter(r => r.completed).length;

    return {
      avgDuration: Math.round(totalDuration / records.length),
      totalViews: records.length,
      completionRate: Math.round((completedCount / records.length) * 100),
      avgEngagementRate: 0, // Will be calculated when we have reading time data
    };
  } catch {
    return { avgDuration: 0, totalViews: 0, completionRate: 0, avgEngagementRate: 0 };
  }
}

// Get all duration records (for debugging or export)
export function getAllDurationRecords(): ViewDurationRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(DURATION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Send event to custom analytics API
async function sendToAnalyticsAPI(event: AnalyticsEvent): Promise<void> {
  try {
    // Replace with your actual analytics endpoint
    const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

    if (!analyticsEndpoint) {
      // Store locally if no endpoint configured
      storeEventLocally(event);
      return;
    }

    await fetch(analyticsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      // Don't block on analytics
      keepalive: true,
    });
  } catch (error) {
    // Silently fail - don't break user experience for analytics
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Failed to send event:', error);
    }
    storeEventLocally(event);
  }
}

// Store events locally for later sync or debugging
function storeEventLocally(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem('analytics_events');
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(event);

    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }

    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch {
    // Storage full or not available
  }
}

// Utility: estimate reading time based on word count
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil((wordCount / wordsPerMinute) * 60); // Return seconds
}

// Utility: count words in content
export function countWords(content: string): number {
  return content.trim().split(/\s+/).length;
}

// Utility: format duration as readable string
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}秒`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) {
    return `${minutes}分钟`;
  }
  return `${minutes}分${remainingSeconds}秒`;
}
