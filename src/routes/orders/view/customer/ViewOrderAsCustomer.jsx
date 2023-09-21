import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import backArrow from "@/assets/back_arrow.svg";
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
          <span className="text-stone-500">Order ID:</span>
          <p className="">{orderId}</p>
        </div>
      </div>
      <div className="flex justify-between items-center py-10"></div>
    </div>
  );
}
