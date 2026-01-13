import { useEffect, useState } from "react";
import LabController from "../controller/lab.controller";
import { useNavigate } from "react-router-dom";

export default function TestOrderList() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    LabController.getAllTests().then(setTests);
  }, []);

  return (
    <div>
      <h2>Lab Test Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Test</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.patientId}</td>
              <td>{t.doctorId}</td>
              <td>{t.testName}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => navigate(`/lab/tests/${t.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
