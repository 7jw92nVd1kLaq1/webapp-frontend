import search from "@/assets/search.svg";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ListOrders() {
  const locate = useLocation();
  const target = locate.pathname.slice(locate.pathname.lastIndexOf("/") + 1);

  return (
    <div
      className="flex flex-col items-stretch min-h-screen w-full mx-auto overflow-hidden bg-slate-100 text-black"
      id="parentBox"
    >
      <div className="flex justify-between items-center w-full pl-12 px-16 text-black font-semibold border-b border-gray-300 shadow-sm bg-white">
        <div className="flex items-center">
          <Link to={"/viewOrders/all"}>
            <button
              className={
                "block py-6 px-4 hover:bg-slate-200" +
                (target === "all" ? " border-b-2 border-slate-600" : "")
              }
            >
              All
            </button>
          </Link>
          <Link to={"/viewOrders/customer"}>
            <button
              className={
                "block py-6 px-4 hover:bg-slate-200" +
                (target === "customer" ? " border-b-2 border-slate-600" : "")
              }
            >
              Customer
            </button>
          </Link>
          <Link to={"/viewOrders/intermediary"}>
            <button
              className={
                "block py-6 px-4 hover:bg-slate-200" +
                (target === "intermediary"
                  ? " border-b-2 border-slate-600"
                  : "")
              }
            >
              Intermediary
            </button>
          </Link>
        </div>
        <div className="flex items-stretch gap-2">
          <button className="flex flex-col items-center justify-center bg-sky-600 rounded-md p-3">
            <img className="w-8 h-8" src={search} />
          </button>
          <input
            name="orderSearchBox"
            id="orderSearchBox"
            className="block px-4 py-3 border border-slate-500 w-full bg-slate-100 font-light rounded text-black"
            placeholder="Search"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
