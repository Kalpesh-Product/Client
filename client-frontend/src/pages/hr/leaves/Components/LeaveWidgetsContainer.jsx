import React from "react";
import { WidgetSectionLeaveDashboard } from "../../../Dashboard";
import LeaveWidget1 from "./LeaveWidget1";
import LeaveWidget2 from "./LeaveWidget2";
import LeaveWidget3 from "./LeaveWidget3";
import LeaveWidget4 from "./LeaveWidget4";

const LeaveWidgetsContainer = () => {
  const hrWidgets = [
    {
      heading: "Leave Management",
      subModule: "leaves",
      widgets: [
        <LeaveWidget1 />,
        <LeaveWidget2 />,
        <LeaveWidget3 />,
        <LeaveWidget4 />,
      ],
    },
    // {
    //   heading: "Company Handbook",
    //   subModule: "company-handbook",
    //   widgets: [<SopLink />, <PoliciesLink />],
    // },
  ];
  return (
    <div>
      {hrWidgets
        .filter((section) => section.subModule === "leaves")
        .map((section, index) => (
          <WidgetSectionLeaveDashboard
            key={index}
            // heading={section.heading}
            widgets={section.widgets}
          />
        ))}
    </div>
  );
};

export default LeaveWidgetsContainer;
