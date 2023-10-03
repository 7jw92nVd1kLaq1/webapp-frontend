import { useRef, useState } from "react";

export const useSimpleAPICall = () => {
  const responseStatusCode = useRef(0);
  const responseData = useRef(null);
  const error = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const makeAPICall = async (url, fetchOptions) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, fetchOptions);
      responseStatusCode.current = response.status;
      responseData.current = await response.json();
      console.log(responseData.current);
    } catch (err) {
      error.current = err;
    }

    setIsLoading(false);
  };

  return {
    responseData: responseData.current,
    responseStatusCode: responseStatusCode.current,
    makeAPICall,
    error: error.current,
    isLoading,
  };
};
