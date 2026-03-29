import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MessageSquare } from 'lucide-react';
import type { PrayerContent } from '../../../types/content';

interface PrayerConfigProps {
  config: PrayerContent;
  onChange: (config: PrayerContent) => void;
}

export function PrayerConfig({ config, onChange }: PrayerConfigProps) {
  const updateConfig = <K extends keyof PrayerContent>(key: K, value: PrayerContent[K]) => {
    onChange({ ...config, [key]: value });
  };

  const updateStats = (section: 'candle' | 'community' | 'available', field: 'title' | 'description', value: string) => {
    onChange({
      ...config,
      stats: {
        ...config.stats,
        [section]: { ...config.stats[section], [field]: value }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Prayer Page Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prayer-title">Page Title</Label>
          <Input
            id="prayer-title"
            value={config.title}
            onChange={(e) => updateConfig('title', e.target.value)}
            placeholder="Prayer Requests"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-subtitle">Subtitle / Bible Verse</Label>
          <Input
            id="prayer-subtitle"
            value={config.subtitle}
            onChange={(e) => updateConfig('subtitle', e.target.value)}
            placeholder="Where two or three gather in my name..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-form-title">Form Title</Label>
          <Input
            id="prayer-form-title"
            value={config.formTitle}
            onChange={(e) => updateConfig('formTitle', e.target.value)}
            placeholder="Submit Prayer Request"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-wall-title">Prayer Wall Title</Label>
          <Input
            id="prayer-wall-title"
            value={config.wallTitle}
            onChange={(e) => updateConfig('wallTitle', e.target.value)}
            placeholder="Prayer Wall"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-wall-subtitle">Prayer Wall Subtitle</Label>
          <Input
            id="prayer-wall-subtitle"
            value={config.wallSubtitle}
            onChange={(e) => updateConfig('wallSubtitle', e.target.value)}
            placeholder="Join us in praying for these requests"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-candle-title">Candle Section Title</Label>
          <Input
            id="prayer-candle-title"
            value={config.candleTitle}
            onChange={(e) => updateConfig('candleTitle', e.target.value)}
            placeholder="Light a Virtual Candle"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prayer-candle-desc">Candle Section Description</Label>
          <Input
            id="prayer-candle-desc"
            value={config.candleDescription}
            onChange={(e) => updateConfig('candleDescription', e.target.value)}
            placeholder="Light a candle as a symbol of your prayer"
          />
        </div>

        {/* Stats Cards Configuration */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-4">Stats Cards</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Candle Stat */}
            <div className="space-y-2">
              <Label>Candle Card</Label>
              <Input
                value={config.stats.candle.title}
                onChange={(e) => updateStats('candle', 'title', e.target.value)}
                placeholder="Title"
                className="mb-2"
              />
              <Input
                value={config.stats.candle.description}
                onChange={(e) => updateStats('candle', 'description', e.target.value)}
                placeholder="Description"
              />
            </div>

            {/* Community Stat */}
            <div className="space-y-2">
              <Label>Community Card</Label>
              <Input
                value={config.stats.community.title}
                onChange={(e) => updateStats('community', 'title', e.target.value)}
                placeholder="Title"
                className="mb-2"
              />
              <Input
                value={config.stats.community.description}
                onChange={(e) => updateStats('community', 'description', e.target.value)}
                placeholder="Description"
              />
            </div>

            {/* Available Stat */}
            <div className="space-y-2">
              <Label>Available Card</Label>
              <Input
                value={config.stats.available.title}
                onChange={(e) => updateStats('available', 'title', e.target.value)}
                placeholder="Title"
                className="mb-2"
              />
              <Input
                value={config.stats.available.description}
                onChange={(e) => updateStats('available', 'description', e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
