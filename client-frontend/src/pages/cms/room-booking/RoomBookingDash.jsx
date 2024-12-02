import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../components/AgTable";
import { NewModal } from "../../../components/NewModal";
import BookingForm from "./components/BookingForm";
import { rooms } from "../../../utils/Rooms";
import { format, addMinutes } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import RoomAvailabilityPieChart from "./components/RoomCharts";
import AvailableRooms from "./components/AviliableRooms";

export default function RoomBookingDash() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    startTime: "",
    endTime: "",
    internal: "BIZNest",
    room: "",
    participants: "",
    subject: "",
    agenda: "",
    backgroundColor: "",
  });
  const [currentDate, setCurrentDate] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [roomList, setRoomList] = useState(rooms);
  const navigate = useNavigate();

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
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    toast.success("Booking completed successfully");
    setOpenBookingModal(false);
    navigate("/customer/meetings/booking"); // Redirect after form submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Prefill the start time, end time, and current date
    const now = new Date();
    const startTime = format(now, "HH:mm"); // Current local time
    const endTime = format(addMinutes(now, 30), "HH:mm"); // 30 minutes from now
    const currentDate = format(now, "yyyy-MM-dd"); // Current date in yyyy-MM-dd format

    setNewMeeting((prev) => ({
      ...prev,
      startTime,
      endTime,
    }));
    setCurrentDate(currentDate);

    // Get authenticated user from local storage
    const authenticatedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(authenticatedUser));
  }, []);

  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full mt-4">
      {/* Header */}
      <h1 className="text-3xl mb-8 font-bold">Key insights</h1>
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Room Booking Management</h1>
        <button
          onClick={() => setOpenBookingModal(true)} // Open the modal
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
        >
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

      {/* <RoomAvailabilityPieChart rooms={rooms} /> */}
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

      {/* Booking Modal */}
      {openBookingModal && (
        <NewModal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        >
          <BookingForm
            newMeeting={newMeeting}
            handleChange={handleChange}
            handleSubmit={handleFormSubmit}
            currentDate={currentDate}
            loggedInUser={loggedInUser}
            roomList={roomList}
            handleClose={() => setOpenBookingModal(false)}
          />
        </NewModal>
      )}
    </div>
  );
}
