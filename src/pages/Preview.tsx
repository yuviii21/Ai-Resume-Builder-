import ResumePreview from '../components/builder/ResumePreview';
import { sampleData } from '../types/resume';

// In a real app, this would pull from a context or global store. 
// For this skeleton, we will use sampleData so the layout is visible and verifiable.

export default function Preview() {
    // Logic to retrieve data could be added here (e.g. from localStorage if we persisted it)
    // For now, it's a static view of the component structure

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
            <ResumePreview data={sampleData} className="shadow-none" />

            <div className="fixed bottom-8 right-8">
                <p className="bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                    Print this page to save as PDF
                </p>
            </div>
        </div>
    );
}
