import React, { useState } from "react";
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
import Select from "react-select";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const participantsList = [
  { label: "Allan Silvera", value: "Allan Silvera" },
  { label: "Aiwinraj KS", value: "Aiwinraj KS" },
  { label: "Anushri Bhagat", value: "Anushri Bhagat" },
  { label: "Kalpesh Naik", value: "Kalpesh Naik" },
];

export default function BookingForm({
  newMeeting,
  handleChange,
  handleSubmit,
  currentDate,
  loggedInUser,
  roomList,
}) {
  const [selectedSeats, setSelectedSeats] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [credits, setCredits] = useState(500);

  const handleSeatsChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSeats(selectedValue);

    // Ensure the seat value is compared as a number
    const filtered = roomList.filter(
      (room) => room.seats === Number(selectedValue)
    );

    setFilteredRooms(filtered);
    setCredits(500 - Number(selectedValue));

    console.log("Filtered Rooms:", filtered); // Debugging log
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mx-auto p-6 bg-white w-[50vw]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Start Time */}
          <TimePicker
            sx={{ width: "100%" }}
            label="Start Time"
            value={dayjs(newMeeting.startTime, "HH:mm") || null}
            onChange={(newValue) =>
              handleChange({
                target: { name: "startTime", value: newValue.format("HH:mm") },
              })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          {/* End Time */}
          <TimePicker
            sx={{ width: "100%" }}
            label="End Time"
            value={dayjs(newMeeting.endTime, "HH:mm") || null}
            onChange={(newValue) =>
              handleChange({
                target: { name: "endTime", value: newValue.format("HH:mm") },
              })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          {/* Date */}
          <DatePicker
            sx={{ width: "100%" }}
            label="Date"
            value={dayjs(newMeeting.date) || dayjs(currentDate)}
            onChange={(newValue) =>
              handleChange({
                target: { name: "date", value: newValue.format("YYYY-MM-DD") },
              })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          {/* Name */}
          <TextField
            label="Name"
            type="text"
            name="name"
            value={loggedInUser?.name || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          {/* Room Seats */}
          <div>
            <FormControl fullWidth>
              <MuiSelect
                labelId="seat-dropdown-label"
                value={selectedSeats}
                onChange={handleSeatsChange}
                displayEmpty
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
          </div>

          {/* Room Selection */}
          {filteredRooms.length > 0 && (
            <div className="mt-4">
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
                    value={room.name} // Use room.name as value
                    control={<Radio />}
                    label={room.name} // Show room name & description
                  />
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Participants */}
          <div>
            <label className="block mb-2 font-medium">Participants</label>
            <Select
              isMulti
              options={participantsList}
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

          {/* Submit Button */}
          {selectedSeats.length !== 0 && (
            <p className="text-red-500 font-bold text-center">
              You will have {credits} credits remaining
            </p>
          )}
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2 font-bold"
            >
              Create Booking
            </Button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
}
