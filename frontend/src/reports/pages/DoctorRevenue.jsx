import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DoctorRevenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportsController.doctorRevenue().then(setData);
  }, []);

  return (
    <div>
      <h2>Doctor Revenue</h2>
      {data.map((doc) => (
        <div key={doc.doctorId}>
          <p>
            {doc.doctorName} - ₹{doc.revenue}
          </p>
        </div>
      ))}
    </div>
  );
}
