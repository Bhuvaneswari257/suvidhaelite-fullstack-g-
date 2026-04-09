import { Routes, Route } from "react-router-dom";

import SupportDashboard from "../pages/support/SupportDashboard";
import SupportInquiries from "../pages/support/SupportInquiries";
import SupportEscalations from "../pages/support/SupportEscalations";

export default function SupportRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SupportDashboard />} />
      <Route path="inquiries" element={<SupportInquiries />} />
      <Route path="escalations" element={<SupportEscalations />} />
    </Routes>
  );
}