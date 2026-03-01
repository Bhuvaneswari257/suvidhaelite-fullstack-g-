import { createContext, useContext, useMemo } from "react";
import { useBookings } from "./BookingContext";

const EarningsContext = createContext();

export function EarningsProvider({ children }) {

  const { bookings } = useBookings();

  const totalEarnings = useMemo(() => {
    return bookings
      .filter(b => b.status === "PAID")
      .reduce((sum, b) => sum + b.price, 0);
  }, [bookings]);

  return (
    <EarningsContext.Provider value={{ totalEarnings }}>
      {children}
    </EarningsContext.Provider>
  );
}

export const useEarnings = () => useContext(EarningsContext);