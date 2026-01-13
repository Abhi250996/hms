import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patientController } from "../controller/patient.controller";

const PatientProfile = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState({ opdVisits: [], ipdAdmissions: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    const patientRes = await patientController.getPatient(id);
    const historyRes = await patientController.getHistory(id);

    setPatient(patientRes.data);
    setHistory(historyRes.data || { opdVisits: [], ipdAdmissions: [] });
    setLoading(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!patient) return <p>Patient not found</p>;

  return (
    <div>
      <h2>Patient Profile</h2>

      {/* BASIC INFO */}
      <section>
        <h3>Basic Information</h3>
        <p>
          <b>Name:</b> {patient.name}
        </p>
        <p>
          <b>Mobile:</b> {patient.mobile}
        </p>
        <p>
          <b>Email:</b> {patient.email}
        </p>
        <p>
          <b>Gender:</b> {patient.gender}
        </p>
        <p>
          <b>DOB:</b> {patient.dob}
        </p>
        <p>
          <b>Blood Group:</b> {patient.bloodGroup}
        </p>
        <p>
          <b>Status:</b> {patient.status}
        </p>
      </section>

      {/* ADDRESS */}
      <section>
        <h3>Address</h3>
        <p>
          {patient.address?.line1}, {patient.address?.city},{" "}
          {patient.address?.state} - {patient.address?.pincode}
        </p>
      </section>

      {/* INSURANCE */}
      <section>
        <h3>Insurance</h3>
        {patient.insurance?.hasInsurance ? (
          <>
            <p>
              <b>Provider:</b> {patient.insurance.provider}
            </p>
            <p>
              <b>Policy No:</b> {patient.insurance.policyNumber}
            </p>
          </>
        ) : (
          <p>No insurance</p>
        )}
      </section>

      {/* MEDICAL */}
      <section>
        <h3>Medical Details</h3>
        <p>
          <b>Allergies:</b> {patient.medical?.allergies}
        </p>
        <p>
          <b>Chronic Diseases:</b> {patient.medical?.chronicDiseases}
        </p>
        <p>
          <b>Remarks:</b> {patient.medical?.remarks}
        </p>
      </section>

      {/* HISTORY */}
      <section>
        <h3>Visit History</h3>

        <h4>OPD Visits</h4>

        <button onClick={() => navigate(`/opd/create/${patient.id}`)}>
          + New OPD Visit
        </button>

        {history.opdVisits.length === 0 ? (
          <p>No OPD visits</p>
        ) : (
          <ul>
            {history.opdVisits.map((v) => (
              <li key={v.id}>
                {v.visitDate} — {v.diagnosis}{" "}
                <button
                  onClick={() =>
                    navigate("/ipd/admit", {
                      state: { patientId: patient.id, doctorId: v.doctorId },
                    })
                  }
                >
                  Admit to IPD
                </button>
              </li>
            ))}
          </ul>
        )}

        <h4>IPD Admissions</h4>
        {history.ipdAdmissions.length === 0 ? (
          <p>No IPD admissions</p>
        ) : (
          <ul>
            {history.ipdAdmissions.map((v, i) => (
              <li key={i}>
                {v.admissionDate} → {v.dischargeDate || "Admitted"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PatientProfile;
