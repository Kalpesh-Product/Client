import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";
import { TextField } from "@mui/material";
import AgTable from "../../../components/AgTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MyTicketsTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ticketTitle", headerName: "Ticket Title", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["High", "Medium", "Low"],
      cellRenderer: (params) => {
        const statusColors = {
          Medium: "text-blue-600 bg-blue-100",
          High: "text-red-600 bg-red-100",
          Low: "text-yellow-600 bg-yellow-100",
        };
        const statusClass = statusColors[params.value] || "";
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {params.value}
          </span>
        );
      },
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Pending", "In Process", "Resolved"],
      cellRenderer: (params) => {
        const statusColors = {
          "In Process": "text-blue-600 bg-blue-100",
          Pending: "text-red-600 bg-red-100",
          Resolved: "text-yellow-600 bg-yellow-100",
        };
        const statusClass = statusColors[params.value] || "";
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {params.value}
          </span>
        );
      },
    },
  ];

  const allRows = [
    {
      id: 1,
      ticketTitle: "Wifi is not working",
      priority: "High",
      status: "Pending",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Payroll Issue",
      priority: "Medium",
      status: "In Process",
      department: "HR",
      requestDate: "2024-10-03",
    },
    {
      id: 3,
      ticketTitle: "Server Downtime",
      priority: "High",
      status: "Resolved",
      department: "Tech",
      requestDate: "2024-10-05",
    },
    {
      id: 4,
      ticketTitle: "New Workstation Setup",
      priority: "Low",
      status: "Pending",
      department: "Admin",
      requestDate: "2024-10-06",
    },
    {
      id: 5,
      ticketTitle: "Employee Onboarding",
      priority: "Medium",
      status: "In Process",
      department: "HR",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Network Issue",
      priority: "High",
      status: "Pending",
      department: "IT",
      requestDate: "2024-10-08",
    },
    {
      id: 7,
      ticketTitle: "Software Installation",
      priority: "Low",
      status: "Resolved",
      department: "Tech",
      requestDate: "2024-10-09",
    },
    {
      id: 8,
      ticketTitle: "Office Supplies Request",
      priority: "Low",
      status: "Pending",
      department: "Admin",
      requestDate: "2024-10-10",
    },
    {
      id: 9,
      ticketTitle: "Email Access Issue",
      priority: "Medium",
      status: "In Process",
      department: "IT",
      requestDate: "2024-10-11",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  // Filter rows based on selected department
  const filteredRows =
    department === ""
      ? allRows // show all rows if no department is selected
      : allRows.filter((row) => row.department === department);

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "ticketTitle" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "requestDate" },
  ];

  return (
    <div className="px-2 pb-2 pt-0 bg-white mx-4">
      {/* <div className="flex gap-4 h-16 ">
        <div className="pt-2">Filter by :</div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px",
                padding: "10px 8px 4px 2px",
              }}>
              <InputLabel
                id="department-select-label"
                className=" pt-0 mt-0 mr-3 pr-2 pl-1">
                Department
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px",
                  width: "140px",
                  padding: "2px 8px 4px 8px",
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                Start Date
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">2024-10-01</MenuItem>
                <MenuItem value="IT">Last 7 Days</MenuItem>
                <MenuItem value="HR">Last 30 Days</MenuItem>
                <MenuItem value="Admin">Last 365 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                End Date
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">Today</MenuItem>
                <MenuItem value="IT">Last 7 Days</MenuItem>
                <MenuItem value="HR">Last 30 Days</MenuItem>
                <MenuItem value="Admin">Last 365 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                Status
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">Pending</MenuItem>
                <MenuItem value="IT">In Process</MenuItem>
                <MenuItem value="HR">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className=" flex w-full">
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded h-9 mt-2">
            Export Report
          </CSVLink>
        </div>
      </div> */}

      <div className="flex justify-between p-2 pl-0 items-center">
        {/* <div className="">Filter by :</div> */}
        <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField
            label="Department"
            variant="outlined"
            select
            size="small"
            onChange={handleChange}
            value={department}>
            {/* <MenuItem value="">All</MenuItem>
            <MenuItem value="Chair">Chair</MenuItem>
            <MenuItem value="Carpet Floor">Carpet</MenuItem>
            <MenuItem value="Carpet Floor">Carpet</MenuItem> */}
            <MenuItem value="">All</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField label="Priority" variant="outlined" select size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Chair">High</MenuItem>
            <MenuItem value="Carpet Floor">Medium</MenuItem>
            <MenuItem value="Carpet Floor">Low</MenuItem>
          </TextField>
        </FormControl>
        {/* <FormControl size="small" style={{ minWidth: 220 }}>
          <TextField label="Start Date" variant="outlined" select size="small">
            <MenuItem value="">.</MenuItem>
            <MenuItem value="Chair">.</MenuItem>
            <MenuItem value="Carpet Floor">.</MenuItem>
          </TextField>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 220 }}>
          <TextField label="End Date" variant="outlined" select size="small">
            <MenuItem value="">.</MenuItem>
            <MenuItem value="Chair">.</MenuItem>
            <MenuItem value="Carpet Floor">.</MenuItem>
          </TextField>
        </FormControl> */}
        {/* Date Range Filter */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            slotProps={{ textField: { size: "small" } }}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} className="w-full md:w-1/4" />
            )}
          />
          <DatePicker
            label="End Date"
            slotProps={{ textField: { size: "small" } }}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} className="w-full md:w-1/4" />
            )}
          />
        </LocalizationProvider>
        <div className="h-full">
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
            Export Report
          </button> */}
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold p-2 rounded ">
            Export
          </CSVLink>
        </div>
      </div>
      {/* Tickets datatable START */}
      <div className="w-full">
        {/* <DataGrid
          rows={filteredRows} 
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{backgroundColor:'white'}}
        /> */}
        <AgTable data={filteredRows} columns={columns} />
      </div>
      {/* Tickets datatable END */}
    </div>
  );
};

export default MyTicketsTable;
