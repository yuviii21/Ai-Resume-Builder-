import { ShieldCheck } from 'lucide-react';

export default function ProofPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Verification Artifacts</h1>
            <p className="text-muted-foreground max-w-md">
                This page will contain proof of work and other verification artifacts.
            </p>
        </div>
    );
}
