import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ FIXED PATH
import { useNavigate, Link } from "react-router-dom";

const LOGOUT_REASON_KEY = "auth_logout_reason";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const logoutReason = sessionStorage.getItem(LOGOUT_REASON_KEY);
    if (logoutReason === "inactive") {
      setMessage("You were logged out because the session was idle.");
    }
    if (logoutReason) {
      sessionStorage.removeItem(LOGOUT_REASON_KEY);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (!result.success) {
      setMessage(result.error || "Invalid credentials");
      return;
    }

    const destinationByRole = {
      admin: "/admin",
      support: "/support",
      professional: "/professional",
      user: "/user",
    };

    navigate(destinationByRole[result.data.user.role] || "/");
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
          Welcome back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to your Suvidha Elite account
        </p>

        {message && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label>Email</label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-4 py-3 mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              required
              className="w-full border rounded-lg px-4 py-3 mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-[#C9A227] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#C9A227] font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
