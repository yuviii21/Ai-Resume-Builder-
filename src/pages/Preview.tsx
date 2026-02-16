import { useState, useEffect } from 'react';
import ResumePreview from '../components/builder/ResumePreview';
import { sampleData, type ResumeData } from '../types/resume';
import { Printer, Copy, AlertTriangle, Check } from 'lucide-react';

export default function Preview() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [template, setTemplate] = useState<any>('classic');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('resumeBuilderData');
        const savedTemplate = localStorage.getItem('resumeBuilderTemplate');

        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse data", e);
                setResumeData(sampleData);
            }
        } else {
            setResumeData(sampleData);
        }

        if (savedTemplate) {
            setTemplate(savedTemplate);
        }
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleCopyText = () => {
        if (!resumeData) return;

        const { personalInfo, summary, experience, education, projects, skills } = resumeData;
        const sections = [];

        // Header
        sections.push(`${personalInfo.fullName.toUpperCase()}\n${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n${personalInfo.linkedin} | ${personalInfo.github}`);

        // Summary
        if (summary) sections.push(`\nSUMMARY\n${summary}`);

        // Experience
        if (experience.length > 0) {
            sections.push(`\nEXPERIENCE`);
            experience.forEach(exp => {
                sections.push(`${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`);
                exp.description.forEach(d => sections.push(`- ${d}`));
            });
        }

        // Projects
        if (projects.length > 0) {
            sections.push(`\nPROJECTS`);
            projects.forEach(proj => {
                sections.push(`${proj.name}: ${proj.description}`);
                if (proj.link) sections.push(`Link: ${proj.link}`);
                if (proj.technologies.length > 0) sections.push(`Tech: ${proj.technologies.join(', ')}`);
            });
        }

        // Education
        if (education.length > 0) {
            sections.push(`\nEDUCATION`);
            education.forEach(edu => {
                sections.push(`${edu.institution} - ${edu.degree} (${edu.startDate} - ${edu.endDate})`);
            });
        }

        // Skills
        const totalSkills = [...skills.technical, ...skills.soft, ...skills.tools];
        if (totalSkills.length > 0) {
            sections.push(`\nSKILLS`);
            if (skills.technical.length) sections.push(`Technical: ${skills.technical.join(', ')}`);
            if (skills.tools.length) sections.push(`Tools: ${skills.tools.join(', ')}`);
            if (skills.soft.length) sections.push(`Soft Skills: ${skills.soft.join(', ')}`);
        }

        navigator.clipboard.writeText(sections.join('\n'));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    if (!resumeData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    // Validation
    const isMissingName = !resumeData.personalInfo.fullName;
    const isMissingContent = resumeData.experience.length === 0 && resumeData.projects.length === 0;
    const showWarning = isMissingName || isMissingContent;

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center print:bg-white print:py-0">
            <ResumePreview data={resumeData} template={template} className="print:shadow-none print:w-full print:max-w-none print:mx-0" />

            {/* Validation Warning */}
            {showWarning && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-amber-100 border border-amber-300 text-amber-800 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce print:hidden">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium text-sm">Your resume seems incomplete. Missing {isMissingName ? 'Name' : ''} {isMissingName && isMissingContent ? '&' : ''} {isMissingContent ? 'Experience/Projects' : ''}.</span>
                </div>
            )}

            {/* Floating Actions */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 print:hidden">
                <button
                    onClick={handleCopyText}
                    className="bg-black text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
                >
                    {copySuccess ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm font-medium">{copySuccess ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
                >
                    <Printer className="w-4 h-4" />
                    <span className="text-sm font-medium">Print / Save PDF</span>
                </button>
            </div>
        </div>
    );
}
