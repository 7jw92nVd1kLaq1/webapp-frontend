import { useRef, useState } from "react";

export const useSimpleAPICall = () => {
  const responseStatusCode = useRef(0);
  const responseData = useRef(null);
  const error = useRef(null);
  const apiCallCount = useRef(0);

  const [isLoading, setIsLoading] = useState(false);

  const makeAPICall = async (url, fetchOptions) => {
    setIsLoading(true);
    responseData.current = null;
    responseStatusCode.current = 0;
    error.current = null;

    try {
      const response = await fetch(url, fetchOptions);
      responseStatusCode.current = response.status;

      const data = await response.json();
      responseData.current = data;
    } catch (err) {
      /*
       * If the error is not a response from the server, then it is a network error.
       * If the status code is not 200, then it is a server error.
       */
      if (responseStatusCode.current != 200) error.current = err.message;
    }

    apiCallCount.current++;
    setIsLoading(false);

    /*
     * Return the data received and stored in a ref "responseData" in case of a user
     * needing the data, because of the updated "responseData" being inconsistently
     * available right after the end of this function.
     */
    return [responseData.current, responseStatusCode.current];
  };

  return {
    responseData: responseData.current,
    responseStatusCode: responseStatusCode.current,
    makeAPICall,
    error: error.current,
    isLoading,
    callCount: apiCallCount.current,
  };
};
