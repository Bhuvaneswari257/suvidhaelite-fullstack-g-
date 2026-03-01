import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // 🔹 existing role state (UNCHANGED)
  const [userRole, setUserRole] = useState(null);

  // 🔹 store logged-in user object
  const [user, setUser] = useState(null);

  // 🔹 in-memory users database (simulation)
  const [users, setUsers] = useState([]);

  // ===============================
  // LOGIN (BACKWARD COMPATIBLE)
  // ===============================

  const login = (role, userData = null) => {
    setUserRole(role);

    // if login with full user object
    if (userData) {
      setUser(userData);
    }
  };

  // ===============================
  // LOGOUT
  // ===============================

  const logout = () => {
    setUserRole(null);
    setUser(null);
  };

  // ===============================
  // REGISTER NEW USER
  // ===============================

  const registerUser = (newUser) => {
    const exists = users.find(u => u.email === newUser.email);
    if (exists) {
      alert("User already exists");
      return;
    }

    setUsers(prev => [...prev, newUser]);
  };

  // ===============================
  // EMAIL VERIFICATION
  // ===============================

  const verifyEmail = (email) => {
    setUsers(prev =>
      prev.map(u =>
        u.email === email
          ? { ...u, verified: true }
          : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        user,
        users,

        login,
        logout,
        registerUser,
        verifyEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);