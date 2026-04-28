import { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";
import { mapErrorMessage } from "../utils/errorHandler";

const EarningsContext = createContext();

export function EarningsProvider({ children }) {
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    byDate: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================================
  // FETCH EARNINGS
  // =========================================
  const fetchEarnings = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await apiClient.get('/api/earnings');
      
      setEarnings({
        totalEarnings: response.data.totalEarnings || 0,
        byDate: response.data.byDate || [],
      });
      
      return { success: true };
    } catch (err) {
      const errMsg = mapErrorMessage(err);
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // FETCH EARNINGS BY DATE RANGE
  // =========================================
  const fetchEarningsByDate = async (startDate, endDate) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await apiClient.get('/api/earnings/summary', {
        params: { startDate, endDate },
      });
      
      return { success: true, data: response.data };
    } catch (err) {
      const errMsg = mapErrorMessage(err);
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EarningsContext.Provider
      value={{
        ...earnings,
        isLoading,
        error,
        fetchEarnings,
        fetchEarningsByDate,
      }}
    >
      {children}
    </EarningsContext.Provider>
  );
}

export const useEarnings = () => useContext(EarningsContext);
