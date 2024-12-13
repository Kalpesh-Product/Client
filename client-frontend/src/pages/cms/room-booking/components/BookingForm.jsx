import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  TextField,
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from "@mui/material";
import "dayjs/locale/en-gb";
import Select from "react-select";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormStepper from "../../../../components/FormStepper";

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const participantsList = [
  { label: "abrar@biznest.co.in", value: "abrar@biznest.co.in" },
  { label: "kashif@biznest.co.in", value: "kashif@biznest.co.in" },
  { label: "farzeen@biznest.co.in", value: "farzeen@biznest.co.in" },
  { label: "kalpesh@biznest.co.in", value: "kalpesh@biznest.co.in" },
  { label: "pranali@biznest.co.in", value: "pranali@biznest.co.in" },
  { label: "allan@biznest.co.in", value: "allan@biznest.co.in" },
  { label: "aiwinraj@biznest.co.in", value: "aiwinraj@biznest.co.in" },
  { label: "anushri@biznest.co.in", value: "anushri@biznest.co.in" },
  { label: "sankalp@biznest.co.in", value: "sankalp@biznest.co.in" },
  { label: "narshiva@biznest.co.in", value: "narshiva@biznest.co.in" },
  { label: "hema@biznest.co.in", value: "hema@biznest.co.in" },
  { label: "rhutvik@biznest.co.in", value: "rhutvik@biznest.co.in" },
  { label: "siddhi@biznest.co.in", value: "siddhi@biznest.co.in" },
  { label: "mac@biznest.co.in", value: "mac@biznest.co.in" },
  { label: "faizan@biznest.co.in", value: "faizan@biznest.co.in" },
  { label: "amol@biznest.co.in", value: "amol@biznest.co.in" },
  { label: "jill@biznest.co.in", value: "jill@biznest.co.in" },
  { label: "urjita@biznest.co.in", value: "urjita@biznest.co.in" },
];

export default function BookingForm({
  newMeeting,
  handleChange,
  handleSubmit,
  currentDate,
  loggedInUser,
  roomList,
  handleClose,
}) {
  const [selectedSeats, setSelectedSeats] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [credits, setCredits] = useState(500);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const filteredList = participantsList.filter(
      (item) => item.label !== loggedInUser.email
    );
    setParticipants(filteredList);
  }, [participantsList]);

  const steps = [
    "Select Time",
    "Select Room",
    "Add Details",
    "Preview & Submit",
  ];

  const handleSeatsChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSeats(selectedValue);

    // Ensure the seat value is compared as a number
    const filtered = roomList.filter(
      (room) => room.seats === Number(selectedValue)
    );

    setFilteredRooms(filtered);
    setCredits(500 - Number(selectedValue));
  };

  const handleParticipantsChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    const participants = selectedOptions
      .map((option) => option.value)
      .join(", ");
    handleChange({
      target: { name: "participants", value: participants },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <div className="mx-auto p-6 bg-white w-[50vw]">
        <FormStepper steps={steps} handleClose={handleClose}>
          {(activeStep, handleNext) => {
            switch (activeStep) {
              case 0:
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <DatePicker
                      label="Start Date"
                      value={dayjs(newMeeting.startDate) || dayjs(currentDate)}
                      onChange={(newValue) =>
                        handleChange({
                          target: {
                            name: "startDate",
                            value: newValue,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />

                    {/* End Date */}
                    <DatePicker
                      label="End Date"
                      value={dayjs(newMeeting.endDate) || dayjs(currentDate)}
                      onChange={(newValue) =>
                        handleChange({
                          target: {
                            name: "endDate",
                            value: newValue,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />

                    {/* Start Time */}
                    <TimePicker
                      ampm
                      label="Start Time"
                      value={dayjs(newMeeting.startTime, "HH:mm") || null}
                      onChange={(newValue) =>
                        handleChange({
                          target: {
                            name: "startTime",
                            value: newValue.format("HH:mm"),
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />

                    {/* End Time */}
                    <TimePicker
                      ampm
                      label="End Time"
                      value={dayjs(newMeeting.endTime, "HH:mm") || null}
                      onChange={(newValue) =>
                        handleChange({
                          target: {
                            name: "endTime",
                            value: newValue.format("HH:mm"),
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />

                    <div className="col-span-full">
                      <TextField
                        label="Name"
                        type="text"
                        name="name"
                        value={loggedInUser.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        fullWidth
                      />
                    </div>

                    <div className="col-span-full">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className="w-full py-2 font-bold mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                );

              case 1:
                return (
                  <div className="w-full">
                    {/* Room Seats */}
                    <FormControl fullWidth>
                      <MuiSelect
                        labelId="seat-dropdown-label"
                        value={selectedSeats}
                        onChange={handleSeatsChange}
                        displayEmpty
                        sx={{ marginBottom: "0.5rem" }}
                        inputProps={{ "aria-label": "Select Seat Count" }}
                      >
                        <MenuItem value="">
                          <em>Select Seat Count</em>
                        </MenuItem>
                        {[...new Set(roomList.map((room) => room.seats))].map(
                          (seat) => (
                            <MenuItem key={seat} value={seat}>
                              {seat} seats
                            </MenuItem>
                          )
                        )}
                      </MuiSelect>
                    </FormControl>

                    {/* Room Selection */}
                    {filteredRooms.length > 0 && (
                      <div className="col-span-full">
                        <Typography variant="subtitle1" className="mb-2">
                          Select a Room:
                        </Typography>
                        <RadioGroup
                          name="room"
                          value={newMeeting.room || ""}
                          onChange={handleChange}
                        >
                          {filteredRooms.map((room) => (
                            <FormControlLabel
                              key={room.id}
                              value={room.name}
                              control={<Radio />}
                              label={room.name}
                            />
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    <div className="col-span-full">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className="w-full py-2 font-bold mt-4"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                );
              case 2:
                return (
                  <div className="flex flex-col justify-center w-full gap-2">
                    {/* Participants */}
                    <div className="col-span-full">
                      <label className="block mb-2 font-medium">
                        Participants
                      </label>
                      <Select
                        isMulti
                        options={participants}
                        value={selectedParticipants}
                        onChange={handleParticipantsChange}
                        placeholder="Select participants"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={selectStyles}
                      />
                    </div>

                    {/* Subject */}
                    <TextField
                      label="Subject"
                      type="text"
                      name="subject"
                      value={newMeeting.subject}
                      onChange={handleChange}
                      placeholder="Enter meeting subject"
                      fullWidth
                    />

                    {/* Agenda */}
                    <TextField
                      label="Agenda"
                      name="agenda"
                      value={newMeeting.agenda}
                      onChange={handleChange}
                      placeholder="Enter meeting agenda"
                      multiline
                      rows={4}
                      fullWidth
                    />

                    {credits !== 500 && (
                      <div className="col-span-full">
                        <p className="text-center text-red-500 font-bold">{`You will have ${credits} credits remaining.`}</p>
                      </div>
                    )}

                    <div className="col-span-full">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full py-2 font-bold mt-4"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                );
              case 3:
                return (
                  <div className="flex flex-col justify-center gap-2">
                    <Typography variant="h6" className="col-span-full mb-2">
                      Preview Your Booking
                    </Typography>
                    <Typography>
                      <strong>Date:</strong> {newMeeting.date || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Start Time:</strong>{" "}
                      {newMeeting.startTime || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>End Time:</strong> {newMeeting.endTime || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Room:</strong> {newMeeting.room || "N/A"}
                    </Typography>
                    <Typography className="col-span-full">
                      <strong>Participants:</strong>{" "}
                      {selectedParticipants.map((p) => p.label).join(", ") ||
                        "N/A"}
                    </Typography>
                    <Typography className="col-span-full">
                      <strong>Subject:</strong> {newMeeting.subject || "N/A"}
                    </Typography>
                    <Typography className="col-span-full">
                      <strong>Agenda:</strong> {newMeeting.agenda || "N/A"}
                    </Typography>
                    {credits !== 500 && (
                      <Typography className="text-red-500 col-span-full">
                        You will have <strong>{credits}</strong> credits
                        remaining.
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="col-span-full py-2 font-bold"
                      onClick={handleSubmit}
                    >
                      Confirm & Submit
                    </Button>
                  </div>
                );
              default:
                return null;
            }
          }}
        </FormStepper>
      </div>
    </LocalizationProvider>
  );
}
