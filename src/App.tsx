import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from '@/views/LandingPage';
import { Bot, Menu, X, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen relative bg-background text-foreground flex flex-col font-sans selection:bg-purple-500/30 transition-colors duration-300 overflow-x-hidden">

      {/* Dynamic Background Grain/Gradient for the entire app */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-white/5 bg-background/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">

          <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity z-10">
            <div className="flex items-center gap-3">
              <img
                src="logo.png"
                alt="AgentAlpha Logo"
                className="h-10 w-auto object-contain drop-shadow-md"
              />
            </div>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium absolute left-0 right-0">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Demos</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
          </nav>

          {/* Right Side Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <Button variant="outline" className="border-border text-foreground rounded-full h-10 px-5 transition-colors">
              Join Waitlist
            </Button>
            <Link to="/consult">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-full h-10 px-6 transition-all shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] hover:-translate-y-0.5">
                Try Discovery Avatar
              </Button>
            </Link>
            <div className="pl-4 border-l border-white/10 flex items-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Side (Hamburger + Theme Toggle) */}
          <div className="flex md:hidden items-center gap-4 z-10">
            <ThemeToggle />
            <button
              className="p-2 text-foreground focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-5 shadow-2xl">
            <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Demos</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Pricing</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Learn</Link>
            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <Button variant="outline" className="w-full border-border text-foreground rounded-full h-12 text-base justify-center">
                Join Waitlist
              </Button>
              <Link to="/consult" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full h-12 text-base transition-all shadow-lg hover:shadow-purple-500/50 justify-center">
                  Try Discovery Avatar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background/50 backdrop-blur-md mt-auto z-10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-foreground" />
            <span className="font-semibold text-foreground">Agent Alpha Inc.</span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Agent Alpha Inc. All rights reserved.</p>
        </div>
      </footer>
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
            <div className="max-w-5xl mx-auto px-6 py-12 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Consult with our AI Architect</h2>
                <p className="text-muted-foreground text-lg">Ask questions about architecture, best practices, and integration strategies.</p>
              </div>
              <section className="bg-card/30 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.2)] border border-white/10 overflow-hidden min-h-[600px] backdrop-blur-2xl relative p-2 md:p-4">
                <Suspense fallback={<Spinner />}>
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-background">
                    <HeyGenAvatar />
                  </div>
                </Suspense>
              </section>
            </div>
          </DiscoveryLayout>
        } />
      </Routes>
    </ThemeProvider>
  );
}