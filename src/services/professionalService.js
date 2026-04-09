import { mapErrorMessage } from '../utils/errorHandler';

const PROS_DB_KEY = 'mock_professionals';

const getDb = () => JSON.parse(localStorage.getItem(PROS_DB_KEY) || "[]");
const saveDb = (db) => localStorage.setItem(PROS_DB_KEY, JSON.stringify(db));

const professionalService = {
  getAllProfessionals: async (filters = {}) => {
    return { success: true, data: getDb() };
  },

  searchProfessionals: async (query, category = null) => {
    let db = getDb();
    if (query) {
      db = db.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
    }
    if (category) {
      db = db.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return { success: true, data: db };
  },

  getProfessionalById: async (professionalId) => {
    const db = getDb();
    const found = db.find(p => p.id === professionalId);
    if(found) return { success: true, data: found };
    return { success: false, error: "Not found" };
  },

  registerAsProfessional: async (profileData) => {
    try {
      const db = getDb();
      // To simulate update safely, map by explicit email
      const existingIndex = db.findIndex(p => p.email && Math.abs(p.email.localeCompare(profileData.email)) === 0);
      let newProfessional;
      
      if (existingIndex !== -1) {
        newProfessional = { ...db[existingIndex], ...profileData };
        db[existingIndex] = newProfessional;
      } else {
        newProfessional = { ...profileData, id: Date.now().toString() };
        db.push(newProfessional);
      }
      saveDb(db);
      return { success: true, data: newProfessional };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateProfessionalProfile: async (professionalId, profileData) => {
    try {
      const db = getDb();
      const existingIndex = db.findIndex(p => p.id === professionalId);
      if (existingIndex !== -1) {
        db[existingIndex] = { ...db[existingIndex], ...profileData };
        saveDb(db);
        return { success: true, data: db[existingIndex] };
      }
      return { success: false, error: "Not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getProfessionalServices: async (professionalId) => {
    return { success: true, data: [] }; 
  },

  updateProfessionalServices: async (professionalId, services) => {
    return { success: true, data: [] }; 
  },

  updateAvailability: async (professionalId, bookedTimeSlot) => {
    try {
      const db = getDb();
      const index = db.findIndex(p => p.id === professionalId);
      if (index !== -1 && db[index].availableTimes) {
        // Remove the exact booked timeslot from the professional's mock array
        db[index].availableTimes = db[index].availableTimes.filter(t => t !== bookedTimeSlot);
        saveDb(db);
        return { success: true, data: db[index] };
      }
      return { success: false, error: "Not found or no times" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default professionalService;
