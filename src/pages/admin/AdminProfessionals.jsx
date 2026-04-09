import { useAuth } from "../../context/AuthContext";
import { useProfessionals } from "../../pages/professional/ProfessionalContext";

export default function AdminProfessionals() {
  const users = JSON.parse(localStorage.getItem('mock_users_db') || "[]");
  const { professionals } = useProfessionals();

  const roleBasedPros = users.filter((u) => u.roles.includes("professional"));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Professionals</h1>

      {professionals.length > 0 ? (
        professionals.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow mb-3">
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-600">Category: {p.category}</p>
            <p className="text-gray-600">Location: {p.location}</p>
            <p className="text-gray-600">Price: ₹{p.price}</p>
          </div>
        ))
      ) : roleBasedPros.length > 0 ? (
        roleBasedPros.map((p) => (
          <div key={p.email} className="bg-white p-4 rounded shadow mb-3">
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-600">{p.email}</p>
            <p className="text-gray-600">Address: {p.address || "Not set"}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No professionals registered yet.</p>
      )}
    </div>
  );
}
