export const createPatientModel = () => ({
  patientCode: "",
  name: "",
  fatherName: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  gender: "",
  dob: "",
  age: "",
  bloodGroup: "",
  maritalStatus: "",
  status: "ACTIVE",

  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  },

  identity: {
    type: "",
    number: "",
  },

  emergencyContact: {
    name: "",
    relation: "",
    mobile: "",
  },

  insurance: {
    hasInsurance: false,
    provider: "",
    policyNumber: "",
  },

  medical: {
    allergies: "",
    chronicDiseases: "",
    remarks: "",
  },
});
