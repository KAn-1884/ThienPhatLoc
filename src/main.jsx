import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Navigate } from "react-router-dom";

// import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
// import CreatePage from "./pages/CreatePage.jsx";
// import CardDetail from "./components/CardDetail.jsx";
// import DashboardHome from "./components/DashboardHome.jsx";
// import ApprovalCard from "./components/ApprovalCard.jsx";
// import DocumentPage from "./pages/DocumentPage.jsx";
import ChooseRolePage from "./pages/ChooseRolePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/choose-role",
    element: <ChooseRolePage />,
  },
  // {
  //   path: "/",
  //   element: <DashboardPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <DashboardHome />,
  //     },
  //     {
  //       path: "createPage",
  //       element: <CreatePage />,
  //       children: [
  //         {
  //           path: "approval",
  //           element: <ApprovalCard />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "documents",
  //       element: <DocumentPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/project/:projectId",
  //   element: <CardDetail />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
