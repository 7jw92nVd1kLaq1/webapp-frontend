import "./animations.css";
import checkmark from "@/assets/checkmark.svg";
import failure from "@/assets/failure.svg";

import {
  createCentrifugeClientObj,
  subscribeToChannelForOrderProcess,
} from "@/utils/websocket";
import { getSubscriptionToken } from "@/utils/authentication";
import { getCSRFToken } from "@/utils/cookie";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "@/redux/orderCreationStepsSlice";
import { resetState } from "@/redux/shoppingBasketSlice";

const WaitingCircle = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "conic-gradient(transparent 30%, rgb(125 211 252) 50%)",
        animationName: "spinning",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: "185px",
          height: "185px",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

const CompleteCircle = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "rgba(66,160,70,255)",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: "185px",
          height: "185px",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          className="absolute"
          src={checkmark}
          style={{
            width: "130px",
            height: "130px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

const FailureCircle = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "rgba(244,67,54,255)",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: "185px",
          height: "185px",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          className="absolute"
          src={failure}
          style={{
            width: "130px",
            height: "130px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

export default function ProcessOrder() {
  const centrifugeClientObj = useRef();
  const subToken = useRef();
  const subChannelObj = useRef();

  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.shoppingBasket);
  const access_token = useSelector((state) => state.userSession.access_token);

  const [processStatus, setProcessStatus] = useState(NaN);
  const processStatusObj = {
    ["0"]: "Processing Started",
    ["1"]: "Order Created",
    ["2"]: "Order Creation Successfully Completed",
  };

  const sendOrderData = async () => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": localStorage.getItem("CSRFToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(orderInfo),
    };

    const resp = await fetch(
      "http://127.0.0.1:8000/api/create-order/",
      fetchOptions
    );
    if (!resp.ok) {
      setProcessStatus("-1");
    }
  };

  const useEffectAsync = async () => {
    const csrfToken = await getCSRFToken();
    localStorage.setItem("CSRFToken", csrfToken);

    const sub_token = await getSubscriptionToken();
    subToken.current = sub_token;

    const centrifugeClient = createCentrifugeClientObj(access_token);
    centrifugeClientObj.current = centrifugeClient;

    const subChannel = subscribeToChannelForOrderProcess(
      centrifugeClient,
      subToken.current,
      setProcessStatus
    );

    subChannelObj.current = subChannel;
    subChannelObj.current.subscribe();
    centrifugeClientObj.current.connect();

    await sendOrderData();
  };

  useEffect(() => {
    useEffectAsync();
    return () => {
      subChannelObj.current.unsubscribe();
      centrifugeClientObj.current.disconnect();
    };
  }, []);

  return (
    <div className="text-center text-black lg:w-11/12 w-full mx-auto">
      <h1 className="font-bold text-3xl">Generating Order</h1>
      <div className="w-full md:w-5/6 mt-20 md:flex md:flex-col items-center justify-center mx-auto gap-6 ">
        {processStatus != "-1" && processStatus != "2" ? (
          <WaitingCircle />
        ) : (
          <CompleteCircle />
        )}
        {processStatus === "-1" && <FailureCircle />}
        <p className="text-lg mt-10 font-medium">
          {!isNaN(processStatus) && processStatusObj[processStatus]}
        </p>
      </div>
      <div className="mt-14 flex justify-center items-stretch font-semibold mb-14 gap-5">
        {processStatus === "2" && (
          <button className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white">
            <Link to={"/"}>{"Complete"}</Link>
          </button>
        )}
      </div>
    </div>
  );
}
