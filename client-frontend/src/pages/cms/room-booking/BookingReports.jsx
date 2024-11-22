import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import { CSVLink } from "react-csv";

export default function BookingReports() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

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
      status: "Ongoing",
    },
  ];

  // Filtering bookings based on the selected department
  const filteredBookings =
    selectedDepartment === "All"
      ? bookings
      : bookings.filter((booking) => booking.department === selectedDepartment);

  // Define CSV headers
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Department", key: "department" },
    { label: "Name", key: "name" },
    { label: "Date", key: "date" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Duration", key: "duration" },
    { label: "Status", key: "status" },
  ];

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Booking Reports</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Department Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <FormControl className="w-full md:w-1/3">
            <Select
              labelId="department-filter-label"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-white"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
          <CSVLink
            filename="tickets_report.csv" // Set the filename for the CSV file
            data={filteredBookings} // Use filtered data
            headers={csvHeaders} // Add headers
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold p-7 rounded h-9"
          >
            Export Report
          </CSVLink>
        </div>

        {/* DataGrid */}
        <Box className="w-full">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredBookings}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "department", headerName: "Department", width: 150 },
                { field: "name", headerName: "Name", width: 200 },
                { field: "date", headerName: "Date", width: 150 },
                { field: "startTime", headerName: "Start Time", width: 150 },
                { field: "endTime", headerName: "End Time", width: 150 },
                { field: "duration", headerName: "Duration", width: 120 },
                {
                  field: "status",
                  headerName: "Status",
                  width: 150,
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
              sx={{
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
