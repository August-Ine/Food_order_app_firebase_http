import { useState, useCallback } from "react";

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      applyData && applyData(data);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useRequest;
