// File: src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import CreatePage from "./pages/CreatePage.jsx";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CardDetail from "./components/CardDetail.jsx";
import DashboardHome from "./components/DashboardHome.jsx";
import ChooseRolePage from "./pages/ChooseRolePage.jsx";
import ProjectApproval from "./components/ProjectApproval.jsx";
import ApprovalListPage from "./pages/ApprovalListPage.jsx";

// ⭐️ 1. IMPORT COMPONENT MỚI
import WorkItemDetail from "./components/WorkItemDetail.jsx";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  // { path: "/choose-role", element: <ChooseRolePage /> },
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      { index: true, element: <DashboardHome /> },

      {
        path: "approval",
        element: <ApprovalListPage />,
      },

      {
        path: "approval/:projectId",
        element: <ProjectApproval />,
      },

      { path: "project/:projectId", element: <CardDetail /> },

      // ⭐️ 2. THÊM ROUTE MỚI CHO TRANG CON
      {
        path: "project/:projectId/:workItemId",
        element: <WorkItemDetail />,
      },

      { path: "createPage", element: <CreatePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);
