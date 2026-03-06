import React from "react";
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
    // FIX: Use 100dvh to fill mobile screen exactly without browser bar issues
    <div className="h-[100dvh] bg-slate-100 flex items-center justify-center p-0 md:p-4 overflow-hidden">
      
      {/* Container: Stack on mobile, Grid on desktop */}
      <div className="w-full h-full max-w-7xl flex flex-col md:grid md:grid-cols-12 md:gap-6 md:h-[85vh]">
        
        {/* --- LEFT COLUMN (Avatar) --- */}
        {/* Mobile: Fixed 35% height so it never scrolls away. Desktop: Span 7 cols */}
        <div className="h-[35%] md:h-full md:col-span-7 flex flex-col gap-4 relative z-10 bg-black md:bg-transparent">
          <VideoPanel 
            mediaStreamRef={mediaStreamRef}
            sessionId={null}
            status={status}
            onStart={startSession}
            onEnd={endSession}
          />
        </div>

        {/* --- RIGHT COLUMN (Chat) --- */}
        {/* Mobile: Takes remaining space (flex-1). Desktop: Span 5 cols */}
        <div className="flex-1 md:h-full md:col-span-5 relative z-20 -mt-4 md:mt-0">
           <ChatPanel 
             transcript={transcript}
             input={input}
             setInput={setInput}
             sendMessage={sendMessage}
           />
        </div>

        {/* --- PHASE 2 BANNER (Overlay) --- */}
        {phase2Unlocked && (
          <div className="absolute bottom-4 left-4 right-4 md:static md:col-span-12 z-50 animate-fade-in-up">
            <div className="bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-2xl border-2 border-green-500 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="text-center md:text-left">
                  <h3 className="text-sm md:text-lg font-bold text-green-700 uppercase flex items-center gap-2 justify-center md:justify-start">
                    <span>✅</span> Discovery Complete
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">I've unlocked the <b>Finance Agent</b> demo for you.</p>
               </div>
               
               <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => navigate('/builder')} className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition">
                    Try Demo
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}