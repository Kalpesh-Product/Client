import DepartmentPayrollChart from "./components/DepartmentPayrollChart";
import PayrollSummary from "./components/PayrollSummary";
import PayrollWidgets from "./components/PayrollWidgets";
import AgTable from "../../../components/AgTable";
import { dummyData } from "../../../utils/payrollData";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import PayrollTimeLine from "./components/PayrollTimeLine";
import MyPayroll from "./components/MyPayroll";
import MyPayslips from "./components/MyPayslips";

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
export const columns = [
  { headerName: "Name", field: "name", cellStyle: { textAlign: "left" } },
  { headerName: "Department", field: "department" },
  { headerName: "Paid Days", field: "paidDays" },
  { headerName: "Gross Pay", field: "grossPay" },
  { headerName: "Statutory Pay", field: "statutoryPay" },
  { headerName: "Deduction", field: "deduction" },
  { headerName: "Net Pay", field: "netPay" },
  {
    headerName: "Status",
    field: "status",
    cellRenderer: (params) => {
      const statusClasses = {
        Paid: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Unpaid: "bg-red-100 text-red-800",
      };
      const className =
        statusClasses[params.value] || "bg-gray-100 text-gray-800";
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}
        >
          ${params.value}
        </span>
      );
    },
  },
  {
    headerName: "Payslip",
    field: "payslip",
    cellRenderer: () => (
      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
        View
      </a>
    ),
  },
];

const csvHeaders = [
  { label: "Name", key: "name" },
  { label: "Department", key: "department" },
  { label: "Paid Days", key: "paidDays" },
  { label: "Gross Pay", key: "grossPay" },
  { label: "Statutory Pay", key: "statutoryPay" },
  { label: "Deduction", key: "deduction" },
  { label: "Net Pay", key: "netPay" },
  { label: "Status", key: "status" },
  { label: "Payslip", key: "payslip" },
];

export default function PayRollDash() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [payrolls, setPayrolls] = useState(dummyData);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(loggedInUser));
  }, []);

  const examplePayroll = {
    employeeName: loggedInUser.name,
    payPeriod: "01 Nov 2024 - 30 Nov 2024",
    grossSalary: 5000.0,
    deductions: 750.0,
    netSalary: 4250.0,
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDept(department);

    if (department === "all") {
      setPayrolls(dummyData); // Show all data if "All Departments" is selected
    } else {
      const filteredData = dummyData.filter(
        (item) => item.department === department
      );
      setPayrolls(filteredData);
    }
  };

  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full mt-4">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Payroll</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {widgets.map((item) => {
          return (
            <PayrollWidgets
              key={item.id}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 bg-gray-100 w-full">
        <div className="bg-white rounded-lg shadow-md flex-1 p-4 max-w-full lg:max-w-full">
          <DepartmentPayrollChart />
        </div>
        <div className="bg-white rounded-lg shadow-md flex-1 p-4 max-w-full lg:max-w-full">
          <PayrollSummary />
        </div>
      </div>
      <div className="bg-white rounded-md p-2 mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <FormControl className="w-full md:w-1/4">
            <Select
              labelId="dept-filter-label"
              size="small"
              value={selectedDept}
              onChange={handleDepartmentChange}
              className="bg-white"
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="Human Resources">HR</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Information Technology">IT</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
          <CSVLink
            filename="payrolls_report.csv"
            data={payrolls}
            headers={csvHeaders}
            className="flex items-center justify-center wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold p-4 rounded h-9"
          >
            Export
          </CSVLink>
        </div>
        <AgTable
          data={payrolls} // Use filtered data
          columns={columns}
          paginationPageSize={10}
          highlightFirstRow={false}
          highlightEditedRow={false}
        />
      </div>
      <div className="mt-4">
        <PayrollTimeLine />
      </div>
      <MyPayroll payrollDetails={examplePayroll} />
      <div>
        <MyPayslips />
      </div>
    </div>
  );
}
