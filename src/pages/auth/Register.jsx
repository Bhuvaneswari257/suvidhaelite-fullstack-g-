import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const getPasswordStrength = (password) => {
  if (!password) {
    return null;
  }

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  if (password.length < 6 || score <= 2) {
    return {
      label: "Weak password",
      className: "text-red-600",
      barClassName: "bg-red-500 w-1/3",
    };
  }

  if (password.length >= 10 && score >= 4) {
    return {
      label: "Strong password",
      className: "text-green-700",
      barClassName: "bg-green-600 w-full",
    };
  }

  return {
    label: "Medium password",
    className: "text-yellow-700",
    barClassName: "bg-[#C9A227] w-2/3",
  };
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const passwordStrength = getPasswordStrength(password);

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      return "Please fill all required fields.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    if (trimmedName.length > 120) {
      return "Full name must be 120 characters or less.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password.length > 100) {
      return "Password must be 100 characters or less.";
    }

    if (password !== confirm) {
      return "Passwords do not match.";
    }

    if (trimmedAddress.length > 500) {
      return "Address must be 500 characters or less.";
    }

    return null;
  };

  const handleRegister = async () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      setSuccessMessage(null);
      setErrorMessage(validationMessage);
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    const result = await register(email.trim(), password, name.trim(), address.trim(), role);

    if (result.success) {
      setSuccessMessage("Account created successfully.");
      setEmail("");
      setName("");
      setPassword("");
      setConfirm("");
      setAddress("");
      window.setTimeout(() => navigate("/login"), 800);
    } else {
      setErrorMessage(result.error || "Unable to register.");
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
          Create your account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join Suvidha Elite and get started
        </p>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

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

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {passwordStrength && (
            <div className="space-y-2">
              <div className="h-2 bg-gray-100 rounded-lg overflow-hidden">
                <div className={`h-full ${passwordStrength.barClassName}`} />
              </div>
              <p className={`text-sm font-semibold ${passwordStrength.className}`}>
                {passwordStrength.label}
              </p>
            </div>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg px-4 py-3"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
          />

          <textarea
            placeholder="Address (optional)"
            className="w-full border rounded-lg px-4 py-3"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded-xl font-semibold hover:bg-yellow-500"
          >
            Create Account
          </button>

        </div>

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
