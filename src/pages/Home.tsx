import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">

            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-border/50 text-sm text-muted-foreground mb-4">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span>AI-Powered Resume Builder</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    Build a Resume That <br />
                    <span className="text-primary">Gets Read.</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Create a professional, ATS-friendly resume in minutes with our premium builder.
                    Stand out from the crowd with clean, modern designs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Link
                        to="/builder"
                        className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                    >
                        Start Building
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/preview"
                        className="px-8 py-4 bg-secondary/50 text-foreground border border-border/50 rounded-xl font-medium text-lg hover:bg-secondary transition-colors"
                    >
                        View Templates
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
