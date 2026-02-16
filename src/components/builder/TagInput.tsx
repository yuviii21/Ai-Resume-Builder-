import { useState, type KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
    placeholder?: string;
    className?: string;
}

export default function TagInput({ tags, onAdd, onRemove, placeholder = "Add tag...", className = '' }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onRemove(tags[tags.length - 1]);
        }
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onAdd(trimmed);
            setInput('');
        }
    };

    return (
        <div className={`flex flex-wrap items-center gap-2 p-2 rounded-md bg-secondary/30 border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${className}`}>
            {tags.map((tag, index) => (
                <span key={index} className="bg-background border border-border rounded-full px-2 py-1 text-sm flex items-center gap-1 animate-in fade-in zoom-in duration-200">
                    {tag}
                    <button
                        onClick={() => onRemove(tag)}
                        className="text-muted-foreground hover:text-destructive transition-colors rounded-full p-0.5"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
            <div className="flex-1 min-w-[120px] flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    className="bg-transparent border-none outline-none w-full text-sm p-1"
                />
                <button
                    onClick={addTag}
                    className={`p-1 text-primary hover:bg-primary/10 rounded-full transition-opacity ${input.trim() ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
