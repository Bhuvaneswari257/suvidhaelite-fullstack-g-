import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, users } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.roles.includes(role)
    );

    if (!user) return alert("Invalid credentials");
    if (!user.verified) return alert("Please verify your email first");

    login(role, user);
    navigate(`/${role}`);
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

          <div>
            <label>Select Role</label>
            <select
              className="w-full border rounded-lg px-4 py-3 mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="professional">Professional</option>
              <option value="admin">Admin</option>
              <option value="support">Support</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
          >
            Sign In
          </button>
        </form>

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