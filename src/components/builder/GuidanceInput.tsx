import { useState, useEffect } from 'react';
import { checkBullet } from '../../lib/guidance';
import { Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuidanceInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
}

export default function GuidanceInput({ value, onChange, placeholder, className = '', label }: GuidanceInputProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const lines = value.split('\n');
        const allSuggestions = lines.flatMap(line => checkBullet(line));
        // Deduplicate suggestions
        setSuggestions(Array.from(new Set(allSuggestions)));
    }, [value]);

    return (
        <div className="relative group">
            {label && <label className="text-xs font-semibold uppercase tracking-wider mb-1 block text-muted-foreground">{label}</label>}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full p-3 rounded-md bg-secondary/30 border border-border/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y ${className}`}
            />

            <AnimatePresence>
                {(suggestions.length > 0 && isFocused) && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-10 left-0 right-0 -bottom-2 translate-y-full bg-yellow-50/90 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-700/30 rounded-md p-2 shadow-lg backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                            <div className="flex flex-col gap-1">
                                {suggestions.map((s, i) => (
                                    <span key={i} className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
