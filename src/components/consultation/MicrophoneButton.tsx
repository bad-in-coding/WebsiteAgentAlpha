import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const MicrophoneButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate audio level changes for the visualization
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsRecording(!isRecording)}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          isRecording
            ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 border-red-500/50 animate-pulse'
            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/20 hover:border-white/40'
        }`}
      >
        <div className="relative">
          <Mic className={`w-8 h-8 ${isRecording ? 'text-red-400' : 'text-white'}`} />

          {/* Audio wave visualization */}
          {isRecording && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-red-500 rounded-full"
                    style={{
                      height: `${Math.random() * 100}%`,
                      left: `${i * 20}%`,
                      transform: 'translateX(-50%)'
                    }}
                    animate={{
                      height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default MicrophoneButton;