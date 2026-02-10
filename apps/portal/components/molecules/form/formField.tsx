interface FormFieldProps {
  label: string;        // Required: "Program", "Company", etc.
  value: string;        // Required: current input value
  onChange: (value: string) => void;  // Required: function to update value
  placeholder?: string; // Optional: hint text
  type?: string;        // Optional: "text", "number", etc.
  multiline?: boolean;  // Optional: true = textarea, false = input
  rows?: number;        // Optional: how many rows for textarea
  required? :boolean;
}

export default function FormField({
    label, 
    value, 
    onChange, 
    placeholder, 
    type = "text", 
    multiline, 
    rows,
    required = false 
}: FormFieldProps) {
  return (
    <div>
      {/* 3. The label (uses the label prop) */}
      <label className="block text-black font-medium mb-2">
        {label} {required && <span className="text-black">*</span>}
      </label>

      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full px-3 py-3 border border-black bg-white text-black focus:outline-none focus:border-black"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-3 border border-black bg-white text-black focus:outline-none focus:border-black"
        />
      )}
    </div>
  );
}