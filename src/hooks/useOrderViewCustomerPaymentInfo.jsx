import { useState } from "react";
import { backendURL } from "@/constants";

const useOrderViewCustomerPaymentInfo = () => {
  const access_token = localStorage.getItem("access_token");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const changePaymentInfo = (infoJSON) => {
    /*
     * TODO: Add logic to update the information of the payment info
     */
    setPaymentInfo(infoJSON);
    setIsLoading(false);
  };

  const loadPaymentInfo = async (orderId) => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await fetch(
      `${backendURL}/api/payment/get-invoice/?order_id=${orderId}`,
      fetchOptions
    );

    if (response.ok) setIsLoading(true);
    else {
      const data = await response.json();
      console.log(data);
    }
  };

  return {
    paymentInfo,
    isLoading,
    changePaymentInfo,
    loadPaymentInfo,
  };
};

export default useOrderViewCustomerPaymentInfo;
