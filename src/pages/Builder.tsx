
import { useState, useEffect } from 'react';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/builder/ResumePreview';
import { initialResumeData, type ResumeData, sampleData } from '../types/resume';
import { calculateScore } from '../lib/scoring';
import ScoreMeter from '../components/builder/ScoreMeter';

export default function Builder() {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState<any>('classic');

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resumeBuilderData');
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse saved resume data", e);
            }
        }
        const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
        if (savedTemplate) {
            setSelectedTemplate(savedTemplate);
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        // Debounce saving slightly or just save on every change (localstorage is fast enough for this size)
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    // Save template
    useEffect(() => {
        localStorage.setItem('resumeBuilderTemplate', selectedTemplate);
    }, [selectedTemplate]);

    const loadSampleData = () => {
        setResumeData(sampleData);
    };

    const scoreResult = calculateScore(resumeData);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] overflow-hidden">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 p-6 overflow-y-auto border-r border-border/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Builder</h2>
                    <button
                        onClick={loadSampleData}
                        className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                    >
                        Load Sample Data
                    </button>
                </div>

                <ResumeForm data={resumeData} updateData={setResumeData} />
            </div>

            {/* Right Column - Preview & Score */}
            <div className="w-full lg:w-1/2 bg-secondary/20 p-8 overflow-y-auto flex flex-col items-center gap-6">

                {/* Template Selector */}
                <div className="flex p-1 bg-secondary/50 rounded-lg border border-border/50">
                    {['classic', 'modern', 'minimal'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setSelectedTemplate(t)}
                            className={`
                                px-4 py-2 text-sm font-medium rounded-md transition-all capitalize
                                ${selectedTemplate === t
                                    ? 'bg-white shadow-sm text-foreground'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'}
                            `}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Score Meter - Floating or Fixed at top of preview pane */}
                <div className="w-full max-w-[600px]">
                    <ScoreMeter result={scoreResult} />
                </div>

                <div className="scale-[0.65] origin-top w-full max-w-[800px] shadow-2xl">
                    <ResumePreview data={resumeData} template={selectedTemplate} />
                </div>
            </div>
        </div>
    );
}
