import React from "react";
import TestSide from "../../../components/Sidetest";
import ModuleSidebar from "../../../components/ModuleSidebar";
import TestLink from "./TestLink";

const TicketDashboard = () => {
  return (
    <div className="flex">
      
      <ModuleSidebar />
      <div>
        <p>TicketDashboard</p>
        <TestLink />
        <div>
          <p>Widgets</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
