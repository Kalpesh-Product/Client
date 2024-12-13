import AgTable from "../../../components/AgTable";
// import { rooms } from "../../../utils/Rooms";

export default function MyBookings() {
  // const bookings = rooms.map((room) => ({
  //   id: room.id,
  //   room: room.name,
  //   creditsUsed: room.seats * 10,
  //   duration: `${room.seats} hours`,
  //   date: new Date().toISOString().split("T")[0],
  //   availability: room.availability,
  // }));

  const columns = [
    { field: "room", headerName: "Room", flex: 1 },
    { field: "creditsUsed", headerName: "Credits Used", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4  motion-preset-expand">
        My Bookings
      </h1>
      <div className="bg-white rounded-md p-2">
        {/* <AgTable data={bookings} columns={columns} className="w-full" /> */}
      </div>
    </div>
  );
}
