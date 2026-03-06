"use client";

import { useState, useRef, useEffect } from 'react';

interface FilterProps {
  options?: string[];
  onSelect?: (option: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export default function Filter({
  options,
  onSelect,
  placeholder,
  buttonText = 'Фильтр',
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const displayText = selectedOption ? selectedOption : buttonText;

  const filterOptions = options && options.length > 0
    ? options
    : ['Нет вариантов'];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black transparent px-6 py-4 rounded-[16px] flex items-center gap-2 border-3 border-secondary"
      >
        <span>{displayText}</span>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 rounded-[16px] bg-white shadow-lg border border-secondary overflow-hidden animate-fadeIn">
          <ul className="py-1">
            {filterOptions.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-main cursor-pointer transition-colors duration-200
                  ${selectedOption === option ? 'bg-secondary font-medium text-primary' : 'text-primary'}
                  ${index !== filterOptions.length - 1 ? 'border-b border-main' : ''}
                `}
                onClick={() => options && options.length > 0 && handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}