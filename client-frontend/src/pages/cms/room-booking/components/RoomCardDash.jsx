import { FaWifi, FaLightbulb, FaTv, FaPhoneAlt, FaLock } from "react-icons/fa";
import { Button } from "@mui/material";

const RoomCard = ({ name, seats, url }) => (
  <div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
    <img src={url} alt={name} className="rounded-lg w-full h-40 object-cover" />
    <h3 className="text-xl font-semibold mt-2">{name}</h3>
    <div className="flex items-center my-2 text-gray-600 space-x-2">
      <FaWifi />
      <FaLightbulb />
      <FaTv />
      <FaPhoneAlt />
      <FaLock />
    </div>
    <p className="text-sm text-gray-500 mb-2">Fits {seats} people</p>
    <Button className="w-full" variant="contained">
      Book now
    </Button>
  </div>
);

const RoomList = () => {
  const rooms = [
    {
      id: 1,
      name: "Baga",
      seats: 4,
      url: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Where every meeting feels like a beach day.",
    },
    {
      id: 2,
      name: "Arambol",
      seats: 8,
      url: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Brainstorm while the vibes stay bohemian.",
    },
    {
      id: 3,
      name: "Sydney",
      seats: 4,
      url: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Throw some ideas on the barbie!",
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Currently Available Rooms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
