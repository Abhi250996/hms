import { useEffect, useState } from "react";
import { fetchLabTests, collectSample } from "../controller/lab.controller";
import { useNavigate } from "react-router-dom";

export default function LabTestList() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLabTests().then(setTests);
  }, []);

  return (
    <>
      <h3>Lab Tests</h3>
      {tests.map((t) => (
        <div key={t.id}>
          {t.testName} | {t.sampleStatus} | {t.status}
          {t.sampleStatus === "PENDING" && (
            <button onClick={() => collectSample(t.id)}>Collect</button>
          )}
          {t.status !== "COMPLETED" && (
            <button onClick={() => navigate(`/lab/result/${t.id}`)}>
              Enter Result
            </button>
          )}
        </div>
      ))}
    </>
  );
}
