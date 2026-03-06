import React from 'react';

type Props = {
  mediaStreamRef: React.RefObject<HTMLVideoElement | null>; 
  sessionId: string | null;
  status: string;
  onStart: () => Promise<void>;
  onEnd: () => Promise<void>;
};

export default function VideoPanel({ mediaStreamRef, sessionId, status, onStart, onEnd }: Props) {
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  return (
    <div className="w-full h-full md:rounded-3xl overflow-hidden relative bg-gradient-to-b from-slate-900 via-slate-800 to-black shadow-2xl ring-1 ring-white/10 flex flex-col">
       
       {/* Aesthetic Header / Status */}
       <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${
            isConnected 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-white/5 text-slate-300 border-white/10'
         }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
            {status === 'idle' ? 'READY' : status.toUpperCase()}
         </div>
       </div>

      {/* Video Container */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Placeholder Glow when Idle */}
        {!isConnected && (
           <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-32 h-32 bg-blue-500 rounded-full blur-[100px]"></div>
           </div>
        )}

        <video 
          ref={mediaStreamRef} 
          autoPlay 
          playsInline 
          // FIX: object-contain prevents zooming/cropping. 
          className="w-full h-full object-contain max-h-[120%] transform translate-y-2" 
        />
        
        {/* Subtle vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </div>

      {/* Center Controls (Start) */}
      {!isConnected && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
          <button 
            onClick={onStart}
            disabled={isConnecting}
            className={`group relative px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95 ${
               isConnecting 
                 ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
                 : 'bg-white text-slate-900 hover:bg-slate-50 border border-white'
            }`}
          >
            {isConnecting ? (
               <span className="flex items-center gap-3">
                 <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                 </svg>
                 <span className="text-sm">Connecting Securely...</span>
               </span>
            ) : (
               <span className="flex items-center gap-2">
                 <span>Start Discovery</span>
                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </span>
            )}
          </button>
          {!isConnecting && <p className="mt-4 text-xs text-slate-400 font-medium tracking-wide uppercase opacity-60">AI Powered Interviewer</p>}
        </div>
      )}

      {/* Bottom Controls (End) */}
      {isConnected && (
         <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-auto">
            <button 
              onClick={onEnd}
              className="px-5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-200 rounded-full text-xs font-bold backdrop-blur-md transition flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-500 rounded-sm"></span>
              End Session
            </button>
         </div>
      )}
    </div>
  );
}