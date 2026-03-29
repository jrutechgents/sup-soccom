import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Testimonial } from '../../types/content';

interface TestimonialEditorProps {
  testimonials?: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
}

export function TestimonialEditor({ testimonials = [], onChange }: TestimonialEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    initials: '',
    location: '',
    text: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      initials: '',
      location: '',
      text: '',
    });
    setEditingTestimonial(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.text) {
      return;
    }

    // Auto-generate initials if not provided
    const initials = formData.initials || formData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    if (editingTestimonial) {
      onChange(
        testimonials.map((t) => (t.id === editingTestimonial.id ? { ...formData, initials, id: t.id } as Testimonial : t))
      );
    } else {
      const newTestimonial: Testimonial = {
        ...formData,
        initials,
        id: Date.now().toString(),
      } as Testimonial;
      onChange([...testimonials, newTestimonial]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    onChange(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">Manage community testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Margaret Stevens"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Boston, MA"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Initials</label>
                <Input
                  value={formData.initials}
                  onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                  placeholder="MS"
                  maxLength={2}
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from name if left blank
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Testimonial</label>
                <Textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Being able to participate in Holy Week services..."
                  rows={4}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{testimonial.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic line-clamp-4">
                "{testimonial.text}"
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(testimonial)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card className="col-span-full p-12 text-center">
            <p className="text-muted-foreground">No testimonials yet</p>
          </Card>
        )}
      </div>
    </div>
  );
}
