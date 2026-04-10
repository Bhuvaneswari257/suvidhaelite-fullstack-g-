import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSupport } from "../../context/SupportContext";

export default function UserDashboard() {
  const { user, userRole, updateUserProfile } = useAuth();
  const { createTicket } = useSupport();
  const [address, setAddress] = useState(user?.address || "");
  const [saved, setSaved] = useState(false);

  // Support ticket form
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketType, setTicketType] = useState("inquiry");

  useEffect(() => {
    setAddress(user?.address || "");
  }, [user]);

  const handleSaveAddress = async () => {
    if (!user) return;
    await updateUserProfile({ address: address.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCreateTicket = () => {
    if (!ticketTitle.trim() || !ticketDescription.trim()) {
      alert("Please fill in all fields");
      return;
    }

    createTicket({
      title: ticketTitle.trim(),
      description: ticketDescription.trim(),
      type: ticketType
    });

    // Reset form
    setTicketTitle("");
    setTicketDescription("");
    setTicketType("inquiry");
    setShowSupportForm(false);

    alert("Support ticket created successfully! Our support team will respond soon.");
  };

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

      {userRole === "user" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
            My Profile
          </h2>
          <p className="text-gray-600 mb-4">
            Update your delivery address so professionals can contact you when a booking is made.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full border rounded-lg px-4 py-3 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border rounded-lg px-4 py-3 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 mt-1"
                rows={4}
              />
            </div>

            <button
              onClick={handleSaveAddress}
              className="bg-[#C9A227] text-[#1F2933] px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
            >
              Save Address
            </button>
            {saved && (
              <p className="text-green-600">Address updated successfully.</p>
            )}
          </div>
        </div>
      )}

      {/* Support Ticket Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#1F2933]">
            Need Help?
          </h2>
          <button
            onClick={() => setShowSupportForm(!showSupportForm)}
            className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded-lg font-medium hover:bg-[#b8941f] transition-colors"
          >
            {showSupportForm ? "Cancel" : "Report Issue"}
          </button>
        </div>

        {showSupportForm && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              >
                <option value="inquiry">General Inquiry</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment Dispute</option>
                <option value="feedback">Feedback/Complaint</option>
                <option value="escalation">Urgent Escalation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                rows="4"
                placeholder="Please provide detailed information about your issue..."
              />
            </div>

            <button
              onClick={handleCreateTicket}
              className="bg-[#C9A227] text-[#1F2933] px-6 py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
            >
              Submit Support Ticket
            </button>
          </div>
        )}
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

        <Link to="/support/contact">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">
              Contact Support
            </h3>
            <p className="text-gray-500">
              Submit a request directly to the support team if you need help.
            </p>
          </div>
        </Link>

      </div>

    </div>
  );
}