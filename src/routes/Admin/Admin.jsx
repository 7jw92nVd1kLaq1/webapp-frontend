import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import "../root.css";

export default function Admin() {
  const [username, setUsername] = useState("");

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  return (
    <div className="flex w-full bg-slate-200 min-h-screen opacity-100 text-white z-10 shadow-xl">
      <AdminNav />
      <div className="lg:w-9/12 w-full">
        <Outlet />
      </div>
    </div>
  );
}
