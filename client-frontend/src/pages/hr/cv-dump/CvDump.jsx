import React from "react";
// import DepartmentPayrollChart from "./components/DepartmentPayrollChart";
// import PayrollSummary from "./components/PayrollSummary";
// import PayrollWidgets from "./components/PayrollWidgets";

const CvDump = () => {
  const widgets = [
    {
      id: 1,
      title: "Payroll Cost",
      content: "₹ 150000000",
    },
    {
      id: 2,
      title: "Pending Payments",
      content: "₹ 45000",
    },
    {
      id: 3,
      title: "Total Payrolls",
      content: "200",
    },
  ];
  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full mt-4">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Cv Dump</h1>
      </div>
    </div>
  );
};

export default CvDump;
