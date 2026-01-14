// src/patient/pages/PatientProfile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patientController } from "../controller/patient.controller";

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState({
    opdVisits: [],
    ipdAdmissions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const patientData = await patientController.getPatient(id);
      const historyData = await patientController.getHistory(id);

      setPatient(patientData);
      setHistory(historyData || { opdVisits: [], ipdAdmissions: [] });
    } catch (err) {
      console.error(err);
      alert("Failed to load patient profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!patient) return <p className="p-6">Patient not found</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Patient Profile</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* BASIC INFO */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <h3 className="font-semibold text-lg">Basic Information</h3>
        <p>
          <b>Patient Code:</b> {patient.patientCode || patient.patientId}
        </p>
        <p>
          <b>Name:</b> {patient.name}
        </p>
        <p>
          <b>Father Name:</b> {patient.fatherName}
        </p>
        <p>
          <b>Mobile:</b> {patient.mobile}
        </p>
        <p>
          <b>Alternate Mobile:</b> {patient.alternateMobile || "-"}
        </p>
        <p>
          <b>Email:</b> {patient.email || "-"}
        </p>
        <p>
          <b>Gender:</b> {patient.gender}
        </p>
        <p>
          <b>DOB:</b> {patient.dob}
        </p>
        <p>
          <b>Age:</b> {patient.age}
        </p>
        <p>
          <b>Blood Group:</b> {patient.bloodGroup || "-"}
        </p>
        <p>
          <b>Status:</b>{" "}
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
            {patient.status}
          </span>
        </p>
      </div>

      {/* ADDRESS */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Address</h3>
        {patient.address ? (
          <p className="text-sm text-gray-700">
            {patient.address.line1}, {patient.address.line2},{" "}
            {patient.address.city}, {patient.address.state} -{" "}
            {patient.address.pincode}
          </p>
        ) : (
          <p className="text-gray-500">No address available</p>
        )}
      </div>

      {/* INSURANCE */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Insurance</h3>
        {patient.insurance?.hasInsurance ? (
          <div className="text-sm space-y-1">
            <p>
              <b>Provider:</b> {patient.insurance.provider}
            </p>
            <p>
              <b>Policy No:</b> {patient.insurance.policyNumber}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No insurance</p>
        )}
      </div>

      {/* MEDICAL */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Medical Details</h3>
        <p>
          <b>Allergies:</b> {patient.medical?.allergies || "-"}
        </p>
        <p>
          <b>Chronic Diseases:</b> {patient.medical?.chronicDiseases || "-"}
        </p>
        <p>
          <b>Remarks:</b> {patient.medical?.remarks || "-"}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/opd/create/${patient.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create OPD Visit
        </button>
        <button
          onClick={() => navigate(`/patients/${patient.id}/documents`)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Upload Documents
        </button>
      </div>

      {/* HISTORY */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <h3 className="font-semibold text-lg">Visit History</h3>

        {/* OPD */}
        <div>
          <h4 className="font-medium mb-2">OPD Visits</h4>
          {history.opdVisits.length === 0 ? (
            <p className="text-gray-500">No OPD visits</p>
          ) : (
            <ul className="space-y-2">
              {history.opdVisits.map((v) => (
                <li
                  key={v.id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div className="text-sm">
                    <p>
                      <b>Date:</b> {v.visitDate}
                    </p>
                    <p>
                      <b>Diagnosis:</b> {v.diagnosis}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/ipd/admit", {
                        state: {
                          patientId: patient.id,
                          doctorId: v.doctorId,
                        },
                      })
                    }
                    className="text-green-600 hover:underline text-sm"
                  >
                    Admit to IPD
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* IPD */}
        <div>
          <h4 className="font-medium mb-2">IPD Admissions</h4>
          {history.ipdAdmissions.length === 0 ? (
            <p className="text-gray-500">No IPD admissions</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {history.ipdAdmissions.map((v) => (
                <li key={v.id} className="border rounded p-3">
                  {v.admissionDate} → {v.dischargeDate || "Admitted"} (
                  {v.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
