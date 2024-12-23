import React from "react";
import { WidgetSectionLeaveDashboard } from "../../../Dashboard";
import SopLink from "./SopLink";
import PoliciesLink from "./PoliciesLink";

const CompanyHandbookWidgetsContainer = () => {
  const hrWidgets = [
    // {
    //   heading: "Leave Management",
    //   subModule: "leaves",
    //   widgets: [
    //     <LeaveWidget1 />,
    //     <LeaveWidget2 />,
    //     <LeaveWidget3 />,
    //     <LeaveWidget4 />,
    //   ],
    // },
    {
      heading: "Company Handbook",
      subModule: "company-handbook",
      widgets: [<SopLink />, <PoliciesLink />],
    },
  ];
  return (
    <div>
      {hrWidgets
        .filter((section) => section.subModule === "company-handbook")
        .map((section, index) => (
          <WidgetSectionLeaveDashboard
            key={index}
            heading={section.heading}
            widgets={section.widgets}
          />
        ))}
    </div>
  );
};

export default CompanyHandbookWidgetsContainer;
