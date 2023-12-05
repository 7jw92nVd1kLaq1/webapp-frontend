import { useState } from "react";

import { backendURL } from "@/constants";

const useOrderViewCustomerPaymentInfo = (props) => {
  const access_token = localStorage.getItem("access_token");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const changePaymentInfo = (infoJSON) => {
    setPaymentInfo(infoJSON);
    setIsLoading(false);
  };

  const loadPaymentInfo = async (orderId) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    };

    const response = await fetch(
      `${backendURL}/api/order/viewCustomerPaymentInfo`,
      fetchOptions
    );

    if (response.ok) setIsLoading(true);
  };

  return {
    paymentInfo,
    isLoading,
    changePaymentInfo,
    loadPaymentInfo,
  };
};
