import React from "react";

import Admin from "./routes/Admin/Admin";
import Users from "./routes/Admin/Users";
import UsersDetail from "./routes/Admin/UsersDetail";
import Buy from "./routes/Buy";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Overview from "./routes/Overview";
import Register from "./routes/Register";
import Root from "./routes/Root";

import { BrowserRouter, Route, Routes } from "react-router-dom";

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

export default function App() {
  return <BrowserRouter>{another_route}</BrowserRouter>;
}
