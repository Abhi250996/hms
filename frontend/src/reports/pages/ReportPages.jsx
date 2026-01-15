// src/reports/pages/ReportsPage.jsx
import { useState } from "react";
import BedOccupancy from "./BedOccupancy";
import DailyCollection from "./DailyCollection";
import PatientStats from "./PatientStats";
import InventoryReport from "./InventoryReport";
// ... import others

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("stats");

  const tabs = [
    { id: "stats", label: "Patient Stats", component: <PatientStats /> },
    { id: "beds", label: "Bed Occupancy", component: <BedOccupancy /> },
    { id: "revenue", label: "Daily Collection", component: <DailyCollection /> },
    { id: "inventory", label: "Inventory", component: <InventoryReport /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* INTERNAL TAB NAVIGATION */}
      <div className="flex border-b bg-slate-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DYNAMIC REPORT CONTENT */}
      <div className="p-6">
        {tabs.find((t) => t.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default ReportsPage;