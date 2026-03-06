import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function DiscoveryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen relative bg-background text-foreground flex flex-col font-sans selection:bg-purple-500/30 transition-colors duration-300 overflow-x-hidden">
            {/* Dynamic Background Grain/Gradient for the entire app */}
            <div className="fixed inset-0 pointer-events-none -z-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background" />
            </div>

            <Navbar />

            {/* Content */}
            <main className="flex-1 w-full relative z-10 flex flex-col">
                {children}
            </main>

            <Footer />
        </div>
    );
}
