import { useEffect, useRef, useState } from "react";
import { useSimpleAPICall } from "./useSimpleAPICall";

import { backendURL } from "@/constants";

const useNotification = (all = false) => {
  const notificationCount = useRef(0);
  const unreadNotificationCount = useRef(0);
  const loadNotificationsAttemptCount = useRef(0);
  const notifications = useRef([]);
  const errorNotifications = useRef(null);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const { responseData, responseStatusCode, callCount, makeAPICall, error } =
    useSimpleAPICall();

  const loadNotifications = async (notification_id = "") => {
    setIsLoadingNotifications(true);
    let argument = "";

    if (notification_id) {
      argument = `?id=${notification_id}`;
    }

    const access_token = localStorage.getItem("access_token");
    if (access_token === null) {
      errorNotifications.current = "Please login to view notifications.";
      setIsLoadingNotifications(false);
      return;
    }

    const url = `${backendURL}/api/retrieve-notifications/${argument}`;

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    await makeAPICall(url, fetchOptions);
  };

  useEffect(() => {
    if (callCount <= 0) return;

    if (responseStatusCode === 200) {
      notifications.current = responseData.notifications;
      notificationCount.current = responseData.total;
      unreadNotificationCount.current = responseData.unread_total;
    } else if (responseStatusCode === 0 && error) {
      errorNotifications.current =
        "Error has occurred. Please refresh the page and try again.";
    } else {
      errorNotifications.current = responseData.reason;
    }

    loadNotificationsAttemptCount.current = callCount;
    setIsLoadingNotifications(false);
  }, [callCount]);

  return {
    notifications: notifications.current,
    notificationsCount: notificationCount.current,
    loadNotifications,
    loadNotificationsAttemptCount: loadNotificationsAttemptCount.current,
    unreadNotificationsCount: unreadNotificationCount.current,
    errorNotifications: errorNotifications.current,
    isLoadingNotifications,
  };
};

export default useNotification;
