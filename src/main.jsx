import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material"; // <-- IMPORT Ở ĐÂY

import DashboardPage from "./pages/DashboardPage";
import DashboardHome from "./components/DashboardHome.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CardDetail from "./components/CardDetail.jsx";
import CreateCard from "./components/CreateCard.jsx";
import ApprovalCard from "./components/ApprovalCard.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "createCard",
        element: <CreateCard />,
      },
      { path: "createCard/approval", element: <ApprovalCard /> },
    ],
  },
  {
    path: "/project/:projectId",
    element: <CardDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline /> {/* <-- THÊM VÀO ĐÂY */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
