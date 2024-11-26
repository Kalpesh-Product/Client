import React from "react";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../components/AgTable";
import { useLocation } from "react-router-dom";

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

  // Define columns for the AgGrid
  const columns = [
    { headerName: "ID", field: "id", width: 100 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Room", field: "room", flex: 1 },
    { headerName: "Date", field: "date", flex: 1 },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      cellRenderer: (params) => {
        const statusColors = {
          Confirmed: "text-green-600 bg-green-100",
          Cancelled: "text-red-600 bg-red-100",
          Pending: "text-yellow-600 bg-yellow-100",
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
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-gray-100 w-[80vw] md:w-full">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room Booking Dashboard</h1>
        {location.pathname === '/customer/meetings' ? (
        <button
          onClick={() => navigate("/customer/meetings/booking")}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
        >
          Book a Room
        </button>
        ) : ''}
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Upcoming Bookings */}
        <div
          onClick={() => navigate("/customer/meetings/booking")}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <p className="text-4xl font-bold text-blue-600">{upcomingBookings}</p>
        </div>

        {/* Total Bookings */}
        <div
          onClick={() => navigate("/customer/meetings/reports")}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold text-green-600">{totalBookings}</p>
        </div>

        {/* Cancellations */}
        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => navigate("/customer/meetings/reports")}
        >
          <h2 className="text-xl font-semibold">Cancellations</h2>
          <p className="text-4xl font-bold text-red-600">{cancellations}</p>
        </div>

        {/* Credits */}
        <div
          onClick={() => navigate("/profile")}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Credits</h2>
          <p className="text-4xl font-bold text-purple-600">{Credits}</p>
        </div>
      </div>

      {/* Recent Bookings AgTable */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <AgTable
          data={recentBookings}
          columns={columns}
          paginationPageSize={5}
        />
      </div>
    </div>
  );
}
