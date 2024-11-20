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
        <div>TicketReports</div>
        <MyTicketsTable />
      </div>
    </div>
  );
};

export default TicketReports;
