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
import DepartmentDash from "../pages/modules/DepartmentDash";
import ChatPage from "../pages/ChatPage";
import PageHR from "../pages/modules/PageHR";
import NotFoundPage from "../pages/NotFoundPage";
import TicketDashboard from "../pages/cms/tickets/TicketDashboard";
import AddTicket from "../pages/cms/tickets/AddTicket";
import TicketReports from "../pages/cms/tickets/TicketReports";
import ViewTickets from "../pages/cms/tickets/ViewTickets";

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
        path: "*",
        element: <NotFoundPage />,
      },
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
        path: "/customer/asset",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/asset/details",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/asset/view",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/asset/manage",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/dashboard",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/kpi",
        element: <DepartmentDash />,
      },
      {
        path: "/customer/meetings/booking",
        element: <DepartmentDash />,
      },
      {
        path: "/hr/dashboard",
        element: <DepartmentDash />,
      },

      {
        path: "/cms/dashboard",
        element: <DepartmentDash />,
      },
      {
        path: "/sales/dashboard",
        element: <DepartmentDash />,
      },
      {
        path: "/finance/dashboard",
        element: <DepartmentDash />,
      },
      {
        path: "/frontend/dashboard",
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
        path: "/customer/tickets",
        element: <TicketDashboard />,
      },
      {
        path: "/add-ticket",
        element: <AddTicket />,
      },
      {
        path: "/view-tickets",
        element: <ViewTickets />,
      },
      {
        path: "/ticket-reports",
        element: <TicketReports />,
      },
      {
        path: "/dropTest",
        element: <DropTest />,
      },
    ],
  },
]);

export default router;
