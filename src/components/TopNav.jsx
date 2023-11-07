import accountCircle from "@/assets/user.svg";
import buy from "@/assets/buy.svg";
import chat from "@/assets/chat.svg";
import earn from "@/assets/earn.svg";
import help from "@/assets/help.svg";
import login from "@/assets/login.svg";
import markAsRead from "@/assets/mark_read.svg";
import notification from "@/assets/notification.svg";
import notificationOptionsIcon from "@/assets/notification_options.svg";
import profile from "@/assets/profile.svg";
import profile_settings from "@/assets/profile_settings.svg";
import register from "@/assets/registration.svg";
import viewOrder from "@/assets/viewOrder.svg";

import { backendURL } from "@/constants";
import useNotification from "@/hooks/useNotification";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";
import { getCSRFToken } from "@/utils/cookie";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSession } from "@/redux/userSessionSlice";

const NotificationEntry = ({ textContent, read, datetimeStr }) => {
  /*
   * TODO:
   * 1. Add an element for displaying the date and time of the notification
   * 2. Redirect to the URL of the notification when clicking a notification
   */
  return (
    <div className="p-6 flex items-center">
      <div className="w-5/6 flex items-center">
        <div className="p-1 bg-sky-500 rounded-full w-2/8"></div>
        <div className="ml-6">
          <p className="break-words w-full">{textContent}</p>
        </div>
      </div>
      <div className="flex justify-end w-1/6">
        <img src={notificationOptionsIcon} className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

const NotificationDropDownMenu = ({
  menuReference,
  notifications,
  isLoading,
  setCurrentUnreadNotificationsCount,
}) => {
  const csrfToken = useRef(null);
  const { responseData, responseStatusCode, callCount, makeAPICall, error } =
    useSimpleAPICall();

  const markNotificationsAsRead = async (id) => {
    const url = `${backendURL}/api/mark-notification-as-read/`;
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-CSRFToken": csrfToken.current,
      },
    };
    await makeAPICall(url, fetchOptions);
  };

  useEffect(() => {
    if (callCount <= 0) return;
    if (responseStatusCode === 200) setCurrentUnreadNotificationsCount(0);
  }, [callCount]);

  useEffect(() => {
    (async () => {
      csrfToken.current = await getCSRFToken();
    })();
  }, []);
  /*
   * TODO:
   * 1. Add a display for the number of unread notifications
   */
  return (
    <div
      className="w-96 absolute p-2 rounded-md"
      style={{ top: "180%", right: "-30%" }}
    >
      <div
        ref={menuReference}
        id="top-nav-notification-dropdown-menu"
        className="w-full rounded-md bg-white shadow-lg text-black divide-y divide-slate-300 hidden text-[14px] text-left"
      >
        <div className="p-6 flex justify-between items-center">
          <h4 className="font-medium text-[16px]">Notifications</h4>
          <p className="text-slate-500">See All</p>
        </div>
        {!isLoading &&
          notifications.map((notification) => {
            return (
              <NotificationEntry textContent={notification.notification} />
            );
          })}
        <button
          className="p-6 flex items-center font-medium w-full"
          onClick={() => {
            markNotificationsAsRead();
          }}
        >
          <img src={markAsRead} className="w-6 h-6" />
          <p className="ml-3">Mark All As Read</p>
        </button>
      </div>
    </div>
  );
};

const NotificationUnreadCount = ({ count }) => {
  if (!count) return <div></div>;
  return (
    <div className="rounded-full p-1 bg-red-600 absolute left-[80%] top-[-5px]">
      <p className="text-white font-bold text-xs">{count}</p>
    </div>
  );
};

const NotificationDropDownButton = ({ menuReference }) => {
  const currentLocation = useLocation();
  const notificationBoxElement = useRef(null);
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const [currentNotificationsCount, setCurrentNotificationsCount] = useState(0);
  const [currentUnreadNotificationsCount, setCurrentUnreadNotificationsCount] =
    useState(0);

  const {
    notifications,
    notificationsCount,
    unreadNotificationsCount,
    loadNotifications,
    loadNotificationsAttemptCount,
    isLoadingNotifications,
    errorNotifications,
  } = useNotification();
  /*
   * TODO:
   * 3. Create a utility function for generating an URL for each notification
   * 4. Create a functionality for marking a notification as read when clicking
   * a notification button by sending a request to backend
   */

  useEffect(() => {
    let id = "";
    if (currentNotifications.length > 0) id = currentNotifications[0].id;
    loadNotifications(id);
  }, [currentLocation]);

  useEffect(() => {
    setCurrentNotifications((prev) => {
      return [...prev, ...notifications];
    });
    setCurrentNotificationsCount(notificationsCount);
    setCurrentUnreadNotificationsCount(unreadNotificationsCount);
  }, [loadNotificationsAttemptCount]);

  return (
    <button id="notification-menu-icon" className="relative mr-4">
      <NotificationUnreadCount count={currentUnreadNotificationsCount} />
      <img
        src={notification}
        className="w-7 h-7"
        onClick={() => {
          const notificationElement = menuReference.current;
          notificationElement.classList.remove("hidden");
        }}
      />
      <NotificationDropDownMenu
        menuReference={menuReference}
        isLoading={isLoadingNotifications}
        notifications={notifications}
        setCurrentUnreadNotificationsCount={setCurrentUnreadNotificationsCount}
      />
    </button>
  );
};

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
