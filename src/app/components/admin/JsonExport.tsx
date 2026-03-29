import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ContentConfig } from '../../types/content';

interface JsonExportProps {
  content: ContentConfig;
}

export function JsonExport({ content }: JsonExportProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const jsonStr = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Backup downloaded', {
      description: 'Use this file to restore content or deploy to production.',
    });
  };

  const handleCopy = async () => {
    const jsonStr = JSON.stringify(content, null, 2);
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      toast.success('JSON copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Changes are saved to your browser's localStorage and applied instantly. Download a backup
          of your configuration to keep a copy or to deploy to production.
        </p>
        <div className="flex gap-4">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-xs font-mono text-muted-foreground mb-2">
            Content is stored in:
          </p>
          <code className="text-xs">localStorage (browser storage)</code>
          <p className="text-xs text-muted-foreground mt-2">
            To persist for other users, replace <code className="text-xs">src/data/content.json</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
