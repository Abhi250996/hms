// src/patient/pages/PatientRegistration.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../patientSlice";
import PatientForm from "../components/PatientForm";

const PatientRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // FIX: Fixed selector to prevent unnecessary re-renders
  const patientState = useSelector((state) => state.patient);
  const loading = patientState?.loading || false;
  const error = patientState?.error || null;

  const handleSubmit = async (formData) => {
    // 1. Flatten the complex nested object for the Backend Service
    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      gender: formData.gender,
      dob: formData.dob, // Ensure this is captured from the updated form
      email: formData.email,
      bloodGroup: formData.bloodGroup,
      // Concatenate address for the single 'address' column in DB
      address: `${formData.address.line1}${formData.address.city ? ', ' + formData.address.city : ''}`,
      emergencyContact: formData.emergencyContact.mobile || ""
    };

    // 2. Final Validation check
    if (!payload.name || !payload.mobile || !payload.gender || !payload.dob) {
      alert("Validation failed: Please ensure Name, Mobile, Gender, and Date of Birth are filled.");
      console.log("Missing fields in:", payload);
      return;
    }

    try {
      await dispatch(createPatient(payload)).unwrap();
      navigate("/patients");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Patient Registration</h2>
        <p className="text-sm text-gray-500">Enter personal and medical details to create a new record.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <PatientForm onSubmit={handleSubmit} submitting={loading} />
    </div>
  );
};

export default PatientRegistration;