import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNotifications } from "./NotificationContext";

const SupportContext = createContext();

export function SupportProvider({ children }) {

  const { userRole } = useAuth();
  const { addNotification } = useNotifications();

  const [tickets, setTickets] = useState([]);

  // ===============================
  // CREATE SUPPORT TICKET
  // ===============================
  const createTicket = ({ title, description, type }) => {
    const newTicket = {
      id: Date.now(),
      title,
      description,
      type,              // inquiry / booking / payment / etc
      reportedBy: userRole,
      status: "OPEN",
      createdAt: new Date().toLocaleString(),
      resolution: ""
    };

    setTickets(prev => [...prev, newTicket]);

    // notify support team
    addNotification?.(
      `New ${type} ticket reported by ${userRole}`
    );
  };

  // ===============================
  // RESOLVE TICKET (support action)
  // ===============================
  const resolveTicket = (id, resolutionText) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              status: "RESOLVED",
              resolution: resolutionText
            }
          : t
      )
    );

    addNotification?.("A support ticket was resolved");
  };

  // ===============================
  // CLOSE TICKET
  // ===============================
  const closeTicket = (id) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: "CLOSED" }
          : t
      )
    );
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        createTicket,
        resolveTicket,
        closeTicket
      }}
    >
      {children}
    </SupportContext.Provider>
  );
}

export const useSupport = () => useContext(SupportContext);