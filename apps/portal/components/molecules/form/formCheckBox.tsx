interface FormCheckboxGroupProps {
  label: string;
  options: string[];  // e.g., ["she/her/hers", "he/him/his", "they/them/theirs"]
  value: string[];    // Selected values as array
  onChange: (selected: string[]) => void;
  required?: boolean;
}

export default function FormCheckboxGroup({ label, options, value, onChange, required }: FormCheckboxGroupProps) {
  const handleCheckboxChange = (option: string) => {
    if (value.includes(option)) {
      // Remove if already selected
      onChange(value.filter(v => v !== option));
    } else {
      // Add if not selected
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-black font-bold mb-2">
        {label} {required && <span>*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2"
            />
            <span className="text-black">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}