import { useAuth } from "../../context/AuthContext";

export default function AdminProfessionals() {
  const { users } = useAuth();

  const pros = users.filter(u => u.roles.includes("professional"));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Professionals</h1>

      {pros.map(p => (
        <div key={p.email} className="bg-white p-4 rounded shadow mb-3">
          {p.name} — {p.email}
        </div>
      ))}
    </div>
  );
}