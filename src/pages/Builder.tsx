
import { useState, useEffect } from 'react';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/builder/ResumePreview';
import { initialResumeData, type ResumeData, sampleData } from '../types/resume';
import { calculateScore } from '../lib/scoring';
import ScoreMeter from '../components/builder/ScoreMeter';
import TemplatePicker from '../components/builder/TemplatePicker';
import ColorPicker from '../components/builder/ColorPicker';
import Toast from '../components/ui/Toast';
import { Download } from 'lucide-react';

export default function Builder() {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState<any>('classic');
    const [selectedColor, setSelectedColor] = useState<string>('hsl(168, 60%, 40%)');
    const [showToast, setShowToast] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resumeBuilderData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Migration check: if skills is array, convert to object
                if (Array.isArray(parsed.skills)) {
                    parsed.skills = {
                        technical: parsed.skills,
                        soft: [],
                        tools: []
                    };
                }
                setResumeData(parsed);
            } catch (e) {
                console.error("Failed to parse saved resume data", e);
            }
        }
        const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
        if (savedTemplate) {
            setSelectedTemplate(savedTemplate);
        }
        const savedColor = localStorage.getItem('resumeBuilderColor');
        if (savedColor) {
            setSelectedColor(savedColor);
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

    // Save color
    useEffect(() => {
        localStorage.setItem('resumeBuilderColor', selectedColor);
    }, [selectedColor]);

    const handleDownload = () => {
        setShowToast(true);
    };

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
            <div className="w-full lg:w-1/2 bg-secondary/20 p-8 overflow-y-auto flex flex-col items-center gap-6 relative">

                <div className="w-full max-w-[600px] flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold mb-2">Template</h3>
                            <TemplatePicker selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <button
                                onClick={handleDownload}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>
                        </div>
                    </div>

                    <ColorPicker selectedColor={selectedColor} onSelect={setSelectedColor} />

                    {/* Score Meter - Floating or Fixed at top of preview pane */}
                    <ScoreMeter result={scoreResult} />
                </div>

                <div className="scale-[0.65] origin-top w-full max-w-[800px] shadow-2xl">
                    <ResumePreview data={resumeData} template={selectedTemplate} color={selectedColor} />
                </div>
            </div>

            <Toast
                message="PDF export ready! Check your downloads."
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
