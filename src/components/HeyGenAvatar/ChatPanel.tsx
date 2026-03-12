import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { from: 'agent' | 'user'; text: string };

type Props = {
  transcript?: Message[];
  input: string;
  setInput: (v: string) => void;
  sendMessage: (text: string) => void;
};

export default function ChatPanel({ transcript = [], input, setInput, sendMessage }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Local state to simulate active voice listening for purely visual feedback matching Phase 3 specs.
  // In a robust implementation, this would tie directly to a useHeyGenRTC()`isRecording` boolean.
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
  };

  const handleMicClick = () => {
    // Toggle listening state purely for visual demonstration of the pinging rings
    setIsListening(prev => !prev);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <div className="flex flex-col h-full bg-card/60 rounded-t-3xl md:rounded-3xl shadow-xl overflow-hidden border border-white/5 relative">

      {/* Header - Fixed Top */}
      <div className="h-16 px-6 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <div>
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">Live Transcript</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[11px] text-green-400 font-medium tracking-wider uppercase">System Ready</span>
          </div>
        </div>
      </div>

      {/* Message List - Absolute Positioned to force scroll */}
      <div
        className="absolute top-16 bottom-[110px] left-0 right-0 overflow-y-auto px-4 py-6 space-y-5 bg-transparent"
        ref={scrollContainerRef}
      >
        <AnimatePresence initial={false}>
          {(transcript || []).map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.from === 'agent' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-md backdrop-blur-sm transition-all
                  ${m.from === 'agent'
                    ? 'bg-purple-500/10 text-purple-100 border border-purple-500/20 rounded-tl-none shadow-[0_4px_20px_rgba(168,85,247,0.05)]'
                    : 'bg-blue-600 text-white rounded-tr-none border border-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.2)]'
                  }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[110px] bg-black/40 backdrop-blur-xl border-t border-white/5 px-4 flex flex-col items-center justify-center z-10">
        <div className="flex gap-3 w-full max-w-2xl mx-auto items-center">
          
          {/* Microphone Button with concentric rings animation */}
          <div className="relative flex items-center justify-center">
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500 rounded-full pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="absolute inset-0 bg-red-500 rounded-full pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                  className="absolute inset-0 bg-red-500 rounded-full pointer-events-none"
                />
              </>
            )}
            <button
              onClick={handleMicClick}
              className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-95 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-5 py-3 h-12 bg-background/50 border border-border focus-within:ring-2 ring-purple-500/50 rounded-full focus:outline-none text-sm text-foreground transition-all placeholder:text-muted-foreground/50 shadow-inner"
            placeholder="Interject or type your answer..."
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 shrink-0 border border-blue-500/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 -ml-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center tracking-widest uppercase">Hold spacebar to speak or click mic</p>
      </div>
    </div>
  );
}