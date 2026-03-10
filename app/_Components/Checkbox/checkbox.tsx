"use client";

import { useState } from 'react';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function Checkbox({ label, checked = false, onChange }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="flex items-center gap-2 cursor-pointer group p-2" onClick={handleClick}>
            <div className="relative flex-shrink-0">
                <div className={` w-6 h-6 border-4 rounded-sm transition-all duration-200
                    ${isChecked 
                        ? 'bg-accent border-accent' 
                        : 'bg-transparent border-secondary'
                    }
                `} />
                
                {isChecked && (
                    <svg 
                        className="absolute inset-0 w-6 h-6 p-1 text-white pointer-events-none"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
            
            {/* Текст */}
            {label && (
                <span className="text-sm text-secondary">
                    {label}
                </span>
            )}
        </div>
    );
}