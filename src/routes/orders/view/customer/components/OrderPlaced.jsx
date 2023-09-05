import order_placed from "@/assets/order_placed.svg";

export default function OrderPlaced() {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Order Placed</p>
      <div className="relative w-40 h-40 bg-green-200 mt-10 rounded-full mx-auto">
        <img
          src={order_placed}
          className="w-4/6 h-auto absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <h3 className="mt-10 font-semibold text-xl text-center">
        Order Placed by Intermediary
      </h3>
      <p className="text-slate-500 mt-3 text-sm text-center">
        We will notify you once the tracking # is available!
      </p>
    </div>
  );
}
