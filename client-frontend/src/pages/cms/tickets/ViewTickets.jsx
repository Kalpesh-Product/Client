import React from "react";
import TestLink from "./TestLink";
import MyTicketsTable from "../../../components/Submodules/ticket/MyTicketsTable";
import TestSide from "../../../components/Sidetest";

const ViewTickets = () => {
  return (
    <div className="flex">
      <TestSide />
      <TestLink />
      <div>
        <div>ViewTickets</div>

        <MyTicketsTable />
      </div>
    </div>
  );
};

export default ViewTickets;
