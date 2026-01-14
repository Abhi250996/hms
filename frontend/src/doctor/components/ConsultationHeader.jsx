import { useNavigate } from "react-router-dom";
import { formatDate } from "../../core/utils/date";

const ConsultationHeader = ({ patient, doctor, appointment }) => {
  const navigate = useNavigate();

  if (!patient || !doctor) return null;

  const appointmentDate = appointment?.date || appointment?.visitDate || "";

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* PATIENT INFO */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {patient.name}
          </h2>
          <p className="text-sm text-gray-600">
            Mobile: {patient.mobile || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            {patient.gender || "—"} • Age: {patient.age ?? "—"}
          </p>
        </div>

        {/* DOCTOR INFO */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Dr. {doctor.name}
          </h2>
          <p className="text-sm text-gray-600">
            {doctor.department} • {doctor.specialization}
          </p>
        </div>

        {/* APPOINTMENT + ACTIONS */}
        <div className="flex flex-col items-start lg:items-end gap-2">
          <p className="text-sm text-gray-600">
            Appointment Date:{" "}
            <span className="font-medium">
              {appointmentDate ? formatDate(appointmentDate) : "Not Assigned"}
            </span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Patient Profile
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationHeader;
