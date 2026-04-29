import { createContext, useContext, useState, useEffect } from "react";
import bookingService from "../services/bookingService";
import { useNotifications } from "./NotificationContext";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { addNotification } = useNotifications();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [isAuthenticated]);

  // =========================================
  // FETCH ALL BOOKINGS
  // =========================================
  const fetchBookings = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await bookingService.getMyBookings();

      if (result.success) {
        setBookings(result.data || []);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch bookings";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // CREATE BOOKING
  // =========================================
  const addBooking = async (bookingData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await bookingService.createBooking(bookingData);

      if (result.success) {
        const newBooking = result.data;
        setBookings(prev => [...prev, newBooking]);
        addNotification({
          message: `New booking confirmed for ${bookingData.service}`,
          type: "BOOKING",
        });
        return { success: true, data: newBooking };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to create booking";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // UPDATE BOOKING STATUS
  // =========================================
  const updateStatus = async (bookingId, newStatus) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await bookingService.updateBookingStatus(
        bookingId,
        newStatus
      );

      if (result.success) {
        setBookings(prev =>
          prev.map(b => (b.id === bookingId ? result.data : b))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to update booking status";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // CANCEL BOOKING
  // =========================================
  const cancelBooking = async (bookingId) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await bookingService.cancelBooking(bookingId);

      if (result.success) {
        setBookings(prev =>
          prev.map(b =>
            b.id === bookingId ? { ...b, status: "Cancelled" } : b
          )
        );
        addNotification({
          message: "Booking cancelled",
          type: "NOTIFICATION",
        });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to cancel booking";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // PAYMENT FOR BOOKING
  // =========================================
  const payForBooking = async (bookingId, paymentData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await bookingService.payForBooking(
        bookingId,
        paymentData
      );

      if (result.success) {
        setBookings(prev =>
          prev.map(b =>
            b.id === bookingId ? { ...b, paymentStatus: "Paid" } : b
          )
        );
        addNotification({
          message: "Payment processed successfully",
          type: "PAYMENT",
        });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Payment failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        isLoading,
        error,
        fetchBookings,
        addBooking,
        updateStatus,
        cancelBooking,
        payForBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);
