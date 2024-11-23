import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Select from "react-select";

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

  const handleSeatsChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSeats(selectedValue);

    // Filter rooms based on the selected seat count
    const filtered = roomList.filter(
      (room) => room.seats.toString() === selectedValue
    );
    setFilteredRooms(filtered);
    setCredits(500 - Number(selectedValue));
  };

  const handleParticipantsChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    // Update `newMeeting.participants` to store selected values as a comma-separated string
    const participants = selectedOptions
      .map((option) => option.value)
      .join(", ");
    handleChange({
      target: { name: "participants", value: participants },
    });
  };

  return (
    <div className="mx-auto p-6 bg-white w-[50vw]">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Start Time */}
        <div>
          <TextField
            label="Start Time"
            type="time"
            name="startTime"
            value={newMeeting.startTime}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* End Time */}
        <div>
          <TextField
            label="End Time"
            type="time"
            name="endTime"
            value={newMeeting.endTime}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* Date */}
        <div>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={currentDate}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* Name */}
        <div>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={loggedInUser?.name || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </div>

        {/* Room Seats */}
        <div>
          <label htmlFor="seat-dropdown" className="block mb-2 font-medium">
            Number of Seats
          </label>
          <select
            id="seat-dropdown"
            className="w-full border rounded px-3 py-2"
            value={selectedSeats}
            onChange={handleSeatsChange}
          >
            <option value="">
              <em>Select Seat Count</em>
            </option>
            {[...new Set(roomList.map((room) => room.seats))].map((seat) => (
              <option key={seat} value={seat}>
                {seat} seats
              </option>
            ))}
          </select>
        </div>

        {/* Room Selection */}
        {filteredRooms.length > 0 && (
          <div className="mt-4">
            <Typography variant="subtitle1" className="mb-2">
              Select a Room:
            </Typography>
            <RadioGroup
              name="room"
              value={newMeeting.room}
              onChange={handleChange}
            >
              {filteredRooms.map((room) => (
                <FormControlLabel
                  key={room.id}
                  value={room.name}
                  control={<Radio />}
                  label={`${room.name}`}
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
        <div>
          <TextField
            label="Subject"
            type="text"
            name="subject"
            value={newMeeting.subject}
            onChange={handleChange}
            placeholder="Enter meeting subject"
            fullWidth
          />
        </div>

        {/* Agenda */}
        <div>
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
        </div>

        {/* Submit Button */}
        {selectedSeats.length!==0 && <p className="text-red-500 font-bold text-center">You will have {credits} credits remaining</p>}
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
  );
}
