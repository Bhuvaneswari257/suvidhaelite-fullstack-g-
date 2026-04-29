import { useNavigate } from "react-router-dom";
import { useBookings } from "../../context/BookingContext";
import { useProfessionals } from "../../pages/professional/ProfessionalContext";
import { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const { professionals } = useProfessionals();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await userService.getAllUsers();
      if (result.success) {
        setUsers(result.data || []);
      }
    };
    loadUsers();
  }, []);

  const totalUsers = users.length;
  const totalProfessionals = professionals.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.lifecycle === "PENDING").length;
  const paidRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + (b.price || 0), 0);
  const serviceCategories = [
    ...new Set(professionals.map((p) => p.category).filter(Boolean)),
  ];

  const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-semibold text-[#1F2933]">
          Admin Dashboard
        </h1>
        <p className="text-[#C9A227]">
          Monitor and manage the platform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-500">Total Registered: <span className="font-semibold text-gray-800">{totalUsers}</span></p>
        </div>

        <div
          onClick={() => navigate("/admin/professionals")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Professionals</h3>
          <p className="text-gray-500">Active Pros: <span className="font-semibold text-gray-800">{totalProfessionals}</span></p>
        </div>

        <div
          onClick={() => navigate("/admin/services")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Service Listings</h3>
          <p className="text-gray-500">Categories: <span className="font-semibold text-gray-800">{serviceCategories.length}</span></p>
        </div>

        <div
          onClick={() => navigate("/admin/bookings")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">All Bookings</h3>
          <p className="text-gray-500">Total Bookings Made: <span className="font-semibold text-gray-800">{totalBookings}</span></p>
        </div>

        <div
          onClick={() => navigate("/admin/payments")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Payments</h3>
          <p className="text-gray-500">Total Revenue: <span className="font-semibold text-[#C9A227]">₹{paidRevenue}</span></p>
        </div>

        <div
          onClick={() => navigate("/admin/settings")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">System Settings</h3>
          <p className="text-gray-500">Configure platform preferences</p>
        </div>

        <div
          onClick={() => navigate("/support/contact")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
          <p className="text-gray-500">Report a platform issue or request assistance from the support team.</p>
        </div>

      </div>

      {/* RECENT BOOKINGS PREVIEW LOG */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#1F2933]">Recent Bookings Activity</h2>
        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-sm">No bookings have occurred recently.</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="border-b pb-3 items-center flex justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{b.customerName} <span className="text-sm font-normal text-gray-500">booked</span> {b.professionalName}</p>
                  <p className="text-xs text-gray-400">Service: {b.service} | {b.date} at {b.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#C9A227]">₹{b.price || 0}</p>
                  <p className="text-xs text-gray-500">{b.paymentStatus === 'Paid' ? 'Paid' : 'Pending'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
