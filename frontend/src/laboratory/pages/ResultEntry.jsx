import { useParams } from "react-router-dom";
import { useState } from "react";
import LabController from "../controller/lab.controller";

export default function ResultEntry() {
  const { id } = useParams();
  const [result, setResult] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  const submitResult = async () => {
    await LabController.enterResult(id, {
      result,
      reportUrl,
      status: "COMPLETED",
    });
    alert("Result submitted");
  };

  return (
    <div>
      <h2>Enter Test Result</h2>
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
      <button onClick={submitResult}>Submit</button>
    </div>
  );
}
