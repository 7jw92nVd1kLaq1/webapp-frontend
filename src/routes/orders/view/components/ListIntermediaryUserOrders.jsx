import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ListOrderItemEntry from "./ListOrderItemEntry";

export default function ListIntermediaryUserOrders() {
  const [items, setItems] = useState({});
  const access_token = useSelector((state) => state.userSession.access_token);
  const useEffectAsync = async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await fetch(
      "http://127.0.0.1:8000/api/list-order/?for=intermediary&page=1",
      fetchOptions
    );

    const json = await response.json();
    console.log(json);
    setItems(json);
  };

  useEffect(() => {
    useEffectAsync();
  }, []);

  return (
    <div className="p-16">
      <p className="font-semibold text-xl">
        Your List of Orders as Intermediary
      </p>
      <div className="text-xs font-medium flex items-center bg-slate-300 rounded-md mt-12 p-4 px-6">
        <p className="w-4/12">Item</p>
        <p className="w-3/12">Partner</p>
        <p className="w-2/12">Creation Date</p>
        <p className="w-2/12">Status</p>
        <p className="w-1/12">Options</p>
      </div>
      <div className="divide-y divide-slate-300 overflow-hidden rounded-b-md">
        {items.hasOwnProperty("results") &&
          items.results.length > 0 &&
          items.results.map((elem) => {
            return <ListOrderItemEntry order={elem} />;
          })}
      </div>
    </div>
  );
}
