import { createContext, useContext, useState, useEffect } from "react";

const ProfessionalContext = createContext();

export function ProfessionalProvider({ children }) {

  // ✅ LOAD FROM LOCAL STORAGE
  const [professionals, setProfessionals] = useState(() => {
    const saved = localStorage.getItem("professionals");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCAL STORAGE (AUTO)
  useEffect(() => {
    localStorage.setItem("professionals", JSON.stringify(professionals));
  }, [professionals]);

  // ✅ ADD PROFESSIONAL
  const addProfessional = (data) => {
    console.log("ADDING PROFESSIONAL:", data);
    const newProfessional = {
      id: Date.now(),
      ...data,
    };

    setProfessionals((prev) => [...prev, newProfessional]);
  };

  return (
    <ProfessionalContext.Provider value={{ professionals, addProfessional }}>
      {children}
    </ProfessionalContext.Provider>
  );
}

export const useProfessionals = () => useContext(ProfessionalContext);