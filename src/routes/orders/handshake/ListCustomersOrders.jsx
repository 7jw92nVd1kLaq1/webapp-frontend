import sort from "@/assets/sort.svg";
import refresh from "@/assets/refresh.svg";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useCustomersOrders from "@/hooks/useCustomersOrders";

import { resetState } from "@/redux/ListCustomerOrdersSlice";

import ListingGrid from "./components/ListingGrid";
import OrderDetail from "./components/OrderDetail";
import PageNavigationBar from "./components/PageNavigationBar";

export default function ListCustomersOrders() {
  const dispatch = useDispatch();
  const { customersOrders, fetchCustomersOrders, pageRange, isLoading, error } =
    useCustomersOrders();

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

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
        {!isLoading && <ListingGrid entries={customersOrders} />}
        <PageNavigationBar pageRange={pageRange} />
      </div>
    </div>
  );
}
