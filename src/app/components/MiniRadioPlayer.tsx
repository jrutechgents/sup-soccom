import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
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

  // Don't show player if radio is not enabled or never played
  if (!radio.enabled) return null;

  return (
    <AnimatePresence>
      {(isPlaying || isMinimized) && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className={clsx(
            "bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white shadow-2xl",
            isMinimized ? "mx-auto rounded-t-xl" : ""
          )}>
            {!isMinimized ? (
              // Full Player
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                  {/* Radio Icon with Animation */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    className="flex-shrink-0"
                  >
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Radio className="h-5 w-5" />
                    </div>
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate">{radio.name}</span>
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-xs text-white/70 truncate">Playing Now</p>
                  </div>

                  {/* Visualizer Bars */}
                  <div className="hidden md:flex items-end gap-0.5 h-6">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isPlaying ? [4, 16, 8, 20, 6, 18, 10] : [4, 4, 4, 4, 4, 4, 4],
                        }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                        className="w-1 bg-white/60 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    {/* Volume */}
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>

                    {/* Play/Pause */}
                    <Button
                      size="sm"
                      onClick={togglePlay}
                      className="h-10 w-10 rounded-full p-0 bg-white text-purple-900 hover:bg-white/90"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      )}
                    </Button>

                    {/* Volume Slider */}
                    <div className="hidden sm:block w-20">
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="cursor-pointer"
                      />
                    </div>

                    {/* Minimize */}
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <div className="h-4 w-4 border-t-2 border-b-2" />
                    </button>

                    {/* Close */}
                    <button
                      onClick={() => {
                        if (globalAudioElement) {
                          globalAudioElement.pause();
                          setIsMinimized(false);
                        }
                      }}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Minimized Player
              <div className="mx-auto px-4 py-2 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Radio className="h-4 w-4 text-white/70" />
                </motion.div>
                <span className="text-sm text-white/80 truncate max-w-[200px]">
                  {radio.name}
                </span>
                <Button
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                  className="h-7 px-3 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs"
                >
                  Expand
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
