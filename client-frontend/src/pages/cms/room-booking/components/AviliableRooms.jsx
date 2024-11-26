import React from "react";
import { FiWifi, FiSun, FiMonitor } from "react-icons/fi"; // Using only 3 icons

const AvailableRooms = ({ rooms }) => {
  // Filter available rooms and limit to 4
  const availableRooms = rooms
    .filter((room) => room.availability === "Available")
    .slice(0, 3); // Display only 3-4 rooms

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
      {availableRooms.map((room) => (
        <div
          key={room.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
        >
          <img
            src={room.url}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
              <span
                className={`px-4 py-1 text-sm font-medium rounded-full ${
                  room.availability === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {room.availability}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-4 text-gray-500">
              <FiWifi />
              <FiSun />
              <FiMonitor />
            </div>
            <p className="text-sm text-gray-600 mb-4">{room.description}</p>
            <p className="text-sm font-medium text-gray-800">
              <span role="img" aria-label="person">
                👥
              </span>{" "}
              Fits {room.seats} people
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;
