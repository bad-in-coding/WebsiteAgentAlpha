
import { Link } from 'react-router-dom';
import { Bot, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background/50 backdrop-blur-md mt-auto z-10 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-foreground" />
                    <span className="font-semibold text-foreground">Agent Alpha Inc.</span>
                </div>

                <div className="flex gap-8 text-sm font-medium text-muted-foreground">
                    <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
                    <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
                    <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
                </div>

                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-foreground text-muted-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-muted-foreground/60">
                <p>© {new Date().getFullYear()} Agent Alpha Inc. All rights reserved.</p>
            </div>
        </footer>
    );
}
