// Site configuration
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
}

// Live streaming configuration
export interface LiveConfig {
  enabled: boolean;
  platform: 'youtube' | 'twitch' | 'facebook' | 'obs' | 'custom';
  title: string;
  description: string;
  viewers: number;
  thumbnail: string;
  autoFetch: boolean; // If true, fetch title/viewers from API; otherwise use manual values
  youtube: YouTubeConfig;
  twitch: TwitchConfig;
  facebook: FacebookConfig;
  obs: OBSConfig;
  customPlayer: CustomPlayerConfig;
}

// Radio configuration
export interface RadioConfig {
  enabled: boolean;
  name: string;
  streamUrl: string;
  description: string;
  thumbnail: string;
  showVisualizer: boolean;
}

export interface YouTubeConfig {
  apiKey: string;
  videoId: string;
  channelId: string;
}

export interface TwitchConfig {
  channelName: string;
  apiKey: string;
}

export interface FacebookConfig {
  videoId: string;
  videoUrl: string;
  apiKey: string;
}

export interface OBSConfig {
  rtmpUrl: string;
  streamKey: string;
}

export interface CustomPlayerConfig {
  hlsUrl: string;
  poster: string;
  fallbackUrl: string;
}

// Event configuration
export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  displayDate: string;
  time: string;
  location: string;
  description: string;
  image: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  category: 'palm-sunday' | 'holy-week' | 'triduum' | 'easter';
}

// Service archive configuration
export interface Service {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  views: number;
  category: string;
  videoUrl: string;
}

// Testimonial configuration
export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  text: string;
}

// Page-specific content
export interface PageContent {
  home: HomeContent;
  schedule: ScheduleContent;
  services: ServicesContent;
  about: AboutContent;
  stats: StatsContent;
}

export interface HomeContent {
  heroTitle: string;
  heroDescription: string;
  heroBadge: string;
  countdownTitle: string;
  countdownDate: string;
  liveSectionTitle: string;
  upcomingTitle: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
}

export interface ScheduleContent {
  title: string;
  description: string;
  downloadButtonText: string;
  reminderButtonText: string;
}

export interface ServicesContent {
  title: string;
  description: string;
  featuredTitle: string;
  searchPlaceholder: string;
  hdBadge: string;
}

export interface AboutContent {
  title: string;
  description: string;
  heroImage: string;
  missionTitle: string;
  missionText1: string;
  missionText2: string;
  values: Value[];
  techTitle: string;
  techStreamingQuality: string;
  techArchiveAccess: string;
  techDeviceCompatibility: string;
  contactTitle: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  contactButtonText: string;
  faqTitle: string;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface StatsContent {
  community: StatItem;
  services: StatItem;
  archive: StatItem;
}

export interface StatItem {
  value: number;
  suffix: string;
  description: string;
}

// Main content configuration
export interface ContentConfig {
  site: SiteConfig;
  live: LiveConfig;
  radio: RadioConfig;
  events: Event[];
  services: Service[];
  testimonials: Testimonial[];
  pages: PageContent;
  adminPassword: string;
}
