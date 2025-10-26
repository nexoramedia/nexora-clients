import { useState, useCallback } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Get base URL from environment variables
  const getBaseUrl = useCallback(() => {
    // For Vite environment variables
    return import.meta.env.VITE_API_URL || "http://localhost:5000";
  }, []);

  const buildUrl = useCallback(
    (endpoint) => {
      const baseUrl = getBaseUrl();

      // Ensure endpoint starts with a slash
      const formattedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;

      return `${baseUrl}${formattedEndpoint}`;
    },
    [getBaseUrl]
  );

  const callApi = useCallback(
    async (endpoint, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(endpoint);

        const config = {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        };

        // Add token to headers if available
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, config);

        if (!response.ok) {
          // Try to get error message from response body
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err.message || "An error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  // GET request
  const get = useCallback(
    (endpoint, options = {}) => {
      return callApi(endpoint, { ...options, method: "GET" });
    },
    [callApi]
  );

  // POST request
  const post = useCallback(
    (endpoint, body, options = {}) => {
      return callApi(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    [callApi]
  );

  // PUT request
  const put = useCallback(
    (endpoint, body, options = {}) => {
      return callApi(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    [callApi]
  );

  // PATCH request
  const patch = useCallback(
    (endpoint, body, options = {}) => {
      return callApi(endpoint, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body),
      });
    },
    [callApi]
  );

  // DELETE request
  const del = useCallback(
    (endpoint, options = {}) => {
      return callApi(endpoint, { ...options, method: "DELETE" });
    },
    [callApi]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    patch,
    delete: del,
    clearError,
    clearData,
  };
};

export default useApi;
