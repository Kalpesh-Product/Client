import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { NewModal } from "../../../components/NewModal";
import { toast } from "sonner";
import { FiWifi, FiSun, FiMonitor } from "react-icons/fi";
import FormStepper from "../../../components/FormStepper";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function AddRooms() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    seats: "",
  });

  // Fetch rooms using react-query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get("/api/meetings/get-rooms");
      return response.data.data; // Assuming the "data" field contains the rooms array
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/meetings/create-room", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Room added successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred.");
    },
  });

  const { mutate: updateRoom } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(
        `/api/meetings/update-room/${data.id}`,
        data.formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Room updated successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred.");
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewRoom((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewRoom((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newRoom.name);
    formData.append("description", newRoom.description);
    formData.append("seats", newRoom.seats);
    if (newRoom.image) {
      formData.append("room", newRoom.image);
    }

    if (isEditing) {
      updateRoom({ id: selectedRoomId, formData });
    } else {
      mutate(formData);
    }

    setShowModal(false);
    setNewRoom({ name: "", description: "", seats: "" });
    setIsEditing(false);
    setSelectedRoomId(null);
  };

  const handleEdit = (room) => {
    setNewRoom({
      name: room.name,
      description: room.description,
      seats: room.seats,
    });
    setSelectedRoomId(room._id);
    setIsEditing(true);
    setShowModal(true);
  };

  if (isLoading) return <p>Loading rooms...</p>;
  if (isError) return <p>Error fetching rooms. Please try again later.</p>;

  return (
    <section className="py-4  flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl mb-2">Meeting Rooms</h1>

        <button
          onClick={() => {
            setNewRoom({ name: "", description: "", seats: "" });
            setShowModal(true);
          }}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Add new Room
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto top-0">
        {data.map((room) => (
          <Card
            key={room._id}
            className="shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <CardMedia
              component="img"
              sx={{ height: "350px" }}
              image={room.image.url}
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
                    room.status === "Available"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                  {room.status}
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
                  onClick={() => handleEdit(room)}>
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
              handleClose={() => setShowModal(false)}>
              {(activeStep, handleNext) => {
                switch (activeStep) {
                  case 0:
                    return (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                        className="flex flex-col gap-4">
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
                              className="block text-sm font-medium text-gray-700">
                              Upload Room Image
                            </label>
                            <input
                              id="room-image"
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleChange}
                              className="border-none mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
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
                            onClick={handleSubmit}>
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
