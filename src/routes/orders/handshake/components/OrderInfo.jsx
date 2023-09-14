import btc from "@/assets/bitcoin.svg";
import xmr from "@/assets/xmr.png";
import bch from "@/assets/bch.png";
import ltc from "@/assets/ltc.png";

import { useMemo } from "react";
import { formatDateStringMMDDYYYY, getCountryNameFromCode } from "@/utils/etc";

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

export default OrderInfo;
