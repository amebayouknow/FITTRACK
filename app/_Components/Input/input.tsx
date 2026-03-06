"use client";

import { useState } from 'react';

interface InputFieldProps {
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'password';
}

export default function InputField({ 
  hint = 'Подсказка',
  value = '',
  onChange,
  type = 'text',
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type={type}
      value={inputValue}
      onChange={handleChange}
      className="border-2 border-accent rounded-[15px] 
                 px-7 py-3 outline-none text-secondary"
      placeholder={hint}
    />
  );
}