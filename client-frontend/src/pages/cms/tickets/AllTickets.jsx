import React from "react";
import TestLink from "./TestLink";
import TestSide from "../../../components/Sidetest";
import MyTicketsTable from "../../../components/Submodules/ticket/MyTicketsTable";
import AllTicketsTable from "./components/AllTicketsTable";

const AllTickets = () => {
  return (
    <div className="flex w-full">
      {/* <TestSide /> */}
      {/* <TestLink /> */}
      <div className="w-full">
        <div className="p-4">
          <h2 className="text-2xl  font-bold">All Tickets</h2>
        </div>
        <AllTicketsTable />
      </div>
    </div>
  );
};

export default AllTickets;
