import { dischargeIpd } from "../controller/ipd.controller";
import { useParams } from "react-router-dom";

export default function DischargeSummary() {
  const { id } = useParams();

  const discharge = async () => {
    await dischargeIpd(id, {
      dischargeDate: new Date().toISOString().split("T")[0],
      status: "DISCHARGED",
    });
    alert("Patient Discharged");
  };

  return <button onClick={discharge}>Discharge Patient</button>;
}
