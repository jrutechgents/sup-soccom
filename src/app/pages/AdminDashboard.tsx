import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { ContentForm } from '../components/admin/ContentForm';
import { EventEditor } from '../components/admin/EventEditor';
import { ServiceEditor } from '../components/admin/ServiceEditor';
import { LiveStreamConfig } from '../components/admin/LiveStreamConfig';
import { JsonExport } from '../components/admin/JsonExport';
import { TestimonialEditor } from '../components/admin/TestimonialEditor';
import { useContent } from '../../hooks/useContent';
import type { ContentConfig } from '../../types/content';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Download, Save, FileDown } from 'lucide-react';
import { toast } from 'sonner';

type AdminTab = 'dashboard' | 'general' | 'live' | 'events' | 'services' | 'pages' | 'testimonials';

export function AdminDashboard() {
  const { content, saveContent, downloadContentJson } = useContent();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editedContent, setEditedContent] = useState<ContentConfig>(content);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync edited content when original content changes
  useEffect(() => {
    setEditedContent(content);
    setHasUnsavedChanges(false);
  }, [content]);

  // Parse tab from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as AdminTab || 'dashboard';
    setActiveTab(tab);
  }, [location.search]);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    navigate(`/admin?tab=${tab}`, { replace: true });
  };

  const handleContentUpdate = (updates: Partial<ContentConfig> & { home?: any; about?: any; schedule?: any; services?: any; stats?: any; testimonials?: any; events?: any; live?: any; site?: any }) => {
    setEditedContent((prev) => {
      const updated: ContentConfig = { ...prev };

      // Handle page content updates (these go into pages.*)
      if ('home' in updates && updates.home) {
        updated.pages = { ...updated.pages, home: updates.home };
      }
      if ('about' in updates && updates.about) {
        updated.pages = { ...updated.pages, about: updates.about };
      }
      if ('schedule' in updates && updates.schedule) {
        updated.pages = { ...updated.pages, schedule: updates.schedule };
      }
      if ('stats' in updates && updates.stats) {
        updated.pages = { ...updated.pages, stats: updates.stats };
      }

      // Handle ServicesContent vs services array - ServicesContent has 'title' property
      if ('services' in updates && updates.services) {
        if ('title' in updates.services) {
          // This is ServicesContent, put it in pages.services
          updated.pages = { ...updated.pages, services: updates.services };
        } else {
          // This is Service[] array, put it at root
          updated.services = updates.services;
        }
      }

      // Handle root level updates
      if ('events' in updates && updates.events) {
        updated.events = updates.events;
      }
      if ('testimonials' in updates && updates.testimonials) {
        updated.testimonials = updates.testimonials;
      }
      if ('live' in updates && updates.live) {
        updated.live = updates.live;
      }
      if ('site' in updates && updates.site) {
        updated.site = updates.site;
      }

      return updated;
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    saveContent(editedContent);
    setHasUnsavedChanges(false);
    toast.success('Changes saved successfully!', {
      description: 'Your changes are now live.',
    });
  };

  const handleDownload = () => {
    downloadContentJson(editedContent);
    toast.success('Config file downloaded!', {
      description: 'Use this to backup or restore your settings.',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Holy Week Live content</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="lg"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download Backup
          </Button>
          <Button
            onClick={handleSave}
            size="lg"
            className={hasUnsavedChanges ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <Save className="h-4 w-4 mr-2" />
            Save {hasUnsavedChanges && 'Changes'}
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <CardContent className="pt-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ⚠️ You have unsaved changes. Click <strong>Save</strong> to apply them instantly.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as AdminTab)}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="pages">Export</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-muted-foreground">Total Events</div>
                <div className="text-3xl font-bold mt-2">{content.events.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {content.events.filter(e => e.status === 'upcoming').length} upcoming
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-muted-foreground">Services</div>
                <div className="text-3xl font-bold mt-2">{content.services.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  In archive
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-muted-foreground">Testimonials</div>
                <div className="text-3xl font-bold mt-2">{content.testimonials.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  From community
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleTabChange('general')}
                  className="p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="font-medium">Edit General</div>
                  <div className="text-sm text-muted-foreground">Site info & pages</div>
                </button>
                <button
                  onClick={() => handleTabChange('live')}
                  className="p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="font-medium">Configure Live</div>
                  <div className="text-sm text-muted-foreground">Stream settings</div>
                </button>
                <button
                  onClick={() => handleTabChange('events')}
                  className="p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="font-medium">Manage Events</div>
                  <div className="text-sm text-muted-foreground">Holy Week schedule</div>
                </button>
                <button
                  onClick={() => handleTabChange('services')}
                  className="p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="font-medium">Manage Services</div>
                  <div className="text-sm text-muted-foreground">Archive content</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Live Stream Status</h3>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${content.live.enabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm">
                  {content.live.enabled ? 'Live stream is enabled' : 'Live stream is disabled'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Platform: <span className="font-medium">{content.live.platform}</span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <ContentForm
            site={editedContent.site}
            home={editedContent.pages.home}
            about={editedContent.pages.about}
            schedule={editedContent.pages.schedule}
            services={editedContent.pages.services}
            stats={editedContent.pages.stats}
            onChange={(updates) => handleContentUpdate(updates)}
          />
        </TabsContent>

        {/* Live Stream Configuration */}
        <TabsContent value="live" className="space-y-6">
          <LiveStreamConfig
            config={editedContent.live}
            onChange={(config) => handleContentUpdate({ live: config })}
          />
        </TabsContent>

        {/* Events Management */}
        <TabsContent value="events" className="space-y-6">
          <EventEditor
            events={editedContent.events}
            onChange={(events) => handleContentUpdate({ events })}
          />
        </TabsContent>

        {/* Services Management */}
        <TabsContent value="services" className="space-y-6">
          <ServiceEditor
            services={editedContent.services}
            events={editedContent.events}
            onChange={(services) => handleContentUpdate({ services })}
          />
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialEditor
            testimonials={editedContent.testimonials}
            onChange={(testimonials) => handleContentUpdate({ testimonials })}
          />
        </TabsContent>

        {/* Export */}
        <TabsContent value="pages" className="space-y-6">
          <JsonExport content={editedContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
