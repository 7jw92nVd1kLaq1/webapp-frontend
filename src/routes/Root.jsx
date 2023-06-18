import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

import "./root.css";

export default function Root() {
  return (
    <div
      className="w-full bg-white min-h-screen opacity-100 text-white z-10"
      id="Root"
    >
      <TopNav />
      <div className="p-3.5">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <Outlet />
    </div>
  );
}
