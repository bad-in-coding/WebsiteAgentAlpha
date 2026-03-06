import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Zap, Cpu, ArrowRight, Layers, ShieldCheck, 
  Sparkles, MessageSquare, Play 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradients: Light Mode (Subtle) vs Dark Mode (Deep) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-300/30 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-32 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-100/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6 animate-fade-in-up">
          <Sparkles className="w-3 h-3" />
          <span>The Next Gen Agentic Workflow Builder</span>
        </div>
        
        {/* Title: Use text-foreground so it's black in light mode, white in dark */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-tight">
          Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400">AI Workforce</span>
          {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400">AgentAlpha</span> */}

        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          AgentAlpha turns a single natural-language intent into a working, deployable agent.
          Non-technical users discover value through a video-led consultation; power users design, test, and customize agents in a visual playground — then deploy with one click.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/builder">
            <Button className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
              <Zap className="w-4 h-4 mr-2 fill-current" />
              Start Building Now
            </Button>
          </Link>
          
          <Link to="/consult">
            <Button variant="outline" className="h-12 px-8 text-base border-border hover:bg-accent text-foreground rounded-full transition-all">
              <MessageSquare className="w-4 h-4 mr-2" />
              Try Discovery Avatar
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-foreground mb-12 text-center">Why AgentAlpha?</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-blue-500" />}
            title="Prompt-to-Agent Playground"
            desc="Type a single prompt — we auto-generate the workflow, connectors, and prompts so you don’t have to."
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-purple-500" />}
            title="Multi-Model Orchestration"
            desc="Mix GPT, Claude, Gemini and specialized tools within a single agent for best-of-breed results."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
            title="Privacy-first & Enterprise Security"
            desc="Role-based access, encrypted credential storage, and on-prem deployment options."
          />
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="relative max-w-5xl mx-auto px-6 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-3xl -z-10" />
        <div className="border border-border bg-card/50 rounded-3xl p-2 shadow-2xl overflow-hidden">
             {/* <img 
               src="/dashboard-preview.png" 
               alt="Builder Preview" 
               className="rounded-2xl w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500" 
             /> */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl flex items-center gap-3">
                   <Play className="w-5 h-5 text-foreground fill-current" />
                   <span className="text-sm font-medium text-foreground">Watch the Demo</span>
                </div>
             </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/30 hover:bg-accent/50 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
