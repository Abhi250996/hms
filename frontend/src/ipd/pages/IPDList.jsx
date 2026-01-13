import { useEffect, useState } from "react";
import { getIpdList } from "../controller/ipd.controller";

export default function IPDList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getIpdList().then(setList);
  }, []);

  return (
    <div>
      <h2>IPD Admissions</h2>
      {list.map((item) => (
        <div key={item.id}>
          Patient #{item.patientId} | Bed {item.bedNumber} | {item.status}
        </div>
      ))}
    </div>
  );
}
