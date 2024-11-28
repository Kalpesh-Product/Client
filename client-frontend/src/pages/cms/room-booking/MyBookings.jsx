import AgTable from "../../../components/AgTable";
import { rooms } from "../../../utils/Rooms"; // Adjust the path as per your file structure

export default function MyBookings() {
  // Transform room data into a format suitable for the table
  const bookings = rooms.map((room) => ({
    id: room.id,
    room: room.name,
    creditsUsed: room.seats * 10, // Example: Credits used = seats * 10
    duration: `${room.seats} hours`, // Example duration based on seats
    date: new Date().toISOString().split("T")[0], // Example date: today's date
    availability: room.availability,
  }));

  const columns = [
    { field: "room", headerName: "Room", flex: 1 },
    { field: "creditsUsed", headerName: "Credits Used", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4  motion-preset-expand">
        My Bookings
      </h1>
      <div className="bg-white rounded-md p-2">
        <AgTable data={bookings} columns={columns} className="w-full" />
      </div>
    </div>
  );
}
