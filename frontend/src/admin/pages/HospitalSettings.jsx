// src/admin/pages/HospitalSettings.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { adminController } from "../controller/admin.controller";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/FormControls/Input";
import Select from "../../shared/components/FormControls/Select";

const initialSettings = {
  hospitalName: "",
  registrationNumber: "",
  phone: "",
  email: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  },
  tax: {
    gstNumber: "",
    gstPercentage: "",
  },
  currency: "INR",
  timezone: "Asia/Kolkata",
};

const HospitalSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const res = await adminController.getSettings();
    if (res?.data) setSettings(res.data);
    setLoading(false);
  };

  const handleChange = (path, value) => {
    setSettings((prev) => {
      const updated = structuredClone(prev);
      const keys = path.split(".");
      let obj = updated;
      while (keys.length > 1) obj = obj[keys.shift()];
      obj[keys[0]] = value;
      return updated;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await adminController.updateSettings(settings);
    setSaving(false);
    alert("Hospital settings updated successfully");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Hospital Settings</h1>
        <p className="text-slate-500 mb-6">
          Manage hospital master & configuration details
        </p>

        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <h3 className="md:col-span-2 text-lg font-semibold">
            Basic Information
          </h3>

          <Input
            label="Hospital Name"
            value={settings.hospitalName}
            onChange={(e) => handleChange("hospitalName", e.target.value)}
            required
          />

          <Input
            label="Registration Number"
            value={settings.registrationNumber}
            onChange={(e) => handleChange("registrationNumber", e.target.value)}
          />

          <Input
            label="Phone"
            value={settings.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            value={settings.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <h3 className="md:col-span-2 text-lg font-semibold mt-4">Address</h3>

          <Input
            label="Address Line 1"
            value={settings.address.line1}
            onChange={(e) => handleChange("address.line1", e.target.value)}
          />

          <Input
            label="Address Line 2"
            value={settings.address.line2}
            onChange={(e) => handleChange("address.line2", e.target.value)}
          />

          <Input
            label="City"
            value={settings.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />

          <Input
            label="State"
            value={settings.address.state}
            onChange={(e) => handleChange("address.state", e.target.value)}
          />

          <Input
            label="Pincode"
            value={settings.address.pincode}
            onChange={(e) => handleChange("address.pincode", e.target.value)}
          />

          <h3 className="md:col-span-2 text-lg font-semibold mt-4">
            Tax & Localization
          </h3>

          <Input
            label="GST Number"
            value={settings.tax.gstNumber}
            onChange={(e) => handleChange("tax.gstNumber", e.target.value)}
          />

          <Input
            label="GST Percentage"
            type="number"
            value={settings.tax.gstPercentage}
            onChange={(e) => handleChange("tax.gstPercentage", e.target.value)}
          />

          <Select
            label="Currency"
            value={settings.currency}
            options={[
              { label: "INR", value: "INR" },
              { label: "USD", value: "USD" },
            ]}
            onChange={(e) => handleChange("currency", e.target.value)}
          />

          <Select
            label="Timezone"
            value={settings.timezone}
            options={[
              { label: "Asia/Kolkata", value: "Asia/Kolkata" },
              { label: "UTC", value: "UTC" },
            ]}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />

          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HospitalSettings;
