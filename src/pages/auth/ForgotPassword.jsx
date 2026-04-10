import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword(email);
    if (result.success) {
      setMessage("If an account with that email exists, a password reset link has been sent.");
    } else {
      setMessage(result.error || "Unable to process that request right now.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-[#F9FAF7]">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#C9A227] rounded-xl flex items-center justify-center text-[#1F2933] text-2xl font-bold">
            S
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-[#1F2933]">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        <div className="text-center mt-6">
          <Link to="/login" className="text-[#C9A227] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
