import { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import { format } from "date-fns";

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

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    handleUpdate(selectedEvent.id, updatedMeeting);
  };

  const handleExtendTimeSubmit = (e) => {
    e.preventDefault();
    handleExtendTime(selectedEvent.id, extendedTime);
  };

  return (
    <Box width="70vw" height="70vh">
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
            <Box
              display="grid"
              gridTemplateColumns="150px 1fr"
              rowGap={2}
              columnGap={3}
            >
              {/* Render details as before */}
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Subject:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {selectedEvent.title || "No Subject"}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Date:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {selectedEvent.start.toISOString().substring(0, 10)}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Start Time:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {format(new Date(selectedEvent.start), "hh:mm a")}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                End Time:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {format(new Date(selectedEvent.end), "hh:mm a")}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Room:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {selectedEvent.extendedProps.room || "Not Assigned"}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Participants:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {selectedEvent.extendedProps.participants || "N/A"}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#555" }}
              >
                Agenda:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {selectedEvent.extendedProps.agenda || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => handleCancel(selectedEvent.id)}
            variant="contained"
            color="error"
          >
            Cancel booking
          </Button>
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
            />
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
            />
            <TextField
              label="Start Time"
              type="time"
              name="startTime"
              value={extendedTime.startTime}
              onChange={handleExtendTimeChange}
              fullWidth
            />
            <TextField
              label="End Time"
              type="time"
              name="endTime"
              value={extendedTime.endTime}
              onChange={handleExtendTimeChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2 font-bold"
            >
              Extend Time
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}
