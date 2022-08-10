import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const authToken = user?.token;

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
