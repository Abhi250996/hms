import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConsultationHeader from "../components/ConsultationHeader";
import PrescriptionForm from "../components/PrescriptionForm";
import DoctorDropdown from "../../patient/components/DoctorDropdown";
import Loader from "../../shared/components/Loader";
import { patientController } from "../../patient/controller/patient.controller";
import { fetchDoctor } from "../controller/doctor.controller";
import api from "../../core/api/axios";

const Consultation = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPatient();
  }, [patientId]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const res = await patientController.getPatient(patientId);
      setPatient(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSelect = async (doctorId) => {
    const res = await fetchDoctor(doctorId);
    setDoctor(res.data);
  };

  const saveConsultation = async (prescription) => {
    if (!doctor) {
      alert("Please select a doctor");
      return;
    }

    try {
      setSaving(true);

      await api.post("/api/opd", {
        patientId: patient.id,
        doctorId: doctor.id,
        visitDate: new Date().toISOString().split("T")[0],
        diagnosis: prescription.diagnosis,
        prescription: {
          medicines: prescription.medicines,
          advice: prescription.advice,
          followUpDate: prescription.followUpDate,
        },
      });

      navigate(`/patients/${patient.id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading consultation..." />;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <ConsultationHeader patient={patient} doctor={doctor} />

      {/* CONSULTATION BODY */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-6">
        {/* DOCTOR SELECTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Doctor
          </label>
          <DoctorDropdown onSelect={handleDoctorSelect} />
        </div>

        {/* PRESCRIPTION */}
        <PrescriptionForm onSubmit={saveConsultation} loading={saving} />
      </div>
    </div>
  );
};

export default Consultation;
