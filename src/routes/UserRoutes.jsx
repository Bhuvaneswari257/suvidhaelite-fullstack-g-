import { Routes, Route } from "react-router-dom";

import UserDashboard from "../pages/user/UserDashboard";
import BookingPage from "../pages/user/BookingPage";
import BookingHistory from "../pages/user/BookingHistory";
import PaymentsHistory from "../pages/user/PaymentsHistory";
import SearchProfessionals from "../pages/user/SearchProfessionals";
import ChatPage from "../pages/user/ChatPage";
export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="search" element={<SearchProfessionals />} />
      <Route path="book" element={<BookingPage />} />
      <Route path="history" element={<BookingHistory />} />
      <Route path="payments" element={<PaymentsHistory />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}