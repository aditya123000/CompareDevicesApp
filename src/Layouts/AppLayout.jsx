import React from "react";
import { Outlet } from "react-router-dom";
import { CompareProvider } from "../Pages/Compare/context/CompareContext";

const AppLayout = () => {
  return (
    <CompareProvider>
      <Outlet />
    </CompareProvider>
  );
};

export default AppLayout;
