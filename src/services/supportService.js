import { mapErrorMessage } from '../utils/errorHandler';

const TICKETS_DB_KEY = 'mock_tickets_db';
const CURRENT_USER_EMAIL_KEY = 'mock_current_user_email';

const getDb = () => {
  try {
    const data = JSON.parse(localStorage.getItem(TICKETS_DB_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
};
const saveDb = (db) => localStorage.setItem(TICKETS_DB_KEY, JSON.stringify(db));

const supportService = {
  getMyTickets: async () => {
    try {
      const email = localStorage.getItem(CURRENT_USER_EMAIL_KEY);
      const db = getDb();
      const myTickets = db.filter(t => t.userEmail === email);
      return { success: true, data: myTickets };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getAllTickets: async (filters = {}) => {
    try {
      return { success: true, data: getDb() };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getTicketsByType: async (type) => {
    try {
      const db = getDb();
      const filtered = db.filter(t => t.type === type);
      return { success: true, data: filtered };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getTicketById: async (ticketId) => {
    try {
      const db = getDb();
      const ticket = db.find(t => t.id === ticketId);
      if (ticket) return { success: true, data: ticket };
      return { success: false, error: "Not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  createTicket: async (ticketData) => {
    try {
      const email = localStorage.getItem(CURRENT_USER_EMAIL_KEY);
      const db = getDb();
      const newTicket = {
        id: Date.now().toString(),
        userEmail: email || "Anonymous",
        status: "Open",
        date: new Date().toISOString().split('T')[0],
        ...ticketData
      };
      db.push(newTicket);
      saveDb(db);
      return { success: true, data: newTicket };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateTicket: async (ticketId, updateData) => {
    try {
      const db = getDb();
      const index = db.findIndex(t => t.id === ticketId);
      if (index !== -1) {
        db[index] = { ...db[index], ...updateData };
        saveDb(db);
        return { success: true, data: db[index] };
      }
      return { success: false, error: "Ticket not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  resolveTicket: async (ticketId, resolution) => {
    try {
      const db = getDb();
      const index = db.findIndex(t => t.id === ticketId);
      if (index !== -1) {
        db[index].status = "Resolved";
        if (resolution) db[index].resolution = resolution;
        saveDb(db);
        return { success: true, data: db[index] };
      }
      return { success: false, error: "Ticket not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  closeTicket: async (ticketId) => {
    try {
      const db = getDb();
      const index = db.findIndex(t => t.id === ticketId);
      if (index !== -1) {
        db[index].status = "Closed";
        saveDb(db);
        return { success: true, data: db[index] };
      }
      return { success: false, error: "Ticket not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default supportService;
