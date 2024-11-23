import { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import { format } from "date-fns";
import { toast } from "sonner";

export default function BookingDetails({
  selectedEvent,
  handleUpdate,
  handleExtendTime,
  handleCancel,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [updatedMeeting, setUpdatedMeeting] = useState({
    room: selectedEvent.extendedProps.room || "",
    participants: selectedEvent.extendedProps.participants || "",
    subject: selectedEvent.title || "",
    agenda: selectedEvent.extendedProps.agenda || "",
  });

  const [extendedTime, setExtendedTime] = useState({
    startTime: format(new Date(selectedEvent.start), "HH:mm"),
    endTime: format(new Date(selectedEvent.end), "HH:mm"),
    date: format(new Date(selectedEvent.start), "yyyy-MM-dd"),
  });

  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
  });
  const [cancelReason, setCancelReason] = useState("");

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtendTimeChange = (e) => {
    const { name, value } = e.target;
    setExtendedTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDurationExtension = (minutes) => {
    const newEndTime = new Date(selectedEvent.end);
    newEndTime.setMinutes(newEndTime.getMinutes() + minutes);

    setExtendedTime((prev) => ({
      ...prev,
      endTime: format(newEndTime, "HH:mm"),
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    handleUpdate(selectedEvent.id, updatedMeeting);
    toast.success("successfully updated booking details");
  };

  const handleExtendTimeSubmit = (e) => {
    e.preventDefault();
    handleExtendTime(selectedEvent.id, extendedTime);
    toast.success("successfully extended booking time");
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    handleCancel(selectedEvent.id, cancelReason);
    toast.success("sucessfully cancelled booking");
  };

  return (
    <Box width="50vw" height="70vh">
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="booking details tabs"
      >
        <Tab label="Details" />
        <Tab label="Edit" />
        <Tab label="Extend Time" />
        <Tab label="Cancel Booking" />
      </Tabs>

      {/* Details Tab */}
      {tabIndex === 0 && (
        <Box p={3}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Meeting Details
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: "8px",
            }}
          >
            <Box display="grid" gridTemplateColumns="1fr" rowGap={2}>
              {/* Render details using TextField */}
              <TextField
                label="Subject"
                value={selectedEvent.title || "No Subject"}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Date"
                value={selectedEvent.start.toISOString().substring(0, 10)}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Start Time"
                value={format(new Date(selectedEvent.start), "hh:mm a")}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="End Time"
                value={format(new Date(selectedEvent.end), "hh:mm a")}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Room"
                value={selectedEvent.extendedProps.room || "Not Assigned"}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Participants"
                value={selectedEvent.extendedProps.participants || "N/A"}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Agenda"
                value={selectedEvent.extendedProps.agenda || "N/A"}
                disabled
                fullWidth
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Edit Tab */}
      {tabIndex === 1 && (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Edit Booking
          </Typography>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <TextField
              label="Room"
              type="text"
              name="room"
              value={updatedMeeting.room}
              onChange={handleUpdateChange}
              placeholder="Enter room name"
              fullWidth
              sx={{ ":hover": "cursor-no-drop" }}
              disabled
              onMouseEnter={() =>
                setShowMessage((prevState) => {
                  return {
                    ...prevState,
                    show: true,
                    message: "Cannot change room once booked",
                  };
                })
              }
              onMouseLeave={() =>
                setShowMessage((prevState) => {
                  return {
                    ...prevState,
                    show: false,
                    message: "",
                  };
                })
              }
            />
            {showMessage.show && (
              <p className="text-center text-red-500 font-bold">
                {showMessage.message}
              </p>
            )}
            <TextField
              label="Participants"
              type="text"
              name="participants"
              value={updatedMeeting.participants}
              onChange={handleUpdateChange}
              placeholder="Enter participants (comma-separated)"
              fullWidth
            />
            <TextField
              label="Subject"
              type="text"
              name="subject"
              value={updatedMeeting.subject}
              onChange={handleUpdateChange}
              placeholder="Enter meeting subject"
              fullWidth
            />
            <TextField
              label="Agenda"
              name="agenda"
              value={updatedMeeting.agenda}
              onChange={handleUpdateChange}
              placeholder="Enter meeting agenda"
              multiline
              rows={4}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2 font-bold"
            >
              Update Booking
            </Button>
          </form>
        </Box>
      )}

      {/* Extend Time Tab */}
      {/* Extend Time Tab */}
      {tabIndex === 2 && (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Extend Time
          </Typography>
          <form onSubmit={handleExtendTimeSubmit} className="space-y-4">
            <TextField
              label="Date"
              type="date"
              name="date"
              value={extendedTime.date}
              onChange={handleExtendTimeChange}
              fullWidth
              disabled
            />
            <TextField
              label="Start Time"
              type="time"
              name="startTime"
              value={extendedTime.startTime}
              onChange={handleExtendTimeChange}
              fullWidth
              disabled
            />
            <TextField
              label="End Time"
              type="time"
              name="endTime"
              value={extendedTime.endTime}
              onChange={handleExtendTimeChange}
              fullWidth
            />
            {/* Buttons for predefined durations */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                onClick={() => handleDurationExtension(30)}
              >
                Extend 30 mins
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDurationExtension(60)}
              >
                Extend 1 hour
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDurationExtension(120)}
              >
                Extend 2 hours
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2 font-bold"
              sx={{ mt: 2 }}
            >
              Extend Time
            </Button>
          </form>
        </Box>
      )}

      {/* Cancel Booking Tab */}
      {tabIndex === 3 && (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Cancel Booking
          </Typography>
          <form
            onSubmit={handleCancelSubmit}
            className="flex flex-col justify-center items-center gap-8"
          >
            <TextField
              label="Reason for Cancellation"
              name="reason"
              value={cancelReason}
              className="mb-16"
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Enter the reason"
              multiline
              rows={4}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              className="w-full py-2 font-bold"
            >
              Cancel Booking
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}
