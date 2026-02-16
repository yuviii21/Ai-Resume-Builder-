import React from 'react';
import { BuildPanel } from './BuildPanel';
import { useBuildTrack } from '../../context/BuildTrackContext';

interface StepPageLayoutProps {
    children: React.ReactNode;
    stepId: string;
    artifactContent: string;
    contextHeader?: React.ReactNode;
}

export const StepPageLayout = ({ children, stepId, artifactContent, contextHeader }: StepPageLayoutProps) => {
    const { steps } = useBuildTrack();
    const step = steps.find(s => s.id === stepId);
    const isCompleted = step?.status === 'completed';

    return (
        <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Workspace Area (70%) */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto border-r border-white/5 bg-zinc-950/30 scrollbar-hide">
                {contextHeader && (
                    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/5 py-3 px-8">
                        {contextHeader}
                    </div>
                )}
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-20">
                    {children}
                </div>
            </div>

            {/* Build Panel (30%) */}
            <BuildPanel stepId={stepId} artifactContent={artifactContent} isCompleted={isCompleted} />
        </div>
    );
};
