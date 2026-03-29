import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon, Waves, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useContent } from '../../hooks/useContent';
import clsx from 'clsx';

export function Radio() {
  const { content } = useContent();
  const { radio } = content;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTrackInfo, setCurrentTrackInfo] = useState({ title: 'Loading...', artist: 'Radyo Ursulino' });

  // Initialize audio
  useEffect(() => {
    if (audioRef.current && radio.streamUrl) {
      audioRef.current.src = radio.streamUrl;
      audioRef.current.volume = volume / 100;

      // Handle audio events
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

  // Visualizer bars (animated)
  const visualizerBars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 mb-4"
          >
            <RadioIcon className="h-10 w-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            {radio.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {radio.description}
          </p>
        </motion.div>

        {/* Main Radio Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-2xl overflow-hidden">
            {/* Album Art / Visualizer */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center">
              {radio.thumbnail && (
                <img
                  src={radio.thumbnail}
                  alt="Radio"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}

              {/* Animated Visualizer */}
              {radio.showVisualizer && (
                <div className="relative z-10 flex items-end justify-center gap-1 h-32">
                  {visualizerBars.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [8, 40, 20, 50, 15, 45, 25] : [8, 8, 8, 8, 8, 8, 8],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 0.1,
                        delay: i * 0.05,
                      }}
                      className="w-2 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
                    />
                  ))}
                </div>
              )}

              {/* Live Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={clsx(
                  "h-3 w-3 rounded-full",
                  isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-400"
                )} />
                <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                  {isPlaying ? 'LIVE' : 'OFFAIR'}
                </span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              {/* Track Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1">Catholic Radio Streaming</h2>
                <p className="text-muted-foreground">24/7 Liturgical Music & Prayers</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                {/* Volume Control */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-accent rounded-full transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <div className="w-24">
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Play/Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center hover:shadow-xl transition-all"
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7 fill-current" />
                  ) : (
                    <Play className="h-7 w-7 fill-current ml-1" />
                  )}
                </motion.button>

                {/* Favorite Button */}
                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">Follow</span>
                </button>
              </div>

              {/* Wave Animation */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <Waves
                      key={i}
                      className="text-primary"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <Card className="border-purple-100 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                <Radio className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-1">24/7 Broadcasting</h3>
              <p className="text-sm text-muted-foreground">Listen anytime, anywhere</p>
            </CardContent>
          </Card>

          <Card className="border-pink-100 dark:border-pink-900 bg-gradient-to-br from-pink-50 to-transparent dark:from-pink-950/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold mb-1">Faith & Music</h3>
              <p className="text-sm text-muted-foreground">Liturgical music & prayers</p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-950/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3">
                <Waves className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-sm text-muted-foreground">Join our prayer network</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
      />
    </div>
  );
}
