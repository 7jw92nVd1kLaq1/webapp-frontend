import markAsRead from "@/assets/mark_read.svg";
import notification from "@/assets/notification.svg";
import notificationOptionsIcon from "@/assets/notification_options.svg";

import { backendURL } from "@/constants";
import useNotification from "@/hooks/useNotification";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";
import { getCSRFToken } from "@/utils/cookie";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const NotificationEntryOptionMenu = ({
  id,
  read,
  setRead,
  setCurrentUnreadNotificationsCount,
}) => {
  const csrfToken = useRef(null);
  const { responseStatusCode, callCount, makeAPICall, error } =
    useSimpleAPICall();

  const markNotificationsAsRead = async () => {
    if (read) return;
    let url = `${backendURL}/api/mark-notification-as-read/`;
    url += `?id=${id}`;
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
    if (responseStatusCode === 200) {
      setCurrentUnreadNotificationsCount((prev) => {
        if (prev > 0) return prev - 1;
      });
      setRead(true);
    }
  }, [callCount]);

  useEffect(() => {
    (async () => {
      csrfToken.current = await getCSRFToken();
    })();
  }, []);

  return (
    <div
      className="absolute flex border border-slate-300 divide-slate-300 divide-x right-[15%] top-[50%] bg-white rounded-xl shadow-lg text-[14px]"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      {read ? (
        <button className="font-medium w-fit grow flex flex-col items-start justify-center p-3">
          Mark as Unread
        </button>
      ) : (
        <button
          className="font-medium w-fit grow flex flex-col items-start justify-center p-3"
          onClick={() => {
            markNotificationsAsRead();
          }}
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

const NotificationEntryOptionButton = ({
  setOptionsMenuVisible,
  optionsMenuVisible,
}) => {
  return optionsMenuVisible ? (
    <button
      className="relative bg-sky-300 rounded-lg"
      onClick={() => {
        setOptionsMenuVisible(false);
      }}
    >
      <img src={notificationOptionsIcon} className="w-[24px] h-[24px]" />
    </button>
  ) : (
    <button
      className="relative rounded-lg"
      onClick={() => {
        setOptionsMenuVisible(true);
      }}
    >
      <img src={notificationOptionsIcon} className="w-[24px] h-[24px]" />
    </button>
  );
};

const NotificationEntry = ({
  id,
  textContent,
  read,
  datetimeStr,
  setCurrentUnreadNotificationsCount,
}) => {
  /*
   * TODO:
   * 1. Add an element for displaying the date and time of the notification
   * 2. Redirect to the URL of the notification when clicking a notification
   */
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [currentRead, setCurrentRead] = useState(read);

  return (
    <div className="p-6 flex items-center hover:bg-slate-100 relative">
      {optionsMenuVisible && (
        <NotificationEntryOptionMenu
          id={id}
          read={currentRead}
          setRead={setCurrentRead}
          setCurrentUnreadNotificationsCount={
            setCurrentUnreadNotificationsCount
          }
        />
      )}
      <div className="w-5/6 flex items-center">
        {currentRead ? (
          <div className="p-1 rounded-full w-2/8"></div>
        ) : (
          <div className="p-1 bg-sky-500 rounded-full w-2/8"></div>
        )}
        <div className="ml-6">
          <p className="break-words w-full">{textContent}</p>
        </div>
      </div>
      <div className="flex justify-end w-1/6">
        <NotificationEntryOptionButton
          setOptionsMenuVisible={setOptionsMenuVisible}
          optionsMenuVisible={optionsMenuVisible}
        />
      </div>
    </div>
  );
};

const NotificationDropDownMenu = ({
  menuReference,
  notifications,
  isLoading,
  currentUnreadNotificationsCount,
  setCurrentUnreadNotificationsCount,
}) => {
  const csrfToken = useRef(null);
  const { responseStatusCode, callCount, makeAPICall, error } =
    useSimpleAPICall();

  const markNotificationsAsRead = async (id = "") => {
    if (currentUnreadNotificationsCount <= 0) return;
    let url = `${backendURL}/api/mark-notification-as-read/`;
    if (id) url += `?id=${id}`;
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
            console.log(notification);
            return (
              <NotificationEntry
                id={notification.id}
                textContent={notification.notification}
                read={notification.read}
                setCurrentUnreadNotificationsCount={
                  setCurrentUnreadNotificationsCount
                }
              />
            );
          })}
        <button
          className="p-6 flex items-center font-medium w-full hover:bg-slate-100"
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

export const NotificationDropDownButton = ({ menuReference }) => {
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
        currentUnreadNotificationsCount={currentUnreadNotificationsCount}
        setCurrentUnreadNotificationsCount={setCurrentUnreadNotificationsCount}
      />
    </button>
  );
};
