import { useNavigate } from "react-router-dom";
import AgTable from "../../../components/AgTable";
import RoomAvailabilityPieChart from "./components/RoomCharts";
import AvailableRooms from "./components/AviliableRooms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function RoomBookingDash() {
  const navigate = useNavigate();

  const {
    data: rooms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get("/api/meetings/get-rooms");
      return response.data.data; // Assuming the API response has rooms in response.data
    },
  });

  const upcomingBookings = 5;
  const totalBookings = 10;
  const cancellations = 2;
  const Credits = 500;

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
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {params.value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="py-4 w-[80vw] md:w-full">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Room Booking Management</h1>
        <button
          onClick={() => navigate("/it/meetings/booking")}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Book a Room
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <p className="text-4xl font-bold text-blue-600">{upcomingBookings}</p>
        </div>
        <div className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold text-green-600">{totalBookings}</p>
        </div>
        <div className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition">
          <h2 className="text-xl font-semibold">Cancellations</h2>
          <p className="text-4xl font-bold text-red-600">{cancellations}</p>
        </div>
        <div className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition">
          <h2 className="text-xl font-semibold">Credits</h2>
          <p className="text-4xl font-bold text-purple-600">{Credits}</p>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && <p>Loading rooms...</p>}
      {isError && <p className="text-red-600">Error: {error.message}</p>}

      {/* Render Pie Chart and Table if Data is Available */}
      {!isLoading && !isError && rooms && (
        <>
          <RoomAvailabilityPieChart rooms={rooms} />
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <AgTable
              data={recentBookings}
              columns={columns}
              paginationPageSize={5}
            />
          </div>
          <h1 className="text-2xl font-semibold my-3">Available rooms</h1>
          <AvailableRooms rooms={rooms} />
        </>
      )}
    </div>
  );
}
