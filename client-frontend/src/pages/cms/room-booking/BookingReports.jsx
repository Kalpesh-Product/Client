import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem, TextField } from "@mui/material";
import { CSVLink } from "react-csv";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import AgTable from "../../../components/AgTable";
import useAuth from "../../../hooks/useAuth";

export default function BookingReports() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { auth: loggedInUser } = useAuth();

  // Dummy data for bookings
  const bookings = [
    {
      id: 1,
      department: "IT",
      name: "Faizan Shaikh",
      date: "2024-11-21",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      duration: "2h",
      credits: 20,
      status: "Ongoing",
    },
    {
      id: 2,
      department: "Admin",
      name: "Naaz Parveen Bavannawar",
      date: "2024-11-20",
      startTime: "01:00 PM",
      endTime: "03:00 PM",
      duration: "2h",
      credits: 50,
      status: "Cancelled",
    },
    {
      id: 3,
      department: "HR",
      name: "Farzeen Qadri",
      date: "2024-11-19",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      duration: "1h 30m",
      credits: 30,
      status: "Upcoming",
    },
    {
      id: 4,
      department: "Finance",
      name: "Narshiva Naik",
      date: "2024-11-18",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      duration: "1h 30m",
      credits: 10,
      status: "Cancelled",
    },
    {
      id: 5,
      department: "IT",
      name: "Machindranath Parkar",
      date: "2024-11-17",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
      duration: "1h 30m",
      credits: 40,
      status: "Upcoming",
    },
    {
      id: 6,
      department: "Admin",
      name: "Pranali Kandolkar",
      date: "2024-11-16",
      startTime: "03:00 PM",
      endTime: "05:00 PM",
      duration: "2h",
      credits: 20,
      status: "Ongoing",
    },
    {
      id: 7,
      department: "Tech",
      name: "Kalpesh Naik",
      date: "2024-11-22",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      duration: "2h",
      credits: 25,
      status: "Upcoming",
    },
    {
      id: 8,
      department: "Tech",
      name: "Aiwinraj KS",
      date: "2024-11-23",
      startTime: "01:00 PM",
      endTime: "03:00 PM",
      duration: "2h",
      credits: 30,
      status: "Ongoing",
    },
    {
      id: 9,
      department: "Tech",
      name: "Anushri Bhagat",
      date: "2024-11-24",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
      duration: "1h 30m",
      credits: 20,
      status: "Cancelled",
    },
  ];

  // Filtering logic
  const filteredBookings = bookings.filter((booking) => {
    const isDepartmentMatch =
      loggedInUser.user?.role.roleTitle === "Employee"
        ? loggedInUser.user.department.some(
            (dept) => dept.name === booking.department
          ) // Check if the booking's department exists in the loggedInUser's departments
        : selectedDepartment === "All" ||
          booking.department === selectedDepartment;

    const isStatusMatch =
      selectedStatus === "All" || booking.status === selectedStatus;

    const isDateMatch =
      (!startDate || new Date(booking.date) >= new Date(startDate)) &&
      (!endDate || new Date(booking.date) <= new Date(endDate));

    return isDepartmentMatch && isStatusMatch && isDateMatch;
  });

  // Column definitions for AgGrid
  const columns = [
    { headerName: "ID", field: "id", flex: 1 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Department", field: "department", flex: 1 },
    { headerName: "Date", field: "date", flex: 1 },
    { headerName: "Start Time", field: "startTime", flex: 1 },
    { headerName: "End Time", field: "endTime", flex: 1 },
    { headerName: "Duration", field: "duration", flex: 1 },
    { headerName: "Credits Used", field: "credits", flex: 1 },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => {
        const statusColors = {
          Ongoing: "text-blue-600 bg-blue-100",
          Cancelled: "text-red-600 bg-red-100",
          Upcoming: "text-yellow-600 bg-yellow-100",
        };
        const statusClass = statusColors[params.value] || "";
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  // CSV headers
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Department", key: "department" },
    { label: "Name", key: "name" },
    { label: "Date", key: "date" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Duration", key: "duration" },
    { label: "Credits", key: "credits" },
    { label: "Status", key: "status" },
  ];

  return (
    <section className="p-4 bg-white w-[80vw] md:w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Reports</h1>

      <div className="bg-white rounded-md">
        {/* Filters */}
        <div className="flex flex-col h-full md:flex-row md:items-center md:space-x-4 mb-4">
          {/* Department Filter */}
          <FormControl className="w-full md:w-1/4">
            <Select
              disabled={loggedInUser.user.role === "Employee"}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              size="small"
            >
              <MenuItem value="All">
                {loggedInUser.user.role.roleTitle === "Employee"
                  ? "My Departments"
                  : "All Departments"}
              </MenuItem>
              {loggedInUser.user.role === "Employee"
                ? loggedInUser.user.department.map((dept) => (
                    <MenuItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </MenuItem>
                  ))
                : ["IT", "Admin", "HR", "Finance", "Tech"].map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          {/* Status Filter */}
          <FormControl className="w-full md:w-1/4">
            <Select
              labelId="status-filter-label"
              size="small"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white"
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Upcoming">Upcoming</MenuItem>
            </Select>
          </FormControl>
          {/* Date Range Filter */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} className="w-full md:w-1/4" />
              )}
            />
            <DatePicker
              label="End Date"
              slotProps={{ textField: { size: "small" } }}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} className="w-full md:w-1/4" />
              )}
            />
          </LocalizationProvider>
          {/* Export Button */}
          <CSVLink
            filename="tickets_report.csv"
            data={filteredBookings}
            headers={csvHeaders}
            className="flex items-center justify-center wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold p-4 rounded h-9"
          >
            Export
          </CSVLink>
        </div>

        {/* AgGrid */}
        <Box className="w-full" height="100%" sx={{ overflowX: "auto" }}>
          <AgTable
            data={filteredBookings}
            columns={columns}
            paginationPageSize={5}
          />
        </Box>
      </div>
    </section>
  );
}
