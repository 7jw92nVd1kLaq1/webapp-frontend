import accountCircle from "@/assets/user.svg";
import buy from "@/assets/buy.svg";
import chat from "@/assets/chat.svg";
import earn from "@/assets/earn.svg";
import help from "@/assets/help.svg";
import login from "@/assets/login.svg";
import profile from "@/assets/profile.svg";
import profile_settings from "@/assets/profile_settings.svg";
import register from "@/assets/registration.svg";
import viewOrder from "@/assets/viewOrder.svg";

import { backendURL } from "@/constants";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSession } from "@/redux/userSessionSlice";

import { NotificationDropDownButton } from "./TopNavNotifications";

const AuthenticatedUserDropDownMenu = ({ username, menuReference }) => {
  return (
    <div
      className="w-72 absolute p-2 rounded-md"
      style={{ top: "180%", right: "-30%" }}
    >
      <div
        ref={menuReference}
        id="top-nav-dropdown-menu"
        className="w-full rounded-md bg-white shadow-lg text-black font-medium divide-y divide-slate-300 hidden"
      >
        <div className="p-6 text-left">
          <span className="font-normal">Welcome,</span>{" "}
          <span className="font-semibold truncate">{username}</span>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={profile} className="w-6 h-6" />
            <span>Visit Profile</span>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={profile_settings} className="w-6 h-6" />
            <span>Profile Settings</span>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={chat} className="w-6 h-6" />
            <span>Messages</span>
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={viewOrder} className="w-6 h-6" />
            <Link to={"/viewOrders/all"}>
              <span>View Your Orders</span>
            </Link>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={buy} className="w-6 h-6" />
            <Link to={"/buy"}>
              <span>Buy</span>
            </Link>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={earn} className="w-6 h-6" />
            <Link to={"/earn"}>
              <span>Earn</span>
            </Link>
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={help} className="w-6 h-6" />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={earn} className="w-6 h-6" />
            <Link to={"/logout"}>
              <span>Logout</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const AnonymousUserDropDownMenu = ({ menuReference }) => {
  return (
    <div
      className="w-72 absolute p-2 rounded-md"
      style={{ top: "180%", right: "-30%" }}
    >
      <div
        ref={menuReference}
        id="top-nav-dropdown-menu"
        className="w-full p-6 rounded-md bg-white shadow-lg text-black font-medium divide-y divide-slate-300 hidden"
      >
        <div className="pb-4 text-left">
          <span className="font-normal">Welcome,</span>{" "}
          <span className="font-semibold truncate">Visitor</span>
        </div>
        <div className="pt-4 pb-4 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={login} className="w-6 h-6" />
            <Link to={"/login"}>
              <span>Login</span>
            </Link>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={register} className="w-6 h-6" />
            <Link to={"/register"}>
              <span>Register</span>
            </Link>
          </button>
        </div>
        <div className="pt-4 pb-4 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={buy} className="w-6 h-6" />
            <Link to={"/buy"}>
              <span>Buy</span>
            </Link>
          </button>
          <button className="flex items-center gap-4 text-sm">
            <img src={earn} className="w-6 h-6" />
            <Link to={"/earn"}>
              <span>Earn</span>
            </Link>
          </button>
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <button className="flex items-center gap-4 text-sm">
            <img src={help} className="w-6 h-6" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDropDownButton = ({ username = "", menuReference }) => {
  return (
    <button id="menu-icon" className="relative">
      <img
        src={accountCircle}
        className="w-7 h-7"
        onClick={() => {
          const element = document.getElementById("top-nav-dropdown-menu");
          element.classList.remove("hidden");
        }}
      />
      {username ? (
        <AuthenticatedUserDropDownMenu
          username={username}
          menuReference={menuReference}
        />
      ) : (
        <AnonymousUserDropDownMenu menuReference={menuReference} />
      )}
    </button>
  );
};

export default function TopNav() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.userSession.username);

  const intervalId = useRef("");

  const notificationBoxElement = useRef(null);
  const menuElement = useRef(null);

  const menuDisappear = (e) => {
    const container = menuElement.current;
    if (!container.contains(e.target)) {
      container.classList.add("hidden");
    }
    const notificationContainer = notificationBoxElement.current;
    if (notificationContainer && !notificationContainer.contains(e.target)) {
      notificationContainer.classList.add("hidden");
    }
  };

  const updateAccessToken = async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(
      `${backendURL}/api/renew-acc-token/`,
      fetchOptions
    );

    if (response.ok) {
      const json = await response.json();
      dispatch(setSession(json.data));
      localStorage.setItem("access_token", json.data.token);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", menuDisappear);
    updateAccessToken();
    const interval = setInterval(() => {
      updateAccessToken();
    }, 300000);
    intervalId.current = interval;
    return () => {
      document.removeEventListener("mouseup", menuDisappear);
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="fixed z-50">
      <div className="w-full px-8 bg-gray-800 fixed top-0 text-white shadow-lg p-4 z-50 flex justify-between items-center">
        <p className="font-semibold text-lg">
          <Link to={"/"}>BitShop</Link>
        </p>
        <div className="flex items-center gap-5">
          {username && (
            <NotificationDropDownButton
              menuReference={notificationBoxElement}
            />
          )}
          <UserDropDownButton username={username} menuReference={menuElement} />
        </div>
        <div className="w-72 absolute right-0 top-full p-2 rounded-md"></div>
      </div>
    </div>
  );
}
