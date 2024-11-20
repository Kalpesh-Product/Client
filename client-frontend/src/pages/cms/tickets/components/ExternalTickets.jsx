import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

const ExternalTickets = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ticketTitle", headerName: "Ticket Title", width: 200 },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      type: "singleSelect",
      valueOptions: ["High", "Medium", "Low"],
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", width: 150 },

    {
      field: "viewDetails",
      headerName: "View Details",
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleViewDetails(params.row)}
          variant="contained"
          sx={{
            backgroundColor: "#3B82F6", // Tailwind blue-500
            color: "white",
            "&:hover": {
              backgroundColor: "#2563EB", // Tailwind blue-600
            },
            padding: "8px 16px",
            borderRadius: "0.375rem", // Tailwind rounded
          }}>
          View Details
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleEdit(params.row)}
          variant="contained"
          sx={{
            backgroundColor: "#22C55E", // Tailwind green-500
            color: "white",
            "&:hover": {
              backgroundColor: "#16A34A", // Tailwind green-600
            },
            padding: "8px 16px",
            borderRadius: "0.375rem", // Tailwind rounded
          }}>
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleDelete(params.row)}
          variant="contained"
          sx={{
            backgroundColor: "#EF4444", // Tailwind red-500
            color: "white",
            "&:hover": {
              backgroundColor: "#DC2626", // Tailwind red-600
            },
            padding: "8px 16px",
            borderRadius: "0.375rem", // Tailwind rounded
          }}>
          Delete
        </Button>
      ),
    },
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

  // Handlers for the buttons
  const handleViewDetails = (row) => {
    alert(`Viewing details for: ${row.ticketTitle}`);
  };

  const handleEdit = (row) => {
    alert(`Editing ticket: ${row.ticketTitle}`);
  };

  const handleDelete = (row) => {
    if (
      window.confirm(
        `Are you sure you want to delete ticket: ${row.ticketTitle}?`
      )
    ) {
      alert(`Deleted ticket: ${row.ticketTitle}`);
    }
  };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "ticketTitle" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "requestDate" },
  ];

  return (
    <div>
      {/* <div className="bg-green-500">
        <h2>Today's Tickets</h2>
      </div> */}

      {/* <div>
        <h2 className="text-lg">Today's Tickets</h2>
        <br />
      </div> */}

      {/* Tickets datatable START */}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {/* Tickets datatable END */}
    </div>
  );
};

export default ExternalTickets;
