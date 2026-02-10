import React from 'react';

interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#76a36d] ${className}`}
    />
  );
}
