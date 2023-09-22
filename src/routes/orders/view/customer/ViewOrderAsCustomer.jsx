import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import notification from "@/assets/notification.svg";

import backArrow from "@/assets/back_arrow.svg";
import confetti from "@/assets/confetti.png";
import addIntermediary from "@/assets/add_intermediary.svg";
import deposit from "@/assets/payment.svg";
import waiting from "@/assets/waiting.svg";
import placed from "@/assets/order_placed.svg";
import shipping from "@/assets/shipping.svg";
import done from "@/assets/done.svg";
import OrderGeneralInfo from "./components/OrderGeneralInfo";
import OrderPaymentInfo from "./components/OrderPaymentInfo";
import OrderItemList from "./components/OrderItemList";

import Deposit from "./components/Deposit";
import ChooseIntermediary from "./components/ChooseIntermediary";
import WaitForOrderPlacement from "./components/WaitForOrderPlacement";
import OrderPlaced from "./components/OrderPlaced";
import TrackingProvided from "./components/TrackingProvided";
import EscrowReleased from "./components/EscrowReleased";

import { useParams } from "react-router-dom";

const OrderProgressIndicator = () => {
  return (
    <div className="flex justify-center items-center pb-16">
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={addIntermediary}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <hr className="w-10 border-black" />
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={deposit}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <hr className="w-10 border-black" />
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={waiting}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <hr className="w-10 border-black" />
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={placed}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <hr className="w-10 border-black" />
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={shipping}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
      <hr className="w-10 border-black" />
      <div className="w-20 h-20 rounded-full border border-black relative">
        <img
          src={done}
          className="w-8 w-8 absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
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
      className="fixed top-0 bottom-0 right-0 h-screen bg-white text-black w-0 shadow-lg overflow-y-auto z-20 divide-y divide-slate-300"
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
      <div className="px-7 py-8 flex flex-col w-full gap-3">
        <UserMessage message={"Hey, this is really nice!"} />
        <IntermediaryMessage
          message={
            "I totally agree with you. It's going to be a great opportunity for both of us!"
          }
        />
      </div>
    </div>
  );
};

const IntermediaryEntryBox = ({ username, rate, chatToggleCallback }) => {
  return (
    <div className="p-10 rounded-lg shadow-md w-96 bg-stone-100">
      <div className="text-[28px]">
        <p className="font-bold">{username}</p>
        <p className="font-medium">Offered you</p>
        <p className="font-semibold">{rate}% off!</p>
      </div>
      <div className="mt-14 text-[24px]">
        <p className="font-medium">You Pay</p>
        <p className="font-semibold">123123.00</p>
        <p className="font-semibold">USD!</p>
      </div>
      <div className="w-full mt-14 flex gap-3">
        <button
          className="block bg-green-600 text-white py-5 px-auto grow rounded-lg"
          onClick={chatToggleCallback}
        >
          <p className="text-center font-medium">Message</p>
        </button>
        <button className="block bg-sky-600 text-white py-5 px-auto grow rounded-lg">
          <p className="text-center font-medium">Select</p>
        </button>
      </div>
    </div>
  );
};

export default function ViewOrderAsCustomer() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const access_token = useSelector((state) => state.userSession.access_token);

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
    const fetchOption = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const resp = await fetch(
      `http://127.0.0.1:8000/api/order-detail/${orderId}/`,
      fetchOption
    );

    const json = await resp.json();
    console.log(json);
    setOrder(json);
  };

  useEffect(() => {
    requestOrderData();
  }, []);

  if (Object.keys(order).length < 1) return <div></div>;

  return (
    <div>
      <IntermediaryOfferChat
        reference={intermediaryChatElement}
        closeCallback={toggleOrderDetail}
      />
      <div className="px-16 py-12 bg-white flex flex-col divide-y divide-slate-300 z-10">
        <div className="flex justify-between items-center pb-4">
          <div className="flex gap-2 items-center">
            <img src={backArrow} className="block w-8 h-8" />
            <button className="block">GO BACK</button>
          </div>
          <div className="flex gap-2">
            <span className="text-stone-500">ORDER ID:</span>
            <p className="">{orderId}</p>
          </div>
        </div>
        <div className="xl:flex justify-between items-center py-10 xl:divide-x divide-slate-300">
          <div className="xl:w-3/4 xl:pr-10 divide-y divide-slate-300">
            <OrderProgressIndicator />
            <div className="divide-y divide-slate-300">
              <div className="flex flex-col items-center">
                <div className="mt-28 relative w-48">
                  <img
                    src={confetti}
                    className="w-48 h-48 absolute"
                    style={{
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                  />
                  <div
                    style={{
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                    className="w-32 h-32 rounded-full border-4 border-black absolute bg-white mx-auto"
                  ></div>
                  <div className="w-32 h-32 rounded-full border-4 border-black relative mx-auto">
                    <img
                      src={addIntermediary}
                      className="w-16 h-16 absolute"
                      style={{
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                      }}
                    />
                  </div>
                </div>
                <p className="mt-12 text-xl font-bold">Assign Intermediary</p>
                <p className="mt-2 mb-20">
                  It's time to choose an intermediary for your order!
                </p>
              </div>
              <div className="">
                <p className="text-lg my-10 font-medium">Choose Intermediary</p>
                <div className="flex items-start flex-wrap gap-4">
                  <IntermediaryEntryBox
                    username={"Alex0945"}
                    rate={30}
                    chatToggleCallback={toggleOrderDetail}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-1/4 pt-10 pl-10"></div>
        </div>
      </div>
    </div>
  );
}
