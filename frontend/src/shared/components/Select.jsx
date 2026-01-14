import React, { forwardRef, useId } from "react";

const Select = forwardRef(
	({ label, id, name, value, onChange, options = [], required = false, className = "", error, ...rest }, ref) => {
		const generatedId = useId();
		const selectId = id || generatedId;

		return (
			<div className="mb-4">
				{label && (
					<label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
						{label} {required && <span className="text-red-500">*</span>}
					</label>
				)}
				<select
					id={selectId}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					ref={ref}
					className={`w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
					aria-invalid={error ? "true" : undefined}
					{...rest}
				>
					<option value="">Select</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
				{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
			</div>
		);
	})
;

export default Select;

