import React, { Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import BuilderInterface from '@/views/builder';
import LandingPage from '@/views/LandingPage';
import { Bot } from 'lucide-react';
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

// Lazy load Phase 1
const HeyGenAvatar = React.lazy(() => import("./components/HeyGenAvatar"));

// --- SHARED COMPONENTS ---
function Spinner() {
  return (
    <div className="flex items-center justify-center p-8 h-full bg-background">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}

// --- LAYOUTS ---

function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isConsult = location.pathname === '/consult';

  return (
    // FIX 1: Use bg-background instead of bg-[#020617]
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Header */}
      {/* FIX 2: Use bg-background/80 instead of bg-[#020617]/80 */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            {/* FIX 3: Add dark/light logic for logo text */}
            <div className="flex items-center gap-3">
               <img 
                 src="logo.png" 
                 alt="AgentAlpha Logo" 
                 className="h-12 w-auto object-contain rounded-xl" 
               />
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
             <Link to="/" className="text-muted-foreground hover:text-foreground transition">Features</Link>
             <Link to="/consult" className={`transition ${isConsult ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
                Consultation
             </Link>
             <Link to="/builder">
                <div className="bg-secondary hover:bg-secondary/80 border border-border px-4 py-2 rounded-full text-secondary-foreground transition-all">
                   Go to Studio
                </div>
             </Link>
             {/* Add Toggle Here */}
             <div className="pl-4 border-l border-border">
                <ThemeToggle />
             </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Agent Alpha Inc.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BuilderLayout() {
  return (
    // FIX 4: Use bg-background instead of bg-[#020617]
    <div className="h-screen w-screen bg-background overflow-hidden flex flex-col">
       <div className="flex-1 overflow-hidden relative">
          <BuilderInterface />
       </div>
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/" element={<DiscoveryLayout><LandingPage /></DiscoveryLayout>} />
        
        <Route path="/consult" element={
          <DiscoveryLayout>
             <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center mb-10">
                   {/* FIX 5: Use text-foreground */}
                   <h2 className="text-3xl font-bold text-foreground mb-4">Consult with our AI Architect</h2>
                   <p className="text-muted-foreground">Ask questions about architecture, best practices, and integration strategies.</p>
                </div>
                <section className="bg-card/50 rounded-3xl shadow-2xl border border-border overflow-hidden min-h-[600px] backdrop-blur-sm relative">
                  <Suspense fallback={<Spinner />}>
                    <HeyGenAvatar />
                  </Suspense>
                </section>
             </div>
          </DiscoveryLayout>
        } />

        <Route path="/builder" element={<BuilderLayout />} />
      </Routes>
    </ThemeProvider>
  );
}