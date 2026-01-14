// src/ipd/pages/IPDList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ipdController } from "../controller/ipd.controller";
import Loader from "../../shared/components/Loader";
import Table from "../../shared/components/Table";

const IPDList = () => {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    setLoading(true);
    try {
      const res = await ipdController.getIpdList();
      setAdmissions(res.data || []);
    } catch (err) {
      console.error("Failed to load IPD admissions", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading IPD admissions..." />;

  const columns = [
    { header: "Patient ID", accessor: "patientId" },
    { header: "Doctor ID", accessor: "doctorId" },
    { header: "Ward", accessor: "ward" },
    { header: "Bed", accessor: "bedNumber" },
    { header: "Admission Date", accessor: "admissionDate" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status === "DISCHARGED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate(`/ipd/${row.id}`)}
          >
            View
          </button>
          {row.status !== "DISCHARGED" && (
            <button
              className="text-red-600 hover:underline"
              onClick={() => navigate(`/ipd/discharge/${row.id}`)}
            >
              Discharge
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">IPD Admissions</h2>
        <p className="text-sm text-gray-500">
          In-patient admission and ward management
        </p>
      </div>

      {admissions.length === 0 ? (
        <p className="text-gray-500">No IPD admissions found.</p>
      ) : (
        <Table columns={columns} data={admissions} />
      )}
    </div>
  );
};

export default IPDList;
