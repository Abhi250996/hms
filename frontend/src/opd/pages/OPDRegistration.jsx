import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { opdController } from "../controller/opd.controller";
import { doctorController } from "../../doctor/controller/doctor.controller";

const OPDRegistration = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId,
    doctorId: "",
    diagnosis: "",
    prescription: "",
    visitDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await doctorController.getDoctors();
    setDoctors(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await opdController.createVisit(form);
    navigate(`/patients/${patientId}`);
  };

  return (
    <div>
      <h2>Create OPD Visit</h2>

      <form onSubmit={submit}>
        <label>Doctor</label>
        <select name="doctorId" required onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.department})
            </option>
          ))}
        </select>

        <label>Diagnosis</label>
        <textarea name="diagnosis" onChange={handleChange} />

        <label>Prescription</label>
        <textarea name="prescription" onChange={handleChange} />

        <button type="submit">Save OPD Visit</button>
      </form>
    </div>
  );
};

export default OPDRegistration;
