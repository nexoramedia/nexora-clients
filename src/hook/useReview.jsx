// hooks/useReviews.js
import { useState, useEffect } from "react";
import useApi from "./useApi";

export const useReviews = () => {
  const { get, loading, error, data } = useApi();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await get("/api/reviews-with-video");
        if (result?.data?.reviews) {
          setReviews(result.data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [get]);

  return {
    reviews,
    loading,
    error,
  };
};
