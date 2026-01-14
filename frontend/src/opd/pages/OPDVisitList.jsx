// src/opd/pages/OPDVisitList.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpdVisits } from "../opdSlice";

const OPDVisitList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { visits = [], loading, error } = useSelector((state) => state.opd);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchOpdVisits());
  }, [dispatch]);

  const filteredVisits = useMemo(() => {
    if (!search.trim()) return visits;

    const q = search.toLowerCase();
    return visits.filter(
      (v) =>
        v.patient?.name?.toLowerCase().includes(q) ||
        v.doctor?.name?.toLowerCase().includes(q)
    );
  }, [visits, search]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h1 className="text-2xl font-semibold">OPD Visits</h1>
        <input
          type="text"
          placeholder="Search patient / doctor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-72"
        />
      </div>

      {loading && <p>Loading OPD visits...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredVisits.length === 0 && (
        <p className="text-gray-500">No OPD visits found</p>
      )}

      {!loading && filteredVisits.length > 0 && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Visit Date</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Diagnosis</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{visit.visitDate}</td>
                  <td className="p-3">{visit.patient?.name || "-"}</td>
                  <td className="p-3">{visit.doctor?.name || "-"}</td>
                  <td className="p-3 truncate max-w-xs">
                    {visit.diagnosis || "-"}
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => navigate(`/patients/${visit.patientId}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Patient
                    </button>

                    <button
                      onClick={() =>
                        navigate("/ipd/admit", {
                          state: {
                            patientId: visit.patientId,
                            doctorId: visit.doctorId,
                          },
                        })
                      }
                      className="text-green-600 hover:underline"
                    >
                      Admit IPD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OPDVisitList;
