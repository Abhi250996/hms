import { ReportsRepository } from "../repository/reports.repository";

export const ReportsController = {
  dailyCollection: async () => (await ReportsRepository.dailyCollection()).data,

  doctorRevenue: async () => (await ReportsRepository.doctorRevenue()).data,

  departmentRevenue: async () =>
    (await ReportsRepository.departmentRevenue()).data,

  patientStats: async () => (await ReportsRepository.patientStats()).data,

  bedOccupancy: async () => (await ReportsRepository.bedOccupancy()).data,

  inventory: async () => (await ReportsRepository.inventory()).data,
};
