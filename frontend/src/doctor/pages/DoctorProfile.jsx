// src/doctor/pages/DoctorProfile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDoctor, editDoctor } from "../controller/doctor.controller";
import { DoctorModel } from "../model/doctor.model";
import Loader from "../../shared/components/Loader";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(DoctorModel);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDoctor();
  }, [id]);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctor(id);
      setDoctor(data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSaving(true);
    await editDoctor(id, {
      name: doctor.name,
      department: doctor.department,
      specialization: doctor.specialization,
      mobile: doctor.mobile,
    });
    setSaving(false);
    setEditing(false);
    loadDoctor();
  };

  if (loading) return <Loader label="Loading doctor profile..." />;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Profile</h1>
        <button
          onClick={() => navigate("/doctors")}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Doctor ID">
            <input
              className="input bg-gray-100"
              value={doctor.doctorId}
              disabled
            />
          </Field>

          <Field label="Name">
            <input
              name="name"
              className="input"
              value={doctor.name}
              disabled={!editing}
              onChange={handleChange}
            />
          </Field>

          <Field label="Department">
            <input
              name="department"
              className="input"
              value={doctor.department}
              disabled={!editing}
              onChange={handleChange}
            />
          </Field>

          <Field label="Specialization">
            <input
              name="specialization"
              className="input"
              value={doctor.specialization}
              disabled={!editing}
              onChange={handleChange}
            />
          </Field>

          <Field label="Mobile">
            <input
              name="mobile"
              className="input"
              value={doctor.mobile}
              disabled={!editing}
              onChange={handleChange}
            />
          </Field>

          <Field label="Email">
            <input
              className="input bg-gray-100"
              value={doctor.email}
              disabled
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default DoctorProfile;
