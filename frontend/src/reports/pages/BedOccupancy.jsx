import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function BedOccupancy() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportsController.bedOccupancy().then(setData);
  }, []);

  return (
    <div>
      <h2>Bed Occupancy</h2>
      {data.map((bed) => (
        <p key={bed.ward}>
          {bed.ward}: {bed.occupied}/{bed.total}
        </p>
      ))}
    </div>
  );
}
