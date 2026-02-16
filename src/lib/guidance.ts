
export const actionVerbs = [
    'Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved',
    'Created', 'Optimized', 'Automated', 'Managed', 'Engineered',
    'Architected', 'Spearheaded', 'Orchestrated', 'Revamped', 'Streamlined',
    'Deployed', 'Integrated', 'Migrated', 'Refactored', 'Mentored'
];

export interface BulletGuidance {
    text: string;
    suggestions: string[];
}

export function checkBullet(text: string): string[] {
    const suggestions: string[] = [];
    const trimmed = text.trim();

    if (!trimmed) return [];

    // 1. Check for action verb at start
    const firstWord = trimmed.split(' ')[0];
    // Simple check: is the first word in our list (case-insensitive)?
    // Or just check if it ends with 'ed' or is in a list.
    // The prompt gave specific verbs.
    const isActionVerb = actionVerbs.some(v => v.toLowerCase() === firstWord.toLowerCase());

    // Also check for past tense 'ed' as a fallback if not in list, but prompt said "simple check for common verbs".
    // Let's stick to the list and maybe loose check.
    if (!isActionVerb) {
        suggestions.push("Start with a strong action verb (e.g. Built, Led, Optimized).");
    }

    // 2. Check for numeric indicator
    // Let's be a bit more robust: looks for digits, %, or "$".
    const robustHasNumber = /[\d%$]/.test(trimmed);

    if (!robustHasNumber) {
        suggestions.push("Add measurable impact (numbers, %, $).");
    }

    return suggestions;
}

export function analyzeSection(text: string | string[]): BulletGuidance[] {
    const lines = Array.isArray(text) ? text : text.split('\n');
    return lines.map(line => ({
        text: line,
        suggestions: checkBullet(line)
    })).filter(g => g.suggestions.length > 0);
}
