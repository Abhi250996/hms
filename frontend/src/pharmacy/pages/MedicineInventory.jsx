import { useEffect, useState } from "react";
import { PharmacyController } from "../controller/pharmacy.controller";

export default function MedicineInventory() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const data = await PharmacyController.getMedicines();
    setMedicines(data);
  };

  return (
    <div>
      <h2>Medicine Inventory</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.batch}</td>
              <td>{m.expiryDate}</td>
              <td>{m.quantity}</td>
              <td>{m.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
