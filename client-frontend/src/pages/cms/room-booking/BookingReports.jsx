import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, Select, MenuItem, TextField } from "@mui/material";
import { CSVLink } from "react-csv";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";

export default function BookingReports() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
  ];

  // Filtering logic
  const filteredBookings = bookings.filter((booking) => {
    const isDepartmentMatch =
      selectedDepartment === "All" || booking.department === selectedDepartment;
    const isStatusMatch =
      selectedStatus === "All" || booking.status === selectedStatus;
    const isDateMatch =
      (!startDate || new Date(booking.date) >= new Date(startDate)) &&
      (!endDate || new Date(booking.date) <= new Date(endDate));
    return isDepartmentMatch && isStatusMatch && isDateMatch;
  });

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
    <section className="p-6 bg-gray-100 min-h-screen w-[80vw] md:w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Booking Reports</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          {/* Department Filter */}
          <FormControl className="w-full md:w-1/4">
            <Select
              labelId="department-filter-label"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              size="small"
              className="bg-white"
            >
              <MenuItem value="All">All Departments</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
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
              slotProps={{ textField: { size: 'small' } }}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params}  className="w-full md:w-1/4" />
              )}
            />
            <DatePicker
              label="End Date"
              slotProps={{ textField: { size: 'small' } }}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params}  className="w-full md:w-1/4" />
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

        {/* DataGrid */}
        <Box className="w-full" sx={{ overflowX: "auto" }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredBookings}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "department", headerName: "Department", width: 120 },
                { field: "name", headerName: "Name", width: 200 },
                { field: "date", headerName: "Date", width: 120 },
                { field: "startTime", headerName: "Start Time", width: 120 },
                { field: "endTime", headerName: "End Time", width: 120 },
                { field: "duration", headerName: "Duration", width: 120 },
                { field: "credits", headerName: "Credits Used", width: 120 },

                {
                  field: "status",
                  headerName: "Status",
                  width: 150,
                  pinned: "right", // Pin this column to the right
                  renderCell: (params) => {
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
              ]}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableColumnResize={false}
              sx={{
                overflowX: "scroll",
                "& .MuiDataGrid-root": {
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.5rem",
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  color: "#374151",
                  fontSize: "0.875rem",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f3f4f6",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                },
              }}
            />
          </div>
        </Box>
      </div>
    </section>
  );
}
