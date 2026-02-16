import { Check } from 'lucide-react';

export const RESUME_COLORS = [
    { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
    { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
    { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
    { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
];

interface ColorPickerProps {
    selectedColor: string;
    onSelect: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onSelect }: ColorPickerProps) {
    return (
        <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-medium text-muted-foreground">Accent Color</label>
            <div className="flex gap-3">
                {RESUME_COLORS.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => onSelect(color.value)}
                        className={`
                            w-8 h-8 rounded-full border border-border shadow-sm flex items-center justify-center transition-all
                            ${selectedColor === color.value ? 'ring-2 ring-offset-1 ring-primary scale-110' : 'hover:scale-110'}
                        `}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                    >
                        {selectedColor === color.value && <Check className="w-4 h-4 text-white" />}
                    </button>
                ))}
            </div>
        </div>
    );
}
