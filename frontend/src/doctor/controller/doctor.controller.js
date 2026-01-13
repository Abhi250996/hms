import * as repo from "../repository/doctor.repository";

export const fetchDoctors = async () => {
  const res = await repo.getDoctors();
  return res.data;
};

export const fetchDoctor = async (id) => {
  const res = await repo.getDoctorById(id);
  return res.data;
};

export const saveDoctor = async (data) => {
  const res = await repo.createDoctor(data);
  return res.data;
};

export const editDoctor = async (id, data) => {
  const res = await repo.updateDoctor(id, data);
  return res.data;
};

export const removeDoctor = async (id) => {
  const res = await repo.deleteDoctor(id);
  return res.data;
};
