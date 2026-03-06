import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit2, Loader2, ShieldCheck, Zap, BarChart3, TrendingUp, Clock } from 'lucide-react';

export function ModeToggleSection() {
    const [mode, setMode] = useState<'assisted' | 'autonomous'>('assisted');

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column Text & Toggle */}
                <div className="flex flex-col max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                        Choose Your <span className="text-blue-500">Execution Model</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                        AgentAlpha scales with your trust. Begin in Assisted Mode to verify every action, then switch to Autonomous for massive invisible scale.
                    </p>

                    {/* The Toggle Container */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-12 bg-card/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-inner relative w-fit">
                        <button
                            onClick={() => setMode('assisted')}
                            className={`flex-1 sm:flex-none relative px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${mode === 'assisted' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {mode === 'assisted' && (
                                <motion.div
                                    layoutId="mode-indicator"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full -z-10 shadow-lg"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            Assisted Mode <span className="hidden sm:inline font-normal opacity-70 ml-1">(Human-in-the-loop)</span>
                        </button>

                        <button
                            onClick={() => setMode('autonomous')}
                            className={`flex-1 sm:flex-none relative px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${mode === 'autonomous' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {mode === 'autonomous' && (
                                <motion.div
                                    layoutId="mode-indicator"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -z-10 shadow-lg"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            Autonomous <span className="hidden sm:inline font-normal opacity-70 ml-1">(Fully automated)</span>
                        </button>
                    </div>

                    {/* Dynamic Contextual Features */}
                    <div className="min-h-[160px] relative">
                        <AnimatePresence mode="wait">
                            {mode === 'assisted' ? (
                                <motion.div
                                    key="assisted-features"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div><h4 className="font-semibold text-foreground mb-1">Total Control</h4><p className="text-sm text-muted-foreground">Approve outgoing emails, API calls, and CRM updates before they ever leave the platform.</p></div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <Edit2 className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div><h4 className="font-semibold text-foreground mb-1">Learn from Edits</h4><p className="text-sm text-muted-foreground">Alpha records your manual edits and updates its baseline instruction set universally.</p></div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="autonomous-features"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                            <Zap className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div><h4 className="font-semibold text-foreground mb-1">Instant Execution</h4><p className="text-sm text-muted-foreground">Workflows process in milliseconds natively. Triggers process thousands of tickets simultaneously.</p></div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                            <BarChart3 className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div><h4 className="font-semibold text-foreground mb-1">Background Telemetry</h4><p className="text-sm text-muted-foreground">Monitor real-time system logs. Catch errors globally and rewrite failing nodes on the fly.</p></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Column Interactive Animated UI Area */}
                <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/3] bg-card/20 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {mode === 'assisted' ? (
                            <motion.div
                                key="assisted-ui"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-sm p-6"
                            >
                                <div className="w-full bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30">
                                            <div className="absolute inset-0 bg-blue-500/20 blur-md" />
                                            <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover p-2" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">Draft ready.</h3>
                                            <p className="text-sm text-muted-foreground">Send to client?</p>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 rounded-xl p-4 mb-6 text-sm text-foreground/90 border border-white/5 line-clamp-4 relative">
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                        "Hi Sarah, based on our previous discussion regarding the architectural overhaul, I've compiled the final pricing model. Please find the attached CRM objects synced accordingly."
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                                            <Check className="w-4 h-4" /> Approve
                                        </button>
                                        <button className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="autonomous-ui"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-sm p-6 flex flex-col items-center justify-center relative"
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 blur-[80px] -z-10 rounded-full" />
                                <div className="w-full bg-card/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                                            Processing Queue
                                        </h3>
                                        <div className="flex items-center gap-1.5 bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs font-mono border border-purple-500/20">
                                            <TrendingUp className="w-3 h-3" /> 120 / sec
                                        </div>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner relative mb-6">
                                        <motion.div
                                            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 background-animate"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                        />
                                    </div>

                                    <div className="space-y-3 font-mono text-[11px] sm:text-xs">
                                        <div className="flex items-center justify-between text-muted-foreground border-b border-white/5 pb-2">
                                            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-emerald-400" /> [14:02:01] Refund #8821</span>
                                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">RESOLVED</span>
                                        </div>
                                        <div className="flex items-center justify-between text-muted-foreground border-b border-white/5 pb-2">
                                            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-blue-400" /> [14:02:00] Apology Email #8822</span>
                                            <span className="text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded">DRAFTED</span>
                                        </div>
                                        <div className="flex items-center justify-between text-muted-foreground pb-2">
                                            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-yellow-400 animate-pulse" /> [14:01:59] Sentiment #8823</span>
                                            <span className="text-yellow-400 font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded animate-pulse">RUNNING</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
