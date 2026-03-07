"use client";

interface InputFieldProps {
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  disabled?: boolean;
}

export default function InputField({ 
  hint = 'Подсказка',
  value = '',
  onChange,
  type = 'text',
  disabled = false
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`w-full border-2 border-accent rounded-2xl px-7 py-3 outline-none text-primary bg-white transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:border-accent/80'}`}
      placeholder={hint}
    />
  );
}