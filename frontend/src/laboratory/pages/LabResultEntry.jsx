import { useParams } from "react-router-dom";
import { useState } from "react";
import { saveTestResult } from "../controller/lab.controller";

export default function LabResultEntry() {
  const { id } = useParams();
  const [result, setResult] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  const submit = async () => {
    await saveTestResult(id, {
      result,
      reportUrl,
      status: "COMPLETED",
    });
    alert("Result Saved");
  };

  return (
    <>
      <textarea
        placeholder="Result"
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />
      <input
        placeholder="Report URL"
        value={reportUrl}
        onChange={(e) => setReportUrl(e.target.value)}
      />
      <button onClick={submit}>Save</button>
    </>
  );
}
