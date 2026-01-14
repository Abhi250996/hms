// src/ipd/pages/DoctorRounds.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ipdRepository } from "../repository/ipd.repository";
import { fetchDoctor } from "../../doctor/controller/doctor.controller";
import Loader from "../../shared/components/Loader";
import { formatDateTime } from "../../utils/date";

const DoctorRounds = () => {
  const { id } = useParams(); // IPD admission ID

  const [admission, setAdmission] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [notes, setNotes] = useState("");
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const ipdRes = await ipdRepository.getById(id);
      const admissionData = ipdRes.data?.data || ipdRes.data;
      setAdmission(admissionData);

      const doctorRes = await fetchDoctor(admissionData.doctorId);
      setDoctor(doctorRes.data || doctorRes);

      setRounds(admissionData.rounds || []);
    } finally {
      setLoading(false);
    }
  };

  const addRound = async () => {
    if (!notes.trim()) return;

    setSaving(true);
    try {
      const newRound = {
        date: new Date().toISOString(),
        notes,
        doctorId: admission.doctorId,
      };

      const res = await ipdRepository.update(id, {
        rounds: [...rounds, newRound],
      });

      const updatedRounds = res.data?.data?.rounds || res.data?.rounds || [];
      setRounds(updatedRounds);
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading doctor rounds..." />;
  if (!admission)
    return <p className="p-6 text-red-600">IPD admission not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Doctor Rounds</h2>
        <p className="text-sm text-gray-500">
          Daily clinical notes & observations
        </p>
      </div>

      {/* ADMISSION INFO */}
      <div className="bg-white border rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Info label="Patient ID" value={admission.patientId} />
        <Info
          label="Doctor"
          value={`${doctor?.name || "-"} (${doctor?.department || "-"})`}
        />
        <Info
          label="Ward / Bed"
          value={`${admission.ward} - ${admission.bedNumber}`}
        />
      </div>

      {/* ADD ROUND */}
      <div className="bg-white border rounded-xl shadow p-6 space-y-3">
        <h3 className="font-semibold text-lg">Add Round Notes</h3>

        <textarea
          className="w-full border rounded p-3 min-h-[120px]"
          placeholder="Enter clinical notes, observations, instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={addRound}
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Round"}
          </button>
        </div>
      </div>

      {/* PREVIOUS ROUNDS */}
      <div className="bg-white border rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Previous Rounds</h3>

        {rounds.length === 0 ? (
          <p className="text-gray-500">No rounds recorded yet</p>
        ) : (
          <ul className="space-y-4">
            {rounds.map((r, idx) => (
              <li key={idx} className="border rounded-lg p-4 bg-slate-50">
                <p className="text-xs text-gray-500 mb-1">
                  {formatDateTime(r.date)}
                </p>
                <p className="text-sm text-gray-800">{r.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default DoctorRounds;
