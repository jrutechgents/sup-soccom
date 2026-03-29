import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Table } from './Table';
import type { Service, Event } from '../../types/content';
import { Badge } from '../ui/badge';

interface ServiceEditorProps {
  services?: Service[];
  events?: Event[];
  onChange: (services: Service[]) => void;
}

// Helper to convert Event to Service
function eventToService(event: Event, additionalFields?: Partial<Service>): Service {
  return {
    id: `service-${event.id}`,
    title: event.title,
    date: event.displayDate,
    duration: additionalFields?.duration || '1:00:00',
    thumbnail: event.image,
    views: additionalFields?.views || 0,
    category: event.category === 'triduum' ? 'Triduum' : event.category === 'palm-sunday' ? 'Sunday' : 'Prayer',
    videoUrl: additionalFields?.videoUrl || '',
  };
}

export function ServiceEditor({ services = [], events = [], onChange }: ServiceEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedEventForConversion, setSelectedEventForConversion] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    date: '',
    duration: '',
    thumbnail: '',
    views: 0,
    category: 'Sunday',
    videoUrl: '',
  });

  // Get completed events that are not yet in services
  const completedEvents = useMemo(() => {
    return events.filter(e => e.status === 'completed');
  }, [events]);

  const availableEventsForConversion = useMemo(() => {
    const serviceEventIds = services.map(s => s.id.replace('service-', ''));
    return completedEvents.filter(e => !serviceEventIds.includes(e.id));
  }, [completedEvents, services]);

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      duration: '',
      thumbnail: '',
      views: 0,
      category: 'Sunday',
      videoUrl: '',
    });
    setEditingService(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const openConvertDialog = (event: Event) => {
    setSelectedEventForConversion(event);
    setFormData({
      duration: '1:30:00',
      views: 0,
      videoUrl: '',
    });
    setIsConvertDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) {
      return;
    }

    if (editingService) {
      onChange(
        services.map((s) => (s.id === editingService.id ? { ...formData, id: s.id } as Service : s))
      );
    } else {
      const newService: Service = {
        ...formData,
        id: Date.now().toString(),
      } as Service;
      onChange([...services, newService]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleConvertFromEvent = () => {
    if (!selectedEventForConversion) return;

    const newService = eventToService(selectedEventForConversion, formData);
    onChange([...services, newService]);
    setIsConvertDialogOpen(false);
    setSelectedEventForConversion(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    onChange(services.filter((s) => s.id !== id));
  };

  const columns = [
    {
      key: 'title',
      header: 'Title',
      cell: (item: Service) => <span className="font-medium">{item.title}</span>,
    },
    {
      key: 'date',
      header: 'Date',
    },
    {
      key: 'duration',
      header: 'Duration',
    },
    {
      key: 'views',
      header: 'Views',
      cell: (item: Service) => item.views.toLocaleString(),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (item: Service) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (item: Service) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditDialog(item)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(item.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  const eventColumns = [
    {
      key: 'title',
      header: 'Event Title',
      cell: (item: Event) => <span className="font-medium">{item.title}</span>,
    },
    {
      key: 'displayDate',
      header: 'Date',
    },
    {
      key: 'category',
      header: 'Category',
      cell: (item: Event) => (
        <Badge variant="secondary">{item.category}</Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (item: Event) => (
        <Button
          size="sm"
          onClick={() => openConvertDialog(item)}
        >
          <ArrowRight className="h-4 w-4 mr-1" />
          Add to Archive
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Services Archive */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Services Archive</h2>
            <p className="text-muted-foreground">Manage archived services from completed events</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Maundy Thursday - Holy Eucharist"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="March 20, 2026"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="1:45:30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Views</label>
                    <Input
                      type="number"
                      value={formData.views}
                      onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                        <SelectItem value="Triduum">Sacred Triduum</SelectItem>
                        <SelectItem value="Prayer">Evening Prayer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Thumbnail URL</label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Video URL (optional)</label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Table data={services} columns={columns} emptyMessage="No services in archive yet. Complete events to add them here." />
      </div>

      {/* Completed Events Available for Conversion */}
      {availableEventsForConversion.length > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Completed Events Ready to Archive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These events are marked as "completed" and can be added to the services archive.
            </p>
            <Table data={availableEventsForConversion} columns={eventColumns} emptyMessage="No completed events available" />
          </CardContent>
        </Card>
      )}

      {/* Convert Event to Service Dialog */}
      <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add to Archive</DialogTitle>
          </DialogHeader>
          {selectedEventForConversion && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{selectedEventForConversion.title}</p>
                <p className="text-xs text-muted-foreground">{selectedEventForConversion.displayDate}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="1:45:30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Views</label>
                <Input
                  type="number"
                  value={formData.views}
                  onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Video URL (optional)</label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsConvertDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConvertFromEvent}>
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Add to Archive
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
