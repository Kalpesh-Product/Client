import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";

const MyTickets = () => {
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

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleAddTicket = () => {
    toast.success("New Ticket Created");
    closeModal(); // Optionally close the modal after the alert
  };

  return (
    <div>
      {/* <div className="bg-green-500">
        <h2>Today's Tickets</h2>
      </div> */}

      {/* <div>
        <h2 className="text-lg">Today's Tickets</h2>
        <br />
      </div> */}

      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl">My Tickets</h1>
        <button
          //   onClick={handleOpenTicket}
          onClick={openModal}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Raise Ticket
        </button>
      </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={closeModal}></div>

          <div className="bg-white w-11/12 max-w-[90%] lg:max-w-[40%] pl-8 pr-8  rounded-lg shadow-lg z-10 relative overflow-y-auto max-h-[80vh]">
            {/* Modal Content */}

            {/* Modal Header */}
            <div className="sticky top-0 bg-white py-6 z-20 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 uppercase">
                  Raise Ticket
                </h2>
              </div>
              <div>
                {/* Close button */}
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={closeModal}>
                  X
                </button>
              </div>
            </div>

            {/* Modal Body START */}
            <div className=" w-full">
              {/* <div>AddT icket Form</div> */}
              <div className="">
                <div className=" mx-auto">
                  <h1 className="text-xl text-center my-2 font-bold">
                    Add Ticket
                  </h1>
                  <Box
                    sx={{
                      maxWidth: 600,
                      padding: 3,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                    // className="bg-white p-6 rounded-lg shadow-md mx-auto">
                    className="bg-white p-6 rounded-lg mx-auto">
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}
                      <div className="grid grid-cols-1 gap-4">
                        <FormControl fullWidth>
                          <InputLabel id="department-select-label">
                            Department
                          </InputLabel>
                          <Select
                            labelId="department-select-label"
                            id="department-select"
                            // value={department}
                            label="Department"
                            // onChange={handleChange}
                          >
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="HR">HR</MenuItem>
                            <MenuItem value="Tech">Tech</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Ticket Title"
                          // value={newEvent.name}
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div>
                    </div>

                    {/* Role & Department fields */}

                    {/* <div className="col-span-2 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
                  //   onClick={handleSaveEvent}
                  onClick={() => navigate("/customer/tickets")}>
                  Save
                </motion.button>
          
              </div> */}
                  </Box>
                </div>
              </div>
            </div>
            {/* Modal Body END */}

            {/* Modal Footer */}

            <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
              <div className="flex justify-center items-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={handleAddTicket}>
                  Save
                </button>
              </div>
            </div>
            {/* Close button */}
            {/* <button
                className="bg-blue-500 text-white py-2 px-4 my-4 rounded-lg hover:bg-blue-600"
                onClick={closeModal}>
                Close
              </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
