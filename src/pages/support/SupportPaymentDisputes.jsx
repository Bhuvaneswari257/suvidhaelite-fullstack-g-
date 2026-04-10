import { useState } from "react";
import { useSupport } from "../../context/SupportContext";

export default function SupportPaymentDisputes() {
  const { tickets, resolveTicket, closeTicket } = useSupport();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [resolution, setResolution] = useState("");

  // Filter payment tickets
  const paymentTickets = tickets.filter(t => t.type === "payment");

  const handleResolve = (ticketId) => {
    if (resolution.trim()) {
      resolveTicket(ticketId, resolution);
      setResolution("");
      setSelectedTicket(null);
    }
  };

  const handleClose = (ticketId) => {
    closeTicket(ticketId);
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1F2933]">
          Payment Disputes
        </h1>
        <p className="text-gray-600">
          Assist with refunds, billing conflicts, and payment-related issues.
        </p>
      </div>

      {paymentTickets.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-center">No payment dispute tickets at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{ticket.title}</h3>
                  <p className="text-sm text-gray-500">
                    Reported by: {ticket.reportedBy} • {ticket.createdAt}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticket.status === "OPEN" ? "bg-red-100 text-red-800" :
                  ticket.status === "RESOLVED" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {ticket.status}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{ticket.description}</p>

              {ticket.resolution && (
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <p className="font-medium text-blue-800">Resolution:</p>
                  <p className="text-blue-700">{ticket.resolution}</p>
                </div>
              )}

              {ticket.status === "OPEN" && (
                <div className="space-y-3">
                  {selectedTicket === ticket.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        placeholder="Enter resolution details..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                        rows="3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded-lg font-medium hover:bg-[#b8941f] transition-colors"
                        >
                          Resolve Dispute
                        </button>
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedTicket(ticket.id)}
                      className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded-lg font-medium hover:bg-[#b8941f] transition-colors"
                    >
                      Handle Dispute
                    </button>
                  )}
                </div>
              )}

              {ticket.status === "RESOLVED" && (
                <button
                  onClick={() => handleClose(ticket.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Close Ticket
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}