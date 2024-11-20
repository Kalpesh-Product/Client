import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

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

  const handleSeatsChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSeats(selectedValue);

    // Filter rooms based on the selected seat count
    const filtered = roomList.filter(
      (room) => room.seats.toString() === selectedValue
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className="mx-auto p-6 bg-white w-[70vw]">
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
          <TextField
            label="Participants"
            type="text"
            name="participants"
            value={newMeeting.participants}
            onChange={handleChange}
            placeholder="Enter participants (comma-separated)"
            fullWidth
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
