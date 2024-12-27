import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { TicketsRemainingWidget } from "./components/TicketWidgets/TicketsRemainingWidget";
import MyTickets from "./components/MyTickets";
import { WidgetSection } from "../../Dashboard";
import TestSide from "../../../components/Sidetest";
import TicketWidget from "./components/TicketWidget";
import TicketWidget2 from "./components/TicketWidget2";
import TicketWidget3 from "./components/TicketWidget3";
import MyTicketsPage from "./MyTicketsPage";
import ViewTickets from "./ViewTickets";
import AllTickets from "./AllTickets";
import TicketReports from "./TicketReports";
import TicketMembers from "./TicketMembers";

const Tickets = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const customerServiceWidgets = [
    {
      heading: "Ticket Management",
      subModule: "ticket",
      widgets: [
        <TicketWidget />,
        <TicketWidget2 />,
        <TicketWidget3 />,
        // <TicketWidget4 />,
        // <AssetsCount count={customerServiceWidgetsData.totalAssets} />,
        // <MaintenanceRequests
        //   requests={customerServiceWidgetsData.pendingMaintenance}
        // />,
        // <AssetsAssigned assigned={customerServiceWidgetsData.assignedAssets} />,
        // <AssetsInRepair count={customerServiceWidgetsData.assetsInRepair} />,
        // <NewAssetsAdded added={customerServiceWidgetsData.newAssetsAdded} />,
      ],
    },
  ];
  return (
    <div className="flex min-h-screen bg-slate-50 flex-1 w-full">
      <div>
        
      </div>
      <div className="w-full h-screen overflow-auto">
        {location.pathname === "/tickets" ? (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <div className="mb-8 flex justify-between">
              {/* <div className=" flex gap-4">
              

                    {user.role === "Employee" && user.department === "IT" && (
                      <div>
                        <span className="text-2xl">Status: </span>
                        <button
                          onClick={toggleStatus}
                          className={`px-6 py-2 rounded-lg text-white transition-shadow shadow-md hover:shadow-lg active:shadow-inner ${
                            isAvailable
                              ? "bg-green-400 hover:bg-green-300"
                              : "bg-red-400 hover:bg-red-300"
                          }`}>
                          {isAvailable ? "Available" : "Unavailable"}
                        </button>
                      </div>
                    )}
               

                    <button
                      onClick={handleOpenTicket}
                      className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                      Raise Ticket
                    </button>
                  </div> */}
            </div>
            {customerServiceWidgets
              .filter((section) => section.subModule === "ticket")
              .map((section, index) => (
                <WidgetSection
                  key={index}
                  heading={section.heading}
                  widgets={section.widgets}
                />
              ))}

            {["Admin", "Super Admin", "Master Admin"].includes(
              authUser.user.role.roleTitle
            ) && (
              <div className="flex w-full flex-1 flex-grow gap-x-4">
                <TicketsRemainingWidget
                  totalStock={120}
                  remainingStock={100}
                  assetType="Tickets"
                />

                <TicketsRemainingWidget
                  totalStock={3}
                  remainingStock={1}
                  assetType="Available Members"
                />
              </div>
            )}

            {/* <AssetAllocationWidget /> */}

            <div className=" ">
              <div className="flex w-full p-4 pb-4 pl-0 text-lg border-b-0 gap-4">
                {/* <h2 className="text-2xl font-bold">My Tickets</h2> */}
                <h2 className="text-2xl font-bold">
                  {/* Tickets Received Today */}
                  Tickets Raised Today
                </h2>
                <button
                  className="py-1 px-2 text-sm wono-blue-dark text-white rounded-md"
                  onClick={() => navigate("/my-tickets")}>
                  View All
                </button>
              </div>
              {/* <p>Today's tickets Table Component</p> */}
              {/* <TodaysTickets /> */}
              <MyTickets />
            </div>
            {/* <p>x</p> */}
          </div>
        ) : location.pathname === "/tickets/my-tickets" ? (
          <MyTicketsPage />
        ) : location.pathname === "/tickets/view-tickets" ? (
          <ViewTickets />
        ) : location.pathname === "/tickets/members" ? (
          <TicketMembers />
        ) : location.pathname === "/tickets/ticket-reports" ? (
          <TicketReports />
        ) : location.pathname === "/tickets/all-tickets" ? (
          <AllTickets />
        ) : (
          <>
            <h1>Coming Soon</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Tickets;
