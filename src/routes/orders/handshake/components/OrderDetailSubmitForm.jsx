import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { getCSRFToken } from "@/utils/cookie";
import { backendURL } from "@/constants";

const OrderDetailSubmitForm = ({ orderID }) => {
  const form = useRef();
  const csrfToken = useRef();
  const access_token = useSelector((state) => state.userSession.access_token);
  const [rate, setRate] = useState("0");
  const [result, setResult] = useState("");

  const handleRateChange = ({ target }) => {
    if (target.value.length >= 1) {
      if (
        target.value.charAt(target.value.length - 1).match(/[0-9]{1}/) === null
      ) {
        return;
      }
      if (target.value.length >= 2 && target.value.charAt(0) === "0") {
        return;
      }
      if (target.value.length >= 2) {
        if (parseInt(target.value) > 30) {
          setRate("30");
          return;
        }
      }
    }
    setRate(target.value);
  };

  const handleSubmitAsync = async () => {
    if (typeof rate != "string") setRate("0");
    const formDataObjectString = JSON.stringify({
      rate: rate,
      order_id: orderID,
    });

    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken.current,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: formDataObjectString,
    };

    const url = `${backendURL}/api/sign-user-up-order/`;
    const resp = await fetch(url, fetchOptions);

    if (resp.status == 201) setResult("Success");
    else if (resp.status == 400) setResult("Failure");
    else setResult("Unknown");
  };

  const useEffectAsync = async () => {
    const csrf = await getCSRFToken();
    csrfToken.current = csrf;
  };

  useEffect(() => {
    useEffectAsync();
  }, []);

  return (
    <div className="mt-8">
      <h4 className="text-4xl">Interested?</h4>
      <div>
        <h5 className="mt-3 font-light">Type your discount rate and apply!</h5>
        <div className="mt-5 rounded-lg bg-blue-100 p-6">
          <form id="orderDetailSubmitForm" ref={form}>
            <p>{result}</p>
            <label className="text-sm block mb-2 font-medium" htmlFor="rate">
              Discount Rate (0 ~ 30%)
            </label>
            <input type="hidden" name="order_id" value={orderID} />
            <input
              className="block w-full p-4 text-gray-900 border border-gray-100 rounded-lg bg-gray-50 sm:text-md"
              id="rate"
              name="rate"
              value={rate}
              onChange={handleRateChange}
            />
          </form>
          <button
            className="p-3 bg-black text-white"
            onClick={() => {
              handleSubmitAsync();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSubmitForm;
