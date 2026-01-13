import { useParams } from "react-router-dom";
import LabController from "../controller/lab.controller";

export default function SampleCollection() {
  const { id } = useParams();

  const collectSample = async () => {
    await LabController.markSampleCollected(id);
    alert("Sample marked as collected");
  };

  return (
    <div>
      <h2>Sample Collection</h2>
      <button onClick={collectSample}>Mark Sample Collected</button>
    </div>
  );
}
