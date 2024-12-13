import AgTable from "../../../components/AgTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MyBookings() {
  const {
    data: rooms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/meetings/get-rooms"
      );
      return response.data.data; 
    },
  });


  const bookings =
    rooms?.map((room) => ({
      id: room.id,
      room: room.name,
      creditsUsed: room.seats * 10,
      duration: `${room.seats} hours`,
      date: new Date().toISOString().split("T")[0],
      availability: room.availability,
    })) || [];

  const columns = [
    { field: "room", headerName: "Room", flex: 1 },
    { field: "creditsUsed", headerName: "Credits Used", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 motion-preset-expand">
        My Bookings
      </h1>

      {/* Handle Loading State */}
      {isLoading && <p>Loading bookings...</p>}

      {/* Handle Error State */}
      {isError && (
        <p className="text-red-600">Error fetching bookings: {error.message}</p>
      )}

      {/* Render AgTable when data is ready */}
      {!isLoading && !isError && (
        <div className="bg-white rounded-md p-2">
          <AgTable data={bookings} columns={columns} className="w-full" />
        </div>
      )}
    </div>
  );
}
