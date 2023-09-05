import React from "react";

import Admin from "@/routes/Admin/Admin";
import Users from "@/routes/Admin/Users";
import UsersDetail from "@/routes/Admin/UsersDetail";
import Buy from "@/routes/orders/create/Buy";
import HomePage from "@/routes/HomePage";
import ListOrders from "@/routes/orders/view/ListOrders";
import Login from "@/routes/authentication/login/Login";
import Overview from "@/routes/Overview";
import Register from "@/routes/authentication/register/Register";
import Root from "@/routes/Root";

import { Provider } from "react-redux";
import reduxStore from "@/redux/store";

import ListAllUserOrders from "@/routes/orders/view/components/ListAllUserOrders";
import ListCustomerUserOrders from "@/routes/orders/view/components/ListCustomerUserOrders";
import ListIntermediaryUserOrders from "@/routes/orders/view/components/ListIntermediaryUserOrders";

import ViewOrderAsCustomer from "@/routes/orders/view/customer/ViewOrderAsCustomer";

import ListCustomersOrders from "@/routes/orders/handshake/ListCustomersOrders";

import {
  checkIfUser,
  checkIfLoggedIn,
  logOut,
} from "@/utils/authentication.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const another_route = (
  <Route>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="overview" element={<Overview />} />
      <Route
        path="earn"
        loader={checkIfUser}
        element={<ListCustomersOrders />}
      />
      <Route path="buy" loader={checkIfUser} element={<Buy />} />
      <Route path="viewOrders" element={<ListOrders />}>
        <Route path="all" element={<ListAllUserOrders />} />
        <Route path="customer" element={<ListCustomerUserOrders />} />
        <Route path="customer/:orderId" element={<ViewOrderAsCustomer />} />
        <Route path="intermediary" element={<ListIntermediaryUserOrders />} />
      </Route>
    </Route>
    <Route path="/admin" element={<Admin />} loader={checkIfUser}>
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<UsersDetail />} />
    </Route>
    <Route path="/login" element={<Login />} loader={checkIfLoggedIn} />
    <Route path="/logout" loader={logOut} />
    <Route path="/register" element={<Register />} loader={checkIfLoggedIn} />
  </Route>
);

const routes = createBrowserRouter(createRoutesFromElements(another_route));

export default function App() {
  return (
    <Provider store={reduxStore}>
      <RouterProvider router={routes} />
    </Provider>
  );
}
