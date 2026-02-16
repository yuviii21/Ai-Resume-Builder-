import { StepPageLayout } from '../components/layout/StepPageLayout';

const ARTIFACT = `User Context:
- Target Audience: Job Seekers in Tech
- Pain Points: formatting, keywords, ATS compatibility
- Solution: AI-powered resume builder that tailors resumes to job descriptions.
`;

export const ProblemStep = () => {
    return (
        <StepPageLayout stepId="01-problem" artifactContent={ARTIFACT}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Define the Problem</h1>
                    <p className="text-muted-foreground mt-2">
                        What specific problem are we solving? Who are we solving it for?
                    </p>
                </div>

                {/* Placeholder Workspace Content */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
                    Problem Definition Workspace
                </div>
            </div>
        </StepPageLayout>
    );
};
