import React, { useEffect, useState } from "react";
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
import AgTable from "../../../components/AgTable";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const TicketMembers = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "availability", headerName: "Availability", width: 150 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button
    //       size="small"
    //       onClick={() => handleDelete(params.row)}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#EF4444",
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "#DC2626",
    //         },
    //         padding: "8px 16px",
    //         borderRadius: "0.375rem",
    //       }}>
    //       Delete
    //     </Button>
    //   ),
    // },
    {
      field: "viewDetails",
      headerName: "Actions",
      width: 150,
      cellRenderer: (params) => {
        const handleActionChange = (event) => {
          const selectedAction = event.target.value;

          if (selectedAction === "view") {
            handleViewDetails(params.row);
          } else if (selectedAction === "edit") {
            handleEdit(params.row);
          } else if (selectedAction === "delete") {
            handleDelete(params.row);
          }
        };

        return (
          <FormControl size="small" sx={{ width: "100%" }}>
            <Select
              value="" // Always forces the dropdown to display the SVG
              onChange={handleActionChange}
              displayEmpty
              disableUnderline
              IconComponent={() => null} // Removes the dropdown arrow
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 16px",
                  borderRadius: "0.375rem", // Tailwind rounded
                  backgroundColor: "transparent",
                  border: "none", // Removes border
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& fieldset": {
                  border: "none", // Removes border in outlined variant
                },
              }}>
              <MenuItem value="" disabled>
                <svg
                  className="flex-none size-4 text-gray-600 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={12} cy={5} r={1} />
                  <circle cx={12} cy={19} r={1} />
                </svg>
              </MenuItem>
              {/* <MenuItem value="view">View Details</MenuItem>
              <MenuItem value="edit">Edit</MenuItem> */}
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  const allRows = [
    {
      id: 1,
      name: "Faizan",
      email: "faizan@biznest.co.in",
      role: "IT",
      availability: "Available",
    },
    {
      id: 2,
      name: "Rajiv",
      email: "rajiv@biznest.co.in",
      role: "HR",
      availability: "Unavailable",
    },
    {
      id: 3,
      name: "Desmon",
      email: "desmon@biznest.co.in",
      role: "Tech",
      availability: "Available",
    },
    // {
    //   id: 4,
    //   name: "Bob Brown",
    //   email: "bob.brown@example.com",
    //   role: "Admin",
    //   availability: "Unavailable",
    // },
    // {
    //   id: 5,
    //   name: "Charlie Wilson",
    //   email: "charlie.wilson@example.com",
    //   role: "Admin",
    //   availability: "Available",
    // },
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

  // Handlers for the buttons
  const handleViewDetails = (row) => {
    alert(`Viewing details for: ${row.ticketTitle}`);
  };

  const handleEdit = (row) => {
    alert(`Editing ticket: ${row.ticketTitle}`);
  };
  const handleDelete = (row) => {
    if (
      window.confirm(`Are you sure you want to delete ${row.name}'s record?`)
    ) {
      alert(`Deleted record for ${row.name}`);
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
    toast.success("New Member Added");
    closeModal(); // Optionally close the modal after the alert
  };

  const [nameInput, setNameInput] = useState(""); // To store the current input value
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // To store filtered name suggestions

  const fullNames = [
    "Faizan Shaikh",
    "Rajiv Kumar Pal",
    "Desmon Goes",
    "Allan Mark Silveira",
    "Aiwinraj KS",
    "Anushri Mohandas Bhagat",
    "Sankalp Chandrashekar Kalangutkar",
    "Kashif Shaikh",
    "Ragesh A C",
    "Machindranath Parkar",
    "Benson Nadakattin",
    "Kalpesh Naik",
    "Nikhil Nagvekar",
    "Farzeen Qadri",
  ];

  useEffect(() => {
    if (nameInput === "") {
      setFilteredSuggestions([]); // Clear suggestions if input is empty
    } else {
      const filtered = fullNames.filter((name) =>
        name.toLowerCase().startsWith(nameInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [nameInput]);

  return (
    <div>
      {/* <div className="bg-green-500">
        <h2>Today's Tickets</h2>
      </div> */}

      <div className="p-4 pb-0">
        <div className="mb-4 flex justify-between">
          <h1 className="text-2xl font-bold ">All Members</h1>
        </div>
      </div>

      {/* Tickets datatable START */}
      {/* <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0, width: "75vw" }}
        />
      </Paper> */}

      <div className="p-2 bg-white mx-4 rounded-md">
        <div className="text-right pb-4">
          <button
            onClick={openModal}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            Add Member
          </button>
        </div>
        <AgTable data={filteredRows} columns={columns} />
      </div>
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
                  Add Member
                </h2>
              </div>
              <div>
                {/* Close button */}
                {/* <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={closeModal}>
                  X
                </button> */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={closeModal}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
                  <IoMdClose />
                </motion.button>
              </div>
            </div>

            {/* Modal Body START */}
            <div className=" w-full">
              {/* <div>AddT icket Form</div> */}
              <div className="">
                <div className=" mx-auto">
                  {/* <h1 className="text-xl text-center my-2 font-bold">
                    Add Member
                  </h1> */}
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
                      {/* <div className="grid grid-cols-1 gap-4">
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
                      </div> */}
                      {/* <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Name"
                          // value={newEvent.name}
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div> */}

                      <TextField
                        label="Name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)} // Trigger suggestion filtering on typing
                        fullWidth
                      />

                      {filteredSuggestions.length > 0 && nameInput && (
                        <ul
                          style={{
                            listStyleType: "none",
                            padding: 0,
                            marginTop: 4,
                          }}>
                          {filteredSuggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              style={{
                                padding: 4,
                                background: "#f1f1f1",
                                cursor: "pointer",
                                borderRadius: 4,
                              }}
                              onClick={() => {
                                setNameInput(suggestion); // Set input to clicked suggestion
                                setFilteredSuggestions([]); // Clear suggestions after selecting
                              }}>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Email"
                          // value={newEvent.name}
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div> */}
                      {/* <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Password"
                          // value={newEvent.name}
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div> */}
                      {/* <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Role"
                          // value={newEvent.name}
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div> */}

                      {/* <div className="grid grid-cols-1 gap-4">
                        <FormControl fullWidth>
                          <InputLabel id="department-select-label">
                            Role
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
                      </div> */}
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

            {/* <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
              <div className="flex justify-center items-center w-full">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full mx-6"
                  onClick={handleAddTicket}>
                  Save
                </button>
              </div>
            </div> */}
            <div className="sticky bottom-0 bg-white p-6 z-20 flex justify-center">
              <div className="flex justify-center items-center w-full">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
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

export default TicketMembers;
