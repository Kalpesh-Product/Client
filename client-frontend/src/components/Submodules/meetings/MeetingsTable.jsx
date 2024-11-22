import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";

const MeetingsTable = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "roomName", headerName: "Room Name", width: 200 },
    { field: "meetingDate", headerName: "Meeting Date", width: 200 },
    { field: "startTime", headerName: "Start Time", width: 200 },
    { field: "endTime", headerName: "End Time", width: 200 },
    { field: "duration", headerName: "Duration (hrs)", width: 200 },
  ];

  const allRows = [
    {
      id: 1,
      roomName: "Arambol",
      meetingDate: "2024-11-15",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      duration: 1,
    },
    {
      id: 2,
      roomName: "Baga",
      meetingDate: "2024-11-15",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      duration: 1.5,
    },
    {
      id: 3,
      roomName: "Sydney",
      meetingDate: "2024-11-16",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      duration: 1,
    },
    {
      id: 4,
      roomName: "Arambol",
      meetingDate: "2024-11-16",
      startTime: "03:30 PM",
      endTime: "05:00 PM",
      duration: 1.5,
    },
    {
      id: 5,
      roomName: "Madrid",
      meetingDate: "2024-11-17",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      duration: 1,
    },
    {
      id: 6,
      roomName: "Sydney",
      meetingDate: "2024-11-17",
      startTime: "01:00 PM",
      endTime: "03:00 PM",
      duration: 2,
    },
    {
      id: 7,
      roomName: "Baga",
      meetingDate: "2024-11-18",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      duration: 1.5,
    },
    {
      id: 8,
      roomName: "Madrid",
      meetingDate: "2024-11-18",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      duration: 1.5,
    },
    {
      id: 9,
      roomName: "Arambol",
      meetingDate: "2024-11-19",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      duration: 2,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  const [room, setRoom] = React.useState("");

  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  // Filter rows based on selected room
  const filteredRows =
    room === "" ? allRows : allRows.filter((row) => row.roomName === room);

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Room Name", key: "roomName" },
    { label: "Meeting Date", key: "meetingDate" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Duration (hrs)", key: "duration" },
  ];

  return (
    <div>
      <div className="flex gap-4 h-16 ">
        <div className="pt-2">Filter by room:</div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="room-select-label" className=" pt-0 mt-0">
                Room
              </InputLabel>
              <Select
                labelId="room-select-label"
                id="room-select"
                value={room}
                label="Room"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Arambol">Arambol</MenuItem>
                <MenuItem value="Baga">Baga</MenuItem>
                <MenuItem value="Madrid">Madrid</MenuItem>
                <MenuItem value="Sydney">Sydney</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className=" flex">
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="meetings_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded h-9 mt-2">
            Export Report
          </CSVLink>
        </div>
      </div>

      {/* Meetings datatable START */}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0, width: "75vw" }}
        />
      </Paper>
      {/* Meetings datatable END */}
    </div>
  );
};

export default MeetingsTable;
