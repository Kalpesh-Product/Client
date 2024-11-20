import React from "react";
import TestLink from "./TestLink";
import MyTicketsTable from "../../../components/Submodules/ticket/MyTicketsTable";
import TestSide from "../../../components/Sidetest";
import ModuleSidebar from "../../../components/ModuleSidebar";

const ViewTickets = () => {
  return (
    <div className="flex">
      {/* <TestSide /> */}
      {/* <ModuleSidebar /> */}
      {/* <TestLink /> */}
      <div>
        <div>ViewTickets</div>

        <MyTicketsTable />
      </div>
    </div>
  );
};

export default ViewTickets;
