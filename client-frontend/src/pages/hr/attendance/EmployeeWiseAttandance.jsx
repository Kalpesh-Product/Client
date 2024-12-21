import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const dummyData = [
  {
    employeeId: "E001",
    name: "John Doe",
    department: "HR",
    employeesPresent: 8,
    employeesAbsent: 2,
    checkinAccuracy: "95%",
    lateCheckins: 1,
    earlyCheckouts: 1,
    lateCheckouts: 0,
    avgHours: "8h",
    avgBreakTime: "1h",
    avgAttendance: "90%",
  },
  {
    employeeId: "E002",
    name: "Jane Smith",
    department: "IT",
    employeesPresent: 10,
    employeesAbsent: 0,
    checkinAccuracy: "98%",
    lateCheckins: 0,
    earlyCheckouts: 0,
    lateCheckouts: 1,
    avgHours: "8.5h",
    avgBreakTime: "45m",
    avgAttendance: "95%",
  },
  {
    employeeId: "E003",
    name: "Abrar Shaikh",
    department: "Top Management",
    employeesPresent: 12,
    employeesAbsent: 0,
    checkinAccuracy: "99%",
    lateCheckins: 0,
    earlyCheckouts: 0,
    lateCheckouts: 0,
    avgHours: "9h",
    avgBreakTime: "1h",
    avgAttendance: "98%",
  },
  {
    employeeId: "E004",
    name: "Kashif Shaikh",
    department: "Management",
    employeesPresent: 15,
    employeesAbsent: 1,
    checkinAccuracy: "97%",
    lateCheckins: 2,
    earlyCheckouts: 1,
    lateCheckouts: 0,
    avgHours: "8.5h",
    avgBreakTime: "50m",
    avgAttendance: "95%",
  },
  {
    employeeId: "E005",
    name: "Aaron Pires",
    department: "Sales & Business Development",
    employeesPresent: 9,
    employeesAbsent: 1,
    checkinAccuracy: "95%",
    lateCheckins: 1,
    earlyCheckouts: 0,
    lateCheckouts: 0,
    avgHours: "8h",
    avgBreakTime: "1h",
    avgAttendance: "92%",
  },
  {
    employeeId: "E006",
    name: "Narshiva Naik",
    department: "Finance",
    employeesPresent: 7,
    employeesAbsent: 0,
    checkinAccuracy: "96%",
    lateCheckins: 0,
    earlyCheckouts: 0,
    lateCheckouts: 1,
    avgHours: "8.2h",
    avgBreakTime: "45m",
    avgAttendance: "94%",
  },
  {
    employeeId: "E007",
    name: "Hema Natalkar",
    department: "Finance",
    employeesPresent: 6,
    employeesAbsent: 1,
    checkinAccuracy: "93%",
    lateCheckins: 1,
    earlyCheckouts: 1,
    lateCheckouts: 0,
    avgHours: "7.5h",
    avgBreakTime: "1.2h",
    avgAttendance: "89%",
  },
  {
    employeeId: "E008",
    name: "Kalpesh Naik",
    department: "Tech",
    employeesPresent: 8,
    employeesAbsent: 1,
    checkinAccuracy: "97%",
    lateCheckins: 1,
    earlyCheckouts: 0,
    lateCheckouts: 1,
    avgHours: "8.3h",
    avgBreakTime: "50m",
    avgAttendance: "93%",
  },
  {
    employeeId: "E009",
    name: "Benson Nadakattin",
    department: "Café",
    employeesPresent: 5,
    employeesAbsent: 0,
    checkinAccuracy: "94%",
    lateCheckins: 2,
    earlyCheckouts: 1,
    lateCheckouts: 0,
    avgHours: "7.8h",
    avgBreakTime: "1.1h",
    avgAttendance: "90%",
  },
  // Add additional entries as needed from the provided data structure...
];

const columns = [
  {
    headerName: "Employee ID",
    field: "employeeId",
    sortable: true,
    filter: true,
  },
  { headerName: "Name", field: "name", sortable: true, filter: true },
  {
    headerName: "Department",
    field: "department",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Employees Present",
    field: "employeesPresent",
    sortable: true,
  },
  { headerName: "Employees Absent", field: "employeesAbsent", sortable: true },
  {
    headerName: "Check-in Accuracy %",
    field: "checkinAccuracy",
    sortable: true,
  },
  { headerName: "Late Check-ins", field: "lateCheckins", sortable: true },
  { headerName: "Early Checkouts", field: "earlyCheckouts", sortable: true },
  { headerName: "Late Checkouts", field: "lateCheckouts", sortable: true },
  { headerName: "Avg Hours", field: "avgHours", sortable: true },
  { headerName: "Avg Break Time", field: "avgBreakTime", sortable: true },
  { headerName: "Avg Attendance", field: "avgAttendance", sortable: true },
];

export default function AttendanceListing() {
  const [data, setData] = useState(dummyData);
  const [timeFilter, setTimeFilter] = useState("Today");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
    // Adjust the data filtering logic based on the time filter
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
    if (event.target.value === "") {
      setData(dummyData);
    } else {
      const filteredData = dummyData.filter(
        (item) => item.department === event.target.value
      );
      setData(filteredData);
    }
  };

  return (
    <section className="p-4 bg-gray-100 w-[80vw] md:w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Attendance Listing
      </h1>

      <div className="bg-white rounded-md p-4">
        {/* Filters */}
        <div className="flex flex-col h-full md:flex-row md:items-center md:space-x-4 mb-4">
          {/* Time Filter */}
          <FormControl className="w-full md:w-1/4">
            <Select
              value={timeFilter}
              onChange={handleTimeFilterChange}
              size="small"
              className="bg-white"
            displayEmpty
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="Annual">Annual</MenuItem>
            </Select>
          </FormControl>

          {/* Department Filter */}
          <FormControl className="w-full md:w-1/4">
            <Select
              value={departmentFilter}
              onChange={handleDepartmentFilterChange}
              size="small"
              className="bg-white"
              displayEmpty
            >
              <MenuItem value="">All Departments</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* AgGrid Table */}
        <div className="w-full bg-gray-100 rounded-md overflow-hidden">
          <div
            className="ag-theme-alpine w-full"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              rowData={data}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
