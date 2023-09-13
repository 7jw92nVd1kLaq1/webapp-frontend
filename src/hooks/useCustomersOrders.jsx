import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useCustomersOrdersDetails from "./useCustomersOrdersDetails";

import {
  resetAdditionalEntriesDetails,
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
  const { setCostDetail } = useCustomersOrdersDetails();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomersOrders = async () => {
    dispatch(resetAdditionalEntriesDetails());
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
    let resp_json;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/list-requests/?page=${pageNumber}`,
        fetchOptions
      );
      resp_json = await response.json();
      console.log(resp_json);
      dispatch(setPageRange(resp_json.page_range));
      dispatch(setEntries(resp_json.results));
    } catch (e) {
      setError("There was an error while fetching orders. Please try again.");
    }

    for (const entry of resp_json.results) {
      if (entry.payment) {
        setCostDetail(
          entry.url_id,
          entry.order_items,
          entry.payment.payment.additional_cost,
          entry.payment.payment.order_payment_balance.payment_method.name,
          entry.payment.payment.order_payment_balance.payment_method.rate
        );
      }
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
