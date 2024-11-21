// App.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function RoomBookingDash() {
  const upcomingBookings = 5;
  const totalBookings = 10;
  const pendingApprovals = 3;
  const cancellations = 2;
  const Credits = 500;
  const feedbackScore = 4.5;

  const recentBookings = [
    {
      id: 1,
      name: "Kalpesh Naik",
      room: "Arambol",
      date: "2024-11-22",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Kashif Shaikh",
      room: "Sydney",
      date: "2024-11-23",
      status: "Pending",
    },
    {
      id: 3,
      name: "Aiwinraj KS",
      room: "Zurich",
      date: "2024-11-20",
      status: "Cancelled",
    },
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "room", headerName: "Room", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            params.value === "Confirmed"
              ? "bg-green-500"
              : params.value === "Pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {params.value}
        </span>
      ),
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room Booking Dashboard</h1>
        <button
          onClick={() => navigate("/customer/meetings/booking")}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
        >
          Book a Room
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Upcoming Bookings */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <p className="text-4xl font-bold text-blue-600">{upcomingBookings}</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold text-green-600">{totalBookings}</p>
        </div>

        {/* Cancellations */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Cancellations</h2>
          <p className="text-4xl font-bold text-red-600">{cancellations}</p>
        </div>

        {/* Credits */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Credits</h2>
          <p className="text-4xl font-bold text-purple-600">{Credits}</p>
        </div>
      </div>

      {/* Recent Bookings DataGrid */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={recentBookings}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
