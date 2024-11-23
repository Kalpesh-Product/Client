import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";

const MyTasksTable = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ticketTitle", headerName: "Ticket Title", width: 240 },
    {
      field: "priority",
      headerName: "Priority",
      width: 240,
      type: "singleSelect",
      valueOptions: ["High", "Medium", "Low"],
    },
    {
      field: "department",
      headerName: "Department",
      width: 240,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", width: 240 },
  ];

  const allRows = [
    {
      id: 1,
      ticketTitle: "Website Bug",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Payroll Issue",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-03",
    },
    {
      id: 3,
      ticketTitle: "Server Downtime",
      priority: "High",
      department: "Tech",
      requestDate: "2024-10-05",
    },
    {
      id: 4,
      ticketTitle: "New Workstation Setup",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-06",
    },
    {
      id: 5,
      ticketTitle: "Employee Onboarding",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Network Issue",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-08",
    },
    {
      id: 7,
      ticketTitle: "Software Installation",
      priority: "Low",
      department: "Tech",
      requestDate: "2024-10-09",
    },
    {
      id: 8,
      ticketTitle: "Office Supplies Request",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-10",
    },
    {
      id: 9,
      ticketTitle: "Email Access Issue",
      priority: "Medium",
      department: "IT",
      requestDate: "2024-10-11",
    },
  ];

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "ticketTitle" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "requestDate" },
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

  return (
    <div>
      <div className="flex gap-4 h-16">
        <div className="pt-2">Filter by department:</div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                width: "140px",
                padding: "10px 8px 4px 2px", // Adjust padding inside
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
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                {/* Option to show all departments */}
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className=" flex">
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
            Export Report
          </button> */}
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded h-9 mt-2">
            Export Report
          </CSVLink>
        </div>
      </div>

      {/* Tickets datatable START */}
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
      {/* Tickets datatable END */}
    </div>
  );
};

export default MyTasksTable;
