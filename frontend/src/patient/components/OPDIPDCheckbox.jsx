// src/patient/components/OPDIPDCheckbox.jsx
import Checkbox from "../../shared/components/Checkbox";

export default function OPDIPDCheckbox({
  isOPD,
  isIPD,
  onOPDChange,
  onIPDChange,
}) {
  return (
    <div className="flex gap-6 mt-4">
      <Checkbox
        label="OPD Visit"
        checked={isOPD}
        onChange={(e) => onOPDChange(e.target.checked)}
      />

      <Checkbox
        label="IPD Admission"
        checked={isIPD}
        onChange={(e) => onIPDChange(e.target.checked)}
      />
    </div>
  );
}
