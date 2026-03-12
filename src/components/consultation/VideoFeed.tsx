import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Pause, Play } from 'lucide-react';

const VideoFeed = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate audio level changes for the visualization
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-background/5 backdrop-blur-xl border border-white/10">
      {/* Video Placeholder with Glassmorphism */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl flex items-center justify-center">
          {/* Avatar Placeholder */}
          <div className="relative">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 backdrop-blur-md">
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/60 to-purple-500/60 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/70 to-purple-500/70 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-500/80 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/90 to-purple-500/90 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-white/90"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pulsing "System Ready" Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-center">
                <div className="text-white text-xl font-semibold mb-2">System Ready</div>
                <div className="text-blue-300 text-lg">Awaiting Voice</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Audio Wave Equalizer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-end justify-center gap-1 h-16">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
            initial={{ height: 0 }}
            animate={{
              height: isPlaying ? `${Math.random() * 100}%` : '0%',
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
      </button>
    </div>
  );
};

export default VideoFeed;