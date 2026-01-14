// src/admin/model/staff.model.js

export const createStaffModel = () => ({
  staffId: "",
  name: "",
  email: "",
  mobile: "",
  role: "STAFF", // ADMIN | DOCTOR | STAFF
  designation: "",
  department: "",
  status: "ACTIVE", // ACTIVE | INACTIVE
  joiningDate: "",
});
