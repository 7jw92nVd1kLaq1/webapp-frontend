import { validateCookie } from "./cookie";
import { redirect } from "react-router-dom";
import store from "../redux/store";

const backend = "http://127.0.0.1:8000";

export const checkAccessTokenValidity = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  const response = await fetch(`${backend}/api/check-acc-token/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) return false;
  return true;
};

export const logoutUser = async () => {
  const token = store.getState().userSession.access_token;
  await fetch(`${backend}/api/delete-tokens/`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.clear();
};

export const checkIfUser = async () => {
  const isTokenValid = await checkAccessTokenValidity();
  if (!isTokenValid) {
    return redirect("/");
  }
  return null;
};

export const checkIfLoggedIn = async () => {
  const doesCookieExist = await validateCookie();
  if (doesCookieExist) {
    return redirect("/");
  }
  return null;
};

export const logOut = async () => {
  const isLoggedIn = await validateCookie();
  if (isLoggedIn) await logoutUser();
  const data = { redirectFrom: "logOut" };
  return new Response(JSON.stringify(data), {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
};

export const getSubscriptionToken = async (channel) => {
  const channelNameEncoded = encodeURIComponent(channel);

  const token = await renewSubscriptionToken(
    `${backend}/api/renew-sub-token/?channel=${channelNameEncoded}`,
    ""
  );
  return token;
};

export const renewSubscriptionToken = (url, ctx) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Unexpected status code ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        resolve(data.data.token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
