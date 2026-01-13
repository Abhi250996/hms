import * as ipdRepo from "../repository/ipd.repository";

export const admitPatient = async (data) => {
  const res = await ipdRepo.admitPatientApi(data);
  return res.data;
};

export const getIpdList = async () => {
  const res = await ipdRepo.getIpdListApi();
  return res.data;
};

export const getIpdById = async (id) => {
  const res = await ipdRepo.getIpdByIdApi(id);
  return res.data;
};

export const updateIpd = async (id, data) => {
  const res = await ipdRepo.updateIpdApi(id, data);
  return res.data;
};

export const dischargeIpd = async (id, data) => {
  const res = await ipdRepo.dischargeIpdApi(id, data);
  return res.data;
};

export const getPatientIpdHistory = async (patientId) => {
  const res = await ipdRepo.getPatientIpdHistoryApi(patientId);
  return res.data;
};
