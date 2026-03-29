import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import type { SiteConfig, HomeContent, AboutContent, ScheduleContent, ServicesContent, StatsContent, Value } from '../../types/content';
import { Plus, Trash2 } from 'lucide-react';

interface ContentFormProps {
  site: SiteConfig;
  home: HomeContent;
  about: AboutContent;
  schedule: ScheduleContent;
  services: ServicesContent;
  stats?: StatsContent;
  onChange: (updates: { site?: SiteConfig; home?: HomeContent; about?: AboutContent; schedule?: ScheduleContent; services?: ServicesContent; stats?: StatsContent }) => void;
}

export function ContentForm({ site, home, about, schedule, services, stats, onChange }: ContentFormProps) {
  const updateSite = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    onChange({ site: { ...site, [key]: value } });
  };

  const updateHome = <K extends keyof HomeContent>(key: K, value: HomeContent[K]) => {
    onChange({ home: { ...home, [key]: value } });
  };

  const updateAbout = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    onChange({ about: { ...about, [key]: value } });
  };

  const updateSchedule = <K extends keyof ScheduleContent>(key: K, value: ScheduleContent[K]) => {
    onChange({ schedule: { ...schedule, [key]: value } });
  };

  const updateServices = <K extends keyof ServicesContent>(key: K, value: ServicesContent[K]) => {
    onChange({ services: { ...services, [key]: value } });
  };

  const updateStats = <K extends keyof StatsContent>(key: K, value: StatsContent[K]) => {
    if (stats) {
      onChange({ stats: { ...stats, [key]: value } });
    }
  };

  const updateValues = (values: Value[]) => {
    onChange({ about: { ...about, values } });
  };

  const updateValue = (index: number, field: keyof Value, value: string) => {
    const newValues = [...about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    updateValues(newValues);
  };

  const addValue = () => {
    const newValues = [...about.values, { icon: 'Heart', title: 'New Value', description: 'Add a description' }];
    updateValues(newValues);
  };

  const removeValue = (index: number) => {
    const newValues = about.values.filter((_, i) => i !== index);
    updateValues(newValues);
  };

  // Use default stats if not provided
  const statsData = stats || {
    community: { value: 5000, suffix: '+', description: 'Community Members' },
    services: { value: 200, suffix: '+', description: 'Services Streamed' },
    archive: { value: 1000, suffix: '+', description: 'Hours of Content' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">General Settings</h2>
        <p className="text-muted-foreground">Configure your site information</p>
      </div>

      {/* Site Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input
              id="site-name"
              value={site.name}
              onChange={(e) => updateSite('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-tagline">Tagline</Label>
            <Input
              id="site-tagline"
              value={site.tagline}
              onChange={(e) => updateSite('tagline', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description">Description</Label>
            <Textarea
              id="site-description"
              value={site.description}
              onChange={(e) => updateSite('description', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Home Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Home Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="home-hero-badge">Hero Badge</Label>
              <Input
                id="home-hero-badge"
                value={home.heroBadge}
                onChange={(e) => updateHome('heroBadge', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-countdown-title">Countdown Title</Label>
              <Input
                id="home-countdown-title"
                value={home.countdownTitle}
                onChange={(e) => updateHome('countdownTitle', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-hero-title">Hero Title</Label>
            <Input
              id="home-hero-title"
              value={home.heroTitle}
              onChange={(e) => updateHome('heroTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-hero-desc">Hero Description</Label>
            <Textarea
              id="home-hero-desc"
              value={home.heroDescription}
              onChange={(e) => updateHome('heroDescription', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="home-live-title">Live Section Title</Label>
              <Input
                id="home-live-title"
                value={home.liveSectionTitle}
                onChange={(e) => updateHome('liveSectionTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-upcoming-title">Upcoming Title</Label>
              <Input
                id="home-upcoming-title"
                value={home.upcomingTitle}
                onChange={(e) => updateHome('upcomingTitle', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-testimonials-title">Testimonials Title</Label>
            <Input
              id="home-testimonials-title"
              value={home.testimonialsTitle}
              onChange={(e) => updateHome('testimonialsTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-countdown-date">Countdown Date</Label>
            <Input
              id="home-countdown-date"
              type="datetime-local"
              value={home.countdownDate}
              onChange={(e) => updateHome('countdownDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-testimonials-desc">Testimonials Description</Label>
            <Textarea
              id="home-testimonials-desc"
              value={home.testimonialsDescription}
              onChange={(e) => updateHome('testimonialsDescription', e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* About Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="about-title">Page Title</Label>
              <Input
                id="about-title"
                value={about.title}
                onChange={(e) => updateAbout('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-hero-image">Hero Image URL</Label>
              <Input
                id="about-hero-image"
                value={about.heroImage}
                onChange={(e) => updateAbout('heroImage', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-description">Page Description</Label>
            <Textarea
              id="about-description"
              value={about.description}
              onChange={(e) => updateAbout('description', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-mission-title">Mission Title</Label>
            <Input
              id="about-mission-title"
              value={about.missionTitle}
              onChange={(e) => updateAbout('missionTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-mission-1">Mission Text (Paragraph 1)</Label>
            <Textarea
              id="about-mission-1"
              value={about.missionText1}
              onChange={(e) => updateAbout('missionText1', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-mission-2">Mission Text (Paragraph 2)</Label>
            <Textarea
              id="about-mission-2"
              value={about.missionText2}
              onChange={(e) => updateAbout('missionText2', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-contact-email">Contact Email</Label>
            <Input
              id="about-contact-email"
              type="email"
              value={about.contactEmail}
              onChange={(e) => updateAbout('contactEmail', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="about-contact-phone">Contact Phone</Label>
              <Input
                id="about-contact-phone"
                value={about.contactPhone}
                onChange={(e) => updateAbout('contactPhone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-contact-location">Contact Location</Label>
              <Input
                id="about-contact-location"
                value={about.contactLocation}
                onChange={(e) => updateAbout('contactLocation', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech & Additional About Settings */}
      <Card>
        <CardHeader>
          <CardTitle>About Page - Tech & Additional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about-tech-title">Tech Section Title</Label>
            <Input
              id="about-tech-title"
              value={about.techTitle}
              onChange={(e) => updateAbout('techTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-tech-streaming">Tech - Streaming Quality</Label>
            <Input
              id="about-tech-streaming"
              value={about.techStreamingQuality}
              onChange={(e) => updateAbout('techStreamingQuality', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-tech-archive">Tech - Archive Access</Label>
            <Input
              id="about-tech-archive"
              value={about.techArchiveAccess}
              onChange={(e) => updateAbout('techArchiveAccess', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-tech-device">Tech - Device Compatibility</Label>
            <Input
              id="about-tech-device"
              value={about.techDeviceCompatibility}
              onChange={(e) => updateAbout('techDeviceCompatibility', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-contact-title-2">Contact Section Title</Label>
            <Input
              id="about-contact-title-2"
              value={about.contactTitle}
              onChange={(e) => updateAbout('contactTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-contact-desc">Contact Section Description</Label>
            <Textarea
              id="about-contact-desc"
              value={about.contactDescription}
              onChange={(e) => updateAbout('contactDescription', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-contact-btn">Contact Button Text</Label>
            <Input
              id="about-contact-btn"
              value={about.contactButtonText}
              onChange={(e) => updateAbout('contactButtonText', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-faq-title">FAQ Section Title</Label>
            <Input
              id="about-faq-title"
              value={about.faqTitle}
              onChange={(e) => updateAbout('faqTitle', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Values (Cards)</Label>
              <Button onClick={addValue} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Value
              </Button>
            </div>
            {about.values.map((value, index) => (
              <Card key={index} className="p-3">
                <div className="grid grid-cols-[1fr,2fr,3fr,auto] gap-2 items-start">
                  <div className="space-y-1">
                    <Label htmlFor={`value-icon-${index}`} className="text-xs">Icon</Label>
                    <Input
                      id={`value-icon-${index}`}
                      value={value.icon}
                      onChange={(e) => updateValue(index, 'icon', e.target.value)}
                      placeholder="Heart"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`value-title-${index}`} className="text-xs">Title</Label>
                    <Input
                      id={`value-title-${index}`}
                      value={value.title}
                      onChange={(e) => updateValue(index, 'title', e.target.value)}
                      placeholder="Value title"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`value-desc-${index}`} className="text-xs">Description</Label>
                    <Textarea
                      id={`value-desc-${index}`}
                      value={value.description}
                      onChange={(e) => updateValue(index, 'description', e.target.value)}
                      rows={1}
                      placeholder="Description"
                    />
                  </div>
                  <Button
                    onClick={() => removeValue(index)}
                    size="icon"
                    variant="ghost"
                    className="mt-4"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-title">Page Title</Label>
            <Input
              id="schedule-title"
              value={schedule.title}
              onChange={(e) => updateSchedule('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-description">Page Description</Label>
            <Textarea
              id="schedule-description"
              value={schedule.description}
              onChange={(e) => updateSchedule('description', e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-download-btn">Download Button Text</Label>
              <Input
                id="schedule-download-btn"
                value={schedule.downloadButtonText}
                onChange={(e) => updateSchedule('downloadButtonText', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-reminder-btn">Reminder Button Text</Label>
              <Input
                id="schedule-reminder-btn"
                value={schedule.reminderButtonText}
                onChange={(e) => updateSchedule('reminderButtonText', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Services Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="services-title">Page Title</Label>
            <Input
              id="services-title"
              value={services.title}
              onChange={(e) => updateServices('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="services-description">Page Description</Label>
            <Textarea
              id="services-description"
              value={services.description}
              onChange={(e) => updateServices('description', e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="services-featured-title">Featured Section Title</Label>
              <Input
                id="services-featured-title"
                value={services.featuredTitle}
                onChange={(e) => updateServices('featuredTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services-search-placeholder">Search Placeholder</Label>
              <Input
                id="services-search-placeholder"
                value={services.searchPlaceholder}
                onChange={(e) => updateServices('searchPlaceholder', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="services-hd-badge">HD Badge Text</Label>
            <Input
              id="services-hd-badge"
              value={services.hdBadge}
              onChange={(e) => updateServices('hdBadge', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics (Home Page)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats-community-value">Community - Value</Label>
              <Input
                id="stats-community-value"
                type="number"
                value={statsData.community.value}
                onChange={(e) => updateStats('community', { ...statsData.community, value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-community-suffix">Community - Suffix</Label>
              <Input
                id="stats-community-suffix"
                value={statsData.community.suffix}
                onChange={(e) => updateStats('community', { ...statsData.community, suffix: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-community-desc">Community - Description</Label>
              <Input
                id="stats-community-desc"
                value={statsData.community.description}
                onChange={(e) => updateStats('community', { ...statsData.community, description: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats-services-value">Services - Value</Label>
              <Input
                id="stats-services-value"
                type="number"
                value={statsData.services.value}
                onChange={(e) => updateStats('services', { ...statsData.services, value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-services-suffix">Services - Suffix</Label>
              <Input
                id="stats-services-suffix"
                value={statsData.services.suffix}
                onChange={(e) => updateStats('services', { ...statsData.services, suffix: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-services-desc">Services - Description</Label>
              <Input
                id="stats-services-desc"
                value={statsData.services.description}
                onChange={(e) => updateStats('services', { ...statsData.services, description: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats-archive-value">Archive - Value</Label>
              <Input
                id="stats-archive-value"
                type="number"
                value={statsData.archive.value}
                onChange={(e) => updateStats('archive', { ...statsData.archive, value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-archive-suffix">Archive - Suffix</Label>
              <Input
                id="stats-archive-suffix"
                value={statsData.archive.suffix}
                onChange={(e) => updateStats('archive', { ...statsData.archive, suffix: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats-archive-desc">Archive - Description</Label>
              <Input
                id="stats-archive-desc"
                value={statsData.archive.description}
                onChange={(e) => updateStats('archive', { ...statsData.archive, description: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
