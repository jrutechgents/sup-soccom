import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Quote } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

export function Testimonials() {
  const { content } = useContent();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {content.testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Quote className="h-16 w-16" />
          </div>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback>{testimonial.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "{testimonial.text}"
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
