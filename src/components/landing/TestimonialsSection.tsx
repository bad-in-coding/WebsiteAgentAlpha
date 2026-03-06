import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "AgentAlpha completely changed how we handle customer onboarding. It essentially gave us a 10x team overnight.",
        name: "Sarah Jenkins",
        title: "VP Operations, CloudScale"
    },
    {
        quote: "The natural language routing is flawless. We replaced a 4-month enterprise integration project with a 3-minute prompt.",
        name: "Michael Chen",
        title: "CTO, FinTech Innovators"
    },
    {
        quote: "It remembers our complex compliance rules without us ever needing to hardcode anything. Absolute magic.",
        name: "Aisha Patel",
        title: "Director of Risk, HealthSecure"
    },
    {
        quote: "The visual studio lets my business analysts tweak workflows without needing to submit Jira tickets to engineering.",
        name: "David Ross",
        title: "Product Manager, OmniCommerce"
    },
    {
        quote: "We scaled our outbound sales logic globally. The native language capabilities combined with adaptive memory is unmatched.",
        name: "Elena Costa",
        title: "Head of Growth, ScaleUp Inc"
    },
    {
        quote: "Connecting to our legacy ERP system took 5 minutes securely. AgentAlpha is the missing glue for our tech stack.",
        name: "James Wilson",
        title: "Lead Architect, GlobalLogistics"
    }
];

// Duplicate for infinite scroll mapping seamlessly
const marqueeItems = [...testimonials, ...testimonials];

export function TestimonialsSection() {
    return (
        <section className="py-24 border-t border-white/5 overflow-hidden flex flex-col items-center">
            <div className="text-center mb-16 px-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Trusted by Professionals</h2>
                <p className="text-lg text-muted-foreground">See what industry leaders are saying about AgentAlpha.</p>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full max-w-[100vw] overflow-hidden flex items-center">
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 pl-6"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }}
                >
                    {marqueeItems.map((item, index) => (
                        <div
                            key={index}
                            className="w-[320px] md:w-[400px] shrink-0 p-8 rounded-2xl bg-white dark:bg-card/40 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-card/80 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="mb-6">
                                <div className="text-blue-500 mb-4 opacity-70">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                                </div>
                                <p className="text-slate-700 dark:text-foreground/90 font-medium leading-relaxed">"{item.quote}"</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
