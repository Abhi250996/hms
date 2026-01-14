const Textarea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${className}`}
      />
    </div>
  );
};

export default Textarea;