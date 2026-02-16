import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export type TemplateType = 'classic' | 'modern' | 'minimal';

interface ResumePreviewProps {
    data: ResumeData;
    className?: string; // Additional classes for wrapper
    template?: TemplateType;
    color?: string;
}

export default function ResumePreview({ data, className = '', template = 'classic', color = 'hsl(168, 60%, 40%)' }: ResumePreviewProps) {
    const { personalInfo, summary, experience, education, projects, skills } = data;

    // Helper to render contact icons
    const ContactItem = ({ icon: Icon, value }: { icon: any, value: string }) => (
        value ? <div className="flex items-center gap-1"><Icon className="w-3 h-3" /><span>{value}</span></div> : null
    );

    // Minimal template doesn't use icons, just text
    const ContactItemMinimal = ({ value }: { value: string }) => (
        value ? <span>{value}</span> : null
    );

    const isModern = template === 'modern';
    const isMinimal = template === 'minimal';

    return (
        <div className={`bg-white text-black font-sans shadow-2xl min-h-[1000px] w-full max-w-[800px] mx-auto ${className} ${isModern ? 'flex flex-col' : 'p-[40px]'}`}>

            {/* --- HEADER --- */}
            <header className={`
                ${isModern ? 'bg-gray-900 text-white p-8' : 'border-b-2 border-black pb-4 mb-6'}
                ${isMinimal ? 'text-center border-b-0 pb-0 mb-8' : ''}
            `}>
                <h1 className={`text-4xl font-bold uppercase tracking-tight mb-2 ${isMinimal ? 'font-serif tracking-widest' : ''}`} style={{ color: isModern ? 'white' : color }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                <div className={`
                    flex flex-wrap gap-4 text-sm 
                    ${isModern ? 'text-gray-300' : 'text-gray-700'} 
                    ${isMinimal ? 'justify-center text-xs tracking-widest uppercase text-gray-500 gap-6' : ''}
                `}>
                    {!isMinimal ? (
                        <>
                            <ContactItem icon={Mail} value={personalInfo.email} />
                            <ContactItem icon={Phone} value={personalInfo.phone} />
                            <ContactItem icon={MapPin} value={personalInfo.location} />
                            <ContactItem icon={Linkedin} value={personalInfo.linkedin} />
                            <ContactItem icon={Github} value={personalInfo.github} />
                        </>
                    ) : (
                        <>
                            <ContactItemMinimal value={personalInfo.email} />
                            <ContactItemMinimal value={personalInfo.phone} />
                            <ContactItemMinimal value={personalInfo.location} />
                            <ContactItemMinimal value={personalInfo.linkedin} />
                            <ContactItemMinimal value={personalInfo.github} />
                        </>
                    )}
                </div>
            </header>

            {/* --- CONTENT WRAPPER --- */}
            <div className={`
                ${isModern ? 'flex flex-1' : 'space-y-6'}
            `}>

                {/* MODERN LEFT SIDEBAR (Skills, Education) */}
                {isModern && (
                    <aside className="w-1/3 p-8 bg-gray-50 border-r border-gray-100 space-y-8">
                        {/* Skills */}
                        {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 border-b-2 border-gray-900 pb-1" style={{ borderColor: color, color: color }}>Skills</h2>
                                <div className="space-y-4">
                                    {skills.technical.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 mb-1">Technical</h3>
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-800">
                                                {skills.technical.map((skill, index) => (
                                                    <span key={index} className="bg-white px-2 py-1 rounded border border-gray-200 block w-full text-center">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {skills.tools.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 mb-1">Tools</h3>
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-800">
                                                {skills.tools.map((skill, index) => (
                                                    <span key={index} className="bg-white px-2 py-1 rounded border border-gray-200 block w-full text-center">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {skills.soft.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 mb-1">Soft Skills</h3>
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-800">
                                                {skills.soft.map((skill, index) => (
                                                    <span key={index} className="bg-white px-2 py-1 rounded border border-gray-200 block w-full text-center">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Education (Modern Sidebar) */}
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 border-b-2 border-gray-900 pb-1" style={{ borderColor: color, color: color }}>Education</h2>
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <h3 className="font-bold text-sm">{edu.institution}</h3>
                                            <div className="text-xs text-gray-600 mb-1">{edu.degree}</div>
                                            <span className="text-xs font-semibold block text-gray-500">{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                )}

                {/* MAIN CONTENT AREA */}
                <div className={`
                    ${isModern ? 'w-2/3 p-8 space-y-6' : 'space-y-6'}
                    ${isMinimal ? 'px-12' : ''}
                `}>

                    {/* Summary */}
                    {summary && summary.trim().length > 0 && (
                        <section className={isMinimal ? 'text-center mb-8' : ''}>
                            <h2 className={`
                                text-sm font-bold uppercase tracking-wider mb-2 
                                ${isModern ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'border-b border-gray-300'}
                                ${isMinimal ? 'border-b-0 text-xs tracking-[0.2em] text-gray-400 mb-4' : ''}
                            `} style={{ borderColor: isModern ? color : undefined, color: isModern ? color : undefined }}>Profile</h2>
                            <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h2 className={`
                                text-sm font-bold uppercase tracking-wider mb-3
                                ${isModern ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'border-b border-gray-300'}
                                ${isMinimal ? 'text-center border-b-0 text-xs tracking-[0.2em] text-gray-400 mb-6' : ''}
                            `} style={{ borderColor: isModern ? color : undefined, color: isModern ? color : undefined }}>Experience</h2>
                            <div className={`space-y-4 ${isMinimal ? 'space-y-8' : ''}`}>
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className={`flex justify-between items-baseline mb-1 ${isMinimal ? 'flex-col items-center text-center mb-2' : ''}`}>
                                            <h3 className="font-bold text-base">{exp.position}</h3>
                                            <span className="text-xs font-semibold text-gray-600">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className={`text-sm font-medium mb-1 ${isMinimal ? 'text-center text-gray-500 italic mb-2' : ''}`}>{exp.company}</div>
                                        <ul className={`list-disc leading-relaxed pl-4 text-sm text-gray-800 space-y-1 ${isMinimal ? 'list-none pl-0 text-center' : ''}`}>
                                            {exp.description.map((point, idx) => (
                                                point.trim() && <li key={idx} className={isMinimal ? 'mb-1' : ''}>{point}</li>
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
                            <h2 className={`
                                text-sm font-bold uppercase tracking-wider mb-3
                                ${isModern ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'border-b border-gray-300'}
                                ${isMinimal ? 'text-center border-b-0 text-xs tracking-[0.2em] text-gray-400 mb-6 mt-8' : ''}
                            `} style={{ borderColor: isModern ? color : undefined, color: isModern ? color : undefined }}>Projects</h2>
                            <div className={`space-y-3 ${isMinimal ? 'space-y-6' : ''}`}>
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className={`flex justify-between items-baseline mb-1 ${isMinimal ? 'flex-col items-center text-center' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-base">{proj.name}</h3>
                                                <div className="flex gap-2 print:hidden">
                                                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary"><MapPin className="w-3 h-3" /></a>} {/* Using MapPin temporarily as globe, need key */}
                                                    {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary"><Github className="w-3 h-3" /></a>}
                                                </div>
                                            </div>
                                            {(proj.link || proj.github) && (
                                                <div className="hidden print:flex gap-3 text-xs text-gray-500">
                                                    {proj.link && <span>{proj.link}</span>}
                                                    {proj.github && <span>GD: {proj.github}</span>}
                                                </div>
                                            )}
                                        </div>
                                        <p className={`text-sm mb-1 ${isMinimal ? 'text-center' : ''}`}>{proj.description}</p>
                                        {proj.technologies.length > 0 && (
                                            <p className={`text-xs text-gray-600 font-mono ${isMinimal ? 'text-center mt-1' : ''}`}>
                                                {proj.technologies.join(' • ')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education (Classic/Minimal Position) */}
                    {(!isModern && education.length > 0) && (
                        <section>
                            <h2 className={`
                                text-sm font-bold uppercase tracking-wider mb-3
                                ${isMinimal ? 'text-center border-b-0 text-xs tracking-[0.2em] text-gray-400 mb-6 mt-8' : 'border-b border-gray-300'}
                            `} style={{ borderColor: !isMinimal ? color : undefined, color: !isMinimal ? color : undefined }}>Education</h2>
                            <div className={`space-y-3 ${isMinimal ? 'text-center space-y-6' : ''}`}>
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className={`flex justify-between items-baseline mb-1 ${isMinimal ? 'flex-col items-center' : ''}`}>
                                            <h3 className="font-bold text-base">{edu.institution}</h3>
                                            <span className="text-xs font-semibold">{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                        <div className="text-sm">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (Classic/Minimal Position) */}
                    {(!isModern && (skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0)) && (
                        <section>
                            <h2 className={`
                                text-sm font-bold uppercase tracking-wider mb-3
                                ${isMinimal ? 'text-center border-b-0 text-xs tracking-[0.2em] text-gray-400 mb-6 mt-8' : 'border-b border-gray-300'}
                            `} style={{ borderColor: !isMinimal ? color : undefined, color: !isMinimal ? color : undefined }}>Skills</h2>

                            <div className={`space-y-3 ${isMinimal ? 'text-center' : ''}`}>
                                {skills.technical.length > 0 && (
                                    <div className={`flex gap-2 text-sm ${isMinimal ? 'justify-center flex-col gap-1' : ''}`}>
                                        <strong className="min-w-[100px] text-gray-700">Technical:</strong>
                                        <div className={`flex flex-wrap gap-2 ${isMinimal ? 'justify-center' : ''}`}>
                                            {skills.technical.map((s, i) => (
                                                <span key={i} className={isMinimal ? 'text-gray-600' : 'text-gray-800'}>{s}{i < skills.technical.length - 1 ? (isMinimal ? ' • ' : ',') : ''}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {skills.tools.length > 0 && (
                                    <div className={`flex gap-2 text-sm ${isMinimal ? 'justify-center flex-col gap-1' : ''}`}>
                                        <strong className="min-w-[100px] text-gray-700">Tools:</strong>
                                        <div className={`flex flex-wrap gap-2 ${isMinimal ? 'justify-center' : ''}`}>
                                            {skills.tools.map((s, i) => (
                                                <span key={i} className={isMinimal ? 'text-gray-600' : 'text-gray-800'}>{s}{i < skills.tools.length - 1 ? (isMinimal ? ' • ' : ',') : ''}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {skills.soft.length > 0 && (
                                    <div className={`flex gap-2 text-sm ${isMinimal ? 'justify-center flex-col gap-1' : ''}`}>
                                        <strong className="min-w-[100px] text-gray-700">Soft Skills:</strong>
                                        <div className={`flex flex-wrap gap-2 ${isMinimal ? 'justify-center' : ''}`}>
                                            {skills.soft.map((s, i) => (
                                                <span key={i} className={isMinimal ? 'text-gray-600' : 'text-gray-800'}>{s}{i < skills.soft.length - 1 ? (isMinimal ? ' • ' : ',') : ''}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
