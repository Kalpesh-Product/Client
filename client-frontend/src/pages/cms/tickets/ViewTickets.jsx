import React from "react";
import TestLink from "./TestLink";

import TestSide from "../../../components/Sidetest";
import ModuleSidebar from "../../../components/ModuleSidebar";
import ViewTicketsTabs from "./components/ViewTicketsTabs";

const ViewTickets = () => {
  return (
    <div className="flex">
      {/*  */}
      {/* <ModuleSidebar /> */}
      {/* <TestLink /> */}
      <div className=" w-full">
        {/* <div>ViewTickets</div> */}

        <ViewTicketsTabs />
      </div>
    </div>
  );
};

export default ViewTickets;
