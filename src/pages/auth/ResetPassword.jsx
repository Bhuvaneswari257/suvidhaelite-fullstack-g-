import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid reset link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const result = await resetPassword(token, newPassword);
    if (result.success) {
      navigate("/login");
    } else {
      setMessage(result.error || "Invalid or expired reset token.");
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] bg-[#F9FAF7]">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
          <h2 className="text-3xl font-semibold text-[#1F2933] mb-4">Invalid Link</h2>
          <p className="text-gray-500 mb-6">This password reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="text-[#C9A227] hover:underline">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-[#F9FAF7]">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#C9A227] rounded-xl flex items-center justify-center text-[#1F2933] text-2xl font-bold">
            S
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-[#1F2933]">
          Reset Password
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-red-600 mt-4">{message}</p>
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
