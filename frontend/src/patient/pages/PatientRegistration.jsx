import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPatient } from "../patientSlice";
import { createPatientModel } from "../model/patient.model";

const PatientRegistration = () => {
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { createPatient } from "../patientSlice";
  import { createPatientModel } from "../model/patient.model";

  const PatientRegistration = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(createPatientModel());

    const handleChange = (path, value) => {
      setForm((prev) => {
        const updated = { ...prev };
        const keys = path.split(".");
        let obj = updated;
        while (keys.length > 1) {
          obj = obj[keys.shift()];
        }
        obj[keys[0]] = value;
        return updated;
      });
    };

    const submit = (e) => {
      e.preventDefault();
      dispatch(createPatient(form));
    };

    return (
      <form onSubmit={submit}>
        <h2>Patient Registration</h2>

        <input
          placeholder="Name"
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          placeholder="Mobile"
          onChange={(e) => handleChange("mobile", e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <select onChange={(e) => handleChange("gender", e.target.value)}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          onChange={(e) => handleChange("dob", e.target.value)}
        />

        {/* Insurance checkbox auto logic */}
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              handleChange("insurance.hasInsurance", e.target.checked)
            }
          />
          Has Insurance
        </label>

        {form.insurance.hasInsurance && (
          <>
            <input
              placeholder="Provider"
              onChange={(e) => handleChange("insurance.provider", e.target.value)}
            />
            <input
              placeholder="Policy Number"
              onChange={(e) =>
                handleChange("insurance.policyNumber", e.target.value)
              }
            />
          </>
        )}

        <button type="submit">Save Patient</button>
      </form>
    );
  };

  export default PatientRegistration;
