import btc from "@/assets/bitcoin.svg";
import xmr from "@/assets/xmr.png";
import bch from "@/assets/bch.png";
import tshirt from "@/assets/reset.jpeg";

import { useSelector } from "react-redux";
import useCustomersOrdersDetails from "@/hooks/useCustomersOrdersDetails";

const ListingGridEntry = ({ entry }) => {
  const { setDetail } = useCustomersOrdersDetails();
  const entryAdditionalDetails = useSelector((state) =>
    state.customerRequests.additionalEntriesDetails.hasOwnProperty(entry.url_id)
      ? state.customerRequests.additionalEntriesDetails[entry.url_id]
      : null
  );

  const offered_cryptocurrency = entry.payment.payment.payment_methods[0].name;

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

export default ListingGridEntry;
