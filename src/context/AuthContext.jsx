import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const INACTIVITY_TIMEOUT_MS = Number(import.meta.env.VITE_INACTIVITY_TIMEOUT_MS || 120000);
const LOGOUT_REASON_KEY = "auth_logout_reason";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        if (authService.isLoggedIn()) {
          const result = await authService.getCurrentUser();
          if (result.success) {
            setUser(result.data);
            setUserRole(result.data.role || result.data.roles?.[0]);
            setIsAuthenticated(true);
          } else {
            await authService.logout();
            setUser(null);
            setUserRole(null);
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        await authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    let timeoutId;
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        logout("inactive");
      }, INACTIVITY_TIMEOUT_MS);
    };

    events.forEach((eventName) => window.addEventListener(eventName, resetTimer));
    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [isAuthenticated]);

  const register = async (email, password, name, address = "", role = "user") => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.register(email, password, name, address, role);

      if (result.success) {
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Registration failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.login(email, password);

      if (result.success) {
        setUser(result.data.user);
        setUserRole(result.data.user.role || result.data.user.roles?.[0]);
        setIsAuthenticated(true);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Login failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (reason = "manual") => {
    if (reason) {
      sessionStorage.setItem(LOGOUT_REASON_KEY, reason);
    }
    await authService.logout();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.verifyEmail(token);

      if (result.success) {
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Email verification failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.forgotPassword(email);

      if (result.success) {
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to send reset email";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.resetPassword(token, newPassword);

      if (result.success) {
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Password reset failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await authService.updateUserProfile(userData);

      if (result.success) {
        setUser(result.data);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Profile update failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = async (role) => {
    try {
      setError(null);
      const result = await authService.switchRole(role);

      if (result.success) {
        setUser(result.data);
        setUserRole(result.data.role || result.data.roles?.[0] || null);
      } else {
        setError(result.error);
      }

      return result;
    } catch (err) {
      const errMsg = err.message || "Unable to switch role";
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isLoading,
        error,
        isAuthenticated,
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        updateUserProfile,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
