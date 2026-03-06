
import VideoPanel from "./VideoPanel";
import ChatPanel from "./ChatPanel";
import useHeyGenRTC from "../../hooks/useHeyGenRTC";
import { useNavigate } from "react-router-dom";

export default function HeyGenAvatar() {
  const {
    mediaStreamRef,
    status,
    startSession,
    endSession,
    transcript,
    input,
    setInput,
    sendMessage,
    phase2Unlocked
  } = useHeyGenRTC();
  const navigate = useNavigate();

  return (
    // Use h-full to fit within the beautifully styled container we made in App.tsx
    <div className="h-full bg-background flex flex-col overflow-hidden rounded-2xl relative">
      {/* Subtle Inner Glow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

      {/* Container: Stack on mobile, Grid on desktop */}
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-12 md:gap-4 p-4 relative z-10">

        {/* --- LEFT COLUMN (Avatar) --- */}
        {/* Mobile: Fixed 35% height so it never scrolls away. Desktop: Span 7 cols */}
        <div className="h-[40%] md:h-full md:col-span-7 flex flex-col relative rounded-2xl overflow-hidden border border-white/5 bg-card/20 backdrop-blur-md shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-0" />
          <div className="relative z-10 w-full h-full flex flex-col">
            <VideoPanel
              mediaStreamRef={mediaStreamRef}
              sessionId={null} // Keep as original logic
              status={status}
              onStart={startSession}
              onEnd={endSession}
            />
          </div>
        </div>

        {/* --- RIGHT COLUMN (Chat) --- */}
        {/* Mobile: Takes remaining space (flex-1). Desktop: Span 5 cols */}
        <div className="flex-1 md:h-full md:col-span-5 relative z-20 md:mt-0 flex flex-col">
          <div className="flex-1 bg-card/40 backdrop-blur-xl border border-white/5 shadow-lg rounded-2xl overflow-hidden flex flex-col">
            <ChatPanel
              transcript={transcript}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          </div>
        </div>

        {/* --- PHASE 2 BANNER (Overlay) --- */}
        {phase2Unlocked && (
          <div className="absolute bottom-6 left-6 right-6 md:static md:col-span-12 z-50 animate-fade-in-up">
            <div className="bg-card/80 backdrop-blur-2xl p-5 md:p-6 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.15)] border border-green-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-sm md:text-lg font-bold text-green-500 uppercase flex items-center gap-2 justify-center md:justify-start tracking-wide">
                  <span className="text-xl">✨</span> Discovery Complete
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">I've unlocked the <strong className="text-foreground">Finance Agent</strong> demo for you.</p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => navigate('/studio')} className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105">
                  Start Building
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}