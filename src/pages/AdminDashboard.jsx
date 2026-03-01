import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

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
          <p className="text-gray-500">View and manage registered users</p>
        </div>

        <div
          onClick={() => navigate("/admin/professionals")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Professionals</h3>
          <p className="text-gray-500">Approve and monitor service providers</p>
        </div>

        <div
          onClick={() => navigate("/admin/services")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Service Listings</h3>
          <p className="text-gray-500">Control available service categories</p>
        </div>

        <div
          onClick={() => navigate("/admin/bookings")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">All Bookings</h3>
          <p className="text-gray-500">Monitor booking activity and status</p>
        </div>

        <div
          onClick={() => navigate("/admin/payments")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Payments</h3>
          <p className="text-gray-500">Track transactions and revenue</p>
        </div>

        <div
          onClick={() => navigate("/admin/settings")}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">System Settings</h3>
          <p className="text-gray-500">Configure platform preferences</p>
        </div>

      </div>
    </div>
  );
}