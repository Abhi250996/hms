import { useEffect, useState } from "react";
import { fetchDoctors, removeDoctor } from "../controller/doctor.controller";
import { useNavigate } from "react-router-dom";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const loadDoctors = async () => {
    const data = await fetchDoctors();
    setDoctors(data);
  };

  const handleDelete = async (id) => {
    await removeDoctor(id);
    loadDoctors();
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <button onClick={() => navigate("/doctors/new")}>Add Doctor</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.department}</td>
              <td>{d.specialization}</td>
              <td>{d.mobile}</td>
              <td>
                <button onClick={() => navigate(`/doctors/${d.id}`)}>
                  View
                </button>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
