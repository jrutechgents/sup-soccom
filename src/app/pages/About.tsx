import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, Phone, MapPin, Heart, Users, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useContent } from '../../hooks/useContent';

const iconMap = {
  Heart,
  Users,
  Video,
};

export function About() {
  const { content } = useContent();
  const about = content.pages.about;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl mb-3 font-bold">
            {about.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {about.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={about.heroImage}
            alt="Cathedral interior"
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="mb-16 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">{about.missionTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{about.missionText1}</p>
              <p className="text-base leading-relaxed">{about.missionText2}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {about.values.map((value, index) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap] || Heart;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="mb-16 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">{about.techTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Streaming Quality</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {about.techStreamingQuality}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Archive Access</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {about.techArchiveAccess}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Device Compatibility</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {about.techDeviceCompatibility}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="mb-16 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">{about.contactTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base">{about.contactDescription}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href={`mailto:${about.contactEmail}`} className="text-sm text-primary hover:underline">
                      {about.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href={`tel:${about.contactPhone.replace(/\D/g, '')}`} className="text-sm text-primary hover:underline">
                      {about.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {about.contactLocation}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full sm:w-auto">
                  <Mail className="h-4 w-4 mr-2" />
                  {about.contactButtonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{about.faqTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do I need to create an account to watch?</AccordionTrigger>
                  <AccordionContent>
                    No, all services are freely available to watch without registration.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I watch services on my phone?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our platform is fully responsive and works on all modern smartphones and tablets.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What if I have technical issues during a live stream?</AccordionTrigger>
                  <AccordionContent>
                    We have technical support available during all live broadcasts. Use the chat function or
                    contact us via email or phone for immediate assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I download services to watch offline?</AccordionTrigger>
                  <AccordionContent>
                    Currently, downloads are not available, but all services remain accessible online for viewing anytime.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are there closed captions available?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we provide closed captions for all our services to ensure accessibility for everyone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
