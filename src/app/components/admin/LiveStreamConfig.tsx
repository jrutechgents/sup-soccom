import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Radio } from 'lucide-react';
import type { LiveConfig } from '../../types/content';

interface LiveStreamConfigProps {
  config: LiveConfig;
  onChange: (config: LiveConfig) => void;
}

export function LiveStreamConfig({ config, onChange }: LiveStreamConfigProps) {
  const updateField = <K extends keyof LiveConfig>(key: K, value: LiveConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const updatePlatform = (platform: LiveConfig['platform']) => {
    onChange({ ...config, platform });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Live Stream Configuration</h2>
        <p className="text-muted-foreground">Configure your live streaming settings</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Live Stream</Label>
              <p className="text-sm text-muted-foreground">Show the live stream on the home page</p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => updateField('enabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-Fetch Stats (YouTube)</Label>
              <p className="text-sm text-muted-foreground">Automatically fetch title and viewer count from YouTube API</p>
            </div>
            <Switch
              checked={config.autoFetch}
              onCheckedChange={(checked) => updateField('autoFetch', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="live-title">Stream Title</Label>
            <Input
              id="live-title"
              value={config.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Good Friday Liturgy of the Lord's Passion"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="live-description">Stream Description</Label>
            <Textarea
              id="live-description"
              value={config.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Join us for the solemn commemoration..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="live-viewers">Current Viewers</Label>
            <Input
              id="live-viewers"
              type="number"
              value={config.viewers}
              onChange={(e) => updateField('viewers', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="live-thumbnail">Thumbnail URL</Label>
            <Input
              id="live-thumbnail"
              value={config.thumbnail}
              onChange={(e) => updateField('thumbnail', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Streaming Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-select">Active Platform</Label>
            <Select value={config.platform} onValueChange={updatePlatform}>
              <SelectTrigger id="platform-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitch">Twitch</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="obs">OBS / RTMP</SelectItem>
                <SelectItem value="custom">Custom Player</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform-specific configs */}
          {config.platform === 'youtube' && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">YouTube Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="yt-api-key">API Key (optional)</Label>
                <Input
                  id="yt-api-key"
                  value={config.youtube.apiKey}
                  onChange={(e) => updateField('youtube', { ...config.youtube, apiKey: e.target.value })}
                  placeholder="AIzaSy..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yt-video-id">Video ID</Label>
                <Input
                  id="yt-video-id"
                  value={config.youtube.videoId}
                  onChange={(e) => updateField('youtube', { ...config.youtube, videoId: e.target.value })}
                  placeholder="dQw4w9WgXcQ"
                />
                <p className="text-xs text-muted-foreground">
                  The video ID from YouTube URL: youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yt-channel-id">Channel ID (optional)</Label>
                <Input
                  id="yt-channel-id"
                  value={config.youtube.channelId}
                  onChange={(e) => updateField('youtube', { ...config.youtube, channelId: e.target.value })}
                  placeholder="UC..."
                />
              </div>
            </div>
          )}

          {config.platform === 'twitch' && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Twitch Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="twitch-channel">Channel Name</Label>
                <Input
                  id="twitch-channel"
                  value={config.twitch.channelName}
                  onChange={(e) => updateField('twitch', { ...config.twitch, channelName: e.target.value })}
                  placeholder="your_channel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitch-api-key">Client ID (optional)</Label>
                <Input
                  id="twitch-api-key"
                  value={config.twitch.apiKey}
                  onChange={(e) => updateField('twitch', { ...config.twitch, apiKey: e.target.value })}
                  placeholder="abc123..."
                />
              </div>
            </div>
          )}

          {config.platform === 'facebook' && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Facebook Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="fb-video-id">Video ID</Label>
                <Input
                  id="fb-video-id"
                  value={config.facebook.videoId}
                  onChange={(e) => updateField('facebook', { ...config.facebook, videoId: e.target.value })}
                  placeholder="10158012345678901"
                />
                <p className="text-xs text-muted-foreground">
                  The video ID from Facebook URL: facebook.com/watch?v=<strong>10158012345678901</strong>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-video-url">Video URL (optional)</Label>
                <Input
                  id="fb-video-url"
                  value={config.facebook.videoUrl}
                  onChange={(e) => updateField('facebook', { ...config.facebook, videoUrl: e.target.value })}
                  placeholder="https://facebook.com/watch?v=..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-api-key">Access Token (optional)</Label>
                <Input
                  id="fb-api-key"
                  type="password"
                  value={config.facebook.apiKey}
                  onChange={(e) => updateField('facebook', { ...config.facebook, apiKey: e.target.value })}
                  placeholder="EAABwz..."
                />
              </div>
            </div>
          )}

          {config.platform === 'obs' && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">OBS / RTMP Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="obs-rtmp">RTMP URL</Label>
                <Input
                  id="obs-rtmp"
                  value={config.obs.rtmpUrl}
                  onChange={(e) => updateField('obs', { ...config.obs, rtmpUrl: e.target.value })}
                  placeholder="rtmp://a.rtmp.youtube.com/live2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="obs-key">Stream Key</Label>
                <Input
                  id="obs-key"
                  type="password"
                  value={config.obs.streamKey}
                  onChange={(e) => updateField('obs', { ...config.obs, streamKey: e.target.value })}
                  placeholder="****-****-****-****"
                />
                <p className="text-xs text-muted-foreground">
                  Keep this secret! Never share your stream key publicly.
                </p>
              </div>
            </div>
          )}

          {config.platform === 'custom' && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Custom Player Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="custom-hls">HLS URL (.m3u8)</Label>
                <Input
                  id="custom-hls"
                  value={config.customPlayer.hlsUrl}
                  onChange={(e) => updateField('customPlayer', { ...config.customPlayer, hlsUrl: e.target.value })}
                  placeholder="https://example.com/stream.m3u8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-poster">Poster Image URL</Label>
                <Input
                  id="custom-poster"
                  value={config.customPlayer.poster}
                  onChange={(e) => updateField('customPlayer', { ...config.customPlayer, poster: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-fallback">Fallback MP4 URL (optional)</Label>
                <Input
                  id="custom-fallback"
                  value={config.customPlayer.fallbackUrl}
                  onChange={(e) => updateField('customPlayer', { ...config.customPlayer, fallbackUrl: e.target.value })}
                  placeholder="https://example.com/stream.mp4"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
