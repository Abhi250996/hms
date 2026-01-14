// src/patient/components/BedSelector.jsx
import { useEffect, useState } from "react";

export default function BedSelector({
  value,
  onChange,
  wardValue,
  onWardChange,
}) {
  const wards = [
    { id: "GENERAL", name: "General Ward" },
    { id: "SEMI_PRIVATE", name: "Semi-Private Ward" },
    { id: "PRIVATE", name: "Private Ward" },
    { id: "ICU", name: "ICU" },
  ];

  const [beds, setBeds] = useState([]);

  useEffect(() => {
    if (!wardValue) {
      setBeds([]);
      return;
    }

    // mock beds – replace with API later
    const generatedBeds = Array.from({ length: 10 }, (_, i) => ({
      id: `${wardValue}-B${i + 1}`,
      label: `${wardValue}-B${i + 1}`,
    }));

    setBeds(generatedBeds);
  }, [wardValue]);

  return (
    <div className="space-y-4">
      {/* Ward */}
      <div>
        <label className="block text-sm font-medium mb-1">Ward</label>
        <select
          value={wardValue || ""}
          onChange={(e) => {
            onWardChange(e.target.value);
            onChange(""); // reset bed when ward changes
          }}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select Ward</option>
          {wards.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bed */}
      {wardValue && (
        <div>
          <label className="block text-sm font-medium mb-1">Bed Number</label>
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Bed</option>
            {beds.map((b) => (
              <option key={b.id} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
