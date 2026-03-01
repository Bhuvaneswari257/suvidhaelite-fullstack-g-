import { Link } from "react-router-dom";
import { useSupport } from "../context/SupportContext";

export default function SupportDashboard() {

  const { tickets } = useSupport();

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-[#1F2933]">
          Support Dashboard
        </h1>
        <p className="text-[#C9A227]">
          Assist users and resolve service issues
        </p>
      </div>

      {/* ========================= */}
      {/* SUPPORT ACTION CARDS */}
      {/* ========================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <Link to="/support-inquiries">
          <Card title="User Inquiries" desc="Respond to customer questions and concerns" />
        </Link>

        <Link to="/support-booking-issues">
          <Card title="Booking Issues" desc="Handle cancellations and scheduling conflicts" />
        </Link>

        <Link to="/support-payment-disputes">
          <Card title="Payment Disputes" desc="Assist with refunds and transaction problems" />
        </Link>

        <Link to="/support-professional-help">
          <Card title="Professional Assistance" desc="Help service providers resolve issues" />
        </Link>

        <Link to="/support-feedback">
          <Card title="Feedback Monitoring" desc="Review ratings and customer feedback" />
        </Link>

        <Link to="/support-escalations">
          <Card title="Escalations" desc="Manage high-priority complaints" />
        </Link>

      </div>

      {/* ========================= */}
      {/* LIVE COMPLAINTS */}
      {/* ========================= */}
      <div className="bg-white shadow-md rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-4">
          Incoming Complaints
        </h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500">No issues reported</p>
        ) : (
          <div className="space-y-3">
            {tickets.map(t => (
              <div key={t.id} className="border p-4 rounded">

                <div className="flex justify-between">
                  <h3 className="font-semibold">{t.title}</h3>
                  <span className="text-sm text-gray-500">{t.status}</span>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  {t.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Reported by: {t.reportedBy}
                </p>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

/* reusable card */
function Card({ title, desc }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}