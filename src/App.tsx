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
            <div className="max-w-6xl mx-auto px-6 py-12 relative w-full">
              {/* Ambient Glowing Backgrounds */}
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
              <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

              <div className="text-center mb-10 mt-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  Discovery Command Center
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Voice-first consultation with our AI Architect
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
                {/* Left Column - Video Feed (60%) */}
                <div className="w-full lg:w-3/5 h-full">
                  <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-full flex items-center justify-center">
                    <Suspense fallback={<Spinner />}>
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-background">
                        <HeyGenAvatar />
                      </div>
                    </Suspense>
                  </div>
                </div>

                {/* Right Column - Live Intelligence Feed (40%) */}
                <div className="w-full lg:w-2/5 h-full">
                  <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Live Intelligence Feed</h3>
                    <div className="space-y-4">
                      <div className="bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                        <h4 className="font-medium text-foreground mb-2">Live Transcript</h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-muted-foreground">"I need to automate our invoice processing workflow. It's taking too long and causing delays."</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-muted-foreground">"That's a common challenge. We can create a workflow that pulls data from your CRM and auto-generates invoices."</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                        <h4 className="font-medium text-foreground mb-2">Real-time Insights</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-blue-300 text-sm">Detected: Manual Invoicing Pain Point</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                            <span className="text-purple-300 text-sm">Drafting: Salesforce Sync Node</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Microphone Button */}
              <div className="fixed bottom-8 right-8 z-50">
                <button className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </DiscoveryLayout>
        } />
      </Routes>
    </ThemeProvider>
  );
}