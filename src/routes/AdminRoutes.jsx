import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminProfessionals from "../pages/admin/AdminProfessionals";
import AdminServices from "../pages/admin/AdminServices";
import AdminSettings from "../pages/admin/AdminSettings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="bookings" element={<AdminBookings />} />
      <Route path="payments" element={<AdminPayments />} />
      <Route path="professionals" element={<AdminProfessionals />} />
      <Route path="services" element={<AdminServices />} />
      <Route path="settings" element={<AdminSettings />} />
    </Routes>
  );
}