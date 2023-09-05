import QRCode from "react-qr-code";

import bitcoin from "@/assets/bitcoin.svg";

const coinLogos = {
  BTC: bitcoin,
};

const coinName = {
  BTC: "Bitcoin",
};

export default function Deposit({ payment, items }) {
  const payment_method = payment.order_payment_balance.payment_method;
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Deposit</p>
      <div className="md:w-full lg:w-4/5 mx-auto flex justify-between items-center py-3 border-y border-slate-400 mt-10">
        <div className="flex gap-2 items-center">
          <img src={coinLogos[payment_method.ticker]} className="w-5 h-5" />
          <p className="font-bold text-lg">
            {payment_method.ticker} ({coinName[payment_method.ticker]})
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <p className="text-sm text-slate-500">
            Total{" "}
            <span className="font-semibold text-slate-800">10.000000</span> BTC
          </p>
          <p className="text-sm text-slate-500">
            Received{" "}
            <span className="font-semibold text-slate-800">0.000000</span> BTC
          </p>
        </div>
      </div>
      <QRCode
        className="mx-auto md:w-3/4 lg:w-1/2 block mt-10"
        value={"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"}
        viewBox={`0 0 256 256`}
      />
      <p className="mt-10 text-center">
        <span className="bg-slate-100 p-2 rounded-md text-sm font-medium">
          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
        </span>
      </p>
    </div>
  );
}
