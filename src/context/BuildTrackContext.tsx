import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type StepStatus = 'locked' | 'active' | 'completed';

export interface Step {
    id: string;
    route: string;
    title: string;
    status: StepStatus;
    artifact?: string;
    isProof?: boolean;
}

interface BuildTrackContextType {
    steps: Step[];
    currentStep: Step;
    completeStep: (artifactId: string, content: string) => void;
    canAccessStep: (stepId: string) => boolean;
}

const STEPS: Step[] = [
    { id: '01-problem', route: '/rb/01-problem', title: 'Problem', status: 'active' },
    { id: '02-market', route: '/rb/02-market', title: 'Market', status: 'locked' },
    { id: '03-architecture', route: '/rb/03-architecture', title: 'Architecture', status: 'locked' },
    { id: '04-hld', route: '/rb/04-hld', title: 'High Level Design', status: 'locked' },
    { id: '05-lld', route: '/rb/05-lld', title: 'Low Level Design', status: 'locked' },
    { id: '06-build', route: '/rb/06-build', title: 'Build', status: 'locked' },
    { id: '07-test', route: '/rb/07-test', title: 'Test', status: 'locked' },
    { id: '08-ship', route: '/rb/08-ship', title: 'Ship', status: 'locked' },
    { id: 'proof', route: '/rb/proof', title: 'Proof', status: 'locked', isProof: true },
];

const BuildTrackContext = createContext<BuildTrackContextType | undefined>(undefined);

export const BuildTrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [steps, setSteps] = useState<Step[]>(STEPS);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    const currentStep = steps.find(s => s.route === currentPath) || steps[0];

    useEffect(() => {
        // Basic route protection
        if (currentStep.status === 'locked') {
            const firstActive = steps.find(s => s.status === 'active');
            if (firstActive && firstActive.id !== currentStep.id) {
                navigate(firstActive.route, { replace: true });
            }
        }
    }, [currentPath, currentStep, steps, navigate]);


    const completeStep = (_artifactId: string, content: string) => {
        setSteps(prev => {
            const newSteps = [...prev];
            const index = newSteps.findIndex(s => s.id === currentStep.id);

            if (index === -1) return prev;

            newSteps[index] = {
                ...newSteps[index],
                status: 'completed',
                artifact: content
            };

            // Unlock next step
            if (index + 1 < newSteps.length) {
                newSteps[index + 1] = {
                    ...newSteps[index + 1],
                    status: 'active' // or keep completed if already completed
                };
                // If the next step was locked, make it active. If it was already completed, leave it.
                if (prev[index + 1].status === 'locked') {
                    newSteps[index + 1].status = 'active';
                }
            }
            return newSteps;
        });
    };

    const canAccessStep = (stepId: string) => {
        const step = steps.find(s => s.id === stepId);
        return step ? step.status !== 'locked' : false;
    };

    return (
        <BuildTrackContext.Provider value={{
            steps,
            currentStep,
            completeStep,
            canAccessStep
        }}>
            {children}
        </BuildTrackContext.Provider>
    );
};

export const useBuildTrack = () => {
    const context = useContext(BuildTrackContext);
    if (context === undefined) {
        throw new Error('useBuildTrack must be used within a BuildTrackProvider');
    }
    return context;
};
