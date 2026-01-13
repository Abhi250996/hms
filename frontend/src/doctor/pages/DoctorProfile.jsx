import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDoctor, editDoctor } from "../controller/doctor.controller";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctor(id).then(setDoctor);
  }, [id]);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await editDoctor(id, doctor);
    alert("Doctor updated");
  };

  if (!doctor) return null;

  return (
    <div>
      <h2>Edit Doctor</h2>

      <input name="name" value={doctor.name} onChange={handleChange} />
      <input
        name="department"
        value={doctor.department}
        onChange={handleChange}
      />
      <input
        name="specialization"
        value={doctor.specialization}
        onChange={handleChange}
      />
      <input name="mobile" value={doctor.mobile} onChange={handleChange} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
