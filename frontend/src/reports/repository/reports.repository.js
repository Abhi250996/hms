import api from "../../core/api/axios";
 export const ReportsRepository = {
  dailyCollection: () => api.get("/reports/daily-collection"),
  doctorRevenue: () => api.get("/reports/doctor-revenue"),
  departmentRevenue: () => api.get("/reports/department"),
  patientStats: () => api.get("/reports/patient"),
  bedOccupancy: () => api.get("/reports/bed-occupancy"),
  inventory: () => api.get("/reports/inventory"),
};
