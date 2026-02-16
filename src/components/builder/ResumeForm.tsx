import { useState } from 'react';
import type { ResumeData } from '../../types/resume';
import { Plus, Trash2, Sparkles, ChevronDown } from 'lucide-react';
import GuidanceInput from './GuidanceInput';
import TagInput from './TagInput';


interface ResumeFormProps {
    data: ResumeData;
    updateData: (newData: ResumeData) => void;
}

export default function ResumeForm({ data, updateData }: ResumeFormProps) {
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleChange = (section: keyof ResumeData, field: string, value: any) => {
        updateData({
            ...data,
            [section]: {
                //@ts-ignore
                ...data[section],
                [field]: value
            }
        });
    };

    const handleSimpleField = (field: keyof ResumeData, value: any) => {
        updateData({
            ...data,
            [field]: value
        });
    }

    // Helper to add list items (education, experience, etc.)
    const addItem = (section: keyof Pick<ResumeData, 'education' | 'experience' | 'projects'>, item: any) => {
        updateData({
            ...data,
            [section]: [...data[section], { ...item, id: crypto.randomUUID() }]
        });
    }

    // Helper to remove list items
    const removeItem = (section: keyof Pick<ResumeData, 'education' | 'experience' | 'projects'>, id: string) => {
        updateData({
            ...data,
            [section]: data[section].filter((item: any) => item.id !== id)
        });
    }


    return (
        <div className="space-y-8 pb-20">

            {/* Personal Info */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.fullName}
                        onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.email}
                        onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.phone}
                        onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location (e.g. New York, NY)"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.location}
                        onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="LinkedIn URL"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.linkedin}
                        onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="GitHub URL"
                        className="w-full p-2 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                        value={data.personalInfo.github}
                        onChange={(e) => handleChange('personalInfo', 'github', e.target.value)}
                    />
                </div>
            </section>

            {/* Summary */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full" /> Professional Summary
                </h3>
                <textarea
                    placeholder="Write a compelling summary..."
                    className="w-full p-3 min-h-[100px] rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-y"
                    value={data.summary}
                    onChange={(e) => handleSimpleField('summary', e.target.value)}
                />
            </section>

            {/* Education */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" /> Education
                    </h3>
                    <button
                        onClick={() => addItem('education', { institution: '', degree: '', startDate: '', endDate: '' })}
                        className="p-1 px-3 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={edu.id} className="p-3 bg-secondary/30 rounded border border-border/50 relative group">
                            <button
                                onClick={() => removeItem('education', edu.id)}
                                className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                <input
                                    type="text" placeholder="Institution"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={edu.institution}
                                    onChange={(e) => {
                                        const newEdu = [...data.education];
                                        newEdu[index].institution = e.target.value;
                                        handleSimpleField('education', newEdu);
                                    }}
                                />
                                <input
                                    type="text" placeholder="Degree"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={edu.degree}
                                    onChange={(e) => {
                                        const newEdu = [...data.education];
                                        newEdu[index].degree = e.target.value;
                                        handleSimpleField('education', newEdu);
                                    }}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text" placeholder="Start Date"
                                        className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                        value={edu.startDate}
                                        onChange={(e) => {
                                            const newEdu = [...data.education];
                                            newEdu[index].startDate = e.target.value;
                                            handleSimpleField('education', newEdu);
                                        }}
                                    />
                                    <input
                                        type="text" placeholder="End Date"
                                        className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                        value={edu.endDate}
                                        onChange={(e) => {
                                            const newEdu = [...data.education];
                                            newEdu[index].endDate = e.target.value;
                                            handleSimpleField('education', newEdu);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" /> Experience
                    </h3>
                    <button
                        onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', description: [''] })}
                        className="p-1 px-3 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                        <div key={exp.id} className="p-3 bg-secondary/30 rounded border border-border/50 relative group">
                            <button
                                onClick={() => removeItem('experience', exp.id)}
                                className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                <input
                                    type="text" placeholder="Company"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={exp.company}
                                    onChange={(e) => {
                                        const newExp = [...data.experience];
                                        newExp[index].company = e.target.value;
                                        handleSimpleField('experience', newExp);
                                    }}
                                />
                                <input
                                    type="text" placeholder="Position"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={exp.position}
                                    onChange={(e) => {
                                        const newExp = [...data.experience];
                                        newExp[index].position = e.target.value;
                                        handleSimpleField('experience', newExp);
                                    }}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text" placeholder="Start Date"
                                        className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                        value={exp.startDate}
                                        onChange={(e) => {
                                            const newExp = [...data.experience];
                                            newExp[index].startDate = e.target.value;
                                            handleSimpleField('experience', newExp);
                                        }}
                                    />
                                    <input
                                        type="text" placeholder="End Date"
                                        className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                        value={exp.endDate}
                                        onChange={(e) => {
                                            const newExp = [...data.experience];
                                            newExp[index].endDate = e.target.value;
                                            handleSimpleField('experience', newExp);
                                        }}
                                    />
                                </div>
                                <GuidanceInput
                                    value={exp.description[0]}
                                    onChange={(val) => {
                                        const newExp = [...data.experience];
                                        newExp[index].description = [val];
                                        handleSimpleField('experience', newExp);
                                    }}
                                    placeholder="Description (e.g. Led a team of 5 developers...)"
                                    className="md:col-span-2 h-24"
                                />         </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" /> Projects
                    </h3>
                    <button
                        onClick={() => addItem('projects', { name: 'New Project', description: '', technologies: [], link: '', github: '' })}
                        className="p-1 px-3 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                <div className="space-y-4">
                    {data.projects.map((proj, index) => (
                        <div key={proj.id} className="bg-secondary/30 rounded border border-border/50 overflow-hidden">
                            <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                                onClick={() => {
                                    // Simple toggle logic could be added here if we had local state for expanded items
                                    // For now, let's keep them all open or use a simple detail/summary approach if preferred.
                                    // But user asked for collapsible. Let's make it a controlled accordion or individual state?
                                    // Since I can't easily add local state for *each* item without a sub-component, 
                                    // I'll wrap this in a details/summary element for native behavior!
                                }}
                            >
                                <details className="w-full group" open>
                                    <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                                        <span>{proj.name || 'Untitled Project'}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent toggle
                                                    removeItem('projects', proj.id);
                                                }}
                                                className="text-destructive hover:bg-destructive/10 p-1 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                                        </div>
                                    </summary>

                                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            type="text" placeholder="Project Title"
                                            className="w-full p-2 rounded bg-background border border-border/50 text-sm md:col-span-2 font-bold"
                                            value={proj.name}
                                            onChange={(e) => {
                                                const newProj = [...data.projects];
                                                newProj[index].name = e.target.value;
                                                handleSimpleField('projects', newProj);
                                            }}
                                        />
                                        <input
                                            type="text" placeholder="Live URL (optional)"
                                            className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                            value={proj.link}
                                            onChange={(e) => {
                                                const newProj = [...data.projects];
                                                newProj[index].link = e.target.value;
                                                handleSimpleField('projects', newProj);
                                            }}
                                        />
                                        <input
                                            type="text" placeholder="GitHub URL (optional)"
                                            className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                            value={proj.github || ''}
                                            onChange={(e) => {
                                                const newProj = [...data.projects];
                                                newProj[index].github = e.target.value;
                                                handleSimpleField('projects', newProj);
                                            }}
                                        />
                                        <div className="md:col-span-2">
                                            <GuidanceInput
                                                value={proj.description}
                                                onChange={(val) => {
                                                    // Max 200 chars enforcement
                                                    if (val.length <= 200) {
                                                        const newProj = [...data.projects];
                                                        newProj[index].description = val;
                                                        handleSimpleField('projects', newProj);
                                                    }
                                                }}
                                                placeholder="Description (max 200 chars)"
                                                className="h-20"
                                            />
                                            <div className="text-xs text-right text-muted-foreground mt-1">
                                                {proj.description.length}/200
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block text-muted-foreground">Tech Stack</label>
                                            <TagInput
                                                tags={proj.technologies}
                                                onAdd={(tag) => {
                                                    const newProj = [...data.projects];
                                                    newProj[index].technologies = [...proj.technologies, tag];
                                                    handleSimpleField('projects', newProj);
                                                }}
                                                onRemove={(tag) => {
                                                    const newProj = [...data.projects];
                                                    newProj[index].technologies = proj.technologies.filter(t => t !== tag);
                                                    handleSimpleField('projects', newProj);
                                                }}
                                                placeholder="Add tech (e.g. React, Node.js)"
                                            />
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" /> Skills
                    </h3>
                    <button
                        onClick={() => {
                            setIsSuggesting(true);
                            setTimeout(() => {
                                updateData({
                                    ...data,
                                    skills: {
                                        technical: [...new Set([...data.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                                        soft: [...new Set([...data.skills.soft, "Team Leadership", "Problem Solving"])],
                                        tools: [...new Set([...data.skills.tools, "Git", "Docker", "AWS"])]
                                    }
                                });
                                setIsSuggesting(false);
                            }, 1000);
                        }}
                        disabled={isSuggesting}
                        className="px-3 py-1.5 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Sparkles className={`w-3.5 h-3.5 ${isSuggesting ? 'animate-spin' : ''}`} />
                        {isSuggesting ? 'Thinking...' : 'Suggest Skills'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-muted-foreground">Technical Skills</label>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{data.skills.technical.length}</span>
                        </div>
                        <TagInput
                            tags={data.skills.technical}
                            onAdd={(tag) => updateData({ ...data, skills: { ...data.skills, technical: [...data.skills.technical, tag] } })}
                            onRemove={(tag) => updateData({ ...data, skills: { ...data.skills, technical: data.skills.technical.filter(t => t !== tag) } })}
                            placeholder="e.g. React, Python"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-muted-foreground">Soft Skills</label>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{data.skills.soft.length}</span>
                        </div>
                        <TagInput
                            tags={data.skills.soft}
                            onAdd={(tag) => updateData({ ...data, skills: { ...data.skills, soft: [...data.skills.soft, tag] } })}
                            onRemove={(tag) => updateData({ ...data, skills: { ...data.skills, soft: data.skills.soft.filter(t => t !== tag) } })}
                            placeholder="e.g. Leadership, Communication"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-muted-foreground">Tools & Technologies</label>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{data.skills.tools.length}</span>
                        </div>
                        <TagInput
                            tags={data.skills.tools}
                            onAdd={(tag) => updateData({ ...data, skills: { ...data.skills, tools: [...data.skills.tools, tag] } })}
                            onRemove={(tag) => updateData({ ...data, skills: { ...data.skills, tools: data.skills.tools.filter(t => t !== tag) } })}
                            placeholder="e.g. VS Code, Jira"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}
