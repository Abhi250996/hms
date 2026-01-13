import { useState } from "react";
import { useLocation } from "react-router-dom";
import { orderLabTest } from "../controller/lab.controller";

export default function LabOrderFromIPD() {
  const { state } = useLocation();
  const [testName, setTestName] = useState("");

  const submit = async () => {
    await orderLabTest({
      patientId: state.patientId,
      doctorId: state.doctorId,
      testName,
    });
    alert("Lab Test Created");
  };

  return (
    <>
      <h3>Order Lab Test</h3>
      <input
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Test Name"
      />
      <button onClick={submit}>Create</button>
    </>
  );
}
