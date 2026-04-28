import { createContext, useContext, useEffect, useState } from "react";
import professionalService from "../../services/professionalService";

const ProfessionalContext = createContext();

export function ProfessionalProvider({ children }) {
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async (filters = {}) => {
    setError(null);
    setIsLoading(true);

    const result = await professionalService.getAllProfessionals(filters);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return result;
    }

    setProfessionals(result.data || []);
    return { success: true, data: result.data || [] };
  };

  const searchProfessionals = async (query, category = null) => {
    setError(null);
    setIsLoading(true);

    const result = await professionalService.searchProfessionals(query, category);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return result;
    }

    setProfessionals(result.data || []);
    return { success: true, data: result.data || [] };
  };

  const addProfessional = async (data) => {
    setError(null);
    setIsLoading(true);

    const result = await professionalService.registerAsProfessional(data);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return result;
    }

    setProfessionals(prev => {
      const exists = prev.some(pro => pro.id === result.data.id || pro.email === result.data.email);
      return exists
        ? prev.map(pro => (pro.id === result.data.id || pro.email === result.data.email ? result.data : pro))
        : [...prev, result.data];
    });

    return { success: true, data: result.data };
  };

  const updateProfessional = async (professionalId, data) => {
    setError(null);
    setIsLoading(true);

    const result = await professionalService.updateProfessionalProfile(professionalId, data);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return result;
    }

    setProfessionals(prev => prev.map(pro => (pro.id === professionalId ? result.data : pro)));
    return { success: true, data: result.data };
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
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
}

export const useProfessionals = () => useContext(ProfessionalContext);
