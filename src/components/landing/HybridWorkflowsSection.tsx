import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Slack, Link as LinkIcon, Mail, Database, Globe } from 'lucide-react';

const tabs = [
    {
        id: 'lead',
        label: 'Lead Enrichment',
        nodes: [
            { id: '1', icon: <Globe className="w-5 h-5 text-indigo-400" />, name: 'Website' },
            { id: '2', icon: <Zap className="w-5 h-5 text-blue-500" />, name: 'Alpha Brain' },
            { id: '3', icon: <Database className="w-5 h-5 text-emerald-400" />, name: 'CRM' },
            { id: '4', icon: <Slack className="w-5 h-5 text-pink-400" />, name: 'Notifications' }
        ]
    },
    {
        id: 'support',
        label: 'Support Triage',
        nodes: [
            { id: '1', icon: <Mail className="w-5 h-5 text-blue-400" />, name: 'Zendesk' },
            { id: '2', icon: <Zap className="w-5 h-5 text-blue-500" />, name: 'Alpha Brain' },
            { id: '3', icon: <LinkIcon className="w-5 h-5 text-purple-400" />, name: 'Jira' },
            { id: '4', icon: <Slack className="w-5 h-5 text-pink-400" />, name: 'Slack' }
        ]
    },
    {
        id: 'invoice',
        label: 'Invoice Sync',
        nodes: [
            { id: '1', icon: <Mail className="w-5 h-5 text-orange-400" />, name: 'Gmail' },
            { id: '2', icon: <Zap className="w-5 h-5 text-blue-500" />, name: 'Alpha Brain' },
            { id: '3', icon: <Database className="w-5 h-5 text-green-500" />, name: 'QuickBooks' },
            { id: '4', icon: <Slack className="w-5 h-5 text-pink-400" />, name: 'Finance Channel' }
        ]
    }
];

export function HybridWorkflowsSection() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

    const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

    useEffect(() => {
        setActiveNodeIndex(-1);
        const startTimeout = setTimeout(() => {
            setActiveNodeIndex(0);
        }, 800);
        return () => clearTimeout(startTimeout);
    }, [activeTab]);

    useEffect(() => {
        if (activeNodeIndex >= 0 && activeNodeIndex < currentTab.nodes.length) {
            const timer = setTimeout(() => {
                setActiveNodeIndex(prev => prev + 1);
            }, 1500);
            return () => clearTimeout(timer);
        } else if (activeNodeIndex === currentTab.nodes.length) {
            const resetTimer = setTimeout(() => {
                setActiveNodeIndex(0);
            }, 2000);
            return () => clearTimeout(resetTimer);
        }
    }, [activeNodeIndex, currentTab.nodes.length]);

    return (
        <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Real workflows in action</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Watch how data flows seamlessly across your ecosystem in real-time.</p>
            </div>

            {/* Tabs - Scrollable on mobile */}
            <div className="w-full overflow-x-auto no-scrollbar mb-10 pb-4">
                <div className="flex items-center justify-center min-w-max gap-3 mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-white' : 'text-muted-foreground hover:text-foreground/80 bg-card/40 border border-white/5'
                                }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="workflow-tab"
                                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-inner -z-10"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Canvas Area */}
            <div className="w-full bg-card/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.500/0.03)_0%,transparent_100%)] pointer-events-none" />

                {/* Animated SVG Path background */}
                <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] hidden sm:block">
                    <svg width="100%" height="100%" className="overflow-visible">
                        <motion.line
                            x1="0" y1="0" x2="100%" y2="0"
                            stroke="currentColor"
                            className="text-white/10"
                            strokeWidth="2"
                            strokeDasharray="4 8"
                        />

                        {/* Actively traveling data packet (Glowing Dot) */}
                        {activeNodeIndex >= 0 && activeNodeIndex < currentTab.nodes.length - 1 && (
                            <motion.circle
                                r="4"
                                fill="var(--color-blue-400)"
                                className="drop-shadow-[0_0_8px_rgba(96,165,250,1)]"
                                initial={{ cx: `${(activeNodeIndex / (currentTab.nodes.length - 1)) * 100}%` }}
                                animate={{ cx: `${((activeNodeIndex + 1) / (currentTab.nodes.length - 1)) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                cy="0"
                            />
                        )}
                        <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="var(--color-blue-400)" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Nodes Sequence */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTab.id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            },
                            exit: { opacity: 0, transition: { duration: 0.2 } }
                        }}
                        className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4"
                    >
                        {currentTab.nodes.map((node, i) => {
                            const isActive = activeNodeIndex === i;
                            const isPast = activeNodeIndex > i;

                            return (
                                <motion.div
                                    key={node.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20, scale: 0.8 },
                                        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
                                    }}
                                    className="flex flex-col items-center gap-4 relative group"
                                >
                                    <div className="relative">
                                        {/* Active Glowing Aura */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl -z-10"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                            />
                                        )}

                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border flex items-center justify-center relative shadow-xl transition-all duration-500
                                            ${isActive ? 'bg-blue-500/10 border-blue-500/50 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.2)]' :
                                                isPast ? 'bg-card border-white/20' : 'bg-card/50 border-white/5 opacity-70'}
                                        `}>
                                            <div className={`scale-100 sm:scale-125 transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`}>
                                                {node.icon}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className={`text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                                            {node.name}
                                        </span>
                                        <span className={`text-[10px] uppercase font-bold tracking-widest mt-1 transition-opacity ${isActive ? 'opacity-100 text-blue-400' : 'opacity-0'}`}>
                                            Processing...
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
