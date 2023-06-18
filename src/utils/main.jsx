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

import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";

const checkIfUser = async () => {
  const isTokenValid = await checkAccessTokenValidity();
  if (!isTokenValid) {
    return redirect("/");
  }
};

const checkIfLoggedIn = async () => {
  const doesCookieExist = await validateCookie();
  if (doesCookieExist) {
    return redirect("/");
  }
};

const checkIfLoggedOut = async () => {
  const isLoggedIn = await validateCookie();
  if (isLoggedIn) await logoutUser();
  return redirect("/login");
};

const another_route = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="overview" element={<Overview />} />
      <Route path="buy" loader={checkIfUser} element={<Buy />} />
    </Route>
    <Route path="/admin" element={<Admin />}>
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<UsersDetail />} />
    </Route>
    <Route path="/login" element={<Login />} loader={checkIfLoggedIn} />
    <Route path="/logout" loader={checkIfLoggedOut} />
    <Route path="/register" element={<Register />} loader={checkIfLoggedIn} />
  </Routes>
);

export default function App(props) {
  return <BrowserRouter>{props.routes}</BrowserRouter>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App routes={another_route} />
);
