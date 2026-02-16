import type { ResumeData } from '../types/resume';

export interface ScoreResult {
    score: number;
    suggestions: string[];
}

export function calculateScore(data: ResumeData): ScoreResult {
    let score = 0;
    const suggestions: string[] = [];

    // 1. Name provided (+10)
    if (data.personalInfo.fullName) {
        score += 10;
    } else {
        suggestions.push("Add your full name (+10 points)");
    }

    // 2. Email provided (+10)
    if (data.personalInfo.email) {
        score += 10;
    } else {
        suggestions.push("Add a professional email (+10 points)");
    }

    // 3. Summary > 50 characters (+10)
    if (data.summary && data.summary.length > 50) {
        score += 10;
    } else {
        suggestions.push("Expand your summary (min 50 chars) (+10 points)");
    }

    // 4. At least 1 experience entry with bullets (+15)
    const hasExperience = data.experience.length > 0;
    const hasBullets = data.experience.some(exp => exp.description.length > 0 && exp.description.some(d => d.trim().length > 0));

    if (hasExperience && hasBullets) {
        score += 15;
    } else {
        suggestions.push("Add at least 1 work experience with bullet points (+15 points)");
    }

    // 5. At least 1 education entry (+10)
    if (data.education.length > 0) {
        score += 10;
    } else {
        suggestions.push("Add your education details (+10 points)");
    }

    // 6. At least 5 skills added (+10)
    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
    if (totalSkills >= 5) {
        score += 10;
    } else {
        suggestions.push(`Add more skills (current: ${totalSkills}, target: 5+) (+10 points)`);
    }

    // 7. At least 1 project added (+10)
    if (data.projects.length >= 1) {
        score += 10;
    } else {
        suggestions.push("Add at least one key project (+10 points)");
    }

    // 8. Phone provided (+5)
    if (data.personalInfo.phone) {
        score += 5;
    } else {
        suggestions.push("Include a phone number (+5 points)");
    }

    // 9. LinkedIn provided (+5)
    if (data.personalInfo.linkedin) {
        score += 5;
    } else {
        suggestions.push("Add your LinkedIn profile (+5 points)");
    }

    // 10. GitHub provided (+5)
    if (data.personalInfo.github) {
        score += 5;
    } else {
        suggestions.push("Add your GitHub profile (+5 points)");
    }

    // 11. Summary contains action verbs (+10)
    const actionVerbs = ['built', 'led', 'designed', 'improved', 'developed', 'managed', 'created', 'implemented', 'optimized', 'architected'];
    const summaryLower = data.summary.toLowerCase();
    const hasActionVerb = actionVerbs.some(verb => summaryLower.includes(verb));

    if (hasActionVerb) {
        score += 10;
    } else {
        suggestions.push("Use action verbs in summary (e.g., Led, Built, Designed) (+10 points)");
    }

    return { score: Math.min(100, score), suggestions };
}
