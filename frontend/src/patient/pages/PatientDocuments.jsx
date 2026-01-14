// src/patient/pages/PatientDocuments.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patientController } from "../controller/patient.controller";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";

export default function PatientDocuments() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one document");
      return;
    }

    setUploading(true);
    try {
      await patientController.uploadDocuments(Number(patientId), files);
      navigate(`/patients/${patientId}`);
    } catch (err) {
      alert(err.message || "Failed to upload documents");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Patient Documents</h2>

      <Card className="p-6">
        <form onSubmit={handleUpload} className="space-y-6">
          <Input
            type="file"
            label="Select Documents"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button type="submit" loading={uploading}>
              Upload Documents
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
