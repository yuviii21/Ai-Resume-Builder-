import { motion } from 'framer-motion';
import type { ScoreResult } from '../../lib/scoring';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreMeterProps {
    result: ScoreResult;
}

export default function ScoreMeter({ result }: ScoreMeterProps) {
    const { score, suggestions } = result;

    // Determine color based on score
    const getColor = (s: number) => {
        if (s >= 80) return 'text-green-500 border-green-500';
        if (s >= 50) return 'text-yellow-500 border-yellow-500';
        return 'text-red-500 border-red-500';
    };

    const getBgColor = (s: number) => {
        if (s >= 80) return 'bg-green-500';
        if (s >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="p-4 bg-card border border-border/50 rounded-xl shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">ATS Readiness Score</h3>
                <div className={`text-2xl font-bold ${getColor(score)}`}>
                    {score}/100
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-4 bg-secondary rounded-full overflow-hidden mb-6">
                <motion.div
                    className={`h-full ${getBgColor(score)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Top 3 Improvements</h4>
                    <div className="space-y-2">
                        {suggestions.slice(0, 3).map((suggestion, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2 text-sm bg-secondary/30 p-2 rounded border border-border/30"
                            >
                                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{suggestion}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {suggestions.length === 0 && (
                <div className="flex items-center gap-2 text-green-600 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Great job! Your resume looks ready.</span>
                </div>
            )}
        </div>
    );
}
