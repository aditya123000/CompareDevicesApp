import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./app/MainLayout";
import AppLayout from "./app/AppLayout";
import Home from "./Pages/Home";
import Devices from "./Pages/Devices";
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