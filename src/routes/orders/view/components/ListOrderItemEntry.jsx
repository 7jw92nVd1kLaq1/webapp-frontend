import options from "@/assets/options.svg";
import { Link } from "react-router-dom";

const statusList = {
  1: "Deposit",
};

const shortenName = (name) => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  } else {
    return name;
  }
};

export default function ListOrderItemEntry({ order }) {
  const date = new Date(Date.parse(order.created_at));

  return (
    <div
      id={order.url_id}
      className="flex items-center bg-white py-6 px-6 text-sm font-medium text-slate-600"
    >
      <p className="w-4/12">
        <Link to={`/viewOrders/customer/${order.url_id}`}>
          {shortenName(order.order_items[0].name)}
        </Link>
      </p>
      <p className="w-3/12">{order.intermediary && order.intermediary}</p>
      <p className="w-2/12">
        {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
      </p>
      <p className="w-2/12">{statusList[parseInt(order.status)]}</p>
      <p className="rounded-full p-5 bg-slate-500 relative">
        <img
          src={options}
          className="absolute w-5 h-5"
          style={{
            transform: "translate(-50%,-50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </p>
    </div>
  );
}
