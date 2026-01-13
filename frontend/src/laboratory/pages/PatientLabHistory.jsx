import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LabController from "../controller/lab.controller";

export default function PatientLabHistory() {
  const { patientId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    LabController.getPatientHistory(patientId).then(setHistory);
  }, [patientId]);

  return (
    <div>
      <h2>Patient Lab History</h2>
      <ul>
        {history.map((t) => (
          <li key={t.id}>
            {t.testName} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
