import React from "react";
import TestLink from "./TestLink";

import TestSide from "../../../components/Sidetest";
import ModuleSidebar from "../../../components/ModuleSidebar";

import MyTicketsTabs from "./components/MyTicketsTabs";

const MyTicketsPage = () => {
  return (
    <div className="flex">
      {/*  */}
      {/* <ModuleSidebar /> */}
      {/* <TestLink /> */}
      <div className=" w-full">
        {/* <div>ViewTickets</div> */}

        <MyTicketsTabs />
      </div>
    </div>
  );
};

export default MyTicketsPage;
