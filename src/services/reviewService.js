import { mapErrorMessage } from '../utils/errorHandler';

const REVIEWS_DB_KEY = 'mock_reviews';

const getDb = () => JSON.parse(localStorage.getItem(REVIEWS_DB_KEY) || "[]");
const saveDb = (db) => localStorage.setItem(REVIEWS_DB_KEY, JSON.stringify(db));

const reviewService = {
  getReviewsForProfessional: async (professionalId) => {
    try {
      const db = getDb();
      // Allow filtering by exact ID or if not passed explicitly, return all to be safe for mock
      const reviews = professionalId
        ? db.filter(r => r.professionalId === professionalId || r.professionalName === professionalId)
        : db;
      return { success: true, data: reviews };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  addReview: async (bookingId, reviewData) => {
    try {
      const db = getDb();
      const newReview = {
        id: Date.now().toString(),
        bookingId,
        ...reviewData,
        date: new Date().toISOString(),
      };
      db.push(newReview);
      saveDb(db);
      return { success: true, data: newReview };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateReview: async (reviewId, reviewData) => {
    try {
      const db = getDb();
      const index = db.findIndex(r => r.id === reviewId);
      if (index !== -1) {
        db[index] = { ...db[index], ...reviewData };
        saveDb(db);
        return { success: true, data: db[index] };
      }
      return { success: false, error: "Not found" };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  deleteReview: async (reviewId) => {
    try {
      let db = getDb();
      db = db.filter(r => r.id !== reviewId);
      saveDb(db);
      return { success: true, data: { id: reviewId } };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default reviewService;
