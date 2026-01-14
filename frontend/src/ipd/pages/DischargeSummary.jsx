// src/ipd/pages/DischargeSummary.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ipdRepository } from "../repository/ipd.repository";
import { BillingController } from "../../billing/controller/billing.controller";
import Loader from "../../shared/components/Loader";
import { formatDate } from "../../utils/date";
import { formatCurrency } from "../../utils/currency";

const DischargeSummary = () => {
  const { id } = useParams(); // IPD admission ID
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discharging, setDischarging] = useState(false);

  useEffect(() => {
    loadAdmission();
  }, [id]);

  const loadAdmission = async () => {
    try {
      setLoading(true);
      const res = await ipdRepository.getById(id);
      setAdmission(res.data?.data || res.data);
    } finally {
      setLoading(false);
    }
  };

  const dischargePatient = async () => {
    setDischarging(true);
    try {
      await ipdRepository.discharge(id, {
        dischargeDate: new Date().toISOString().slice(0, 10),
        status: "DISCHARGED",
      });

      await BillingController.createBill({
        patientId: admission.patientId,
        source: "IPD",
        referenceId: admission.id,
      });

      navigate(`/billing/patient/${admission.patientId}`);
    } finally {
      setDischarging(false);
    }
  };

  if (loading) return <Loader label="Loading discharge summary..." />;
  if (!admission)
    return <p className="p-6 text-red-600">Admission not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">IPD Discharge Summary</h2>
        <p className="text-sm text-gray-500">
          Review admission details before discharging patient
        </p>
      </div>

      <div className="bg-white border rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Patient ID" value={admission.patientId} />
        <Info label="Doctor ID" value={admission.doctorId} />
        <Info label="Ward" value={admission.ward} />
        <Info label="Bed Number" value={admission.bedNumber} />
        <Info
          label="Admission Date"
          value={formatDate(admission.admissionDate)}
        />
        <Info
          label="Status"
          value={
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                admission.status === "DISCHARGED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {admission.status}
            </span>
          }
        />
        {admission.totalAmount !== undefined && (
          <Info
            label="Estimated Charges"
            value={formatCurrency(admission.totalAmount)}
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 border rounded"
        >
          Back
        </button>

        {admission.status !== "DISCHARGED" && (
          <button
            onClick={dischargePatient}
            disabled={discharging}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {discharging ? "Discharging..." : "Discharge Patient"}
          </button>
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

export default DischargeSummary;
