import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ClientLandingPage from "../pages/ClientLandingPage";
import AccessPage from "../pages/Access";
import DragDropGrid from "../pages/DragDropGrid";
import ClientLoginPage from "../pages/ClientLoginPage";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Reports from "../pages/Reports";
import TestDashboard from "../pages/TestPage";
import DropTest from "../pages/DropTest";
import Calender from "../pages/Calender";
import Sidebar from "../components/ClientSidebar";
import Services from "../pages/Services";
import DepartmentDash from "../pages/modules/PageFrontend";
import ChatPage from "../pages/ChatPage";
import PageHR from "../pages/modules/PageHR";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // {
      //   index: true,
      //   element: <ClientLoginPage />,
      // },
      {
        path: "/landing",
        element: <ClientLandingPage />,
      },
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/access",
        element: <AccessPage />,
      },
      {
        path: "/landing",
        element: <ClientLandingPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/:department",
        element: <DepartmentDash />,
      },
      {
        path: "/frontend/themes",
        element: <DepartmentDash />,
      },
      {
        path: "/frontend/updates",
        element: <DepartmentDash />,
      },
      {
        path: "/calendar",
        element: <Calender />,
      },
      {
        path: "/drag-test",
        element: <DragDropGrid />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/testdash",
        element: <Sidebar />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/dropTest",
        element: <DropTest />,
      },
    ],
  },
]);

export default router;
