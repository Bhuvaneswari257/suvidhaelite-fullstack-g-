import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNotifications } from "./NotificationContext";

const BookingContext = createContext();

export function BookingProvider({ children }) {

  const { user, userRole } = useAuth();  // supports both styles
  const { addNotification } = useNotifications();

  const [bookings, setBookings] = useState([]);

  // =========================================
  // ✅ CREATE BOOKING (USER SIDE)
  // =========================================
  const addBooking = (bookingData) => {

    const newBooking = {
      id: Date.now(),

      // PROFESSIONAL CONNECTION
      professionalId: bookingData.professionalId,
      professionalName: bookingData.professionalName,

      // CUSTOMER INFO (SAFE FALLBACK)
      customerId: user?.id || Date.now(),
      customerName: user?.name || userRole || "User",

      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      price: bookingData.price || 0,

      // BUSINESS STATES
      status: "Confirmed",      // user display
      lifecycle: "PENDING",     // professional workflow
      payment: "Pending",
      refund: null,

      createdAt: new Date()
    };

    setBookings(prev => [...prev, newBooking]);

    // 🔔 REAL-TIME PROFESSIONAL NOTIFICATION
    addNotification({
      professionalId: bookingData.professionalId,
      message: `New booking received for ${bookingData.service}`,
      type: "BOOKING",
      bookingId: newBooking.id
    });
  };

  // =========================================
  // ✅ PROFESSIONAL WORKFLOW UPDATE
  // =========================================
  const updateStatus = (id, newStatus) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, lifecycle: newStatus } : b
      )
    );
  };

  // =========================================
  // ✅ USER CANCEL BOOKING + REFUND LOGIC
  // =========================================
  const cancelBooking = (index) => {
    setBookings(prev =>
      prev.map((b, i) => {

        if (i !== index) return b;

        // IF PAYMENT DONE → REFUND
        if (b.payment === "Paid") {
          return {
            ...b,
            status: "Cancelled",
            lifecycle: "CANCELLED",
            refund: "Refunded"
          };
        }

        // NORMAL CANCEL
        return {
          ...b,
          status: "Cancelled",
          lifecycle: "CANCELLED"
        };
      })
    );
  };

  // =========================================
  // ✅ USER PAYMENT
  // =========================================
  const payForBooking = (index) => {
    setBookings(prev =>
      prev.map((b, i) =>
        i === index
          ? {
              ...b,
              payment: "Paid",
              lifecycle: "PAID"
            }
          : b
      )
    );
  };

  // =========================================
  // CONTEXT VALUE
  // =========================================
  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateStatus,
        cancelBooking,
        payForBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);