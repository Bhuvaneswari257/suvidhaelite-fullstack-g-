import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useProfessionals } from "./pages/professional/ProfessionalContext";
import ErrorBoundary from "./components/ErrorBoundary";

/* ✅ SAME IMPORTS */
import Home from "./pages/common/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import SearchProfessionals from "./pages/user/SearchProfessionals";
import BookingPage from "./pages/user/BookingPage";
import BookingHistory from "./pages/user/BookingHistory";
import PaymentsHistory from "./pages/user/PaymentsHistory";

import ProfessionalProfile from "./pages/professional/ProfessionalProfile";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
/* ❌ REMOVED ProfessionalProvider import (not used here) */

import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SupportDashboard from "./pages/support/SupportDashboard";

/* ADMIN IMPORTS */
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfessionals from "./pages/admin/AdminProfessionals";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminServices from "./pages/admin/AdminServices";
import AdminSettings from "./pages/admin/AdminSettings";

/* SUPPORT MODULE PAGES */
import SupportInquiries from "./pages/support/SupportInquiries";
import SupportBookingIssues from "./pages/support/SupportBookingIssues";
import SupportPaymentDisputes from "./pages/support/SupportPaymentDisputes";
import SupportProfessionalAssistance from "./pages/support/SupportProfessionalAssistance";
import SupportFeedback from "./pages/support/SupportFeedback";
import SupportEscalations from "./pages/support/SupportEscalations";
import ContactSupport from "./pages/support/ContactSupport";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { userRole, user, logout, switchRole } = useAuth();
  const { professionals } = useProfessionals();
  const navigate = useNavigate();

  const isAlsoProfessional = userRole === 'user' && professionals.find(p => p.email === user?.email || p.name === user?.name);
  const isAlsoUser = userRole === 'professional'; // Professionals can technically always revert to User mode

  const handleLogout = async () => {
    await logout("manual");
    navigate("/");
  };

  const handleSwitchRole = async (newRole, destination, e) => {
    e.preventDefault();
    const result = await switchRole(newRole);
    if (result.success) {
      navigate(destination);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F9FAF7]">

        {/* NAVBAR */}
        <nav className="bg-[#1F2933] px-10 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#C9A227]">
            Suvidha Elite
          </h1>

          <div className="flex gap-6 text-gray-200">

            <Link to="/">Home</Link>
            <Link to="/search">Services</Link>

            {!userRole && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {userRole && (
              <>
                <Link to="/bookings">Bookings</Link>

                {userRole === "user" && <Link to="/user">User</Link>}
                {userRole === "professional" && <Link to="/professional">Professional</Link>}

                {/* DYNAMIC SWITCHING FOR UX */}
                {isAlsoProfessional && (
                  <a href="#" onClick={(e) => handleSwitchRole('professional', '/professional', e)} className="bg-[#C9A227] text-white px-3 py-1 rounded">Switch to Professional</a>
                )}
                {isAlsoUser && (
                  <a href="#" onClick={(e) => handleSwitchRole('user', '/user', e)} className="border border-[#C9A227] text-[#C9A227] px-3 py-1 rounded">Switch to User</a>
                )}

                {userRole === "admin" && <Link to="/admin">Admin</Link>}
                {userRole === "support" ? (
                  <Link to="/support">Support</Link>
                ) : (
                  <Link to="/support/contact">Contact Support</Link>
                )}

                <button onClick={handleLogout} className="text-[#C9A227]">
                  Logout
                </button>
              </>
            )}

          </div>
        </nav>

        {/* ROUTES */}
        <div className="p-10">
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<SearchProfessionals />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
            <Route path="/book" element={<BookingPage />} />

            {/* USER */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute roles={["user"]}>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user"
              element={
                <ProtectedRoute roles={["user"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payments"
              element={
                <ProtectedRoute roles={["user"]}>
                  <PaymentsHistory />
                </ProtectedRoute>
              }
            />

            {/* ❌ REMOVED WRONG ProfessionalProvider BLOCK */}

            {/* ✅ KEEP ONLY ONE PROFESSIONAL ROUTE */}
            <Route
              path="/professional"
              element={
                <ProtectedRoute roles={["professional"]}>
                  <ProfessionalDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ROUTES */}
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/professionals" element={<AdminProfessionals />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* SUPPORT */}
            <Route
              path="/support"
              element={
                <ProtectedRoute roles={["support"]}>
                  <SupportDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/support/contact"
              element={
                <ProtectedRoute roles={["user", "professional", "admin", "support"]}>
                  <ContactSupport />
                </ProtectedRoute>
              }
            />

            <Route path="/support/inquiries" element={<ProtectedRoute roles={["support"]}><SupportInquiries /></ProtectedRoute>} />
            <Route path="/support/booking-issues" element={<ProtectedRoute roles={["support"]}><SupportBookingIssues /></ProtectedRoute>} />
            <Route path="/support/payment-disputes" element={<ProtectedRoute roles={["support"]}><SupportPaymentDisputes /></ProtectedRoute>} />
            <Route path="/support/professional-assistance" element={<ProtectedRoute roles={["support"]}><SupportProfessionalAssistance /></ProtectedRoute>} />
            <Route path="/support/feedback" element={<ProtectedRoute roles={["support"]}><SupportFeedback /></ProtectedRoute>} />
            <Route path="/support/escalations" element={<ProtectedRoute roles={["support"]}><SupportEscalations /></ProtectedRoute>} />

          </Routes>
        </div>

      </div>
    </ErrorBoundary>
  );
}

export default App;
