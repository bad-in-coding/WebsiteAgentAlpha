import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PowerUserHandoff() {
    return (
        <section className="py-24 px-6 w-full bg-slate-50 dark:bg-slate-900 border-y border-border">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4">FOR POWER USERS</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Want more control?</h2>
                <p className="text-lg text-muted-foreground/90 leading-relaxed mb-10">
                    Build custom automation flows from scratch with our visual workflow builder. Prompt once, automate forever.
                </p>
                <Link to="/builder" className="group">
                    <Button variant="outline" className="h-14 px-8 text-base border-foreground/20 hover:bg-foreground hover:text-background rounded-full transition-all duration-300">
                        Explore custom flows <span className="ml-2 group-hover:translate-x-1 transition-transform">-&gt;</span>
                    </Button>
                </Link>
            </div>
        </section>
    );
}
