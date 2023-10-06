import { useRef, useState } from "react";

export const useSimpleAPICall = () => {
  const responseStatusCode = useRef(0);
  const responseData = useRef(null);
  const error = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const makeAPICall = async (url, fetchOptions) => {
    setIsLoading(true);
    responseData.current = null;
    responseStatusCode.current = 0;
    error.current = null;

    try {
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      responseStatusCode.current = response.status;
      responseData.current = data;
    } catch (err) {
      error.current = err;
    }

    setIsLoading(false);

    // Return the data received and stored in a ref "responseData" in case of a user needing the data,
    // because of the updated "responseData" being inconsistently available right after the end of
    // this function.
    return [responseData.current, responseStatusCode.current];
  };

  return {
    responseData: responseData.current,
    responseStatusCode: responseStatusCode.current,
    makeAPICall,
    error: error.current,
    isLoading,
  };
};
