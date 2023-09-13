import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resetState,
  setEntries,
  setPageRange,
} from "@/redux/ListCustomerOrdersSlice";

const useCustomersOrders = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.userSession.username);
  const access_token = useSelector((state) => state.userSession.access_token);
  const pageNumber = useSelector((state) => state.customerRequests.number);
  const pageRange = useSelector((state) => state.customerRequests.pageRange);
  const customersOrders = useSelector(
    (state) => state.customerRequests.entries
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomersOrders = async () => {
    dispatch(resetState());
    setIsLoading(true);

    if (!username) {
      setError("Please Log-in.");
      setIsLoading(false);
      return;
    }

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/list-requests/?page=${pageNumber}`,
        fetchOptions
      );
      const resp_json = await response.json();
      console.log(resp_json);
      dispatch(setPageRange(resp_json.page_range));
      dispatch(setEntries(resp_json.results));
    } catch (e) {
      setError("There was an error while fetching orders. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomersOrders();
  }, [pageNumber]);

  return {
    pageNumber,
    pageRange,
    customersOrders,
    fetchCustomersOrders,
    isLoading,
    error,
  };
};

export default useCustomersOrders;
