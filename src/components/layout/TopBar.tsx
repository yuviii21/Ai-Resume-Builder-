import { Link, useLocation } from 'react-router-dom';
import { FileText, Layout, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TopBar() {
    const location = useLocation();

    const navItems = [
        { label: 'Builder', path: '/builder', icon: FileText },
        { label: 'Preview', path: '/preview', icon: Layout },
        { label: 'Proof', path: '/proof', icon: ShieldCheck },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                        <span className="text-lg">Ai</span>
                    </div>
                    <span>ResumeBuilder</span>
                </Link>

                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                    isActive
                                        ? "bg-secondary text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
