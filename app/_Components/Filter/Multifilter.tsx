"use client";

import { useState, useRef, useEffect } from 'react';

interface MultiSelectFilterProps {
  options?: string[];
  onSelect?: (selected: string[]) => void;
  placeholder?: string;
  buttonText?: string;
  maxDisplay?: number;
}

export default function MultiSelectFilter({
  options = [],
  onSelect,
  placeholder,
  buttonText = 'Фильтр',
  maxDisplay = 2,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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
    let newSelected: string[];
    
    // Логика для "Все категории"
    if (option === 'Все категории') {
      // Если выбрали "Все категории", устанавливаем только его
      newSelected = ['Все категории'];
    } else {
      // Если выбрали другую категорию
      if (selectedOptions.includes(option)) {
        // Если уже выбрана - убираем
        newSelected = selectedOptions.filter(item => item !== option);
      } else {
        // Если не выбрана - добавляем, но при этом убираем "Все категории"
        newSelected = [...selectedOptions.filter(item => item !== 'Все категории'), option];
      }
    }
    
    setSelectedOptions(newSelected);
    
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selectedOptions.filter(item => item !== option);
    setSelectedOptions(newSelected);
    
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    if (onSelect) {
      onSelect([]);
    }
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return buttonText;
    }
    
    if (selectedOptions.includes('Все категории')) {
      return 'Все категории';
    }
    
    if (selectedOptions.length <= maxDisplay) {
      return selectedOptions.join(', ');
    }
    
    return `${selectedOptions.slice(0, maxDisplay).join(', ')} +${selectedOptions.length - maxDisplay}`;
  };

  const filterOptions = options.length > 0 ? options : ['Нет вариантов'];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black transparent px-6 py-4 rounded-[16px] flex items-center gap-1 border-3 border-secondary"
      >
        <div className="flex-1 text-left">
          <span className={selectedOptions.length > 0 ? 'text-primary font-medium' : 'text-primary'}>
            {getDisplayText()}
          </span>
        </div>
        
        {selectedOptions.length > 0 && !selectedOptions.includes('Все категории') && (
          <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedOptions.length}
          </span>
        )}
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {selectedOptions.length > 0 && !selectedOptions.includes('Все категории') && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <span>{option}</span>
              <button
                onClick={(e) => handleRemove(option, e)}
                className="hover:text-accent/80"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          
          <button
            onClick={clearAll}
            className="text-xs text-secondary hover:text-accent underline"
          >
            Очистить все
          </button>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-[16px] bg-white shadow-lg border border-secondary overflow-hidden animate-fadeIn">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {filterOptions.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              const isAllCategory = option === 'Все категории';
              
              return (
                <li
                  key={index}
                  className={`px-4 py-3 hover:bg-main cursor-pointer transition-colors duration-200 flex items-center gap-3
                    ${isSelected ? 'bg-accent/10 text-accent font-medium' : 'text-primary'}
                    ${index !== filterOptions.length - 1 ? 'border-b border-main' : ''}
                  `}
                  onClick={() => options.length > 0 && handleSelect(option)}
                >
                  {/* Чекбокс */}
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-accent border-accent' : 'border-secondary'}`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Название опции */}
                  <span className="flex-1">{option}</span>
                  
                  {/* Для "Все категории" показываем пояснение */}
                  {isAllCategory && selectedOptions.includes('Все категории') && (
                    <span className="text-xs text-accent">все выбраны</span>
                  )}
                </li>
              );
            })}
          </ul>
          
          {/* Кнопка очистки внизу списка */}
          {selectedOptions.length > 0 && (
            <div className="p-3 border-t border-main">
              <button
                onClick={clearAll}
                className="w-full px-3 py-2 text-sm text-accent hover:text-accent/80 transition-colors text-center"
              >
                Очистить все
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}