import React from "react";
import TestLink from "./TestLink";
import TestSide from "../../../components/Sidetest";
import MyTicketsTable from "../../../components/Submodules/ticket/MyTicketsTable";

const TicketReports = () => {
  return (
    <div className="flex">
      {/* <TestSide /> */}
      {/* <TestLink /> */}
      <div>
        <div className="py-10">
          <h2 className="text-lg">Ticket Reports</h2>
        </div>
        <MyTicketsTable />
      </div>
    </div>
  );
};

export default TicketReports;
