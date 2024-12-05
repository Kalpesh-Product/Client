import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { format } from "date-fns";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { toast } from "sonner";
import Select from "react-select";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
    participants: selectedEvent.extendedProps.participants
      ? selectedEvent.extendedProps.participants.split(",").map((p) => p.trim())
      : [],
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

  const [cancelReason, setCancelReason] = useState("");
  const [customCancel, setCustomCancel] = useState("");
  const [activeSteps, setActiveSteps] = useState({
    edit: 0,
    extend: 0,
    cancel: 0,
  });

  const handleStepChange = (tab, step) => {
    setActiveSteps((prev) => ({
      ...prev,
      [tab]: step,
    }));
  };

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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Box width="50vw" height="70vh">
        <div className="flex flex-col justify-center items-center sticky top-0 bg-white z-100">
          <div className="flex justify-between items-center w-full bg-white">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Meeting Details{" "}
              {selectedEvent.extendedProps.status === "cancelled" &&
                "(Cancelled)"}
            </Typography>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleModalClose}
              className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
            >
              <IoMdClose />
            </motion.button>
          </div>
          <Tabs
            sx={{
              marginTop: "1rem",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              fontFamily: "Popins-Semibold",
            }}
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="booking details tabs"
          >
            <Tab
              label="Details"
              sx={{
                width: "25%",
                cursor:
                  selectedEvent.extendedProps.status === "cancelled"
                    ? "no-drop"
                    : "pointer",
              }}
              disabled={selectedEvent.extendedProps.status === "cancelled"}
            />
            <Tab
              label="Edit"
              sx={{ width: "25%" }}
              disabled={selectedEvent.extendedProps.status === "cancelled"}
            />
            <Tab
              label="Extend Time"
              sx={{ width: "25%" }}
              disabled={selectedEvent.extendedProps.status === "cancelled"}
            />
            <Tab
              label="Cancel Booking"
              sx={{ width: "25%" }}
              disabled={selectedEvent.extendedProps.status === "cancelled"}
            />
          </Tabs>
        </div>

        {/* Details Tab */}
        {tabIndex === 0 && (
          <Box p={3}>
            <div className="w-full py-2 h-[47vh] overflow-y-scroll">
              {/* Render details using TextField */}
              <div className="grid grid-cols-2 gap-3 mb-[0.75rem]">
                {/* Subject */}
                <TextField
                  label="Subject"
                  value={selectedEvent.title || "No Subject"}
                  disabled
                  fullWidth
                  variant="outlined"
                />

                {/* Start Date */}
                <TextField
                  label="Start Date"
                  value={new Date(selectedEvent.start)
                    .toLocaleDateString("en-gb")
                    .substring(0, 10)}
                  disabled
                  fullWidth
                  variant="outlined"
                />

                {/* End Date */}
                <TextField
                  label="End Date"
                  value={new Date(selectedEvent.end)
                    .toLocaleDateString("en-gb")
                    .substring(0, 10)}
                  disabled
                  fullWidth
                  variant="outlined"
                />

                {/* Start Time */}
                <TextField
                  label="Start Time"
                  value={format(new Date(selectedEvent.start), "hh:mm a")}
                  disabled
                  fullWidth
                  variant="outlined"
                />

                {/* End Time */}
                <TextField
                  label="End Time"
                  value={format(new Date(selectedEvent.end), "hh:mm a")}
                  disabled
                  fullWidth
                  variant="outlined"
                />

                {/* Room */}
                <TextField
                  label="Room"
                  value={selectedEvent.extendedProps.room || "Not Assigned"}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </div>
              {/* Participants */}
              <TextField
                label="Participants"
                value={selectedEvent.extendedProps.participants || "N/A"}
                disabled
                fullWidth
                variant="outlined"
                sx={{marginBottom:"0.75rem"}}
              />

              {/* Agenda */}
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
          <Box p={3}>
            <div className="w-full mb-8">
              <Stepper activeStep={activeSteps.edit}>
                <Step>
                  <StepLabel>Edit Details</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Confirm Changes</StepLabel>
                </Step>
              </Stepper>
            </div>
            {activeSteps.edit === 0 && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <TextField
                  label="Subject"
                  type="text"
                  name="subject"
                  value={updatedMeeting.subject}
                  onChange={handleUpdateChange}
                  placeholder="Enter meeting subject"
                  fullWidth
                />
                <Select
                  isMulti
                  options={participantOptions}
                  value={participantOptions.filter((option) =>
                    updatedMeeting.participants.includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    setUpdatedMeeting((prev) => ({
                      ...prev,
                      participants: selectedOptions.map(
                        (option) => option.value
                      ),
                    }));
                  }}
                  placeholder="Select participants"
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
                  variant="contained"
                  color="primary"
                  onClick={() => handleStepChange("edit", 1)}
                >
                  Next
                </Button>
              </form>
            )}
            {activeSteps.edit === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Confirm Changes
                </Typography>
                <Typography variant="body1">
                  <strong>Subject:</strong> {updatedMeeting.subject}
                </Typography>
                <Typography variant="body1">
                  <strong>Participants:</strong>{" "}
                  <Typography variant="body1">
                    <strong>Participants:</strong>{" "}
                    {updatedMeeting.participants.length
                      ? updatedMeeting.participants.join(", ")
                      : "No participants"}
                  </Typography>
                </Typography>
                <Typography variant="body1">
                  <strong>Agenda:</strong> {updatedMeeting.agenda}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => handleStepChange("edit", 0)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Extend Time Tab */}
        {tabIndex === 2 && (
          <Box p={3}>
            <div className="w-full mb-8">
              <Stepper activeStep={activeSteps.extend}>
                <Step>
                  <StepLabel>Extend Time</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Confirm Extension</StepLabel>
                </Step>
              </Stepper>
            </div>
            {activeSteps.extend === 0 && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <TimePicker
                ampm
                  sx={{ width: "100%" }}
                  label="End Time"
                  value={dayjs(`${extendedTime.date}T${extendedTime.endTime}`)}
                  onChange={(newValue) =>
                    setExtendedTime((prev) => ({
                      ...prev,
                      endTime: format(new Date(newValue), "HH:mm"),
                    }))
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => handleDurationExtension(15)}
                  >
                    Extend 15 mins
                  </Button>
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
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleStepChange("extend", 1)}
                >
                  Next
                </Button>
              </form>
            )}
            {activeSteps.extend === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Confirm Time Extension
                </Typography>
                <Typography variant="body1">
                  <strong>New End Time:</strong> {extendedTime.endTime}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  width="100%"
                  alignItems="center"
                  gap="1rem"
                  mt={2}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleStepChange("extend", 0)}
                  >
                    Back
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleExtendTimeSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Cancel Booking Tab */}
        {tabIndex === 3 && (
          <Box p={3}>
            <div className="w-full mb-8">
              <Stepper activeStep={activeSteps.cancel}>
                <Step>
                  <StepLabel>Reason for Cancellation</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Confirm Cancellation</StepLabel>
                </Step>
              </Stepper>
            </div>
            {activeSteps.cancel === 0 && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormControl fullWidth>
                  <InputLabel id="cancel-reason-label">
                    Select a reason
                  </InputLabel>
                  <MuiSelect
                    labelId="cancel-reason-label"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    label="Select a reason"
                  >
                    <MenuItem value="" disabled>
                      Select a reason
                    </MenuItem>
                    <MenuItem value="Schedule conflict">
                      Schedule conflict
                    </MenuItem>
                    <MenuItem value="No longer needed">
                      No longer needed
                    </MenuItem>
                    <MenuItem value="Change in requirements">
                      Change in requirements
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </MuiSelect>
                </FormControl>
                {cancelReason === "Other" && (
                  <TextField
                    label="Specify the reason"
                    name="reason"
                    value={customCancel}
                    onChange={(e) => setCustomCancel(e.target.value)}
                    placeholder="Enter your reason"
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleStepChange("cancel", 1)}
                >
                  Next
                </Button>
              </form>
            )}
            {activeSteps.cancel === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Confirm Cancellation
                </Typography>
                <Typography variant="body1">
                  <strong>Reason:</strong>{" "}
                  {cancelReason === "Other" ? customCancel : cancelReason}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  width="100%"
                  alignItems="center"
                  gap="1rem"
                  mt={2}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleStepChange("cancel", 0)}
                  >
                    Back
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleCancelSubmit}
                  >
                    Cancel Meeting
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}
