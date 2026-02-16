import { Check } from 'lucide-react';
import type { TemplateType } from './ResumePreview';

interface TemplatePickerProps {
    selectedTemplate: TemplateType;
    onSelect: (template: TemplateType) => void;
}

export default function TemplatePicker({ selectedTemplate, onSelect }: TemplatePickerProps) {
    const templates: { id: TemplateType; label: string; previewClass: string }[] = [
        {
            id: 'classic',
            label: 'Classic',
            previewClass: 'flex flex-col gap-2 p-2 bg-white'
        },
        {
            id: 'modern',
            label: 'Modern',
            previewClass: 'flex flex-row h-full bg-white'
        },
        {
            id: 'minimal',
            label: 'Minimal',
            previewClass: 'flex flex-col gap-3 p-3 bg-white items-center text-center'
        }
    ];

    return (
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {templates.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`
                        relative group flex flex-col items-center gap-2 min-w-[120px] transition-all
                        ${selectedTemplate === t.id ? 'scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'}
                    `}
                >
                    <div className={`
                        w-[120px] h-[160px] rounded-lg border-2 overflow-hidden relative shadow-sm transition-all
                        ${selectedTemplate === t.id ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border'}
                    `}>
                        {/* Visual Representation of Layout */}
                        <div className={`w-full h-full text-[4px] text-gray-300 pointer-events-none ${t.id === 'modern' ? 'flex' : 'p-2'}`}>
                            {t.id === 'classic' && (
                                <div className="space-y-1">
                                    <div className="h-2 w-1/2 bg-gray-800 mb-2"></div>
                                    <div className="h-px w-full bg-gray-300 mb-1"></div>
                                    <div className="space-y-1">
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-3/4 bg-gray-200"></div>
                                    </div>
                                    <div className="h-px w-full bg-gray-300 my-1"></div>
                                    <div className="space-y-1">
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-5/6 bg-gray-200"></div>
                                    </div>
                                </div>
                            )}

                            {t.id === 'modern' && (
                                <>
                                    <div className="w-1/3 h-full bg-gray-100 p-1 space-y-2">
                                        <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
                                        <div className="h-1 w-full bg-gray-200 rounded-sm"></div>
                                        <div className="h-1 w-3/4 bg-gray-200 rounded-sm"></div>
                                    </div>
                                    <div className="w-2/3 h-full p-1 space-y-1">
                                        <div className="h-3 w-3/4 bg-gray-800 mb-2"></div>
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-5/6 bg-gray-200"></div>
                                    </div>
                                </>
                            )}

                            {t.id === 'minimal' && (
                                <div className="space-y-2 text-center flex flex-col items-center">
                                    <div className="h-2 w-1/2 bg-gray-800 mb-3"></div>
                                    <div className="space-y-1 w-full flex flex-col items-center">
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-3/4 bg-gray-200"></div>
                                    </div>
                                    <div className="space-y-1 w-full flex flex-col items-center pt-2">
                                        <div className="h-1 w-full bg-gray-200"></div>
                                        <div className="h-1 w-5/6 bg-gray-200"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Checkmark */}
                        {selectedTemplate === t.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                    <span className={`text-sm font-medium ${selectedTemplate === t.id ? 'text-primary' : 'text-muted-foreground'}`}>
                        {t.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
