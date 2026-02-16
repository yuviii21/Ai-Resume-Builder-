import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsRendered(true);
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsRendered(false), 300); // Wait for exit animation
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isRendered) return null;

    return createPortal(
        <div className={`
            fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
            <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="flex-1 text-sm font-medium">{message}</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>,
        document.body
    );
}
