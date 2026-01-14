import { useEffect, useState } from "react";
import { adminController } from "../controller/admin.controller";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";

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
  const [status, setStatus] = useState({ type: "", text: "" });

  useEffect(() => {
    loadSettings();
  }, []);

  // Helper to show status and clear it after 4 seconds
  const showStatus = (text, type = "success") => {
    setStatus({ text, type });
    setTimeout(() => setStatus({ text: "", type: "" }), 4000);
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await adminController.getSettings();
      if (res?.data) {
        // SAFETY: Merging with initialSettings ensures no 'null' sub-objects
        setSettings({
          ...initialSettings,
          ...res.data,
          address: { ...initialSettings.address, ...(res.data.address || {}) },
          tax: { ...initialSettings.tax, ...(res.data.tax || {}) },
        });
      }
    } catch (err) {
      console.error("Load failed", err);
      showStatus("Failed to load settings from server", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (path, value) => {
    setSettings((prev) => {
      const updated = structuredClone(prev);
      const keys = path.split(".");
      let obj = updated;
      while (keys.length > 1) {
        const key = keys.shift();
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
      }
      obj[keys[0]] = value;
      return updated;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ text: "", type: "" }); // Clear previous status
    try {
      await adminController.updateSettings(settings);
      showStatus("Hospital settings updated successfully!");
    } catch (err) {
      console.error("Save error:", err);
      showStatus("Error: Could not save settings to database.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-slate-800">Hospital Settings</h1>
          <p className="text-slate-500">Manage hospital master & configuration details</p>
        </div>

        <form 
          onSubmit={submit} 
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2">
            Basic Information
          </h3>

          <Input
            label="Hospital Name"
            value={settings.hospitalName || ""}
            onChange={(e) => handleChange("hospitalName", e.target.value)}
            required
          />

          <Input
            label="Registration Number"
            value={settings.registrationNumber || ""}
            onChange={(e) => handleChange("registrationNumber", e.target.value)}
          />

          <Input
            label="Phone"
            value={settings.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            value={settings.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mt-4 mb-2">
            Address Details
          </h3>

          <Input
            label="Address Line 1"
            value={settings.address?.line1 || ""}
            onChange={(e) => handleChange("address.line1", e.target.value)}
          />

          <Input
            label="Address Line 2"
            value={settings.address?.line2 || ""}
            onChange={(e) => handleChange("address.line2", e.target.value)}
          />

          <Input
            label="City"
            value={settings.address?.city || ""}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />

          <Input
            label="State"
            value={settings.address?.state || ""}
            onChange={(e) => handleChange("address.state", e.target.value)}
          />

          <Input
            label="Pincode"
            value={settings.address?.pincode || ""}
            onChange={(e) => handleChange("address.pincode", e.target.value)}
          />

          <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mt-4 mb-2">
            Tax & Localization
          </h3>

          <Input
            label="GST Number"
            value={settings.tax?.gstNumber || ""}
            onChange={(e) => handleChange("tax.gstNumber", e.target.value)}
          />

          <Input
            label="GST Percentage (%)"
            type="number"
            value={settings.tax?.gstPercentage || ""}
            onChange={(e) => handleChange("tax.gstPercentage", e.target.value)}
          />

          <Select
            label="Currency"
            value={settings.currency || "INR"}
            options={[
              { label: "INR (₹)", value: "INR" },
              { label: "USD ($)", value: "USD" },
            ]}
            onChange={(e) => handleChange("currency", e.target.value)}
          />

          <Select
            label="Timezone"
            value={settings.timezone || "Asia/Kolkata"}
            options={[
              { label: "Asia/Kolkata", value: "Asia/Kolkata" },
              { label: "UTC", value: "UTC" },
            ]}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />

          <div className="md:col-span-2 flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            {/* Feedback Message */}
            {status.text && (
              <span className={`text-sm font-medium animate-pulse ${
                status.type === "error" ? "text-red-600" : "text-green-600"
              }`}>
                {status.type === "success" ? "✓ " : "⚠ "}{status.text}
              </span>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-all shadow-md active:scale-95"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Save Settings"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HospitalSettings;