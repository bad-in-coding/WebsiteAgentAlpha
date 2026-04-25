import React from 'react';
import {
    Mail, FileText, Database, Cloud, Server, Hash,
    Table, Users, Briefcase, Globe, Book, Zap
} from 'lucide-react';

const ring1 = [
    { label: "Gmail", icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, color: "text-red-500" },
    { label: "Slack", icon: <Hash className="w-4 h-4 md:w-5 md:h-5" />, color: "text-pink-500" },
    { label: "Google Calendar", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" },
    { label: "Google Drive", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-green-500" },
    { label: "Google Sheets", icon: <Table className="w-4 h-4 md:w-5 md:h-5" />, color: "text-emerald-500" },
    { label: "Notion", icon: <Book className="w-4 h-4 md:w-5 md:h-5" />, color: "text-foreground" },
    { label: "Jira", icon: <Server className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-600" },
];

const ring2 = [
    { label: "Salesforce", icon: <Cloud className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-400" },
    { label: "HubSpot", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-500" },
    { label: "Stripe", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-indigo-400" },
    { label: "Razorpay", icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" },
    { label: "PostgreSQL", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-400" },
    { label: "Firebase", icon: <Server className="w-4 h-4 md:w-5 md:h-5" />, color: "text-yellow-500" },
    { label: "Cloudflare", icon: <Cloud className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-400" },
    { label: "GitHub", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-foreground" },
    { label: "OpenAI", icon: <Server className="w-4 h-4 md:w-5 md:h-5" />, color: "text-emerald-500" },
];

const ring3 = [
    { label: "Amazon Web Services", icon: <Cloud className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-500" },
    { label: "Zapier", icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-600" },
    { label: "Airtable", icon: <Table className="w-4 h-4 md:w-5 md:h-5" />, color: "text-yellow-400" },
    { label: "Telegram", icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-400" },
    { label: "Discord", icon: <Hash className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" },
    { label: "Waves", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-400" },
    { label: "Polygon", icon: <Database className="w-4 h-4 md:w-5 md:h-5" />, color: "text-purple-500" }
];

const ring4 = [
    { label: "Google Docs", icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-500" },
    { label: "LinkedIn", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "text-blue-600" },
    { label: "YouTube", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-red-600" },
    { label: "Instagram", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "text-pink-600" },
    { label: "Reddit", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-orange-600" },
    { label: "TikTok", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-slate-900" },
    { label: "X", icon: <Hash className="w-4 h-4 md:w-5 md:h-5" />, color: "text-foreground" },
    { label: "Google Maps", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, color: "text-green-600" },
];

const allItems = [...ring2, ...ring3, ...ring4];

function OrbitRing({ items, radius, duration, reverse }: { items: Array<{ label: string, icon: React.ReactNode, color: string }>, radius: number, duration: number, reverse?: boolean }) {
    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin"
            style={{
                width: radius * 2,
                height: radius * 2,
                animationDuration: `${duration}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
                animationTimingFunction: 'linear'
            }}
        >
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            {items.map((item, i) => {
                const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
                const top = `calc(50% + ${Math.sin(angle) * 50}%)`;
                const left = `calc(50% + ${Math.cos(angle) * 50}%)`;

                return (
                    <div
                        key={i}
                        className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:z-50"
                        style={{ top, left }}
                    >
                        <div
                            className="rounded-full bg-card/95 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 px-3 py-1.5 md:px-4 md:py-2 whitespace-nowrap group animate-spin"
                            style={{
                                animationDuration: `${duration}s`,
                                animationDirection: reverse ? 'normal' : 'reverse',
                                animationTimingFunction: 'linear'
                            }}
                        >
                            <div className={item.color}>
                                {item.icon}
                            </div>
                            <span className="text-xs md:text-sm font-medium ml-2 md:ml-3 text-foreground/80 group-hover:text-foreground transition-colors">{item.label}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function OrbitalEcosystem() {
    return (
        <section className="py-32 relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.500/0.05)_0%,transparent_60%)] pointer-events-none" />

            <div className="text-center z-20 mb-16 md:mb-24 px-6 relative">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Connect to any of your tools.<br /><span className="text-blue-500 drop-shadow-sm">Securely.</span></h2>
            </div>

            {/* Orbital Layout - Hidden on very small mobile, visible on sm and up */}
            <div className="hidden sm:flex relative w-full h-[600px] md:h-[800px] items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-[800px] flex items-center justify-center scale-[0.6] min-[800px]:scale-75 lg:scale-90 xl:scale-100">
                    {/* Center glowing sphere / Logo */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-card rounded-full border border-white/10 z-20 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10 animate-pulse" />
                        <img src="/logo.png" alt="AgentAlpha" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                    </div>

                    <OrbitRing items={ring1} radius={180} duration={40} />
                    <OrbitRing items={ring2} radius={290} duration={55} reverse />
                    <OrbitRing items={ring3} radius={400} duration={70} />
                    <OrbitRing items={ring4} radius={510} duration={85} reverse />
                </div>
            </div>

            {/* Mobile Fallback Flex Grid */}
            <div className="sm:hidden flex flex-wrap justify-center gap-3 px-4 max-w-full mx-auto z-10 relative">
                {allItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-white/10 px-3 py-1.5 shadow-sm text-sm font-medium">
                        <div className={item.color}>{item.icon}</div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
