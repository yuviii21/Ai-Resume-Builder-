import { StepPageLayout } from '../components/layout/StepPageLayout';

const ARTIFACT_MARKET = `Market Analysis:
- Competitors: Resume.io, Canva, Zety
- Differentiator: Real-time AI tailoring based on JD
`;

export const MarketStep = () => (
    <StepPageLayout stepId="02-market" artifactContent={ARTIFACT_MARKET}>
        <h1 className="text-2xl font-bold">Market Analysis</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            Market Research Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_ARCH = `System Architecture:
- Frontend: React + Vite + Tailwind
- Backend: Supabase / Edge Functions
- AI: OpenAI API
`;

export const ArchitectureStep = () => (
    <StepPageLayout stepId="03-architecture" artifactContent={ARTIFACT_ARCH}>
        <h1 className="text-2xl font-bold">System Architecture</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            Architecture Diagram Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_HLD = `High Level Design:
- Modules: User Auth, Profile Manager, Resume Generator, Export Service
`;

export const HLDStep = () => (
    <StepPageLayout stepId="04-hld" artifactContent={ARTIFACT_HLD}>
        <h1 className="text-2xl font-bold">High Level Design</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            HLD Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_LLD = `Low Level Design:
- Database Schema: Users, Resumes, Jobs
- API Endpoints: POST /generate, GET /resumes
`;

export const LLDStep = () => (
    <StepPageLayout stepId="05-lld" artifactContent={ARTIFACT_LLD}>
        <h1 className="text-2xl font-bold">Low Level Design</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            LLD Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_BUILD = `Build Phase:
- Setup project structure
- Implement authentication
- Create responsive layout
`;

export const BuildStep = () => (
    <StepPageLayout stepId="06-build" artifactContent={ARTIFACT_BUILD}>
        <h1 className="text-2xl font-bold">Build Phase</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            Development Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_TEST = `Testing Strategy:
- Unit Tests: Vitest
- E2E Tests: Playwright
- Manual QA
`;

export const TestStep = () => (
    <StepPageLayout stepId="07-test" artifactContent={ARTIFACT_TEST}>
        <h1 className="text-2xl font-bold">Testing</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            Testing Workspace
        </div>
    </StepPageLayout>
);

const ARTIFACT_SHIP = `Deployment Checklist:
- Environment Variables configured
- Build optimized
- Deployed to Vercel/Netlify
`;

export const ShipStep = () => (
    <StepPageLayout stepId="08-ship" artifactContent={ARTIFACT_SHIP}>
        <h1 className="text-2xl font-bold">Ship It</h1>
        <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-lg p-6 h-96 flex items-center justify-center text-zinc-500">
            Deployment Workspace
        </div>
    </StepPageLayout>
);
