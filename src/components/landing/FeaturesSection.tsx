import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, ShieldCheck } from 'lucide-react';

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[2rem] bg-card/30 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 hover:bg-card/50 transition-all duration-500 shadow-xl group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-background/50 border border-white/5 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 relative z-10">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">{title}</h3>
            <p className="text-muted-foreground text-base leading-relaxed relative z-10">{desc}</p>
        </motion.div>
    );
}

export function FeaturesSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-32">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-foreground mb-16 text-center tracking-tight"
            >
                Why AgentAlpha?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Layers className="w-7 h-7 text-blue-400" />}
                    title="Prompt-to-Agent"
                    desc="Type a single prompt — we auto-generate the workflow, connectors, and prompts so you don’t have to. Experience true 10x leverage."
                    delay={0}
                />
                <FeatureCard
                    icon={<Cpu className="w-7 h-7 text-indigo-400" />}
                    title="Multi-Model Engine"
                    desc="Mix GPT, Claude, Gemini and specialized tools within a single unified agent for best-of-breed outcomes and zero lock-in."
                    delay={0.1}
                />
                <FeatureCard
                    icon={<ShieldCheck className="w-7 h-7 text-emerald-400" />}
                    title="Enterprise Secure"
                    desc="Role-based access, encrypted credential storage, and SOC2 compliant architecture guarantees your data remains private natively."
                    delay={0.2}
                />
            </div>
        </section>
    );
}
