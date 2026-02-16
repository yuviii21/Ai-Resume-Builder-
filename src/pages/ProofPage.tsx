import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Circle, Copy, ExternalLink, Lock } from 'lucide-react';
import { useBuildTrack } from '../context/BuildTrackContext';

export default function ProofPage() {
    const { steps } = useBuildTrack();
    const [artifacts, setArtifacts] = useState({
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    });
    const [checklist, setChecklist] = useState<boolean[]>(new Array(10).fill(false));
    const [isShipped, setIsShipped] = useState(false);
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem('rb_final_submission');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setArtifacts(parsed.artifacts || { lovableLink: '', githubLink: '', deployedLink: '' });
                if (parsed.checklist && Array.isArray(parsed.checklist)) {
                    setChecklist(parsed.checklist);
                }
            } catch (e) {
                console.error("Failed to load submission data", e);
            }
        }
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem('rb_final_submission', JSON.stringify({ artifacts, checklist }));
    }, [artifacts, checklist]);

    // Check Shipped Status
    useEffect(() => {
        // 1. All 8 build steps completed (excluding proof step itself)
        const buildSteps = steps.filter(s => !s.isProof);
        const allStepsCompleted = buildSteps.every(s => s.status === 'completed');

        // 2. All 3 links valid (basic check)
        const hasArtifacts =
            artifacts.lovableLink.length > 5 &&
            artifacts.githubLink.length > 5 &&
            artifacts.deployedLink.length > 5;

        // 3. All 10 checklist items checked
        const allChecked = checklist.every(c => c === true);

        setIsShipped(allStepsCompleted && hasArtifacts && allChecked);
    }, [steps, artifacts, checklist]);

    const handleArtifactChange = (field: keyof typeof artifacts, value: string) => {
        setArtifacts(prev => ({ ...prev, [field]: value }));
    };

    const toggleChecklist = (index: number) => {
        setChecklist(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const handleCopySubmission = () => {
        const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${artifacts.lovableLink}
GitHub Repository: ${artifacts.githubLink}
Live Deployment: ${artifacts.deployedLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;

        navigator.clipboard.writeText(text);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const verificationItems = [
        "All form sections save to localStorage",
        "Live preview updates in real-time",
        "Template switching preserves data",
        "Color theme persists after refresh",
        "ATS score calculates correctly",
        "Score updates live on edit",
        "Export buttons work (copy/download)",
        "Empty states handled gracefully",
        "Mobile responsive layout works",
        "No console errors on any page"
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 font-sans text-zinc-900 dark:text-zinc-100 pb-24">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium">
                        <ShieldCheck className={`w-4 h-4 ${isShipped ? 'text-green-500' : 'text-amber-500'}`} />
                        <span className={isShipped ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>
                            {isShipped ? 'Shipped' : 'In Progress'}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">System Verification</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Complete all build steps, provide project artifacts, and verify functionality to finalize your submission.
                    </p>
                </div>

                {isShipped && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-6 rounded-xl text-center">
                        <p className="text-lg font-medium">Project 3 Shipped Successfully.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* A) Step Completion Overview */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <div className="w-1 h-6 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                            Build Progress
                        </h2>
                        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
                            {steps.filter(s => !s.isProof).map((step) => (
                                <div key={step.id} className="p-4 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center transition-colors
                                            ${step.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' :
                                                step.status === 'active' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                                                    'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'}
                                        `}>
                                            {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                                                step.status === 'active' ? <Circle className="w-4 h-4" /> :
                                                    <Lock className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{step.title}</div>
                                            <div className="text-xs text-muted-foreground capitalize">{step.status}</div>
                                        </div>
                                    </div>
                                    {step.status === 'completed' && <div className="text-xs font-mono text-zinc-400">PASSED</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* B) Artifact Collection */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <div className="w-1 h-6 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                            Project Artifacts
                        </h2>
                        <div className="space-y-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Lovable Project Link</label>
                                <div className="relative">
                                    <ExternalLink className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="url"
                                        placeholder="https://lovable.dev/..."
                                        className="w-full pl-9 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm"
                                        value={artifacts.lovableLink}
                                        onChange={(e) => handleArtifactChange('lovableLink', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">GitHub Repository</label>
                                <div className="relative">
                                    <ExternalLink className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        className="w-full pl-9 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm"
                                        value={artifacts.githubLink}
                                        onChange={(e) => handleArtifactChange('githubLink', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Deployed URL</label>
                                <div className="relative">
                                    <ExternalLink className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full pl-9 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm"
                                        value={artifacts.deployedLink}
                                        onChange={(e) => handleArtifactChange('deployedLink', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Verification Checklist */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <div className="w-1 h-6 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                        Manual Verification
                    </h2>
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {verificationItems.map((item, idx) => (
                                <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                                    <div className="relative flex items-center pt-0.5">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 rounded text-zinc-900 focus:ring-zinc-900 transition-all checked:bg-zinc-900 checked:border-zinc-900"
                                            checked={checklist[idx]}
                                            onChange={() => toggleChecklist(idx)}
                                        />
                                    </div>
                                    <span className={`text-sm group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors ${checklist[idx] ? 'text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-500'}`}>
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Submission */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleCopySubmission}
                        className={`
                            px-8 py-4 rounded-full text-base font-semibold shadow-xl flex items-center gap-3 transition-all active:scale-95
                            ${isShipped
                                ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'
                                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600'}
                        `}
                        disabled={!isShipped}
                    >
                        {showCopySuccess ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        {showCopySuccess ? 'Copied to Clipboard!' : 'Copy Final Submission'}
                    </button>
                </div>
            </div>
        </div>
    );
}
