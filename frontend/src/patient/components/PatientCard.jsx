// src/patient/components/PatientCard.jsx
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import Badge from "../../shared/components/Badge";
import Button from "../../shared/components/Button";

export default function PatientCard({ patient }) {
  return (
    <Card className="p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{patient.name}</h3>
          <p className="text-sm text-gray-600">
            Patient ID: {patient.patientId}
          </p>
          <p className="text-sm text-gray-600">Mobile: {patient.mobile}</p>
          <p className="text-sm text-gray-600">
            Gender: {patient.gender} | DOB: {patient.dob}
          </p>
        </div>

        <Badge variant={patient.status === "ACTIVE" ? "success" : "secondary"}>
          {patient.status}
        </Badge>
      </div>

      <div className="mt-4 flex gap-3">
        <Link to={`/patients/${patient.id}`}>
          <Button variant="link" size="sm">
            View Profile
          </Button>
        </Link>

        <Link to={`/patients/${patient.id}/history`}>
          <Button variant="link" size="sm">
            History
          </Button>
        </Link>
      </div>
    </Card>
  );
}
