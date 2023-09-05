import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
    <div className="p-16">
      <p className="font-semibold text-xl">Order - {orderId}</p>
      <div className="mt-12 lg:flex gap-3 items-start">
        <div className="lg:w-3/5 flex flex-col gap-3">
          <div className="bg-white rounded-md p-6 px-6">
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full bg-green-400"></div>
              <div className="p-1 rounded-full bg-green-600 grow"></div>
              <div className="p-1 rounded-full bg-sky-600 grow"></div>
              <div className="p-1 rounded-full bg-sky-600 grow"></div>
              <div className="p-1 rounded-full bg-sky-600 grow"></div>
              <div className="p-2 rounded-full bg-sky-400"></div>
            </div>
            <p className="text-center text-slate-600 font-medium mt-3">
              Deposit
            </p>
          </div>
          {order.status === 1 && <EscrowReleased />}
          {
            <OrderItemList
              items={order.order_items}
              additionalCost={order.payment.payment.additional_cost}
            />
          }
        </div>
        <div className="lg:w-2/5 lg:mt-0 mt-4">
          <div className="rounded-md bg-white p-8">
            <div className="flex items-center gap-2">
              <p className="font-medium">General Info</p>
              <hr className="border-t border-slate-400 grow" />
            </div>
            <OrderGeneralInfo
              orderId={order.url_id}
              created_date={order.created_at}
              personal_req={order.additional_request}
            />
            <div className="flex items-center gap-2 mt-10">
              <p className="font-medium">Payment Info</p>
              <hr className="border-t border-slate-400 grow" />
            </div>
            {<OrderPaymentInfo order={order} />}
          </div>
        </div>
      </div>
    </div>
  );
}
