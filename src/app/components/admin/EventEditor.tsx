import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table } from './Table';
import type { Event } from '../../types/content';
import { Badge } from '../ui/badge';

interface EventEditorProps {
  events?: Event[];
  onChange: (events: Event[]) => void;
}

export function EventEditor({ events = [], onChange }: EventEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    date: '',
    displayDate: '',
    time: '',
    location: '',
    description: '',
    image: '',
    status: 'upcoming',
    category: 'holy-week',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      displayDate: '',
      time: '',
      location: '',
      description: '',
      image: '',
      status: 'upcoming',
      category: 'holy-week',
    });
    setEditingEvent(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) {
      return;
    }

    if (editingEvent) {
      // Update existing event
      onChange(
        events.map((e) => (e.id === editingEvent.id ? { ...formData, id: e.id } as Event : e))
      );
    } else {
      // Add new event
      const newEvent: Event = {
        ...formData,
        id: Date.now().toString(),
      } as Event;
      onChange([...events, newEvent]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    onChange(events.filter((e) => e.id !== id));
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-gray-500 text-white';
      default:
        return '';
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Title',
      cell: (item: Event) => <span className="font-medium">{item.title}</span>,
    },
    {
      key: 'displayDate',
      header: 'Date',
    },
    {
      key: 'time',
      header: 'Time',
    },
    {
      key: 'location',
      header: 'Location',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: Event) => (
        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (item: Event) => (
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-muted-foreground">Manage Holy Week events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Easter Vigil"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="8:00 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date (ISO)</label>
                  <Input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Date</label>
                  <Input
                    value={formData.displayDate}
                    onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
                    placeholder="Saturday, March 21, 2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Sanctuary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Event['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Event['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="palm-sunday">Palm Sunday</SelectItem>
                    <SelectItem value="holy-week">Holy Week</SelectItem>
                    <SelectItem value="triduum">Sacred Triduum</SelectItem>
                    <SelectItem value="easter">Easter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description..."
                  rows={3}
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

      <Table data={events} columns={columns} emptyMessage="No events yet" />
    </div>
  );
}
