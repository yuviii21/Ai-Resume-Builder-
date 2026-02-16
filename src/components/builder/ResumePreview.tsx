import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
    data: ResumeData;
    className?: string; // Additional classes for wrapper
}

export default function ResumePreview({ data, className = '' }: ResumePreviewProps) {
    const { personalInfo, summary, experience, education, projects, skills } = data;

    return (
        <div className={`bg-white text-black p-[40px] font-sans shadow-2xl min-h-[1000px] w-full max-w-[800px] mx-auto ${className}`}>
            {/* Header */}
            <header className="border-b-2 border-black pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{personalInfo.fullName || 'Your Name'}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-3 h-3" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            <span>{personalInfo.github}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Profile</h2>
                        <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Experience</h2>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.position}</h3>
                                        <span className="text-xs font-semibold">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-medium mb-1">{exp.company}</div>
                                    <ul className="list-disc leading-relaxed pl-4 text-sm text-gray-800 space-y-1">
                                        {exp.description.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{proj.name}</h3>
                                        {proj.link && <span className="text-xs text-blue-600 truncate max-w-[200px]">{proj.link}</span>}
                                    </div>
                                    <p className="text-sm mb-1">{proj.description}</p>
                                    {proj.technologies.length > 0 && (
                                        <p className="text-xs text-gray-600 font-mono">
                                            skills: {proj.technologies.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Education</h2>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{edu.institution}</h3>
                                        <span className="text-xs font-semibold">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-800">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
