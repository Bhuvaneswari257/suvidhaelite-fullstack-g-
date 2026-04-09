import { Routes, Route } from "react-router-dom";

import ProfessionalDashboard from "../pages/professional/ProfessionalDashboard";
import ProfessionalProfile from "../pages/professional/ProfessionalProfile";
import ProfessionalServices from "../pages/professional/ProfessionalServices";

export default function ProfessionalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProfessionalDashboard />} />
      <Route path="profile" element={<ProfessionalProfile />} />
      <Route path="services" element={<ProfessionalServices />} />
    </Routes>
  );
}