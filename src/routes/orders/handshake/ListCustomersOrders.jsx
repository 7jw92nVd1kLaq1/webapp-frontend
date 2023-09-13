import btc from "@/assets/bitcoin.svg";
import xmr from "@/assets/xmr.png";
import bch from "@/assets/bch.png";
import ltc from "@/assets/ltc.png";

import sort from "@/assets/sort.svg";
import refresh from "@/assets/refresh.svg";
import tshirt from "@/assets/reset.jpeg";

import left from "@/assets/left.svg";
import right from "@/assets/right.svg";
import close from "@/assets/close.svg";

import user from "@/assets/user_black.svg";
import star from "@/assets/star.svg";

import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import useCustomersOrders from "@/hooks/useCustomersOrders";
import useCustomersOrdersDetails from "@/hooks/useCustomersOrdersDetails";
import {
  formatDateStringMMDDYYYY,
  getCountryNameFromCode,
  shortenProductName,
} from "@/utils/etc";

const CustomerInfo = ({ customer }) => {
  const username = customer.username;
  const average_rating = customer.average_rating
    ? customer.average_rating.toFixed(2)
    : "0.0";
  const userRegistrationDate = new Date(customer.date_joined);
  const registrationDateString = useMemo(
    () => formatDateStringMMDDYYYY(userRegistrationDate),
    [userRegistrationDate]
  );
  return (
    <div className="mt-8">
      <h4 className="font-semibold text-lg">Customer Info</h4>
      <div className="mt-5 p-6 flex w-full rounded-lg bg-slate-100 gap-5 items-center text-sm font-light">
        <img src={user} className="w-20 h-20" />
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{username}</p>
          <div className="flex gap-2 items-center">
            <img src={star} className="w-5 h-5" />
            <p className="">{average_rating} (100)</p>
          </div>
          <p>
            User Since{" "}
            <span className="font-semibold">{registrationDateString}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const OrderInfo = ({ entry }) => {
  const orderDate = useMemo(
    () => formatDateStringMMDDYYYY(new Date(entry.created_at)),
    [entry]
  );

  return (
    <div className="mt-8">
      <h4 className="font-semibold text-lg">Order Info</h4>
      <div className="mt-5 p-6 w-full rounded-lg bg-green-100 gap-5 font-light gap-5 flex items-center text-sm">
        <img src={btc} className="w-20 h-20" />
        <div>
          <p>Estimated Earning </p>
          <p className="text-lg flex flex-col mt-2 gap-1">
            <span className="font-semibold">{entry.total_price_in_crypto}</span>
            <span className="font-medium">
              {entry.total_price_in_fiat} USD{" "}
            </span>
            <span className="text-sm font-medium">
              @ {entry.cryptocurrency_rate} USD
            </span>
          </p>
          <p className="font-semibold mt-2">
            <span className="font-light">in</span> Bitcoin (BTC)
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center">
        <p className="w-1/2 text-slate-400">Created Date</p>
        <p className="w-1/2 text-right font-medium">{orderDate}</p>
      </div>
      <div className="mt-5 flex items-center">
        <p className="w-1/2 text-slate-400">Destination</p>
        <p className="w-1/2 text-right font-medium">
          {getCountryNameFromCode(entry.address.address.country)}
        </p>
      </div>
    </div>
  );
};

const OrderItems = ({ entry }) => {
  const payment = entry.payment.payment;
  return (
    <div className="mt-8">
      <h4 className="font-semibold text-lg">Requested Item(s)</h4>
      <div className="mt-5 w-full font-light flex flex-col text-sm divide-y divide-slate-200 border-t border-b border-slate-200">
        {entry.order_items.map((item) => {
          return (
            <div className="flex gap-8 items-center p-5 rounded-lg">
              <img
                src={item.image_url ? item.image_url : tshirt}
                className="w-20 h-auto"
              />
              <div className="text-left flex flex-col gap-2">
                <p className="font-light">{shortenProductName(item.name)}</p>
                <p className="font-medium">
                  {item.price} {payment.fiat_currency}
                </p>
                <p className="font-medium">Qty: {item.quantity}</p>
                <p className="text-slate-400">Size: S</p>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col gap-4 p-5 rounded-lg font-light">
          <div className="flex justify-between items-center w-full">
            <p className="text-slate-400">Subtotal</p>
            <p className="font-normal">
              {(
                entry.total_price_in_fiat - parseFloat(payment.additional_cost)
              ).toFixed(2)}{" "}
              {payment.fiat_currency}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-slate-400">Shipping, Tax</p>
            <p className="font-normal">
              {payment.additional_cost} {payment.fiat_currency}
            </p>
          </div>
          <div className="flex justify-between items-end w-full mt-1">
            <p className="text-slate-400">Total</p>
            <p className="text-base font-normal">
              {entry.total_price_in_fiat} {payment.fiat_currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { orderDetail } = useCustomersOrdersDetails();

  const toggleOrderDetail = () => {
    const elem = document.getElementById("itemDetail");
    if (elem.classList.contains("w-0")) {
      elem.classList.remove("w-0");
      elem.classList.add("lg:w-1/3");
      elem.classList.add("md:w-1/2");
      elem.classList.add("w-full");
    } else {
      elem.classList.add("w-0");
      elem.classList.remove("lg:w-1/3");
      elem.classList.remove("md:w-1/2");
      elem.classList.remove("w-full");
    }
  };
  return (
    <div
      className="fixed top-0 bottom-0 right-0 h-full bg-white text-black w-0 shadow-lg overflow-y-auto"
      id="itemDetail"
    >
      <div className="p-4 px-8 invisible w-0">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <div className="p-7">
        <div className="text-right flex justify-end">
          <img src={close} className="w-5 h-5" onClick={toggleOrderDetail} />
        </div>
        <h3 className="text-2xl font-semibold flex gap-2 text-black items-center">
          <p>Order Detail</p>
        </h3>
        <div className="mt-3">
          <p className="font-light text-slate-500">
            Requested By{" "}
            <span className="font-semibold text-black">
              {orderDetail && orderDetail.customer.customer.username}
            </span>
          </p>
        </div>
        {orderDetail && (
          <div>
            <CustomerInfo customer={orderDetail.customer.customer} />
            <OrderInfo entry={orderDetail} />
            <OrderItems entry={orderDetail} />
          </div>
        )}
      </div>
    </div>
  );
};

const ListingGridEntry = ({ entry }) => {
  const { setCostDetail, setDetail } = useCustomersOrdersDetails();
  const entryAdditionalDetails = useSelector((state) =>
    state.customerRequests.additionalEntriesDetails.hasOwnProperty(entry.url_id)
      ? state.customerRequests.additionalEntriesDetails[entry.url_id]
      : null
  );

  const offered_cryptocurrency =
    entry.payment.payment.order_payment_balance.payment_method.name;

  const toggleOrderDetail = () => {
    setDetail(entry.url_id);
    const elem = document.getElementById("itemDetail");
    if (elem.classList.contains("w-0")) {
      elem.classList.remove("w-0");
      elem.classList.add("lg:w-1/3");
      elem.classList.add("md:w-1/2");
      elem.classList.add("w-full");
    } else {
      elem.classList.add("w-0");
      elem.classList.remove("lg:w-1/3");
      elem.classList.remove("md:w-1/2");
      elem.classList.remove("w-full");
    }
  };

  useEffect(() => {
    // Calculate the total price of an order in fiat and Crypto
    // And save to Redux State
    let cryptocurrency_rate =
      entry.payment.payment.order_payment_balance.payment_method.rate;

    setCostDetail(
      entry.url_id,
      entry.order_items,
      entry.payment.payment.additional_cost,
      entry.payment.payment.order_payment_balance.payment_method.name,
      cryptocurrency_rate
    );
  }, []);

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-sm flex flex-col justify-end"
      onClick={toggleOrderDetail}
    >
      <img
        src={
          entry.order_items[0].image_url
            ? entry.order_items[0].image_url
            : tshirt
        }
        className="w-1/2 block mx-auto mb-4"
      />
      <div className="flex flex-col items-end overflow-x-auto">
        <div className="mt-6 flex flex-col gap-1 overflow-x-auto justify-end items-end w-full">
          <p className="truncate w-3/4 font-medium text-right">
            {entry.order_items[0].name}
          </p>
          {entry.order_items.length > 1 && (
            <p className="font-light w-fit text-sm text-slate-500">
              and {entry.order_items.length - 1} item(s)
            </p>
          )}
        </div>
        <p className="mt-5 text-lg font-medium">
          {entryAdditionalDetails && entryAdditionalDetails.total_price_in_fiat}{" "}
          {entry.payment.payment.fiat_currency}
        </p>
        <div className="mt-2 items-end flex flex-col">
          <p className="mt-2 text-sm font-medium text-slate-600 text-right">
            <span className="font-light">Fulfill and Earn</span>{" "}
            {entryAdditionalDetails &&
              entryAdditionalDetails.total_price_in_crypto}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-600 text-right">
            @ $
            {entryAdditionalDetails &&
              entryAdditionalDetails.cryptocurrency_rate}
          </p>
          <div className="mt-2 text-sm flex gap-1 items-center font-medium">
            <img className="w-4 h-4" src={btc} />
            {offered_cryptocurrency}
          </div>
        </div>
        <div className="mt-7 text-sm text-slate-400 text-right">
          Requested By{" "}
          <span className="font-semibold text-slate-600">
            {entry.customer.customer.username}
          </span>
        </div>
      </div>
    </div>
  );
};

const ListingGrid = ({ entries }) => {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {entries.map((item) => {
        if (item.payment) return <ListingGridEntry entry={item} />;
      })}
    </div>
  );
};

export default function ListCustomersOrders() {
  const {
    customersOrders,
    fetchCustomersOrders,
    pageNumber,
    pageRange,
    isLoading,
    error,
  } = useCustomersOrders();

  return (
    <div
      className="flex flex-col items-stretch min-h-screen w-full mx-auto overflow-hidden bg-slate-100 text-black"
      id="parentBox"
    >
      <OrderDetail />
      <div className="flex justify-end items-center w-full px-16 text-black font-semibold border-b border-gray-300 shadow-sm bg-white">
        <div className="flex items-stretch gap-2 my-2">
          <button className="flex items-center gap-1 p-2 px-3 text-sky-500 border border-sky-500 font-medium rounded-lg">
            <img src={sort} className="w-6 h-6" />
            <p className="hidden md:block">Sort By</p>
          </button>
          <button className="flex items-center justify-center bg-sky-600 rounded-lg p-2 px-3 gap-1 text-white">
            <img className="w-6 h-6" src={refresh} />
          </button>
        </div>
      </div>
      <div className="my-10 mx-16 grow">
        <div className="mt-5">
          <p className="font-semibold text-3xl">Earn Crypto</p>
          <p className="mt-3 text-slate-500 ">
            Fulfill Orders and Earn Cryptocurrency!
          </p>
        </div>
        <ListingGrid entries={customersOrders} />
        <div className="mt-16 mb-8 w-fit flex mx-auto text-sm font-semibold gap-4 items-center">
          <button className="px-3 p-2 rounded-md">
            <img src={left} className="w-4 h-4" />
          </button>
          <button className="px-3 p-2 rounded-md">1</button>
          <button className="px-3 p-2 rounded-md border border-sky-500 bg-sky-100">
            2
          </button>
          <button className="px-3 p-2 rounded-md">3</button>
          <button className="px-3 p-2 rounded-md">
            <img src={right} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
