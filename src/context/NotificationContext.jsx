import { createContext, useContext, useEffect, useState } from "react";
import notificationService from "../services/notificationService";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================================
  // FETCH ALL NOTIFICATIONS
  // =========================================
  const fetchNotifications = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await notificationService.getNotifications();

      if (result.success) {
        setNotifications(result.data || []);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch notifications";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // ADD NOTIFICATION
  // =========================================
  const addNotification = async (notification) => {
    const result = await notificationService.createNotification(notification);
    if (result.success) {
      setNotifications(prev => [result.data, ...prev]);
    }
  };

  // =========================================
  // MARK AS READ
  // =========================================
  const markAsRead = async (notificationId) => {
    try {
      setError(null);
      const result = await notificationService.markAsRead(notificationId);

      if (result.success) {
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to mark as read";
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  // =========================================
  // MARK ALL AS READ
  // =========================================
  const markAllAsRead = async () => {
    try {
      setError(null);
      const result = await notificationService.markAllAsRead();

      if (result.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to mark all as read";
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  // =========================================
  // DELETE NOTIFICATION
  // =========================================
  const deleteNotification = async (notificationId) => {
    try {
      setError(null);
      const result = await notificationService.deleteNotification(notificationId);

      if (result.success) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to delete notification";
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isLoading,
        error,
        fetchNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated]);
