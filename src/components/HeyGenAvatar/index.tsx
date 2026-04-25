
import VideoPanel from "./VideoPanel";
import ChatPanel from "./ChatPanel";
import useLiveAvatarRTC from "../../hooks/useLiveAvatarRTC";
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
  } = useLiveAvatarRTC();
  const navigate = useNavigate();

  return (
    // Use h-full to fit within the beautifully styled container we made in App.tsx
    <div className="h-full bg-background flex flex-col overflow-hidden rounded-2xl relative">
      {/* Subtle Inner Glow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

      {/* Container: Stack on mobile, Grid on desktop */}
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 p-4 md:p-6 relative z-10">

        {/* --- LEFT COLUMN (Avatar) --- */}
        {/* Mobile: Min heights. Desktop: Span 7 cols */}
        <div className="min-h-[400px] lg:min-h-[500px] lg:h-full lg:col-span-7 flex flex-col relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-inner">
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
        <div className="flex-1 lg:h-full lg:col-span-5 relative z-20 mt-6 lg:mt-0 flex flex-col">
          <div className="flex-1 bg-card/20 backdrop-blur-sm border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col">
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
          <div className="absolute bottom-6 left-6 right-6 lg:static lg:col-span-12 z-50 animate-fade-in-up">
            <div className="bg-card/80 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.15)] border border-green-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
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