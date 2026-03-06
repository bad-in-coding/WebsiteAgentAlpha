import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function ActionDemoSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16">See Alpha in action</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="group relative rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-xl aspect-[16/10] flex items-center justify-center shadow-lg transition-all hover:border-white/20">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-20 w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:border-white/40 group-hover:bg-foreground/20 transition-all duration-300">
                        <Play className="w-8 h-8 text-foreground fill-current ml-2" />
                    </motion.button>
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                        <h3 className="text-2xl font-bold text-foreground">Voice to Execution</h3>
                        <p className="text-muted-foreground mt-2 text-lg">Watch Alpha build a workflow from a voice prompt</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="group relative rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-xl aspect-[16/10] flex items-center justify-center shadow-lg transition-all hover:border-white/20">
                    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-500" />
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-20 w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:border-white/40 group-hover:bg-foreground/20 transition-all duration-300">
                        <Play className="w-8 h-8 text-foreground fill-current ml-2" />
                    </motion.button>
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                        <h3 className="text-2xl font-bold text-foreground">The Visual Studio</h3>
                        <p className="text-muted-foreground mt-2 text-lg">Deep dive into the orchestration canvas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
