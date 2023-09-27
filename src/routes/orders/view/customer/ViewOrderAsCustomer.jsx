import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import tshirt from "@/assets/reset.jpeg";
import notification from "@/assets/notification.svg";
import star from "@/assets/star.svg";
import backArrow from "@/assets/back_arrow.svg";
import confetti from "@/assets/confetti.png";
import addIntermediary from "@/assets/add_intermediary.svg";
import deposit from "@/assets/payment.svg";
import waiting from "@/assets/waiting.svg";
import placed from "@/assets/order_placed.svg";
import shipping from "@/assets/shipping.svg";
import done from "@/assets/done.svg";
import send from "@/assets/send.svg";

import { formatDateStringMMDDYYYY } from "@/utils/etc";
import { OrderInfo, OrderItemsInfo } from "./components/OrderInfo";
import OrderPaymentInfo from "./components/OrderPaymentInfo";
import OrderItemList from "./components/OrderItemList";

import Deposit from "./components/Deposit";
import ChooseIntermediary from "./components/ChooseIntermediary";
import WaitForOrderPlacement from "./components/WaitForOrderPlacement";
import OrderPlaced from "./components/OrderPlaced";
import TrackingProvided from "./components/TrackingProvided";
import EscrowReleased from "./components/EscrowReleased";

import { useParams } from "react-router-dom";

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

const IntermediaryEntryBoxUserInfo = ({ username, reference }) => {
  return (
    <div
      className="absolute shadow-md rounded-xl p-5 bg-white left-0 top-[99%] hidden"
      ref={reference}
    >
      <p className="text-[18px] font-medium">{username}</p>
      <div className="flex gap-1 items-center mt-1">
        <img src={star} className="block w-[20px] h-[20px]" />
        <div className="text-[16px] flex gap-1 items-end text-stone-600">
          <p>5.00</p>
          <p>/</p>
          <p>5.00</p>
          <p className="text-black font-medium">(168)</p>
        </div>
      </div>
      <p className="text-[16px] mt-1">Joined 2 months ago</p>
    </div>
  );
};

const IntermediaryEntryBox = ({ username, rate, chatToggleCallback }) => {
  const usernameElement = useRef(null);
  const userInfo = useRef();

  const displayUserInfo = () => {
    userInfo.current.classList.remove("hidden");
  };
  const hideUserInfo = () => {
    userInfo.current.classList.add("hidden");
  };

  useEffect(() => {
    const usernameElementCopy = usernameElement.current;
    usernameElementCopy.addEventListener("mouseover", displayUserInfo);
    usernameElementCopy.addEventListener("mouseout", hideUserInfo);

    return () => {
      usernameElementCopy.removeEventListener("mouseover", displayUserInfo);
      usernameElementCopy.removeEventListener("mouseout", hideUserInfo);
    };
  }, []);

  return (
    <div className="p-10 rounded-2xl bg-stone-100 w-96 border border-stone-300">
      <div className="text-[24px]">
        <div className="relative w-full" ref={usernameElement}>
          <p className="font-semibold">{username}</p>
          <IntermediaryEntryBoxUserInfo
            username={username}
            reference={userInfo}
          />
        </div>
        <p className="font-medium">Offered you</p>
        <p className="font-semibold">{rate}% off!</p>
      </div>
      <div className="mt-14 text-[24px]">
        <p className="font-medium">You Pay</p>
        <div className="font-semibold">
          <p>0.20000000</p>
          <p className="font-semibold">BTC</p>
        </div>
      </div>
      <div className="w-full mt-14 flex gap-3 text-[16px]">
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

  const cryptocurrencyTicker =
    order.payment.payment.order_payment_balance.payment_method.ticker;

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
                <p className="mt-16 text-[24px] font-semibold">
                  Assign Intermediary
                </p>
                <p className="mt-2 mb-20 text-[16px] text-center">
                  It's time to choose an intermediary for your order!
                </p>
              </div>
              <div className="text-[20px] py-10">
                <div className="flex items-start flex-wrap gap-4 my-10">
                  <IntermediaryEntryBox
                    username={"Alex0945"}
                    rate={30}
                    chatToggleCallback={toggleOrderDetail}
                  />
                  <IntermediaryEntryBox
                    username={"Alex0946"}
                    rate={20}
                    chatToggleCallback={toggleOrderDetail}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-1/4 lg:flex items-start gap-6 xl:block xl:pl-7">
            <OrderInfo
              orderId={order.url_id}
              cryptocurrencyTicker={cryptocurrencyTicker}
              createdDate={order.created_at}
              additionalReq={order.additional_request}
              shippingAddr={order.address.address}
            />
            <OrderItemsInfo items={order.order_items} />
          </div>
        </div>
      </div>
    </div>
  );
}
