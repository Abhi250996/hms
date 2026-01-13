import { useState } from "react";
import { PharmacyController } from "../controller/pharmacy.controller";

export default function MedicineIssue({ patientId }) {
  const [data, setData] = useState({
    patientId,
    medicineId: "",
    quantity: "",
  });

  const issue = async () => {
    await PharmacyController.issueMedicine(data);
    alert("Medicine issued");
  };

  return (
    <div>
      <h2>Issue Medicine</h2>

      <input
        placeholder="Medicine ID"
        onChange={(e) => setData({ ...data, medicineId: e.target.value })}
      />
      <input
        placeholder="Quantity"
        onChange={(e) => setData({ ...data, quantity: e.target.value })}
      />

      <button onClick={issue}>Issue</button>
    </div>
  );
}
