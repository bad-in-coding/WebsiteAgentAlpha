import { motion } from 'framer-motion';
import { Sparkles, Play, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
    return (
        <section className="pt-24 pb-32 px-6 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column Text */}
            <motion.div className="flex flex-col items-center text-center md:items-start md:text-left z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide mb-6 md:mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>The Next Gen Agentic Workflow Builder</span>
                </motion.div>

                {/* Title: Use text-foreground so it's black in light mode, white in dark */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
                >
                    Architect Your <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-sm mt-1">AI Workforce</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mb-10 leading-relaxed font-medium"
                >
                    AgentAlpha turns a single natural-language intent into a working, deployable agent.
                    Non-technical users discover value through a video-led consultation; power users design, test, and customize agents in a visual playground.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                    <Link to="/consult" className="group relative z-10 inline-flex items-center justify-center">
                        <Button className="h-14 px-8 text-base bg-foreground hover:bg-foreground/90 text-background rounded-full shadow-2xl transition-all hover:scale-105 group relative overflow-hidden">
                            <span className="relative z-10 flex items-center font-bold">
                                Talk to Alpha Now
                                <Play className="w-4 h-4 ml-3 fill-current group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Right Column Visual / Video Mockup */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full relative max-w-lg mx-auto md:max-w-none mt-10 md:mt-0"
            >
                {/* Soft large purple blur behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 blur-3xl rounded-full -z-10" />

                <div className="w-full bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-2xl relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Glowing Ring around Avatar Placeholder */}
                    <div className="w-full aspect-square bg-background/50 rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/10 animate-pulse blur-xl" />
                        <div className="w-40 h-40 rounded-full border border-blue-500/20 absolute animate-[ping_3s_ease-in-out_infinite]" />
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/40 animate-[spin_10s_linear_infinite] absolute" />
                        <div className="w-24 h-24 bg-card rounded-full border border-blue-500/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <Bot className="w-10 h-10 text-blue-500" />
                        </div>
                    </div>

                    {/* Mock Transcript Box */}
                    <div className="mt-4 bg-background/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5 relative z-10 text-left">
                        <div className="flex flex-col gap-3 text-sm sm:text-base">
                            <div className="text-muted-foreground"><span className="font-semibold text-foreground/80">User:</span> Pull the Q3 metrics...</div>
                            <div className="text-blue-500 dark:text-blue-400 font-medium"><span className="font-bold">Alpha:</span> Right away, generating the chart now.</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
