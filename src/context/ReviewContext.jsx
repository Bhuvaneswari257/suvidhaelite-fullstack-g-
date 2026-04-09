import { createContext, useContext, useState, useEffect } from "react";
import reviewService from "../services/reviewService";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialReviews = async () => {
      try {
        setIsLoading(true);
        // Our mock service accepts empty string/undefined to return all reviews
        const result = await reviewService.getReviewsForProfessional();
        if (result.success) {
          setReviews(result.data || []);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialReviews();
  }, []);

  // =========================================
  // FETCH REVIEWS FOR PROFESSIONAL
  // =========================================
  const fetchReviewsForProfessional = async (professionalId) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await reviewService.getReviewsForProfessional(
        professionalId
      );

      if (result.success) {
        return { success: true, data: result.data || [] };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to fetch reviews";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // ADD REVIEW
  // =========================================
  const addReview = async (bookingId, reviewData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await reviewService.addReview(bookingId, reviewData);

      if (result.success) {
        const newReview = result.data;
        setReviews(prev => [...prev, newReview]);
        return { success: true, data: newReview };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to add review";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // UPDATE REVIEW
  // =========================================
  const updateReview = async (reviewId, reviewData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await reviewService.updateReview(reviewId, reviewData);

      if (result.success) {
        setReviews(prev =>
          prev.map(r => (r.id === reviewId ? result.data : r))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to update review";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // DELETE REVIEW
  // =========================================
  const deleteReview = async (reviewId) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await reviewService.deleteReview(reviewId);

      if (result.success) {
        setReviews(prev => prev.filter(r => r.id !== reviewId));
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errMsg = err.message || "Failed to delete review";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // GET LOCAL REVIEWS
  // =========================================
  const getReviewsForProfessional = (identifier) => {
    return reviews.filter(r => r.professionalId === identifier || r.professionalName === identifier);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        fetchReviewsForProfessional,
        addReview,
        updateReview,
        deleteReview,
        getReviewsForProfessional,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}
