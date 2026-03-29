import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon, Waves, Heart, Share2, Headphones, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';
import { ShareButtons } from '../components/ShareButtons';
import clsx from 'clsx';

export function Radio() {
  const { content } = useContent();
  const { radio } = content;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Show error if radio not configured
  if (!radio || !radio.streamUrl) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <RadioIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Radio Not Configured</h2>
            <p className="text-muted-foreground">Please configure the radio settings in the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initialize audio
  useEffect(() => {
    if (audioRef.current && radio.streamUrl) {
      audioRef.current.src = radio.streamUrl;
      audioRef.current.volume = volume / 100;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      const handleError = () => {
        console.error('Radio stream error');
        setIsPlaying(false);
      };

      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [radio.streamUrl, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Enhanced visualizer with more bars
  const visualizerBars = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 py-12 md:py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge className="gap-2 px-4 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current" />
                </span>
                {isPlaying ? 'Live Now' : 'Click to Play'}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {radio.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {radio.description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <RadioIcon className="h-4 w-4" />
                <span>24/7 Streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>HD Audio Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Worldwide Access</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Player Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="overflow-hidden shadow-xl border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Visualizer Area */}
            <div className="lg:col-span-2 relative h-64 md:h-80 bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              </div>

              {radio.thumbnail && (
                <img
                  src={radio.thumbnail}
                  alt={radio.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
                />
              )}

              {/* Animated Visualizer */}
              <div className="relative z-10 flex items-end justify-center gap-0.5 h-32 px-8">
                {visualizerBars.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying
                        ? [4, 24, 12, 32, 8, 28, 16, 36, 10, 40, 14, 28]
                        : [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                      }}
                    transition={{
                      duration: 0.6 + (i % 3) * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0,
                      delay: i * 0.03,
                      ease: 'easeInOut',
                    }}
                    className={clsx(
                      "w-1.5 md:w-2 rounded-full transition-colors",
                      isPlaying ? "bg-gradient-to-t from-primary to-primary/50" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              {/* Center Play Button Overlay */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={togglePlay}
                  className="absolute z-20 h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-8 w-8 fill-current ml-1" />
                </motion.button>
              )}

              {/* Live Badge */}
              <div className="absolute top-4 right-4">
                <Badge
                  variant={isPlaying ? "default" : "secondary"}
                  className={clsx(
                    "gap-2 px-3 py-1.5 shadow-lg",
                    isPlaying && "animate-pulse"
                  )}
                >
                  <div className={clsx(
                    "h-2 w-2 rounded-full",
                    isPlaying ? "bg-white" : "bg-muted-foreground"
                  )} />
                  {isPlaying ? 'ON AIR' : 'OFF AIR'}
                </Badge>
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Controls Panel */}
            <div className="p-6 flex flex-col justify-between bg-muted/30">
              {/* Now Playing Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Now Playing</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{radio.name}</h3>
                <p className="text-sm text-muted-foreground">Catholic Radio Streaming</p>
                <p className="text-xs text-muted-foreground mt-1">24/7 Liturgical Music & Prayers</p>
              </div>

              {/* Main Controls */}
              <div className="space-y-4">
                {/* Play/Pause Button */}
                <div className="flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="h-7 w-7 fill-current" />
                    ) : (
                      <Play className="h-7 w-7 fill-current ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-accent rounded-full transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <div className="flex-1">
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={clsx(
                      "gap-2",
                      isFavorited && "text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                    )}
                  >
                    <Heart className={clsx("h-4 w-4", isFavorited && "fill-current")} />
                    <span className="hidden sm:inline">{isFavorited ? 'Following' : 'Follow'}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
      >
        {[
          { icon: RadioIcon, title: '24/7 Live', desc: 'Non-stop broadcasting' },
          { icon: Heart, title: 'Faith-Based', desc: 'Catholic programming' },
          { icon: Waves, title: 'HD Quality', desc: 'Crystal clear audio' },
          { icon: Globe, title: 'Global', desc: 'Access anywhere' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <Card className="border-border/50 hover:border-primary/30 transition-colors h-full">
              <CardContent className="p-5 text-center">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-primary" />
                  Share {radio.name}
                </h3>
                <p className="text-sm text-muted-foreground">Spread the word about our Catholic radio station</p>
              </div>
              <ShareButtons title={`Listen to ${radio.name} - ${content.site.name}`} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
