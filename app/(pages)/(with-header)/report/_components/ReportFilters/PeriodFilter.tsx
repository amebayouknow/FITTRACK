"use client";

import { useState } from 'react';
import { PeriodType } from '@/app/index';

interface PeriodFilterProps {
  value: PeriodType;
  onChange: (value: PeriodType) => void;
}

export default function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'month', label: 'Месяц' },
    { value: 'twoMonths', label: 'Два месяца' },
    { value: 'quarter', label: 'Квартал' },
  ];

  const selectedLabel = options.find(opt => opt.value === value)?.label || options[0].label;

  return (
    <div className="relative">
      <label className="text-sm text-secondary mb-2 block">Период</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-2 border-accent rounded-2xl px-7 py-3 text-left text-primary bg-white hover:bg-accent/5 transition-all duration-300 flex items-center justify-between"
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl border-2 border-accent shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value as PeriodType);
                setIsOpen(false);
              }}
              className={`w-full px-7 py-3 text-left hover:bg-accent/10 transition-colors duration-200
                ${value === option.value ? 'bg-accent/20 text-accent font-medium' : 'text-primary'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}