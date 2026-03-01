import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-semibold text-[#1F2933]">
          User Dashboard
        </h1>
        <p className="text-[#C9A227]">
          Manage your services and bookings
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Find Professionals */}
        <Link to="/search">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">
              Find Professionals
            </h3>
            <p className="text-gray-500">
              Browse and hire trusted service providers
            </p>
          </div>
        </Link>

        {/* My Bookings */}
        <Link to="/bookings">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">
              My Bookings
            </h3>
            <p className="text-gray-500">
              View and manage your service bookings
            </p>
          </div>
        </Link>

        {/* NEW — Payments */}
        <Link to="/payments">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">
              Payments
            </h3>
            <p className="text-gray-500">
              View payment history and transactions
            </p>
          </div>
        </Link>

      </div>

    </div>
  );
}