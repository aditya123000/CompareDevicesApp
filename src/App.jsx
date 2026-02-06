import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AppLayout from "./Layouts/AppLayout";
import Home from "./Pages/Home";
import Devices from "./Pages/Devices/DevicesPage";
import Compare from "./Pages/Compare/Compare";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        element: <MainLayout />,
        children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/devices",
          element: <Devices />,
        },
        { 
          path: "/compare", 
          element: <Compare /> 
        },
      ],
    },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;