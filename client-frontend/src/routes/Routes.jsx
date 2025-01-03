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
import Services from "../pages/Services";
import DepartmentDash from "../pages/modules/DepartmentDash";
import ChatPage from "../pages/ChatPage";
import PageHR from "../pages/modules/PageHR";
import NotFoundPage from "../pages/NotFoundPage";
import TicketDashboard from "../pages/cms/tickets/TicketDashboard";

import TicketReports from "../pages/cms/tickets/TicketReports";
import ViewTickets from "../pages/cms/tickets/ViewTickets";
import TicketMembers from "../pages/cms/tickets/TicketMembers";
import Task from "../pages/Task";
import Teams from "../pages/Teams";
import Tasklist from "../pages/Tasklist";
import TasklistTable from "../pages/TasklistTable";
import PersistLogin from "../layouts/PersistLogin";
import AuthLayout from "../layouts/AuthLayout";
import Assets from "../pages/cms/asset/Assets";
import Tickets from "../pages/cms/tickets/Tickets";
import RoomBookings from "../pages/cms/room-booking/RoomBookings";
import TestPageAllan from "../pages/TestPageAllan";
import Notifications from "../pages/notifications/Notifications"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PersistLogin />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <ClientLandingPage />,
              },

              {
                path: "/access",
                element: <AccessPage />,
              },
              {
                path: "/assets",
                element: <Assets />,
              },
              {
                path: "/assets/manage",
                element: <Assets />,
              },
              {
                path: "/assets/my-assets",
                element: <Assets />,
              },
              {
                path: "/assets/reports",
                element: <Assets />,
              },
              {
                path: "/tickets",
                element: <Tickets />,
              },
              {
                path: "/tickets/my-tickets",
                element: <Tickets />,
              },
              {
                path: "/tickets/view-tickets",
                element: <Tickets />,
              },
              {
                path: "/tickets/members",
                element: <Tickets />,
              },
              {
                path: "/tickets/ticket-reports",
                element: <Tickets />,
              },
              {
                path: "/tickets/all-tickets",
                element: <Tickets />,
              },
              {
                path: "/meetings",
                element: <RoomBookings />,
              },
              {
                path: "/meetings/booking",
                element: <RoomBookings />,
              },
              {
                path: "/meetings/add-room",
                element: <RoomBookings />,
              },
              {
                path: "/meetings/reports",
                element: <RoomBookings />,
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
                path: "/it/asset",
                element: <DepartmentDash />,
              },
              {
                path: "/it/asset/details",
                element: <DepartmentDash />,
              },
              {
                path: "/it/asset/view",
                element: <DepartmentDash />,
              },
              {
                path: "/it/asset/manage",
                element: <DepartmentDash />,
              },
              {
                path: "/it/asset/my-assets",
                element: <DepartmentDash />,
              },
              {
                path: "/it/asset/reports",
                element: <DepartmentDash />,
              },
              {
                path: "/it/dashboard",
                element: <DepartmentDash />,
              },
              {
                path: "/it/kpi",
                element: <DepartmentDash />,
              },
              {
                path: "/it/meetings",
                element: <DepartmentDash />,
              },
              {
                path: "/it/meetings/booking",
                element: <DepartmentDash />,
              },
              {
                path: "/it/meetings/reports",
                element: <DepartmentDash />,
              },
              {
                path: "/it/meetings/add-room",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/dashboard",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/leaves",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/payslips",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/sops",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/policies",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/employment-agreement",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/employment-agreement-details",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-handbook",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-handbook/sop",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-handbook/sop-details",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-handbook/policies",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-handbook/policy-details",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/holidays",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/onboarding",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/attendance",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/attandence/shift-time-usage",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/leaves/pending-leaves",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/leaves/my-leaves",
                element: <DepartmentDash />,
              },

              {
                path: "/hr/leaves/past-leaves",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/leaves/due-approvals",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/leaves/manage-leaves",
                element: <DepartmentDash />,
              },

              {
                path: "/hr/payroll",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/events",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/cvdump",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/cvdump/applicants",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/payroll/value",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/payroll/employee-count",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/payroll/due-payout",
                element: <DepartmentDash />,
              },
              {
                path: "/hr/company-settings",
                element: <DepartmentDash />,
              },

              {
                path: "/it/dashboard",
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
                path: "/finance/budget",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/budget/request",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/budget/approved",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/budget/payment-tracker",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/vendor",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/vendor/vendor-actions",
                element: <DepartmentDash />,
              },
              {
                path: "/finance/vendor/reports",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/dashboard",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/live-theme",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/themes",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/themes/view-theme/",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/themes/edit-template",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/updates",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/budget",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/budget/overview",
                element: <DepartmentDash />,
              },
              {
                path: "/frontend/budget/payment-tracker",
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
                path: "/chat",
                element: <ChatPage />,
              },
              {
                path: "/test",
                element: <TestPageAllan />,
              },
              {
                path: "/it/tickets",
                element: <DepartmentDash />,
              },
              {
                path: "/it/tickets/members",
                element: <DepartmentDash />,
              },
              {
                path: "/it/tickets/my-tickets",
                element: <DepartmentDash />,
              },
              {
                path: "/it/tickets/view-tickets",
                element: <DepartmentDash />,
              },
              {
                path: "/it/tickets/ticket-reports",
                element: <DepartmentDash />,
              },
              {
                path: "/dropTest",
                element: <DropTest />,
              },
              {
                path: "/tasks/tasklistfirstmenu",
                element: <DepartmentDash />,
              },
              {
                path: "/tasks/teams",
                element: <DepartmentDash />,
              },
              {
                path: "/tasks/tasklist",
                element: <DepartmentDash />,
              },
              {
                path: "/tasks/tasklisttable",
                element: <DepartmentDash />,
              },
              {
                path: "/tasks/mytasks",
                element: <DepartmentDash />,
              },
              {
                path: "/tasks/dashboard",
                element: <DepartmentDash />,
              },
              {
                path: "/notifications",
                element: <Notifications />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
