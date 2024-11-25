import React from "react";
import TestLink from "./TestLink";
import TestSide from "../../../components/Sidetest";
import MyTicketsTable from "../../../components/Submodules/ticket/MyTicketsTable";

const TicketReports = () => {
  return (
    <div className="flex w-full">
      {/* <TestSide /> */}
      {/* <TestLink /> */}
      <div className="w-full">
        <div className="p-6">
          <h2 className="text-3xl  font-bold">Ticket Reports</h2>
        </div>
        <MyTicketsTable />
      </div>
    </div>
  );
};

export default TicketReports;
