
import { useState } from 'react';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/builder/ResumePreview';
import { initialResumeData, type ResumeData, sampleData } from '../types/resume';

export default function Builder() {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

    const loadSampleData = () => {
        setResumeData(sampleData);
    };

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

            {/* Right Column - Preview */}
            <div className="w-full lg:w-1/2 bg-secondary/20 p-8 overflow-y-auto flex justify-center items-start">
                <div className="scale-75 origin-top w-full max-w-[800px]">
                    <ResumePreview data={resumeData} />
                </div>
            </div>
        </div>
    );
}
