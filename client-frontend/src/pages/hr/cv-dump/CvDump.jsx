import React, { useState } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { dummyData } from "../../../utils/payrollData";
import BasicCardCount from "../../../components/Cards/BasicCardCount";
// import DepartmentPayrollChart from "./components/DepartmentPayrollChart";
// import PayrollSummary from "./components/PayrollSummary";
// import PayrollWidgets from "./components/PayrollWidgets";

const CvDump = () => {
  const [selectedFilter, setSelectedFilter] = useState("this month");
  const [payrolls, setPayrolls] = useState(dummyData);

  const widgets = [
    <BasicCardCount
      theme={"white"}
      title={"Total CVs Received"}
      
      titleSize={"text-2xl"}
      data={"23"}
    />,
    <BasicCardCount
      theme={"white"}
      title={"Monthly CV Received"}
      
      titleSize={"text-2xl"}
      data={"23"}
    />,

    <BasicCardCount
      theme={"white"}
      title={"Annually CV Received"}
      
      titleSize={"text-2xl"}
      data={"23"}
    />,
  ];

  const widgetsData = {
    "previous month": [
      { id: 1, title: "Payroll Cost", content: "₹ 95000" },
      { id: 2, title: "Total Employee count", content: "4" },
      { id: 3, title: "Due Payout", content: "₹ 15000" },
    ],
    "this month": [
      { id: 1, title: "Payroll Cost", content: "₹ 113000" },
      { id: 2, title: "Total Employee count", content: "5" },
      { id: 3, title: "Due Payout", content: "₹ 20000" },
    ],
    annual: [
      { id: 1, title: "Payroll Cost", content: "₹ 1356000" },
      { id: 2, title: "Total Employee count", content: "5" },
      { id: 3, title: "Due Payout", content: "₹ 50000" },
    ],
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="w-[80vw] md:w-full">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">CV DUMP</div>
        <div></div>
      </div>
      <div className="flex flex-row gap-2">
        {widgets.map((widget, index) => (
          <div key={index} className="flex-1 bg-white  rounded-md gap-10 ">
            {widget}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvDump;
