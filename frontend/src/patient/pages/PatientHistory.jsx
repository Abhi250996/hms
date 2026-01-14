// src/patient/pages/PatientHistory.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patientController } from "../controller/patient.controller";
import Card from "../../shared/components/Card";
import Table from "../../shared/components/Table";
import Button from "../../shared/components/Button";
import Loader from "../../shared/components/Loader";

export default function PatientHistory() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [patientId]);

  const fetchHistory = async () => {
    try {
      const data = await patientController.getHistory(Number(patientId));
      setHistory(data);
    } catch (err) {
      alert(err.message || "Failed to load patient history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading patient history..." />;
  if (!history) return <p className="p-6">No history found</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Patient History</h2>
        <Button
          variant="secondary"
          onClick={() => navigate(`/patients/${patientId}`)}
        >
          Back to Profile
        </Button>
      </div>

      {/* OPD HISTORY */}
      <Card>
        <h3 className="text-lg font-semibold mb-3">OPD Visits</h3>

        {history.opdVisits.length === 0 ? (
          <p className="text-gray-500">No OPD visits</p>
        ) : (
          <Table
            columns={[
              { key: "visitDate", label: "Date" },
              { key: "doctorName", label: "Doctor" },
              { key: "diagnosis", label: "Diagnosis" },
              { key: "prescription", label: "Prescription" },
            ]}
            data={history.opdVisits.map((v) => ({
              ...v,
              doctorName: v.doctorName || "-",
            }))}
          />
        )}
      </Card>

      {/* IPD HISTORY */}
      <Card>
        <h3 className="text-lg font-semibold mb-3">IPD Admissions</h3>

        {history.ipdAdmissions.length === 0 ? (
          <p className="text-gray-500">No IPD admissions</p>
        ) : (
          <Table
            columns={[
              { key: "admissionDate", label: "Admission Date" },
              { key: "dischargeDate", label: "Discharge Date" },
              { key: "ward", label: "Ward" },
              { key: "bedNumber", label: "Bed" },
              { key: "status", label: "Status" },
            ]}
            data={history.ipdAdmissions.map((a) => ({
              ...a,
              dischargeDate: a.dischargeDate || "-",
            }))}
          />
        )}
      </Card>
    </div>
  );
}
