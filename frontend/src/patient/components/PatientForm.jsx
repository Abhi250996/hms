// src/patient/components/PatientForm.jsx
import { useState } from "react";
import Card from "../../shared/components/Card.jsx";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import Checkbox from "../../shared/components/Checkbox";
import Button from "../../shared/components/Button";
import Textarea from "../../shared/components/Textarea";

const emptyPatient = {
  patientCode: "",
  name: "",
  fatherName: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  gender: "Male",
  dob: "",
  age: "",
  bloodGroup: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  },
  identity: {
    type: "AADHAR",
    number: "",
  },
  maritalStatus: "Single",
  emergencyContact: {
    name: "",
    relation: "",
    mobile: "",
  },
  insurance: {
    hasInsurance: false,
    provider: "",
    policyNumber: "",
  },
  medical: {
    allergies: "",
    chronicDiseases: "",
    remarks: "",
  },
  status: "ACTIVE",
};

export default function PatientForm({
  initialValues = emptyPatient,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState(initialValues);

  const update = (path, value) => {
    setForm((prev) => {
      const updated = structuredClone(prev);
      const keys = path.split(".");
      let obj = updated;
      keys.slice(0, -1).forEach((k) => (obj = obj[k]));
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Patient Code"
            value={form.patientCode}
            onChange={(e) => update("patientCode", e.target.value)}
          />
          <Input
            label="Name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <Input
            label="Father Name"
            value={form.fatherName}
            onChange={(e) => update("fatherName", e.target.value)}
          />
          <Input
            label="Mobile"
            required
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
          />
          <Input
            label="Alternate Mobile"
            value={form.alternateMobile}
            onChange={(e) => update("alternateMobile", e.target.value)}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <Select
            label="Gender"
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
            options={["Male", "Female", "Other"]}
          />

          <Input
            type="date"
            label="Date of Birth"
            value={form.dob}
            onChange={(e) => update("dob", e.target.value)}
          />

          <Input
            label="Age"
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
          />

          <Input
            label="Blood Group"
            value={form.bloodGroup}
            onChange={(e) => update("bloodGroup", e.target.value)}
          />
        </div>

        {/* ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Address Line 1"
            value={form.address.line1}
            onChange={(e) => update("address.line1", e.target.value)}
          />
          <Input
            label="Address Line 2"
            value={form.address.line2}
            onChange={(e) => update("address.line2", e.target.value)}
          />
          <Input
            label="City"
            value={form.address.city}
            onChange={(e) => update("address.city", e.target.value)}
          />
          <Input
            label="State"
            value={form.address.state}
            onChange={(e) => update("address.state", e.target.value)}
          />
          <Input
            label="Pincode"
            value={form.address.pincode}
            onChange={(e) => update("address.pincode", e.target.value)}
          />
        </div>

        {/* IDENTITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Identity Type"
            value={form.identity.type}
            onChange={(e) => update("identity.type", e.target.value)}
            options={["AADHAR", "PAN", "PASSPORT"]}
          />
          <Input
            label="Identity Number"
            value={form.identity.number}
            onChange={(e) => update("identity.number", e.target.value)}
          />
        </div>

        {/* EMERGENCY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Emergency Contact Name"
            value={form.emergencyContact.name}
            onChange={(e) => update("emergencyContact.name", e.target.value)}
          />
          <Input
            label="Relation"
            value={form.emergencyContact.relation}
            onChange={(e) =>
              update("emergencyContact.relation", e.target.value)
            }
          />
          <Input
            label="Emergency Mobile"
            value={form.emergencyContact.mobile}
            onChange={(e) => update("emergencyContact.mobile", e.target.value)}
          />
        </div>

        {/* INSURANCE */}
        <div className="space-y-3">
          <Checkbox
            label="Has Insurance"
            checked={form.insurance.hasInsurance}
            onChange={(val) => update("insurance.hasInsurance", val)}
          />

          {form.insurance.hasInsurance && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Insurance Provider"
                value={form.insurance.provider}
                onChange={(e) => update("insurance.provider", e.target.value)}
              />
              <Input
                label="Policy Number"
                value={form.insurance.policyNumber}
                onChange={(e) =>
                  update("insurance.policyNumber", e.target.value)
                }
              />
            </div>
          )}
        </div>

        {/* MEDICAL */}
        <div className="space-y-3">
          <Textarea
            label="Allergies"
            value={form.medical.allergies}
            onChange={(e) => update("medical.allergies", e.target.value)}
          />
          <Textarea
            label="Chronic Diseases"
            value={form.medical.chronicDiseases}
            onChange={(e) => update("medical.chronicDiseases", e.target.value)}
          />
          <Textarea
            label="Remarks"
            value={form.medical.remarks}
            onChange={(e) => update("medical.remarks", e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={submitting}>
            Save Patient
          </Button>
        </div>
      </form>
    </Card>
  );
}
