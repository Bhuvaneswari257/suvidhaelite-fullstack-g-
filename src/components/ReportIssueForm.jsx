import { useState } from "react";
import { useSupport } from "../context/SupportContext";
import { useAuth } from "../context/AuthContext";

export default function ReportIssueForm() {

  const { createTicket } = useSupport();
  const { userRole } = useAuth();

  const [type, setType] = useState("Booking Issue");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!message) return alert("Describe the problem");

    createTicket({
      reportedBy: userRole,
      type,
      priority,
      message
    });

    alert("Issue reported to support team");
    setMessage("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">

      <h3 className="text-xl font-semibold">
        Report a Problem
      </h3>

      {/* TYPE */}
      <select
        className="border p-2 w-full"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option>Booking Issue</option>
        <option>Payment Problem</option>
        <option>Service Complaint</option>
        <option>Account Issue</option>
        <option>Other</option>
      </select>

      {/* PRIORITY */}
      <select
        className="border p-2 w-full"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      {/* MESSAGE */}
      <textarea
        placeholder="Explain your issue..."
        className="border p-2 w-full"
        rows="4"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded font-semibold"
      >
        Submit Complaint
      </button>
    </div>
  );
}