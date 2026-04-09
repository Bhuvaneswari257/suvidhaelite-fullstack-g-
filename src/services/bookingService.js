import { mapErrorMessage } from '../utils/errorHandler';

const bookingService = {
  /**
   * Get all bookings for current user
   */
  getMyBookings: async () => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      return { success: true, data: bookings };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Get single booking details
   */
  getBookingById: async (bookingId) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      const found = bookings.find(b => b.id === bookingId);
      if(found) return { success: true, data: found };
      return { success: false, error: "Not found" };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Create new booking
   */
  createBooking: async (bookingData) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      const newBooking = { ...bookingData, id: Date.now().toString() };
      bookings.push(newBooking);
      localStorage.setItem('mock_bookings', JSON.stringify(bookings));
      return { success: true, data: newBooking };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (bookingId) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      const index = bookings.findIndex(b => b.id === bookingId);
      if(index !== -1) {
        bookings[index].status = "Cancelled";
        localStorage.setItem('mock_bookings', JSON.stringify(bookings));
        return { success: true, data: bookings[index] };
      }
      return { success: false, error: "Not found" };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Update booking status
   */
  updateBookingStatus: async (bookingId, status) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      const index = bookings.findIndex(b => b.id === bookingId);
      if(index !== -1) {
        bookings[index].status = status;
        localStorage.setItem('mock_bookings', JSON.stringify(bookings));
        return { success: true, data: bookings[index] };
      }
      return { success: false, error: "Not found" };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Process payment for booking
   */
  payForBooking: async (bookingId, paymentData) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      const index = bookings.findIndex(b => b.id === bookingId);
      if(index !== -1) {
        bookings[index].paymentStatus = "Paid";
        localStorage.setItem('mock_bookings', JSON.stringify(bookings));
        return { success: true, data: bookings[index] };
      }
      return { success: false, error: "Not found" };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Get all bookings (admin only)
   */
  getAllBookings: async (filters = {}) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('mock_bookings') || "[]");
      return { success: true, data: bookings };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },
};

export default bookingService;
