interface FormRadioGroupProps {
  label: string;
  options: string[];  // e.g., ["Yes", "No"]
  value: string;      // Selected value
  onChange: (selected: string) => void;
  required?: boolean;
}

export default function FormRadioGroup({ label, options, value, onChange, required }: FormRadioGroupProps) {
  return (
    <div className="mb-6">
      <label className="block text-black font-bold mb-2">
        {label} {required && <span>*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2"
            />
            <span className="text-black">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}