import { calculateTotalPriceUSD } from "@/utils/etc";

const shortenName = (name) => {
  if (name.length > 40) return name.slice(0, 40) + "...";
  else return name;
};

const OrderItemEntry = ({ item }) => {
  return (
    <div className="py-3 flex items-center">
      <div className="flex w-1/2 gap-5 items-center">
        <img className="w-14 h-auto" src={item.image_url} />
        <div>
          <p className="grow text-sm font-medium">{shortenName(item.name)}</p>
          <p className="mt-1 text-sm text-slate-400">Size: S</p>
        </div>
      </div>
      <div className="w-1/2 text-sm">
        <div className="flex justify-end gap-2 text-slate-400">
          <p className="font-semibold">{item.quantity}</p>
          <p className="font-normal">X</p>
          <p className="font-semibold">${item.price}</p>
        </div>
        <div className="mt-1 text-sm font-semibold flex justify-end">
          <p>${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default function OrderItemList({ items, additionalCost }) {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12" id="orderItemsList">
      <p className="font-semibold text-lg">Order Items</p>
      <div className="mt-10 divide-y divide-slate-400 border-t border-b border-slate-400">
        {items.map((elem) => {
          return <OrderItemEntry item={elem} />;
        })}
        <div className="py-3 flex flex-col gap-3">
          <div className="flex justify-end items-center text-sm">
            <p className="sm:w-1/2 w-1/5"></p>
            <p className="text-sm text-slate-400">Subtotal</p>
            <p className="text-right grow font-medium">
              ${calculateTotalPriceUSD(items, 0)}
            </p>
          </div>
          <div className="flex justify-end items-center text-sm text-slate-400">
            <p className="sm:w-1/2 w-1/5"></p>
            <p className="text-sm text-slate-400">Taxes, etc</p>
            <p className="text-right grow">${additionalCost}</p>
          </div>
          <div className="flex justify-end items-center">
            <p className="sm:w-1/2 w-1/5"></p>
            <p className="text-sm text-slate-400">Total</p>
            <p className="text-right grow font-medium">
              ${calculateTotalPriceUSD(items, additionalCost)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
