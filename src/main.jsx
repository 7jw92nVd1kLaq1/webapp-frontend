import React from "react";
import ReactDOM from "react-dom/client";

import Admin from "./routes/Admin/Admin";
import Users from "./routes/Admin/Users";
import UsersDetail from "./routes/Admin/UsersDetail";
import Buy from "./routes/Buy";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Overview from "./routes/Overview";
import Register from "./routes/Register";
import Root from "./routes/Root";
import { logoutUser, validateCookie } from "./utils/cookie";
import { checkAccessTokenValidity } from "./utils/authentication";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "buy",
        element: <Buy />,
        loader: async () => {
          const isTokenValid = await checkAccessTokenValidity();
          if (!isTokenValid) {
            return redirect("/");
          }
        },
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:userId",
        element: <UsersDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      const doesCookieExist = await validateCookie();
      if (doesCookieExist) {
        return redirect("/");
      }
    },
  },
  {
    path: "/logout",
    loader: async () => {
      const isLoggedIn = await validateCookie();
      if (isLoggedIn) await logoutUser();
      return redirect("/login");
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      const doesCookieExist = await validateCookie();
      if (doesCookieExist) {
        return redirect("/");
      }
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
