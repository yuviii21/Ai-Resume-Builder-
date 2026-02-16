import { useState } from 'react';
import { useBuildTrack } from '../../context/BuildTrackContext';
import { Check, Copy, ExternalLink, AlertCircle, ImagePlus } from 'lucide-react';

interface BuildPanelProps {
    stepId: string;
    artifactContent: string;
    isCompleted?: boolean;
}

export const BuildPanel = ({ stepId, artifactContent, isCompleted }: BuildPanelProps) => {
    const { completeStep } = useBuildTrack();
    const [copied, setCopied] = useState(false);
    const [_status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleCopy = () => {
        navigator.clipboard.writeText(artifactContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSuccess = () => {
        setStatus('success');
        completeStep(stepId, 'Verified');
    };

    return (
        <aside className="w-[30%] h-[calc(100vh-3.5rem)] sticky top-14 border-l border-white/10 bg-black/20 backdrop-blur-sm p-6 flex flex-col gap-6">
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Build Instructions</h3>
                <p className="text-xs text-muted-foreground">Copy the prompt below and paste into Lovable.</p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-4">
                <div className="relative flex-1 bg-zinc-900/50 rounded-lg border border-white/5 overflow-hidden group">
                    <textarea
                        readOnly
                        value={artifactContent}
                        className="w-full h-full bg-transparent p-4 text-sm text-zinc-300 resize-none focus:outline-none font-mono"
                        spellCheck={false}
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-all opacity-0 group-hover:opacity-100"
                    >
                        {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
                    </button>
                </div>

                <a
                    href="https://lovable.dev/project/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                >
                    Build in Lovable <ExternalLink className="size-4" />
                </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
                <h4 className="text-xs font-medium text-white/40 uppercase">Validation</h4>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={handleSuccess}
                        disabled={isCompleted}
                        className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border transition-all ${isCompleted ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-zinc-900 border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}
                    >
                        <Check className="size-4" />
                        <span className="text-[10px]">It Worked</span>
                    </button>

                    <button
                        onClick={() => setStatus('error')}
                        className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                        <AlertCircle className="size-4" />
                        <span className="text-[10px]">Error</span>
                    </button>

                    <button
                        className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-colors"
                    >
                        <ImagePlus className="size-4" />
                        <span className="text-[10px]">Screenshot</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
