import React, { forwardRef, useId } from "react";

const Checkbox = forwardRef(
  (
    {
      label,
      id,
      name,
      checked = false,
      onChange,
      disabled = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const handleChange = (e) => {
      if (onChange) onChange(e.target.checked, e);
    };

    return (
      <label
        htmlFor={inputId}
        className={`flex items-center gap-2 mb-3 cursor-pointer ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
          {...rest}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  }
);

export default Checkbox;
