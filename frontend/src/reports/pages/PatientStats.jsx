import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function PatientStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    ReportsController.patientStats().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div>
      <h2>Patient Statistics</h2>
      <p>Total Patients: {data.total}</p>
      <p>OPD: {data.opd}</p>
      <p>IPD: {data.ipd}</p>
    </div>
  );
}
