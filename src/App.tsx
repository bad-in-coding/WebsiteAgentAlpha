import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from '@/views/LandingPage';
import { ThemeProvider } from "@/components/ThemeProvider";
import { DiscoveryLayout } from "@/layouts/DiscoveryLayout";
import { Spinner } from "@/components/ui/Spinner";

// Lazy load Phase 1
const HeyGenAvatar = React.lazy(() => import("./components/HeyGenAvatar"));

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