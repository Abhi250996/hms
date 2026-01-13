import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DepartmentRevenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportsController.departmentRevenue().then(setData);
  }, []);

  return (
    <div>
      <h2>Department Revenue</h2>
      {data.map((dep) => (
        <p key={dep.department}>
          {dep.department}: ₹{dep.revenue}
        </p>
      ))}
    </div>
  );
}
