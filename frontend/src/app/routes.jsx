import PatientList from "../patient/pages/PatientList";
import PatientProfile from "../patient/pages/PatientProfile";
import PatientRegistration from "../patient/pages/PatientRegistration";
import OPDRegistration from "../opd/pages/OPDRegistration";
import IPDAdmission from "../ipd/pages/IPDAdmission";
import LabOrderFromIPD from "../laboratory/pages/LabOrderFromIPD";
import LabTestList from "../laboratory/pages/LabTestList";
import LabResultEntry from "../laboratory/pages/LabResultEntry";

const patientRoutes = [
  { path: "/patients", element: <PatientList /> },
  { path: "/patients/new", element: <PatientRegistration /> },
  { path: "/patients/:id", element: <PatientProfile /> },
  { path: "/opd/create/:patientId", element: <OPDRegistration /> },
  { path: "/ipd/admit", element: <IPDAdmission /> },
  { path: "/lab/order", element: <LabOrderFromIPD /> },
  { path: "/lab/tests", element: <LabTestList /> },
  { path: "/lab/result/:id", element: <LabResultEntry /> },
];

export default patientRoutes;
import PatientList from "../patient/pages/PatientList";
import PatientProfile from "../patient/pages/PatientProfile";
import PatientRegistration from "../patient/pages/PatientRegistration";
import OPDRegistration from "../opd/pages/OPDRegistration";
import IPDAdmission from "../ipd/pages/IPDAdmission";

const patientRoutes = [
  {
    path: "/patients",
    element: <PatientList />,
  },
  {
    path: "/patients/new",
    element: <PatientRegistration />,
  },
  {
    path: "/patients/:id",
    element: <PatientProfile />,
  },
  {
    path: "/opd/create/:patientId",
    element: <OPDRegistration />,
  },
  {
    path: "/ipd/admit",
    element: <IPDAdmission />,
  },
];

export default patientRoutes;
