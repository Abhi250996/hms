import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DailyCollection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportsController.dailyCollection().then(setData);
  }, []);

  return (
    <div>
      <h2>Daily Collection</h2>
      {data.map((d, i) => (
        <div key={i}>
          <span>Date: {d.date}</span>
          <span> Amount: ₹{d.amount}</span>
        </div>
      ))}
    </div>
  );
}
