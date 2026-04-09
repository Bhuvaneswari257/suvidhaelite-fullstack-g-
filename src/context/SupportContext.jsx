import { createContext, useContext, useState } from "react";
import supportService from "../services/supportService";
import { useNotifications } from "./NotificationContext";

const SupportContext = createContext();

export function SupportProvider({ children }) {
  const { addNotification } = useNotifications();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================================
  // FETCH ALL TICKETS
  // =========================================
  const fetchTickets = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.getMyTickets();

      if (result.success) {
        setTickets(result.data || []);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch tickets";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // FETCH ALL GLOBALLY
  // =========================================
  const fetchAllTickets = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.getAllTickets();

      if (result.success) {
        setTickets(result.data || []);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch all tickets";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // FETCH TICKETS BY TYPE
  // =========================================
  const fetchTicketsByType = async (type) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.getTicketsByType(type);

      if (result.success) {
        setTickets(result.data || []);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch tickets";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // CREATE TICKET
  // =========================================
  const createTicket = async (ticketData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.createTicket(ticketData);

      if (result.success) {
        const newTicket = result.data;
        setTickets(prev => [...prev, newTicket]);
        addNotification({
          message: `Support ticket created: ${ticketData.title}`,
          type: "SUPPORT",
        });
        return { success: true, data: newTicket };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to create ticket";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // RESOLVE TICKET
  // =========================================
  const resolveTicket = async (ticketId, resolution) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.resolveTicket(ticketId, resolution);

      if (result.success) {
        setTickets(prev =>
          prev.map(t => (t.id === ticketId ? result.data : t))
        );
        addNotification({
          message: "Support ticket resolved",
          type: "SUPPORT",
        });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to resolve ticket";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // CLOSE TICKET
  // =========================================
  const closeTicket = async (ticketId) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await supportService.closeTicket(ticketId);

      if (result.success) {
        setTickets(prev =>
          prev.map(t => (t.id === ticketId ? result.data : t))
        );
        addNotification({
          message: "Support ticket closed",
          type: "SUPPORT",
        });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to close ticket";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        isLoading,
        error,
        fetchTickets,
        fetchAllTickets,
        fetchTicketsByType,
        createTicket,
        resolveTicket,
        closeTicket,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
}

export const useSupport = () => useContext(SupportContext);
