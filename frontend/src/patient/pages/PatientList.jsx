import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../patientSlice";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  if (loading) return <p>Loading patients...</p>;

  return (
    <div>
      <h2>Patient List</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Patient Code</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td>{p.patientCode || p.patientId}</td>
              <td>{p.name}</td>
              <td>{p.mobile}</td>
              <td>{p.gender}</td>
              <td>{p.status}</td>
              <td>
                <button onClick={() => navigate(`/patients/${p.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
