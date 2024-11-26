import React from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
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

// Sample rooms data (assuming it's imported or defined elsewhere)
export const rooms = [
  { id: 1, name: "Baga", seats: 4, availability: "Available" },
  { id: 2, name: "Arambol", seats: 8, availability: "Available" },
  { id: 3, name: "Sydney", seats: 4, availability: "Currently Unavailable" },
  { id: 4, name: "San Francisco", seats: 8, availability: "Available" },
  { id: 5, name: "Zurich", seats: 8, availability: "Currently Unavailable" },
  { id: 6, name: "Hawai", seats: 4, availability: "Available" },
  { id: 7, name: "Miami", seats: 4, availability: "Available" },
  { id: 8, name: "Madrid", seats: 6, availability: "Currently Unavailable" },
  { id: 9, name: "Vatican", seats: 14, availability: "Available" },
  {
    id: 10,
    name: "Colosseum",
    seats: 40,
    availability: "Currently Unavailable",
  },
];

const Dashboard = () => {
  // Generate data dynamically from the rooms array
  const occupancyData = {
    labels: rooms.map((room) => room.name), // Room names
    datasets: [
      {
        label: "Avg. Occupancy",
        data: rooms.map((room) => room.seats * 10), // Dummy percentages based on seats
        backgroundColor: [
          "#3B82F6",
          "#A855F7",
          "#14B8A6",
          "#FACC15",
          "#F43F5E",
          "#10B981",
          "#FF8800",
          "#00CC99",
          "#BB33FF",
          "#FF4444",
        ],
        borderWidth: 1,
        borderColor: "#e5e7eb",
      },
    ],
  };

  const popularRoomsData = {
    labels: rooms
      .filter((room) => room.availability === "Available")
      .map((room) => room.name),
    datasets: [
      {
        data: rooms
          .filter((room) => room.availability === "Available")
          .map((room) => room.seats * 5), // Dummy data based on seats
        backgroundColor: [
          "#A855F7",
          "#14B8A6",
          "#FACC15",
          "#FF4444",
          "#3B82F6",
          "#10B981",
        ],
        borderWidth: 1,
        borderColor: "#e5e7eb",
      },
    ],
  };

  return (
    <div className="mb-4 bg-gray-100">
      {/* Graphs Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Avg. Occupancy
          </h2>
          <div className="relative w-[90%] mx-auto">
            <Bar
              data={occupancyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1.5,
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
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                    grid: {
                      color: "#e5e7eb",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Most Popular Rooms
          </h2>
          <div className="relative w-[90%] mx-auto">
            <Doughnut
              data={popularRoomsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
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
