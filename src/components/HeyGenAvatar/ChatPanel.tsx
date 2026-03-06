import { useEffect, useRef } from 'react';

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

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <div className="flex flex-col h-full bg-white rounded-t-3xl md:rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative">

      {/* Header - Fixed Top */}
      <div className="h-16 px-6 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Agent Alpha</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-slate-500 font-medium">Discovery Active</span>
          </div>
        </div>
      </div>

      {/* Message List - Absolute Positioned to force scroll */}
      <div
        className="absolute top-16 bottom-20 left-0 right-0 overflow-y-auto px-4 py-6 space-y-4 bg-slate-50/50"
        ref={scrollContainerRef}
      >
        {(transcript || []).map((m, i) => (
          <div key={i} className={`flex ${m.from === 'agent' ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm transition-all
                ${m.from === 'agent'
                  ? 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none shadow-blue-200'
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-4 flex items-center z-10">
        <div className="flex gap-3 w-full max-w-2xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-50 border border-transparent focus:border-blue-200 rounded-full focus:bg-white focus:ring-4 focus:ring-blue-50 focus:outline-none text-sm text-black transition-all"
            placeholder="Type your answer..."
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}