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
        if (s >= 71) return 'text-green-500';
        if (s >= 41) return 'text-amber-500';
        return 'text-red-500';
    };

    const getStrokeColor = (s: number) => {
        if (s >= 71) return '#22c55e'; // green-500
        if (s >= 41) return '#f59e0b'; // amber-500
        return '#ef4444'; // red-500
    };

    const getLevelText = (s: number) => {
        if (s >= 71) return 'Strong Resume';
        if (s >= 41) return 'Getting There';
        return 'Needs Work';
    };

    // Circular Progress Props
    const radius = 30;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-card border border-border/50 rounded-xl shadow-sm p-5 w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg">ATS Score</h3>
                    <p className={`text-sm font-medium ${getColor(score)}`}>
                        {getLevelText(score)}
                    </p>
                </div>

                {/* Circular Progress */}
                <div className="relative flex items-center justify-center w-20 h-20">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
                    >
                        <circle
                            stroke="#e5e7eb"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <motion.circle
                            stroke={getStrokeColor(score)}
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getColor(score)}`}>
                        {score}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="space-y-3 border-t border-border/40 pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Improvements</h4>
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                        {suggestions.map((suggestion, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-2 text-sm bg-secondary/30 p-2 rounded border border-border/30"
                            >
                                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{suggestion}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {suggestions.length === 0 && (
                <div className="flex items-center gap-3 text-green-600 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Perfect! Your resume is ready for ATS.</span>
                </div>
            )}
        </div>
    );
}
