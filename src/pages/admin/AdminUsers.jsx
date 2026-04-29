import { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const result = await userService.getAllUsers();
      if (result.success) {
        setUsers(result.data || []);
      } else {
        setError(result.error || "Unable to load users");
      }
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {users.length === 0 ? (
        <p className="text-gray-500">No users have registered yet.</p>
      ) : (
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id || u.email} className="bg-white p-4 rounded shadow mb-3">
              <p className="font-semibold mb-1">{u.name}</p>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {u.email}</p>
              <p className="text-gray-600 mb-1"><strong>Roles:</strong> {(u.roles || [u.role]).join(", ")}</p>
              <p className="text-gray-600 mb-1"><strong>Address:</strong> {u.address || "Not provided"}</p>
              <p className="text-gray-600"><strong>Verified:</strong> {u.verified ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
