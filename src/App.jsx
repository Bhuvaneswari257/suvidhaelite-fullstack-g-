import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchProfessionals from "./pages/SearchProfessionals";
import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";
import ProfessionalProfile from "./pages/ProfessionalProfile";

import UserDashboard from "./pages/UserDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SupportDashboard from "./pages/SupportDashboard";

/* ADMIN IMPORTS */
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfessionals from "./pages/admin/AdminProfessionals";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminServices from "./pages/admin/AdminServices";
import AdminSettings from "./pages/admin/AdminSettings";

/* USER PAYMENT */
import PaymentsHistory from "./pages/PaymentsHistory";

/* SUPPORT MODULE PAGES */
import SupportInquiries from "./pages/support/SupportInquiries";
import SupportBookingIssues from "./pages/support/SupportBookingIssues";
import SupportPaymentDisputes from "./pages/support/SupportPaymentDisputes";
import SupportProfessionalAssistance from "./pages/support/SupportProfessionalAssistance";
import SupportFeedback from "./pages/support/SupportFeedback";
import SupportEscalations from "./pages/support/SupportEscalations";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
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
              {userRole === "admin" && <Link to="/admin">Admin</Link>}
              {userRole === "support" && <Link to="/support">Support</Link>}

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
          <Route path="/search" element={<SearchProfessionals />} />
          <Route path="/professional-profile" element={<ProfessionalProfile />} />
          <Route path="/book" element={<BookingPage />} />

          {/* USER BOOKING HISTORY */}
          <Route path="/bookings" element={<BookingHistory />} />

          {/* ADMIN PAGES */}
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/professionals" element={<AdminProfessionals />} />
          <Route path="/admin-bookings" element={<AdminBookings />} />
          <Route path="/admin-payments" element={<AdminPayments />} />
          <Route path="/services" element={<AdminServices />} />
          <Route path="/settings" element={<AdminSettings />} />

          {/* PROTECTED ROUTES */}

          {/* USER DASHBOARD */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* USER PAYMENT HISTORY */}
          <Route
            path="/payments"
            element={
              <ProtectedRoute role="user">
                <PaymentsHistory />
              </ProtectedRoute>
            }
          />

          {/* PROFESSIONAL DASHBOARD */}
          <Route
            path="/professional"
            element={
              <ProtectedRoute role="professional">
                <ProfessionalDashboard />
              </ProtectedRoute>
            }
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* SUPPORT DASHBOARD */}
          <Route
            path="/support"
            element={
              <ProtectedRoute role="support">
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          {/* SUPPORT MODULE ROUTES */}
          <Route
            path="/support/inquiries"
            element={
              <ProtectedRoute role="support">
                <SupportInquiries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/booking-issues"
            element={
              <ProtectedRoute role="support">
                <SupportBookingIssues />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/payment-disputes"
            element={
              <ProtectedRoute role="support">
                <SupportPaymentDisputes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/professional-assistance"
            element={
              <ProtectedRoute role="support">
                <SupportProfessionalAssistance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/feedback"
            element={
              <ProtectedRoute role="support">
                <SupportFeedback />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/escalations"
            element={
              <ProtectedRoute role="support">
                <SupportEscalations />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

    </div>
  );
}

export default App;