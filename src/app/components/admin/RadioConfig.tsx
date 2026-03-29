import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Radio as RadioIcon, Waves } from 'lucide-react';
import type { RadioConfig } from '../../types/content';

interface RadioConfigProps {
  config: RadioConfig;
  onChange: (config: RadioConfig) => void;
}

export function RadioConfig({ config, onChange }: RadioConfigProps) {
  const updateConfig = <K extends keyof RadioConfig>(key: K, value: RadioConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RadioIcon className="h-5 w-5 text-primary" />
          Radio Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <RadioIcon className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="radio-enabled" className="cursor-pointer">Enable Radio</Label>
          </div>
          <Switch
            id="radio-enabled"
            checked={config.enabled}
            onCheckedChange={(checked) => updateConfig('enabled', checked)}
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="radio-name">Radio Name</Label>
            <Input
              id="radio-name"
              value={config.name}
              onChange={(e) => updateConfig('name', e.target.value)}
              placeholder="Radyo Ursulino"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radio-url">Stream URL</Label>
            <Input
              id="radio-url"
              value={config.streamUrl}
              onChange={(e) => updateConfig('streamUrl', e.target.value)}
              placeholder="https://stream-164.zeno.fm/..."
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Enter the streaming URL from your radio provider
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="radio-desc">Description</Label>
            <Textarea
              id="radio-desc"
              value={config.description}
              onChange={(e) => updateConfig('description', e.target.value)}
              rows={2}
              placeholder="Brief description of the radio station"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radio-thumb">Thumbnail URL</Label>
            <Input
              id="radio-thumb"
              value={config.thumbnail}
              onChange={(e) => updateConfig('thumbnail', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="radio-visualizer" className="cursor-pointer">Show Visualizer</Label>
            </div>
            <Switch
              id="radio-visualizer"
              checked={config.showVisualizer}
              onCheckedChange={(checked) => updateConfig('showVisualizer', checked)}
            />
          </div>

          {/* Test Player */}
          <div className="mt-4 pt-4 border-t">
            <Label className="text-sm font-medium mb-2">Test Radio Stream</Label>
            <audio
              controls
              src={config.streamUrl}
              className="w-full h-10 rounded"
              style={{ maxHeight: '40px' }}
            />
            <p className="text-xs text-muted-foreground mt-1">
              If audio doesn't play, the stream URL might be invalid or CORS restricted
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
