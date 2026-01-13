import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LabController from "../controller/lab.controller";

export default function LabReport() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    LabController.getTestById(id).then(setTest);
  }, [id]);

  if (!test) return null;

  return (
    <div>
      <h2>Lab Report</h2>
      <p>
        <b>Test:</b> {test.testName}
      </p>
      <p>
        <b>Status:</b> {test.status}
      </p>
      <p>
        <b>Result:</b> {test.result}
      </p>
      {test.reportUrl && (
        <a href={test.reportUrl} target="_blank">
          View Report
        </a>
      )}
    </div>
  );
}
