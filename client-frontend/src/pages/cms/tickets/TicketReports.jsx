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
        <div className="py-10">
          <h2 className="text-2xl font-bold">Ticket Reports</h2>
        </div>
        <MyTicketsTable />
      </div>
    </div>
  );
};

export default TicketReports;
