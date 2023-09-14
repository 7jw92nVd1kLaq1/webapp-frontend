import tshirt from "@/assets/reset.jpeg";
import { shortenProductName } from "@/utils/etc";

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

export default OrderItems;
