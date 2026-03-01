import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { registerUser, verifyEmail } = useAuth();

  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password)
      return alert("Fill all fields");

    if (password !== confirm)
      return alert("Passwords do not match");

    registerUser({
      name,
      email,
      password,
      roles: [role],
      verified: false,
    });

    alert("Verification email sent (simulation)");
    setVerificationSent(true);
  };

  const handleVerify = () => {
    verifyEmail(email);
    alert("Email verified successfully");
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
          Create your account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join Suvidha Elite and get started
        </p>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          {["user", "professional", "admin", "support"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg ${
                role === r ? "bg-white shadow font-semibold text-[#1F2933]" : ""
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {!verificationSent ? (
          <div className="space-y-4">

            <input
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              onClick={handleRegister}
              className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-xl font-semibold hover:bg-yellow-500"
            >
              Create Account
            </button>

          </div>
        ) : (
          <div className="text-center space-y-4">
            <p>Click to verify your email:</p>
            <button
              onClick={handleVerify}
              className="bg-[#C9A227] text-[#1F2933] px-6 py-3 rounded-xl"
            >
              Verify Email
            </button>
          </div>
        )}

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C9A227] font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}