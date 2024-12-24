import React from "react";
import { WidgetSectionLeaveDashboard } from "../../../Dashboard";
import LeaveWidget1 from "./LeaveWidget1";
import LeaveWidget2 from "./LeaveWidget2";
import LeaveWidget3 from "./LeaveWidget3";
import LeaveWidget4 from "./LeaveWidget4";
import BasicCardCount from "../../../../components/Cards/BasicCardCount";
import { BudgetApproval } from "../../../../Widgets/TechWidgets";

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

  // const techWidgets = [
  //   {
  //     heading: "Budget Data",
  //     widgets: [
  //       <BasicCardCount
  //         theme={"white"}
  //         title={"Applicable Leaves"}
  //         subText={"(Per Unit Cost)"}
  //         titleSize={"text-3xl"}
  //         data={"23"}
  //       />,
  //       <BasicCardCount
  //         theme={"white"}
  //         title={"Actual"}
  //         subText={"(Per Unit Cost)"}
  //         titleSize={"text-3xl"}
  //         data={"23"}
  //       />,
  //       <BasicCardCount
  //         theme={"white"}
  //         title={"Actual"}
  //         subText={"(Per Unit Cost)"}
  //         titleSize={"text-3xl"}
  //         data={"23"}
  //       />,
  //       <BasicCardCount
  //         theme={"white"}
  //         title={"Actual"}
  //         subText={"(Per Unit Cost)"}
  //         titleSize={"text-3xl"}
  //         data={"23"}
  //       />,
  //     ],
  //   },
  // ];
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
      {/* {techWidgets.map((section, index) => (
        <WidgetSectionLeaveDashboard
          key={index}
          // heading={section.heading}
          widgets={section.widgets}
        />
      ))} */}
    </div>
  );
};

export default LeaveWidgetsContainer;
