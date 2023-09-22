import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

export default function ViewOrderAsCustomer() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const access_token = useSelector((state) => state.userSession.access_token);

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
    <div className="px-16 py-12 bg-white flex flex-col divide-y divide-slate-300">
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
              <div className="p-10 rounded-lg shadow-md w-96 bg-stone-100">
                <div className="text-[28px]">
                  <p className="font-bold">James</p>
                  <p className="font-medium">Offered you</p>
                  <p className="font-semibold">30% off!</p>
                </div>
                <div className="mt-14 text-[24px]">
                  <p className="font-medium">You Pay</p>
                  <p className="font-semibold">123123.00</p>
                  <p className="font-semibold">USD!</p>
                </div>
                <div className="w-full mt-14 flex gap-3">
                  <button className="block bg-green-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Message</p>
                  </button>
                  <button className="block bg-sky-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Select</p>
                  </button>
                </div>
              </div>
              <div className="p-10 rounded-lg shadow-md w-96 bg-stone-100">
                <div className="text-[28px]">
                  <p className="font-bold">Alexander</p>
                  <p className="font-medium">Offered you</p>
                  <p className="font-semibold">30% off!</p>
                </div>
                <div className="mt-14 text-[24px]">
                  <p className="font-medium">You Pay</p>
                  <p className="font-semibold">700.00</p>
                  <p className="font-semibold">USD!</p>
                </div>
                <div className="w-full mt-14 flex gap-3">
                  <button className="block bg-green-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Message</p>
                  </button>
                  <button className="block bg-sky-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Select</p>
                  </button>
                </div>
              </div>
              <div className="p-10 rounded-lg shadow-md w-96 bg-stone-100">
                <div className="text-[28px]">
                  <p className="font-bold">Alexander</p>
                  <p className="font-medium">Offered you</p>
                  <p className="font-semibold">30% off!</p>
                </div>
                <div className="mt-14 text-[24px]">
                  <p className="font-medium">You Pay</p>
                  <p className="font-semibold">123123.00</p>
                  <p className="font-semibold">USD!</p>
                </div>
                <div className="w-full mt-14 flex gap-3">
                  <button className="block bg-green-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Message</p>
                  </button>
                  <button className="block bg-sky-200 py-5 px-auto grow rounded-lg">
                    <p className="text-center font-medium">Select</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-1/4 pt-10 pl-10"></div>
      </div>
    </div>
  );
}
