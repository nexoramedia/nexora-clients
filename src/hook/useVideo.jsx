// hooks/useVideo.js
import { useState, useEffect } from "react";
import useApi from "./useApi";

export const useVideo = (category) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useApi();

  useEffect(() => {
    const fetchVideosByCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await api.get(`/api/video-reels/category/${category}`);

        if (result?.status === "success") {
          // Access videoReels from the data object based on your API response structure
          setVideos(result.data.videoReels || []);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setError(err.message || "Failed to fetch videos");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchVideosByCategory();
    }
  }, [category]);

  return {
    videos,
    loading,
    error,
  };
};
