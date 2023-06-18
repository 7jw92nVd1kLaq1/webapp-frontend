import React from "react";
import { Outlet, Route } from "react-router-dom";

import { checkIfUser } from "@/utils/authentication";

const AuthRoute = () => {
  return <Outlet />;
};

export default AuthRoute;
