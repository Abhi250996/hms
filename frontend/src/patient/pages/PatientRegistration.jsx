// src/patient/pages/PatientRegistration.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../patientSlice";
import PatientForm from "../components/PatientForm";

const PatientRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.patient || {});

  const handleSubmit = (data) => {
    dispatch(createPatient(data)).then((res) => {
      if (!res?.error) {
        navigate("/patients");
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Patient Registration</h2>

      <div className="bg-white shadow rounded p-6">
        <PatientForm onSubmit={handleSubmit} submitting={loading} />
      </div>
    </div>
  );
};

export default PatientRegistration;

// // src/patient/pages/PatientRegistration.jsx
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createPatient } from "../patientSlice";
// import { createPatientModel } from "../model/patient.model";

// const PatientRegistration = () => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState(createPatientModel());

//   const handleChange = (path, value) => {
//     setForm((prev) => {
//       const updated = structuredClone(prev);
//       const keys = path.split(".");
//       let obj = updated;

//       while (keys.length > 1) {
//         obj = obj[keys.shift()];
//       }
//       obj[keys[0]] = value;
//       return updated;
//     });
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     dispatch(createPatient(form));
//   };

//   return (
//     <form onSubmit={submit}>
//       <h2>Patient Registration</h2>

//       <input
//         placeholder="Patient Code"
//         value={form.patientCode}
//         onChange={(e) => handleChange("patientCode", e.target.value)}
//       />

//       <input
//         placeholder="Full Name"
//         value={form.name}
//         onChange={(e) => handleChange("name", e.target.value)}
//       />

//       <input
//         placeholder="Father Name"
//         value={form.fatherName}
//         onChange={(e) => handleChange("fatherName", e.target.value)}
//       />

//       <input
//         placeholder="Mobile"
//         value={form.mobile}
//         onChange={(e) => handleChange("mobile", e.target.value)}
//       />

//       <input
//         placeholder="Alternate Mobile"
//         value={form.alternateMobile}
//         onChange={(e) => handleChange("alternateMobile", e.target.value)}
//       />

//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => handleChange("email", e.target.value)}
//       />

//       <select
//         value={form.gender}
//         onChange={(e) => handleChange("gender", e.target.value)}
//       >
//         <option value="">Select Gender</option>
//         <option>Male</option>
//         <option>Female</option>
//         <option>Other</option>
//       </select>

//       <input
//         type="date"
//         value={form.dob}
//         onChange={(e) => handleChange("dob", e.target.value)}
//       />

//       <input
//         placeholder="Age"
//         type="number"
//         value={form.age}
//         onChange={(e) => handleChange("age", e.target.value)}
//       />

//       <input
//         placeholder="Blood Group"
//         value={form.bloodGroup}
//         onChange={(e) => handleChange("bloodGroup", e.target.value)}
//       />

//       {/* ADDRESS */}
//       <h4>Address</h4>
//       <input
//         placeholder="Address Line 1"
//         value={form.address.line1}
//         onChange={(e) => handleChange("address.line1", e.target.value)}
//       />
//       <input
//         placeholder="Address Line 2"
//         value={form.address.line2}
//         onChange={(e) => handleChange("address.line2", e.target.value)}
//       />
//       <input
//         placeholder="City"
//         value={form.address.city}
//         onChange={(e) => handleChange("address.city", e.target.value)}
//       />
//       <input
//         placeholder="State"
//         value={form.address.state}
//         onChange={(e) => handleChange("address.state", e.target.value)}
//       />
//       <input
//         placeholder="Pincode"
//         value={form.address.pincode}
//         onChange={(e) => handleChange("address.pincode", e.target.value)}
//       />

//       {/* INSURANCE */}
//       <h4>Insurance</h4>
//       <label>
//         <input
//           type="checkbox"
//           checked={form.insurance.hasInsurance}
//           onChange={(e) =>
//             handleChange("insurance.hasInsurance", e.target.checked)
//           }
//         />
//         Has Insurance
//       </label>

//       {form.insurance.hasInsurance && (
//         <>
//           <input
//             placeholder="Insurance Provider"
//             value={form.insurance.provider}
//             onChange={(e) => handleChange("insurance.provider", e.target.value)}
//           />
//           <input
//             placeholder="Policy Number"
//             value={form.insurance.policyNumber}
//             onChange={(e) =>
//               handleChange("insurance.policyNumber", e.target.value)
//             }
//           />
//         </>
//       )}

//       {/* MEDICAL */}
//       <h4>Medical Details</h4>
//       <input
//         placeholder="Allergies"
//         value={form.medical.allergies}
//         onChange={(e) => handleChange("medical.allergies", e.target.value)}
//       />
//       <input
//         placeholder="Chronic Diseases"
//         value={form.medical.chronicDiseases}
//         onChange={(e) =>
//           handleChange("medical.chronicDiseases", e.target.value)
//         }
//       />
//       <textarea
//         placeholder="Remarks"
//         value={form.medical.remarks}
//         onChange={(e) => handleChange("medical.remarks", e.target.value)}
//       />

//       <button type="submit">Save Patient</button>
//     </form>
//   );
// };

// export default PatientRegistration;
