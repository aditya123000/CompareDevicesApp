import React from "react";
import { Outlet } from "react-router-dom";
import { CompareProvider } from "../context/CompareContext";

const AppLayout = () => {
  return (
    <CompareProvider>
      <Outlet />
    </CompareProvider>
  );
};

export default AppLayout;
