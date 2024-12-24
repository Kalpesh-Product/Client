import { useState } from "react";
import DepartmentPayrollChart from "./components/DepartmentPayrollChart";
import BasicCardCount from "../../../components/Cards/BasicCardCount";
import { FormControl, MenuItem, Select } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import EmployeeCount from "./components/EmployeeCount";
import { useNavigate } from "react-router-dom";

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

export default function PayRollDash() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("this month");

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  if (!auth.user) {
    return <div>Loading...</div>;
  }

  const isAdmin =
    auth.user.role.roleTitle === "Master-Admin" ||
    auth.user.role.roleTitle === "Super-Admin";

  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full mt-4">
      {isAdmin ? (
        <>
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Payroll</h1>
            <FormControl className="w-full md:w-1/4 bg-white">
              <Select
                size="small"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <MenuItem value="previous month">Previous Month</MenuItem>
                <MenuItem value="this month">This Month</MenuItem>
                <MenuItem value="annual">Annual</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {widgetsData[selectedFilter].map((item) => (
              <BasicCardCount
                key={item.id}
                title={item.title}
                data={item.content}
                theme="white"
                titleSize="text-xl"
                onClick={
                  item.id === 1
                    ? () => navigate("/hr/payroll/value")
                    : item.id === 2
                    ? () => navigate("/hr/payroll/employee-count")
                    : item.id === 3
                    ? () => navigate("/hr/payroll/due-payout")
                    : null
                }
              />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 bg-gray-100 w-full">
            <DepartmentPayrollChart />

            <EmployeeCount />
          </div>
        </>
      ) : null}
    </div>
  );
}
