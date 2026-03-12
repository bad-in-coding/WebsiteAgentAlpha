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
            <DiscoveryCommandCenter />
          </DiscoveryLayout>
        } />
      </Routes>
    </ThemeProvider>
  );
}