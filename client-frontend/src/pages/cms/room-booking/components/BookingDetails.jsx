import { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import { format } from "date-fns";
import { toast } from "sonner";
import Select from "react-select";

export default function BookingDetails({
  selectedEvent,
  handleUpdate,
  handleExtendTime,
  handleCancel,
  handleModalClose,
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

  const participantOptions = selectedEvent.extendedProps.participants
    ? selectedEvent.extendedProps.participants
        .split(",")
        .map((participant) => ({
          label: participant.trim(),
          value: participant.trim(),
        }))
    : [];

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
      <div className="flex flex-col justify-center items-center sticky top-0 bg-white z-100">
        <div className="flex justify-between items-center w-full bg-white">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Meeting Details
          </Typography>
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-red-500 border-2 border-red-500 font-bold rounded-md"
          >
            X
          </button>
        </div>
        <Tabs
          sx={{
            marginTop: "1rem",
            width: "100%",
            background: "white",
          }}
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="booking details tabs"
        >
          <Tab label="Details" sx={{ width: "25%" }} />
          <Tab label="Edit" sx={{ width: "25%" }} />
          <Tab label="Extend Time" sx={{ width: "25%" }} />
          <Tab label="Cancel Booking" sx={{ width: "25%" }} />
        </Tabs>
      </div>

      {/* Details Tab */}
      {tabIndex === 0 && (
        <Box p={3}>
          <div className="grid grid-cols-1 gap-3 py-2 h-[47vh] overflow-y-scroll">
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
          </div>
        </Box>
      )}

      {/* Edit Tab */}
      {tabIndex === 1 && (
        <div className="p-6">
          <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
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
            <Select
              isMulti
              options={participantOptions}
              value={participantOptions.filter((option) =>
                updatedMeeting.participants.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                setUpdatedMeeting((prev) => ({
                  ...prev,
                  participants: selectedOptions.map((option) => option.value),
                }));
              }}
              placeholder="Select participants"
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
        </div>
      )}

      {/* Extend Time Tab */}
      {tabIndex === 2 && (
        <Box p={3}>
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
          <form
            onSubmit={handleCancelSubmit}
            className="flex flex-col justify-center items-center gap-8"
          >
            {/* Dropdown for Reasons */}
            <div className="w-full">
              <TextField
                select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Schedule conflict">Schedule conflict</option>
                <option value="No longer needed">No longer needed</option>
                <option value="Change in requirements">
                  Change in requirements
                </option>
                <option value="Other">Other</option>
              </TextField>
            </div>

            {/* Show TextField when "Other" is selected */}
            {cancelReason === "Other" && (
              <TextField
                label="Specify the reason"
                name="reason"
                value={cancelReason === "Other" ? "" : cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter your reason"
                multiline
                rows={4}
                fullWidth
              />
            )}

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
