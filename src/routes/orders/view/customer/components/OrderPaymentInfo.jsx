import { calculateTotalPriceUSD } from "@/utils/etc";

export default function OrderPaymentInfo({ order }) {
  const payment = order.payment.payment;
  const cryptocurrency_rate = parseFloat(
    payment.order_payment_balance.payment_method.cryptocurrencyrate_set.rate
  );
  const total = calculateTotalPriceUSD(
    order.order_items,
    payment.additional_cost
  );
  return (
    <div className="my-5 flex flex-col gap-4">
      <div className="flex items-center text-sm justify-between">
        <p className="w-1/3 text-slate-400">Cryptocurrency</p>
        <p className="w-2/3 flex justify-end">
          {payment.order_payment_balance.payment_method.ticker}
        </p>
      </div>
      <div className="flex items-center text-sm justify-between">
        <p className="w-1/3 text-slate-400">Total Cost (USD)</p>
        <p className="w-2/3 flex justify-end">${total}</p>
      </div>
      <div className="flex items-center text-sm justify-between">
        <p className="w-1/3 text-slate-400">Total Cost (BTC)</p>
        <div className="flex items-end flex-col">
          <p>{(total / cryptocurrency_rate).toFixed(8)}</p>
          <p className="mt-1 text-xs text-slate-400">
            @ ${cryptocurrency_rate.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
