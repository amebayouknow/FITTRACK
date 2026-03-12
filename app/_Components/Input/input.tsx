"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hint?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ hint = "Подсказка", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={hint}
        className={`w-full border-2 border-accent rounded-2xl px-7 py-3 
        outline-none text-primary bg-white transition-all duration-300
        hover:border-accent/80 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
        {...props}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;