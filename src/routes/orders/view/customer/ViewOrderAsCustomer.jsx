import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import notification from "@/assets/notification.svg";
import backArrow from "@/assets/back_arrow.svg";
import addIntermediary from "@/assets/add_intermediary.svg";
import deposit from "@/assets/payment.svg";
import waiting from "@/assets/waiting.svg";
import placed from "@/assets/order_placed.svg";
import shipping from "@/assets/shipping.svg";
import done from "@/assets/done.svg";
import send from "@/assets/send.svg";

import { backendURL } from "@/constants";

import { OrderInfo, OrderItemsInfo } from "./components/OrderInfo";
import OrderStageChooser from "./components/OrderStageChooser";

import { useParams } from "react-router-dom";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

import { setOrder } from "@/redux/viewOrderAsCustomerSlice";
import { FailureCircle, WaitingCircle } from "@/utils/waitingCircle";

const OrderProgressIndicatorStage = ({ image, name }) => {
  return (
    <div className="relative">
      <div className="w-20 h-20 rounded-full border border-black">
        <img
          src={image}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <div
        className="absolute top-[110%] left-[50%] w-32"
        style={{ transform: "translate(-50%)" }}
      >
        <p className="font-medium w-full text-center">{name}</p>
      </div>
    </div>
  );
};

const OrderProgressIndicator = () => {
  return (
    <div className="flex justify-center items-center flex-wrap pb-16 text-[16px]">
      <OrderProgressIndicatorStage image={addIntermediary} name={"Add User"} />
      <hr className="w-10 border-black" />
      <OrderProgressIndicatorStage image={deposit} name={"Deposit"} />
      <hr className="w-10 border-black" />
      <OrderProgressIndicatorStage image={waiting} name={"Waiting"} />
      <hr className="w-10 border-black" />
      <OrderProgressIndicatorStage image={placed} name={"Order Placed"} />
      <hr className="w-10 border-black" />
      <OrderProgressIndicatorStage image={shipping} name={"Shipped"} />
      <hr className="w-10 border-black" />
      <OrderProgressIndicatorStage image={done} name={"Complete"} />
    </div>
  );
};

const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="p-5 bg-slate-100 rounded-2xl w-fit max-w-[85%] shadow-md">
        <p className="font-semibold text-right">You</p>
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

const IntermediaryMessage = ({ message }) => {
  return (
    <div className="p-5 bg-slate-100 rounded-2xl w-fit max-w-[85%] shadow-md">
      <p className="font-semibold">Username</p>
      <p className="mt-4">{message}</p>
    </div>
  );
};

const IntermediaryOfferChat = ({ reference, closeCallback }) => {
  return (
    <div
      ref={reference}
      className="fixed flex flex-col top-0 bottom-0 right-0 h-screen bg-white text-black w-0 shadow-lg overflow-y-auto z-20 divide-y divide-slate-300"
    >
      <div className="p-4 bg-red-600">
        <img src={notification} className="block w-7 h-7" />
      </div>
      <div className="px-7 py-8 flex gap-5 items-center">
        <button onClick={closeCallback}>
          <img className="block w-7 h-7" src={backArrow} />
        </button>
        <p className="text-lg">
          Chat with <span className="text-xl font-bold">Username</span>
        </p>
      </div>
      <div className="px-7 py-8 flex flex-col w-full gap-3 grow overflow-y-auto text-[16px]">
        <UserMessage message={"Hey, this is really nice!"} />
        <IntermediaryMessage
          message={
            "I totally agree with you. It's going to be a great opportunity for both of us!"
          }
        />
        <IntermediaryMessage
          message={
            "I totally agree with you. It's going to be a great opportunity for both of us!"
          }
        />
        <IntermediaryMessage
          message={
            "I totally agree with you. It's going to be a great opportunity for both of us!"
          }
        />
        <IntermediaryMessage
          message={
            "I totally agree with you. It's going to be a great opportunity for both of us!"
          }
        />
      </div>
      <div className="h-24 flex p-2 px-7 gap-3 items-center">
        <input
          type="text"
          className="p-2 grow border-0"
          placeholder="Type Your Message"
        />
        <button className="flex items-center justify-center p-3 bg-black text-white rounded-xl shadow-md gap-3">
          <img src={send} className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default function ViewOrderAsCustomer() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const {
    responseData,
    makeAPICall,
    isLoading,
    responseStatusCode,
    callCount,
  } = useSimpleAPICall();
  const access_token = useSelector((state) => state.userSession.access_token);
  const order = useSelector((state) => state.viewOrderAsCustomer.order);

  const cryptocurrencyTicker =
    order && order.payment.payment.payment_methods[0].ticker;

  const intermediaryChatElement = useRef();
  const toggleOrderDetail = () => {
    const elem = intermediaryChatElement.current;
    if (elem.classList.contains("w-0")) {
      elem.classList.remove("w-0");
      elem.classList.add("lg:w-2/5");
      elem.classList.add("md:w-1/2");
      elem.classList.add("w-full");
    } else {
      elem.classList.add("w-0");
      elem.classList.remove("lg:w-2/5");
      elem.classList.remove("md:w-1/2");
      elem.classList.remove("w-full");
    }
  };

  const requestOrderData = async () => {
    if (order) dispatch(setOrder(null));
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    const url = `${backendURL}/api/order-detail/${orderId}/`;
    await makeAPICall(url, fetchOption);
  };

  console.log(order);

  useEffect(() => {
    requestOrderData();
  }, []);

  useEffect(() => {
    if (responseStatusCode === 200) dispatch(setOrder(responseData));

    return () => {
      dispatch(setOrder(null));
    };
  }, [callCount]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <WaitingCircle numbers={100} unit={"px"} />
      </div>
    );
  }

  if (responseStatusCode >= 400) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <FailureCircle numbers={100} unit={"px"} />
        <p className="mt-5 text-[24px] font-medium">Failed to load</p>
        <button
          className="p-3 rounded-xl bg-sky-600 text-white mt-5 text-[16px] font-medium"
          onClick={() => requestOrderData()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (order) {
    return (
      <div>
        <IntermediaryOfferChat
          reference={intermediaryChatElement}
          closeCallback={toggleOrderDetail}
        />
        <div className="px-12 lg:px-16 py-12 bg-white flex flex-col divide-y divide-slate-300 z-10">
          <div className="flex justify-between items-center pb-4 text-[16px]">
            <div className="flex gap-2 items-center">
              <img src={backArrow} className="block w-8 h-8" />
              <button className="block">GO BACK</button>
            </div>
            <div className="md:flex gap-2 hidden">
              <span className="text-stone-500">ORDER ID:</span>
              <p className="">{orderId}</p>
            </div>
          </div>
          <div className="xl:flex justify-between items-start py-10 xl:divide-x divide-y xl:divide-y-0 divide-slate-300">
            <div className="xl:w-3/4 xl:pr-10 divide-y divide-slate-300">
              <OrderProgressIndicator />
              <OrderStageChooser
                order={order}
                intermediaryChat={intermediaryChatElement}
              />
            </div>
            <div className="xl:w-1/4 lg:flex items-start gap-6 xl:block xl:pl-7">
              <OrderInfo
                orderId={order.url_id}
                cryptocurrencyTicker={cryptocurrencyTicker}
                createdDate={order.created_at}
                additionalReq={order.additional_request}
                shippingAddr={order.address.address}
                status={order.status}
              />
              <OrderItemsInfo items={order.order_items} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <WaitingCircle numbers={100} unit={"px"} />
    </div>
  );
}
