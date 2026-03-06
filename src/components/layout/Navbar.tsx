import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <>
            <header className="w-full border-b border-white/5 bg-background/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
                    <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity z-10">
                        <div className="flex items-center gap-3">
                            <img
                                src="logo.png"
                                alt="AgentAlpha Logo"
                                className="h-10 w-auto object-contain drop-shadow-md"
                            />
                        </div>
                    </Link>

                    {/* Desktop Center Links */}
                    <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium absolute left-0 right-0">
                        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Demos</Link>
                        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
                    </nav>

                    {/* Right Side Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-4 z-10">
                        <Button variant="outline" className="border-border text-foreground rounded-full h-10 px-5 transition-colors">
                            Join Waitlist
                        </Button>
                        <Link to="/consult">
                            <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-full h-10 px-6 transition-all shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] hover:-translate-y-0.5">
                                Try Discovery Avatar
                            </Button>
                        </Link>
                        <div className="pl-4 border-l border-white/10 flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Right Side (Hamburger + Theme Toggle) */}
                    <div className="flex md:hidden items-center gap-4 z-10">
                        <ThemeToggle />
                        <button
                            className="p-2 text-foreground focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-5 shadow-2xl absolute left-0 right-0 top-20">
                        <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Demos</Link>
                        <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Pricing</Link>
                        <Link to="/" className="text-muted-foreground hover:text-foreground font-medium text-lg">Learn</Link>
                        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                            <Button variant="outline" className="w-full border-border text-foreground rounded-full h-12 text-base justify-center">
                                Join Waitlist
                            </Button>
                            <Link to="/consult" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full h-12 text-base transition-all shadow-lg hover:shadow-purple-500/50 justify-center">
                                    Try Discovery Avatar
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
