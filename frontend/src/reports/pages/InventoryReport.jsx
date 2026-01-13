import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function InventoryReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportsController.inventory().then(setData);
  }, []);

  return (
    <div>
      <h2>Inventory Report</h2>
      {data.map((item) => (
        <p key={item.name}>
          {item.name} - Stock: {item.quantity}
        </p>
      ))}
    </div>
  );
}
