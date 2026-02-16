import { useBuildTrack } from '../../context/BuildTrackContext';
import { cn } from '../../lib/utils';
import { CheckCircle, Circle, Lock } from 'lucide-react';

export const TopBar = () => {
    const { currentStep, steps } = useBuildTrack();
    const stepIndex = steps.findIndex(s => s.id === currentStep.id) + 1;
    const totalSteps = steps.filter(s => !s.isProof).length; // Exclude Proof step from count? Or include? "Step X of 8" implies 8 steps + proof. 
    // User said "/rb/proof" and "Project 3 — Step X of 8".
    // Steps are 01-08. So 8 steps. Proof is separate.

    return (
        <header className="h-14 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
                <div className="size-6 rounded bg-white/10 flex items-center justify-center text-xs">AI</div>
                <span>AI Resume Builder</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium">
                {currentStep.isProof ? (
                    <span className="text-white">Project Completion</span>
                ) : (
                    <span>Project 3 — Step <span className="text-white">{stepIndex}</span> of {totalSteps}</span>
                )}
            </div>

            <div className="flex items-center gap-2">
                <StatusBadge status={currentStep.status} />
            </div>
        </header>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        locked: "bg-zinc-800 text-zinc-400 border-zinc-700",
        active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        completed: "bg-green-500/10 text-green-400 border-green-500/20",
    };

    const icons = {
        locked: Lock,
        active: Circle,
        completed: CheckCircle,
    };

    const Icon = icons[status as keyof typeof icons] || Circle;

    return (
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", styles[status as keyof typeof styles])}>
            <Icon className="size-3.5" />
            <span className="capitalize">{status}</span>
        </div>
    );
};
