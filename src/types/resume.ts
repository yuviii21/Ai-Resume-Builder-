export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        linkedin: string;
        github: string;
    };
    summary: string;
    education: {
        id: string;
        institution: string;
        degree: string;
        startDate: string;
        endDate: string;
        gpa?: string;
    }[];
    experience: {
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string[]; // Bullet points
    }[];
    projects: {
        id: string;
        name: string;
        description: string;
        technologies: string[];
        link?: string;
    }[];
    skills: string[];
}

export const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
};

export const sampleData: ResumeData = {
    personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        website: 'alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan',
    },
    summary: 'Creative and detail-oriented Frontend Developer with 4 years of experience building responsive and interactive web applications. Proficient in React, TypeScript, and modern CSS frameworks.',
    education: [
        {
            id: '1',
            institution: 'University of California, Berkeley',
            degree: 'B.S. Computer Science',
            startDate: '2016',
            endDate: '2020',
        }
    ],
    experience: [
        {
            id: '1',
            company: 'Tech Solutions Inc.',
            position: 'Senior Frontend Developer',
            startDate: '2022',
            endDate: 'Present',
            description: ['Led the redesign of the main product dashboard, improving user engagement by 30%.', 'Mentored junior developers and established code quality standards.'],
        },
        {
            id: '2',
            company: 'WebFlow Agency',
            position: 'Junior Developer',
            startDate: '2020',
            endDate: '2022',
            description: ['Collaborated with designers to implement pixel-perfect user interfaces.', 'Optimized website performance, achieving a 98/100 Lighthouse score.'],
        }
    ],
    projects: [
        {
            id: '1',
            name: 'TaskMaster AI',
            description: 'A productivity application that uses AI to categorize and prioritize tasks automatically.',
            technologies: ['React', 'Node.js', 'OpenAI API'],
            link: 'taskmaster.ai'
        }
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Figma', 'Git']
};
