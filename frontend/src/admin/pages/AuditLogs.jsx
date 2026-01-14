// src/admin/pages/AuditLogs.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { adminController } from "../controller/admin.controller";
import Loader from "../../shared/components/Loader";
import Table from "../../shared/components/Table";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await adminController.getAuditLogs();
      setLogs(res.data || []);
    } catch (err) {
      setError("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
          <p className="text-sm text-slate-500">
            Complete system activity trail for compliance & security
          </p>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow p-4">
            <Table
              columns={[
                { key: "index", label: "#" },
                { key: "userName", label: "User" },
                { key: "role", label: "Role" },
                { key: "action", label: "Action" },
                { key: "module", label: "Module" },
                { key: "referenceId", label: "Reference ID" },
                { key: "ipAddress", label: "IP Address" },
                { key: "createdAt", label: "Timestamp" },
              ]}
              data={logs.map((log, i) => ({
                ...log,
                index: i + 1,
                referenceId: log.referenceId || "-",
                createdAt: new Date(log.createdAt).toLocaleString(),
              }))}
              emptyMessage="No audit records found"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AuditLogs;
