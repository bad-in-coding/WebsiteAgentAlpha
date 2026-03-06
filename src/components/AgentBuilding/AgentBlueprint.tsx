import React from 'react';

export interface AgentConfig {
  name: string;
  role: 'finance' | 'health' | 'productivity';
  tone: string;
  risk_tolerance: 'low' | 'medium' | 'high';
  permissions: string[];
  data_sources: string[];
  reporting_frequency: string;
}

interface Props {
  config: AgentConfig;
  isUpdating: boolean;
}

export default function AgentBlueprint({ config, isUpdating }: Props) {
  return (
    <div className={`h-full overflow-y-auto p-8 md:p-12 transition-all duration-500 ${isUpdating ? 'opacity-60 blur-[1px]' : 'opacity-100'}`}>
      
      {/* Dynamic Header */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-2">
            <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border
              ${config.role === 'finance' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                config.role === 'health' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
              {config.role.toUpperCase()} CORE
            </span>
            <span className="text-xs font-mono text-slate-400">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-2">{config.name}</h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg">
          This agent is configured to act as your <span className="text-slate-800 font-semibold">{config.role} assistant</span> with a <span className="text-slate-800 font-semibold">{config.tone}</span> personality.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up delay-100">
        
        {/* Card 1: Behavior Matrix */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Behavior Matrix</h3>
          
          <div className="space-y-8">
            {/* Risk Slider */}
            <div>
              <div className="flex justify-between mb-3">
                 <label className="text-sm font-bold text-slate-700">Risk Profile</label>
                 <span className={`text-xs font-bold px-2 py-0.5 rounded capitalize ${
                     config.risk_tolerance === 'high' ? 'bg-red-100 text-red-600' : 
                     config.risk_tolerance === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                 }`}>{config.risk_tolerance}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full relative overflow-hidden">
                 <div className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ease-out rounded-full ${
                     config.risk_tolerance === 'high' ? 'w-full bg-gradient-to-r from-orange-400 to-red-500' : 
                     config.risk_tolerance === 'medium' ? 'w-2/3 bg-gradient-to-r from-yellow-400 to-amber-500' : 'w-1/3 bg-gradient-to-r from-emerald-400 to-green-500'
                 }`} />
                 
                 {/* Tick Marks */}
                 <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-white/50 z-10"></div>
                 <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-white/50 z-10"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono uppercase">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Tone Selector Visualization */}
            <div>
               <label className="text-sm font-bold text-slate-700 mb-3 block">Personality Engine</label>
               <div className="flex gap-3">
                 {['professional', 'friendly', 'urgent', 'concise'].map(t => (
                   <div key={t} className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border transition-all duration-300 ${
                     config.tone === t 
                       ? 'bg-slate-800 text-white border-slate-800 shadow-lg scale-105' 
                       : 'bg-white text-slate-400 border-slate-200 opacity-60'
                   }`}>
                     {t}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Card 2: Neural Connections (Integrations) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Neural Links</h3>
          
          <div className="flex-1 space-y-3">
            {config.data_sources.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2 border-2 border-dashed border-slate-800 rounded-xl">
                  <span className="text-2xl opacity-50">🔌</span>
                  <span className="text-xs">No active links</span>
               </div>
            ) : (
               config.data_sources.map((source, i) => (
                <div key={source} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition animate-fade-in-left" style={{animationDelay: `${i * 100}ms`}}>
                   <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                      {source[0].toUpperCase()}
                   </div>
                   <div>
                      <p className="text-sm font-bold capitalize">{source}</p>
                      <p className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        Live Stream
                      </p>
                   </div>
                </div>
               ))
            )}
          </div>
        </div>

        {/* Card 3: Permissions Log */}
        <div className="lg:col-span-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Authorized Protocols</h3>
           <div className="flex flex-wrap gap-2">
             {config.permissions.length === 0 && <span className="text-slate-400 text-sm italic">Read-only mode active. Request specific actions to enable write access.</span>}
             {config.permissions.map((perm, i) => (
               <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono">
                 {perm}
               </span>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}