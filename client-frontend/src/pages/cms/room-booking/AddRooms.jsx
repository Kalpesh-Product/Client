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
import { NewModal } from "../../../components/NewModal";
import { toast } from "sonner";
import { FiWifi, FiSun, FiMonitor } from "react-icons/fi";
import FormStepper from "../../../components/FormStepper";

export default function AddRooms() {
  const [rooms, setRooms] = useState(allRooms);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

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
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl mb-2">Meeting Rooms</h1>

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
              sx={{ height: "350px" }}
              image={room.url}
              alt={room.name}
              className="object-contain"
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
              <div className="flex items-center space-x-2 mb-4 text-gray-500">
                <FiWifi />
                <FiSun />
                <FiMonitor />
              </div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                <span role="img" aria-label="person">
                  👥
                </span>{" "}
                Fits {room.seats} people
              </p>
              <div className="mt-4">
                <Button
                  variant="contained"
                  className="w-full"
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
        <NewModal open={showModal} onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4 w-[50vw] mx-auto">
            <FormStepper
              steps={["Room Details", "Confirmation"]}
              handleClose={() => setShowModal(false)}
            >
              {(activeStep, handleNext) => {
                const handleBack = () => {
                  // Set activeStep to the previous step
                  setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
                };

                switch (activeStep) {
                  case 0:
                    return (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col gap-4">
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
                        </div>
                        <div className="flex justify-end">
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Next
                          </Button>
                        </div>
                      </form>
                    );
                    return (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex justify-between">
                          <Button
                            onClick={handleBack}
                            type="button"
                            variant="outlined"
                            color="secondary"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Next
                          </Button>
                        </div>
                      </form>
                    );
                  case 1:
                    return (
                      <div className="flex flex-col gap-4">
                        <Typography variant="h6" fontWeight="bold">
                          Confirm Room Details
                        </Typography>
                        <p>
                          <strong>Name:</strong> {newRoom.name}
                        </p>
                        <p>
                          <strong>Description:</strong> {newRoom.description}
                        </p>
                        <p>
                          <strong>Seats:</strong> {newRoom.seats}
                        </p>
                        <div className="flex justify-between">
                          <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                          >
                            {isEditing ? "Update Room" : "Add Room"}
                          </Button>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              }}
            </FormStepper>
          </div>
        </NewModal>
      )}
    </section>
  );
}
