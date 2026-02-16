import { useState } from 'react';
import { useBuildTrack } from '../context/BuildTrackContext';
import { CheckCircle, Circle, Lock, Copy, ExternalLink, Github, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const ProofPage = () => {
    const { steps } = useBuildTrack();
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    });
    const [copied, setCopied] = useState(false);

    // Filter out the proof step itself for the list
    const projectSteps = steps.filter(s => !s.isProof);
    const completedCount = projectSteps.filter(s => s.status === 'completed').length;
    const progress = (completedCount / projectSteps.length) * 100;

    const handleCopy = () => {
        const submission = {
            project: "AI Resume Builder",
            links,
            progress: `${completedCount}/${projectSteps.length}`,
            steps: projectSteps.map(s => ({ id: s.id, status: s.status, artifact: s.artifact }))
        };
        navigator.clipboard.writeText(JSON.stringify(submission, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-background">
            <div className="flex-1 container max-w-5xl mx-auto py-12 px-6 space-y-12">

                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Proof of Work</h1>
                    <p className="text-muted-foreground text-lg">Verify and submit your build progress.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Step Status List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Build Steps</h2>
                            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                        </div>

                        <div className="space-y-3">
                            {projectSteps.map((step, index) => (
                                <div key={step.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center size-6 rounded-full bg-white/5 text-xs font-mono text-muted-foreground">
                                            {index + 1}
                                        </span>
                                        <span className={cn("font-medium", step.status === 'locked' && "text-muted-foreground")}>
                                            {step.title}
                                        </span>
                                    </div>
                                    <StatusIcon status={step.status} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className="space-y-8 bg-zinc-900/30 p-8 rounded-xl border border-white/5">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <ExternalLink className="size-4" /> Lovable Project Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    value={links.lovable}
                                    onChange={e => setLinks({ ...links, lovable: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Github className="size-4" /> GitHub Repository
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={e => setLinks({ ...links, github: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Globe className="size-4" /> Live Deployment
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={links.deploy}
                                    onChange={e => setLinks({ ...links, deploy: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <button
                                onClick={handleCopy}
                                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={completedCount < projectSteps.length}
                            >
                                {copied ? <CheckCircle className="size-5" /> : <Copy className="size-5" />}
                                {copied ? 'Copied to Clipboard' : 'Copy Final Submission'}
                            </button>
                            {completedCount < projectSteps.length && (
                                <p className="text-xs text-center text-red-400 mt-2">Complete all steps to enable submission.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'completed') return <CheckCircle className="size-5 text-green-500" />;
    if (status === 'active') return <Circle className="size-5 text-blue-500 animate-pulse" />;
    return <Lock className="size-5 text-zinc-700" />;
};
