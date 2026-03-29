import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Radio, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../../hooks/useContent';
import clsx from 'clsx';

// Global audio element for background playback
let globalAudioElement: HTMLAudioElement | null = null;
let isGlobalPlaying = false;
let globalVolume = 75;

export function MiniRadioPlayer() {
  const { content } = useContent();
  const { radio } = content;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(globalVolume);

  // Don't show player if radio is not configured
  if (!radio || !radio.streamUrl) return null;

  // Initialize global audio once
  useEffect(() => {
    if (!globalAudioElement && radio.streamUrl) {
      globalAudioElement = new Audio(radio.streamUrl);
      globalAudioElement.volume = volume / 100;

      globalAudioElement.addEventListener('play', () => {
        isGlobalPlaying = true;
        setIsPlaying(true);
      });

      globalAudioElement.addEventListener('pause', () => {
        isGlobalPlaying = false;
        setIsPlaying(false);
      });

      globalAudioElement.addEventListener('ended', () => {
        isGlobalPlaying = false;
        setIsPlaying(false);
        // Auto-restart for radio
        setTimeout(() => {
          if (globalAudioElement) {
            globalAudioElement.play().catch(console.error);
          }
        }, 1000);
      });
    }

    return () => {
      // Don't cleanup - we want audio to persist across navigation
    };
  }, [radio.streamUrl]);

  const togglePlay = () => {
    if (globalAudioElement) {
      if (isGlobalPlaying) {
        globalAudioElement.pause();
      } else {
        globalAudioElement.play().catch(console.error);
      }
    }
  };

  const toggleMute = () => {
    if (globalAudioElement) {
      globalAudioElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    globalVolume = newVolume;
    if (globalAudioElement) {
      globalAudioElement.volume = newVolume / 100;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (globalAudioElement) globalAudioElement.muted = false;
    }
  };

  // Visualizer bars for mini player
  const visualizerBars = [...Array(8)].map((_, i) => i);

  return (
    <AnimatePresence>
      {(isPlaying || isMinimized) && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-2xl bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
        >
          {!isMinimized ? (
            // Full Player
            <div className="container mx-auto">
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Radio Icon with Animation */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  className="flex-shrink-0"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                    <Radio className="h-5 w-5 text-primary" />
                  </div>
                </motion.div>

                {/* Info & Visualizer */}
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold truncate">{radio.name}</span>
                      <Badge variant="secondary" className={clsx(
                        "gap-1 text-xs px-2 py-0 h-5 shrink-0",
                        isPlaying && "bg-primary/10 text-primary"
                      )}>
                        <span className="relative flex h-2 w-2">
                          {isPlaying && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                          )}
                          <span className={clsx(
                            "relative inline-flex rounded-full h-2 w-2",
                            isPlaying ? "bg-current" : "bg-muted-foreground"
                          )} />
                        </span>
                        {isPlaying ? 'LIVE' : 'OFF AIR'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">24/7 Catholic Radio Streaming</p>
                  </div>

                  {/* Visualizer Bars */}
                  <div className="hidden sm:flex items-end gap-0.5 h-8">
                    {visualizerBars.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isPlaying
                            ? [4, 18, 8, 22, 6, 20, 10, 24, 12, 16]
                            : [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.05,
                          ease: 'easeInOut',
                        }}
                        className={clsx(
                          "w-1 rounded-full",
                          isPlaying ? "bg-gradient-to-t from-primary/60 to-primary/30" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Volume Toggle */}
                  <button
                    onClick={toggleMute}
                    className="hidden sm:flex p-2 hover:bg-accent rounded-lg transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>

                  {/* Volume Slider */}
                  <div className="hidden md:block w-20">
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Play/Pause Button */}
                  <Button
                    size="sm"
                    onClick={togglePlay}
                    className={clsx(
                      "h-10 w-10 rounded-xl p-0 shrink-0",
                      isPlaying ? "bg-primary" : "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    )}
                  </Button>

                  {/* Separator */}
                  <div className="hidden sm:block w-px h-6 bg-border mx-1" />

                  {/* Minimize */}
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                    aria-label="Minimize player"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => {
                      if (globalAudioElement) {
                        globalAudioElement.pause();
                        setIsMinimized(false);
                      }
                    }}
                    className="p-2 hover:bg-accent hover:text-destructive rounded-lg transition-colors"
                    aria-label="Close player"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Minimized Player (Bar)
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 py-2.5">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Radio className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <span className="text-sm font-medium">{radio.name}</span>
                <Badge
                  variant="secondary"
                  className={clsx(
                    "gap-1 text-xs px-2 py-0 h-5",
                    isPlaying && "bg-primary/10 text-primary animate-pulse"
                  )}
                >
                  LIVE
                </Badge>
                <Button
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                  variant="ghost"
                  className="h-7 px-3 text-xs"
                >
                  Expand
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
