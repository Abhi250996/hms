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

  // Robust nested update function
  const update = (path, value) => {
    setForm((prev) => {
      const keys = path.split(".");
      const updated = { ...prev };
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
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
            type="tel"
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
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <Select
            label="Gender"
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" }
            ]}
          />
          <Input
            type="date"
            label="Date of Birth"
            required
            value={form.dob}
            onChange={(e) => update("dob", e.target.value)}
          />
          <Input
            label="Age"
            type="number"
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
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">Address Information</h3>
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
            <div className="grid grid-cols-3 gap-2 md:col-span-2">
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
          </div>
        </div>

        {/* IDENTITY */}
        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Identity Type"
            value={form.identity.type}
            onChange={(e) => update("identity.type", e.target.value)}
            options={[
              { value: "AADHAR", label: "AADHAR" },
              { value: "PAN", label: "PAN" },
              { value: "PASSPORT", label: "PASSPORT" }
            ]}
          />
          <Input
            label="Identity Number"
            value={form.identity.number}
            onChange={(e) => update("identity.number", e.target.value)}
          />
        </div>

        {/* EMERGENCY */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Contact Name"
              value={form.emergencyContact.name}
              onChange={(e) => update("emergencyContact.name", e.target.value)}
            />
            <Input
              label="Relation"
              value={form.emergencyContact.relation}
              onChange={(e) => update("emergencyContact.relation", e.target.value)}
            />
            <Input
              label="Mobile"
              value={form.emergencyContact.mobile}
              onChange={(e) => update("emergencyContact.mobile", e.target.value)}
            />
          </div>
        </div>

        {/* INSURANCE */}
        <div className="border-t pt-4 space-y-3">
          <Checkbox
            label="Patient has Insurance Coverage"
            checked={form.insurance.hasInsurance}
            onChange={(val) => update("insurance.hasInsurance", val)}
          />
          {form.insurance.hasInsurance && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              <Input
                label="Provider"
                value={form.insurance.provider}
                onChange={(e) => update("insurance.provider", e.target.value)}
              />
              <Input
                label="Policy Number"
                value={form.insurance.policyNumber}
                onChange={(e) => update("insurance.policyNumber", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* MEDICAL */}
        <div className="border-t pt-4 space-y-3">
          <Textarea
            label="Known Allergies"
            value={form.medical.allergies}
            onChange={(val) => update("medical.allergies", val)}
          />
          <Textarea
            label="Chronic Diseases"
            value={form.medical.chronicDiseases}
            onChange={(val) => update("medical.chronicDiseases", val)}
          />
          <Textarea
            label="General Medical Remarks"
            value={form.medical.remarks}
            onChange={(val) => update("medical.remarks", val)}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" loading={submitting} className="w-full md:w-auto px-12">
            Register Patient
          </Button>
        </div>
      </form>
    </Card>
  );
}