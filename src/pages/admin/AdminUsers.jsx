import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { users } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>

      {users.map(u => (
        <div key={u.email} className="bg-white p-4 rounded shadow mb-3">
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Roles:</b> {u.roles.join(", ")}</p>
          <p><b>Verified:</b> {u.verified ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}