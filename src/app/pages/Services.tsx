import { VideoPlayer } from '../components/VideoPlayer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Calendar, Clock, Play } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';

export function Services() {
  const { content, searchServices, getServicesByCategory } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = searchServices(searchQuery).filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesCategory;
  });

  // Get first service for featured section
  const featuredService = content.services.length > 0 ? content.services[0] : null;
  const categories = ['all', ...new Set(content.services.map(s => s.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3 font-bold">
            {content.pages.services.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {content.pages.services.description}
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={content.pages.services.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Services' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredServices.length}</span> of <span className="font-medium">{content.services.length}</span> services
          </p>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {content.pages.services.hdBadge}
          </Badge>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {service.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{service.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{service.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-2"
                    onClick={() => {
                      if (service.videoUrl) {
                        window.open(service.videoUrl, '_blank');
                      } else {
                        // If no video URL, scroll to featured video
                        document.querySelector('.aspect-video')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No services found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Featured Service */}
        {featuredService && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4">{content.pages.services.featuredTitle}</h2>
            <div className="max-w-4xl">
              <VideoPlayer
                title={`${featuredService.title} - ${featuredService.date}`}
                thumbnail={featuredService.thumbnail}
              />
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{featuredService.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    Join us for this special service from Holy Week.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featuredService.date}</span>
                    <span>•</span>
                    <span>{featuredService.duration}</span>
                    <span>•</span>
                    <span>{featuredService.views.toLocaleString()} views</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
