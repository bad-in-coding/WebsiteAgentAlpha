import { motion } from 'framer-motion';

export function MemorySection() {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-16 items-center">
                {/* Left Column (The Timeline) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full relative"
                >
                    {/* Timeline vertical line */}
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/10 via-purple-500/20 to-transparent -z-10" />

                    <div className="flex flex-col gap-8">
                        {/* Node 1 */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-lg group-hover:border-blue-500/30 transition-colors">
                                <div className="w-3 h-3 rounded-full bg-blue-500/50" />
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-blue-400 uppercase border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded w-fit">Learned</span>
                                <p className="text-foreground/80 md:text-lg">"Day 1: Draft emails in Hinglish."</p>
                            </div>
                        </div>

                        {/* Node 2 */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-lg group-hover:border-purple-500/30 transition-colors">
                                <div className="w-3 h-3 rounded-full bg-purple-500/50" />
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-emerald-400 uppercase border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded w-fit">Preference Saved</span>
                                <p className="text-foreground/80 md:text-lg">"Day 5: Never execute Stripe refunds without asking."</p>
                            </div>
                        </div>

                        {/* Node 3 (Active) */}
                        <div className="flex items-start gap-6 relative">
                            {/* Glow effect for active node */}
                            <div className="absolute top-2 -left-6 w-32 h-32 bg-purple-500/20 blur-2xl -z-10 rounded-full pointer-events-none" />

                            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-purple-400 uppercase border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 rounded w-fit">Active</span>
                                <p className="text-foreground font-medium md:text-lg leading-relaxed">"Now: AgentAlpha handles everything exactly how you like it, natively in your regional language."</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column (Text) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <h3 className="text-purple-400 font-bold tracking-widest text-sm mb-4 uppercase">Adaptive Intelligence</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">Evolves as you use it. <span className="text-foreground/50">Every single day.</span></h2>
                    <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
                        AgentAlpha features a persistent <span className="text-foreground font-medium">Personal Profile</span>. It learns your tone, your risk tolerance, and your preferred languages. No repeated instructions, ever.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
