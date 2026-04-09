import { createContext, useContext, useState, useEffect } from "react";
import professionalService from "../services/professionalService";

const ProfessionalContext = createContext();

export function ProfessionalProvider({ children }) {
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  // =========================================
  // FETCH ALL PROFESSIONALS
  // =========================================
  const fetchProfessionals = async (filters = {}) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await professionalService.getAllProfessionals(filters);

      if (result.success) {
        setProfessionals(result.data || []);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch professionals";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // SEARCH PROFESSIONALS
  // =========================================
  const searchProfessionals = async (query, category = null) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await professionalService.searchProfessionals(
        query,
        category
      );

      if (result.success) {
        setProfessionals(result.data || []);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Search failed";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // REGISTER AS PROFESSIONAL
  // =========================================
  const addProfessional = async (profileData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await professionalService.registerAsProfessional(
        profileData
      );

      if (result.success) {
        const newProfessional = result.data;
        setProfessionals(prev => [...prev, newProfessional]);
        return { success: true, data: newProfessional };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to register as professional";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // UPDATE PROFESSIONAL PROFILE
  // =========================================
  const updateProfessional = async (professionalId, profileData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await professionalService.updateProfessionalProfile(
        professionalId,
        profileData
      );

      if (result.success) {
        setProfessionals(prev =>
          prev.map(p => (p.id === professionalId ? result.data : p))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to update profile";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // REMOVE BOOKED TIMESLOT
  // =========================================
  const removeAvailableTimeSlot = async (professionalId, bookedTimeSlot) => {
    try {
      const result = await professionalService.updateAvailability(professionalId, bookedTimeSlot);
      if (result.success) {
         fetchProfessionals(); // Refresh state silently so slots disappear
         return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  };

  return (
    <ProfessionalContext.Provider
      value={{
        professionals,
        isLoading,
        error,
        fetchProfessionals,
        searchProfessionals,
        addProfessional,
        updateProfessional,
        removeAvailableTimeSlot,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
}

export const useProfessionals = () => useContext(ProfessionalContext);
