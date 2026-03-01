import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews((prev) => [...prev, review]);
  };

  const getReviewsForProfessional = (name) => {
    return reviews.filter((r) => r.professionalName === name);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewsForProfessional }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}