import type { ResumeData } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';


interface ResumeFormProps {
    data: ResumeData;
    updateData: (newData: ResumeData) => void;
}

export default function ResumeForm({ data, updateData }: ResumeFormProps) {

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
                                <textarea
                                    placeholder="Description (bullet points not yet implemented, just text for now)"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm md:col-span-2 h-20"
                                    value={exp.description[0]} // Simplification for now
                                    onChange={(e) => {
                                        const newExp = [...data.experience];
                                        newExp[index].description = [e.target.value];
                                        handleSimpleField('experience', newExp);
                                    }}
                                />
                            </div>
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
                        onClick={() => addItem('projects', { name: '', description: '', technologies: [] })}
                        className="p-1 px-3 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                <div className="space-y-4">
                    {data.projects.map((proj, index) => (
                        <div key={proj.id} className="p-3 bg-secondary/30 rounded border border-border/50 relative group">
                            <button
                                onClick={() => removeItem('projects', proj.id)}
                                className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                <input
                                    type="text" placeholder="Project Name"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={proj.name}
                                    onChange={(e) => {
                                        const newProj = [...data.projects];
                                        newProj[index].name = e.target.value;
                                        handleSimpleField('projects', newProj);
                                    }}
                                />
                                <input
                                    type="text" placeholder="Link"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm"
                                    value={proj.link}
                                    onChange={(e) => {
                                        const newProj = [...data.projects];
                                        newProj[index].link = e.target.value;
                                        handleSimpleField('projects', newProj);
                                    }}
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm md:col-span-2 h-16"
                                    value={proj.description}
                                    onChange={(e) => {
                                        const newProj = [...data.projects];
                                        newProj[index].description = e.target.value;
                                        handleSimpleField('projects', newProj);
                                    }}
                                />
                                <input
                                    type="text" placeholder="Skills (comma separated)"
                                    className="w-full p-2 rounded bg-background border border-border/50 text-sm md:col-span-2"
                                    value={proj.technologies.join(', ')}
                                    onChange={(e) => {
                                        const newProj = [...data.projects];
                                        newProj[index].technologies = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                                        handleSimpleField('projects', newProj);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="space-y-4 p-4 border border-border/50 rounded-lg bg-card/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full" /> Skills
                </h3>
                <textarea
                    placeholder="List your skills separated by commas..."
                    className="w-full p-3 min-h-[100px] rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                    value={data.skills.join(', ')}
                    onChange={(e) => {
                        const skills = e.target.value.split(',').map(s => s.trim());
                        handleSimpleField('skills', skills);
                    }}
                />
            </section>

        </div>
    );
}
