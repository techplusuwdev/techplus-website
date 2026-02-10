'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FormSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function FormSelect({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = "Select...", 
  required 
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);  // Close dropdown after selection
  };

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <label className="block text-black font-bold mb-2">
        {label} {required && <span>*</span>}
      </label>
      
      {/* Dropdown button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-3 border border-black bg-white text-black cursor-pointer flex justify-between items-center"
      >
        <span className={value ? 'text-black' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path fill="black" d="M6 9L1 4h10z"/>
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 bg-white border border-black max-h-60 overflow-y-scroll pr-1">
          <div className="relative">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-3 py-3 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-200 last:border-b-0"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
