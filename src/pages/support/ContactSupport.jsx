import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSupport } from "../../context/SupportContext";

export default function ContactSupport() {
  const { userRole } = useAuth();
  const { createTicket } = useSupport();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      setMessage("Please provide both a subject and a description.");
      return;
    }

    createTicket({
      title: subject.trim(),
      description: description.trim(),
      type: issueType
    });

    setSubject("");
    setDescription("");
    setIssueType("inquiry");
    setMessage("Your request has been submitted to support.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-semibold text-[#1F2933] mb-3">
          Contact Support
        </h1>
        <p className="text-gray-600 mb-6">
          {userRole === "support"
            ? "Use this form to raise an internal support request or escalate an issue."
            : "Send a message to the support team and we will respond as soon as possible."}
        </p>

        <div className="space-y-6">
          <div className="rounded-xl bg-[#F9FAF7] border border-gray-200 p-6">
            <p className="font-medium mb-2">Need urgent help?</p>
            <p className="text-gray-600">Submit a ticket and our support specialists will review it immediately.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              >
                <option value="inquiry">General Inquiry</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment Dispute</option>
                <option value="professional">Professional Support</option>
                <option value="feedback">Feedback/Complaint</option>
                <option value="escalation">Urgent Escalation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                placeholder="Describe the issue in one sentence"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                rows="6"
                placeholder="Provide as much detail as possible about your issue..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
            >
              Send to Support
            </button>
          </form>

          {message && <p className="text-green-600">{message}</p>}

          <div className="text-sm text-gray-600">
            <p>If you need faster help, contact our support team through the application or via email at <strong>support@suvidha.example</strong>.</p>
          </div>

          <div className="text-right">
            <Link to="/" className="text-[#C9A227] hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
