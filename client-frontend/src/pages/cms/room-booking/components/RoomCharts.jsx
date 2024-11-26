import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = ({ rooms }) => {
  // Data for the Pie Chart (Room Availability)
  const availableRooms = rooms.filter(
    (room) => room.availability === "Available"
  ).length;
  const unavailableRooms = rooms.length - availableRooms;

  const availabilityData = {
    labels: ["Available Rooms", "Unavailable Rooms"],
    datasets: [
      {
        label: "Room Availability",
        data: [availableRooms, unavailableRooms],
        backgroundColor: ["#7CC8A4", "#FF9E9E"], // New color palette
        borderColor: ["#5A9C80", "#D87373"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the Bar Chart (Seating Capacity Distribution)
  const seatingData = {
    labels: rooms.map((room) => room.name),
    datasets: [
      {
        label: "Seating Capacity",
        data: rooms.map((room) => room.seats),
        backgroundColor: "#A3BFFA",
        borderColor: "#4C6EF5",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mb-4 bg-gray-100">
      {/* Graphs Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Room Availability
          </h2>
          <div className="relative w-[90%] mx-auto">
            <Pie
              data={availabilityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1.5, // Adjust chart size
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Seating Capacity
          </h2>
          <div className="relative w-[90%] mx-auto">
            <Bar
              data={seatingData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1.5, // Adjust chart size
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      color: "#e5e7eb", // Subtle grid lines
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
