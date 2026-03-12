import React from 'react';
import VideoFeed from './VideoFeed';
import LiveIntelligenceFeed from './LiveIntelligenceFeed';
import MicrophoneButton from './MicrophoneButton';

export const DiscoveryCommandCenter = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Ambient Glowing Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative w-full flex-1">
        <div className="text-center mb-10 mt-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Discovery Command Center
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Voice-first consultation with our AI Architect
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
          {/* Left Column - Video Feed (60%) */}
          <div className="w-full lg:w-3/5 h-full">
            <VideoFeed />
          </div>

          {/* Right Column - Live Intelligence Feed (40%) */}
          <div className="w-full lg:w-2/5 h-full">
            <LiveIntelligenceFeed />
          </div>
        </div>
      </div>

      {/* Microphone Button */}
      <MicrophoneButton />
    </div>
  );
};