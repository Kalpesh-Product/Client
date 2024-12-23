import React, { useState } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { dummyData } from "../../../utils/payrollData";
// import DepartmentPayrollChart from "./components/DepartmentPayrollChart";
// import PayrollSummary from "./components/PayrollSummary";
// import PayrollWidgets from "./components/PayrollWidgets";

const CvDump = () => {
  const [selectedFilter, setSelectedFilter] = useState("this month");
  const [payrolls, setPayrolls] = useState(dummyData);

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
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full mt-2">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="text-2xl font-semibold">CV DUMP</div>
        <FormControl className="w-full md:w-1/4 bg-white">
          <Select value={selectedFilter} onChange={handleFilterChange}>
            <MenuItem value="previous month">Previous Month</MenuItem>
            <MenuItem value="this month">This Month</MenuItem>
            <MenuItem value="annual">Annual</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div class="flex flex-wrap justify-center gap-4 p-6">
        <div class="flex-1 max-w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* <img class="rounded-t-lg" src="https://via.placeholder.com/300x200" alt="Card Image 1"> */}
          <div class="p-6">
            <h5 class="text-lg font-bold mb-2">Card Title 1</h5>
            <p class="text-gray-700 mb-4">
              This is a brief description for the first card. It provides some
              information about the content.
            </p>
          </div>
        </div>

        <div class="flex-1 max-w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* <img class="rounded-t-lg" src="https://via.placeholder.com/300x200" alt="Card Image 2"> */}
          <div class="p-6">
            <h5 class="text-lg font-bold mb-2">Card Title 2</h5>
            <p class="text-gray-700 mb-4">
              This is a brief description for the second card. It provides some
              information about the content.
            </p>
          </div>
        </div>

        <div class="flex-1 max-w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* <img class="rounded-t-lg" src="https://via.placeholder.com/300x200" alt="Card Image 3"> */}
          <div class="p-6">
            <h5 class="text-lg font-bold mb-2">Card Title 3</h5>
            <p class="text-gray-700 mb-4">
              This is a brief description for the third card. It provides some
              information about the content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvDump;
