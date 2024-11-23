import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";
import { rooms as allRooms } from "../../../utils/Rooms";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { toast } from "sonner";

export default function AddRooms() {
  const [rooms, setRooms] = useState(allRooms);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    seats: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for editing
  const handleEdit = (room) => {
    setNewRoom({
      name: room.name,
      description: room.description,
      seats: room.seats,
    });
    setSelectedRoomId(room.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing room
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === selectedRoomId ? { ...room, ...newRoom } : room
        )
      );
      toast.success("Room updated successfully!");
    } else {
      // Add new room
      const roomWithId = {
        ...newRoom,
        id: rooms.length + 1, // Simple ID generation
        url: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image URL
        availability: "Available",
      };
      setRooms((prevRooms) => [...prevRooms, roomWithId]);
      toast.success("Room added successfully!");
    }

    setShowModal(false); // Close modal
    resetForm(); // Reset form
  };

  // Reset form to default state
  const resetForm = () => {
    setNewRoom({ name: "", description: "", seats: "" });
    setIsEditing(false);
    setSelectedRoomId(null);
  };

  return (
    <section className="p-4 flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center p-4">
        <Typography
          variant="h4"
          component="h1"
          className="mb-6"
          fontWeight="bold"
        >
          Meeting Rooms
        </Typography>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
        >
          Add new Room
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto top-0">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <CardMedia
              component="img"
              height="140"
              image={room.url}
              alt={room.name}
              className="object-cover"
            />
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h6" component="h2">
                  {room.name}
                </Typography>
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
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-2"
              >
                Seats: {room.seats}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {room.description}
              </Typography>
              <div className="mt-4">
                <Button
                  variant="contained"
                  onClick={() => handleEdit(room)}
                >
                  Edit Room
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 w-[50vw] mx-auto"
          >
            <Typography variant="h5" fontWeight="bold">
              {isEditing ? "Edit Room" : "Add New Room"}
            </Typography>
            <TextField
              label="Room Name"
              name="name"
              value={newRoom.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={newRoom.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
            />
            <TextField
              label="Seats"
              name="seats"
              type="number"
              value={newRoom.seats}
              onChange={handleChange}
              fullWidth
              required
            />
            {/* File Upload Input */}
            <div>
              <label
                htmlFor="room-image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Room Image
              </label>
              <input
                id="room-image"
                type="file"
                name="image"
                accept="image/*"
                className="border-none mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="contained"
                onClick={() => setShowModal(false)}
                color="error"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Room" : "Add Room"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
