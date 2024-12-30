import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { NewModal } from "../../../components/NewModal";
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from "../../../hooks/useAuth";
import dayjs from "dayjs";
import axios from "axios";

const Holidays = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const [highlightFirstRow, setHighlightFirstRow] = React.useState(false);
  const [highlightEditedRow, setHighlightEditedRow] = React.useState(false);

  const [holidayName, setLeaveType] = useState(""); // State to track the selected option

  const [holidayList, setHolidayList] = useState({
    title: "",
    start: null,
    end: null,
    description: "",
    type:"holiday"
  });

  const handleHolidayChange = (field, value) => {
    setHolidayList((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "holidayName", headerName: "Holiday Name", width: 200 },
    // {
    //   field: "priority",
    //   headerName: "Priority",
    //   width: 150,
    //   type: "singleSelect",
    //   valueOptions: ["High", "Medium", "Low"],
    //   cellRenderer: (params) => {
    //     const statusColors = {
    //       Medium: "text-blue-600 bg-blue-100",
    //       High: "text-red-600 bg-red-100",
    //       Low: "text-yellow-600 bg-yellow-100",
    //     };
    //     const statusClass = statusColors[params.value] || "";
    //     return (
    //       <span
    //         className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
    //         {params.value}
    //       </span>
    //     );
    //   },
    // },

    // {
    //   field: "department",
    //   headerName: "Department",
    //   width: 150,
    //   type: "singleSelect",
    //   valueOptions: ["IT", "HR", "Tech", "Admin"],
    // },
    { field: "date", headerName: "Date", width: 150 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 150,
    //   type: "singleSelect",
    //   valueOptions: ["Approved", "Pending", "Rejected"],
    //   cellRenderer: (params) => {
    //     const statusColors = {
    //       Approved: "text-blue-600 bg-blue-100",
    //       Pending: "text-red-600 bg-red-100",
    //       Rejected: "text-yellow-600 bg-yellow-100",
    //     };
    //     const statusClass = statusColors[params.value] || "";
    //     return (
    //       <span
    //         className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
    //         {params.value}
    //       </span>
    //     );
    //   },
    // },
    {
      field: "delete",
      headerName: "Delete",
      width: 170,
      // renderCell: (params) => (
      cellRenderer: (params) => (
        <Button
          size="small"
          // onClick={() => handleDelete(params.row)}
          onClick={openDeleteTicket}
          // onClick={handleDeleteTicket}
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "red",
            },
            padding: "4px 8px",
            borderRadius: "0.375rem",
          }}
        >
          Delete
        </Button>
      ),
    },
    // {
    //   field: "reject",
    //   headerName: "Reject",
    //   width: 170,
    //   // renderCell: (params) => (
    //   cellRenderer: (params) => (
    //     <Button
    //       size="small"
    //       // onClick={() => handleDelete(params.row)}
    //       //   onClick={handleAccept}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#EF4444",
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "#DC2626",
    //         },
    //         padding: "4px 8px",
    //         borderRadius: "0.375rem",
    //       }}>
    //       Reject
    //     </Button>
    //   ),
    // },
    // {
    //   field: "viewDetails",
    //   headerName: "Actions",
    //   width: 150,
    //   cellRenderer: (params) => {
    //     const handleActionChange = (event) => {
    //       const selectedAction = event.target.value;

    //     };

    //     return (
    //       <FormControl size="small" sx={{ width: "100%" }}>
    //         <Select
    //           value="" // Always forces the dropdown to display the SVG
    //           onChange={handleActionChange}
    //           displayEmpty
    //           disableUnderline
    //           IconComponent={() => null} // Removes the dropdown arrow
    //           sx={{
    //             "& .MuiSelect-select": {
    //               padding: "8px 16px",
    //               borderRadius: "0.375rem", // Tailwind rounded
    //               backgroundColor: "transparent",
    //               border: "none", // Removes border
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //             },
    //             "& fieldset": {
    //               border: "none", // Removes border in outlined variant
    //             },
    //           }}>
    //           <MenuItem value="" disabled>
    //             <svg
    //               className="flex-none size-4 text-gray-600 dark:text-neutral-500"
    //               xmlns="http://www.w3.org/2000/svg"
    //               width={24}
    //               height={24}
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth={2}
    //               strokeLinecap="round"
    //               strokeLinejoin="round">
    //               <circle cx={12} cy={12} r={1} />
    //               <circle cx={12} cy={5} r={1} />
    //               <circle cx={12} cy={19} r={1} />
    //             </svg>
    //           </MenuItem>

    //           <MenuItem value="edit" onClick={openEditTicket}>
    //             Approve
    //           </MenuItem>
    //           <MenuItem value="delete" onClick={openDeleteTicket}>
    //             Reject
    //           </MenuItem>
    //         </Select>
    //       </FormControl>
    //     );
    //   },
    // },
  ];

  // const [tickets, setTickets] = useState(allRows);

  const allRows = [
    {
      id: 1,
      holidayName: "Republic Day",
      priority: "High",
      status: "Pending",
      department: "IT",
      date: "2024-01-26",
    },
    {
      id: 2,
      holidayName: "New Year",
      priority: "Medium",
      status: "Pending",
      department: "HR",
      date: "2024-01-01",
    },
    {
      id: 3,
      holidayName: "Labor Day",
      priority: "High",
      status: "Pending",
      department: "Tech",
      date: "2024-05-01",
    },
    {
      id: 4,
      holidayName: "Independence Day",
      priority: "Low",
      status: "Pending",
      department: "Admin",
      date: "2024-08-15",
    },
    {
      id: 5,
      holidayName: "Gudi Padava",
      priority: "Medium",
      status: "Pending",
      department: "HR",
      date: "2024-04-09",
    },
    {
      id: 6,
      holidayName: "Goa Liberation Day",
      priority: "High",
      status: "Pending",
      department: "IT",
      date: "2024-12-19",
    },
    {
      id: 7,
      holidayName: "Ganesh Chaturthi",
      priority: "Low",
      status: "Pending",
      department: "Tech",
      date: "2024-09-07",
    },
    {
      id: 8,
      holidayName: "Gandhi Jayanti",
      priority: "Low",
      status: "Pending",
      department: "Admin",
      date: "2024-10-02",
    },
    {
      id: 9,
      holidayName: "Feast of St. Francis Xavier",
      priority: "Medium",
      status: "Pending",
      department: "IT",
      date: "2024-12-03",
    },
    {
      id: 9,
      holidayName: "Eid Al-Fitr",
      priority: "Medium",
      status: "Pending",
      department: "IT",
      date: "2024-04-11",
    },
  ];

  const [rows, setRows] = React.useState(allRows);

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
  // const handleViewDetails = (row) => {
  //   alert(`Viewing details for: ${row.holidayName}`);
  // };

  // const handleEdit = (row) => {
  //   alert(`Editing ticket: ${row.holidayName}`);
  // };

  // const handleDelete = (row) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete ticket: ${row.holidayName}?`
  //     )
  //   ) {
  //     alert(`Deleted ticket: ${row.holidayName}`);
  //   }
  // };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "holidayName" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "date" },
  ];

  const newTicket = {
    id: rows.length + 1,
    holidayName: holidayList.title,
    priority: "Medium",
    status: "Pending",
    department: "IT",
    date: holidayList.end, // Today's date
  };

  // ADD TICKET MODAL START
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // const handleAddTicket = () => {
  //   toast.success("New Ticket Created");
  //   closeModal(); // Optionally close the modal after the alert
  // };
  const handleAddTicket = async (newTicket, holidayList) => {
    setRows((prevRows) => [newTicket, ...prevRows]); // Update the state
    
    closeModal();
    console.log(holidayList);
    // Optionally close the modal after the alert
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create-event",
        holidayList
      );
      alert(response.data.message);
      alert("Holiday Added Successfully to database");
      toast.success("Added a new holiday.");
    } catch (error) {
      console.log("Error Saving holiday", error);
      alert("Failed to save holiday. Please try again");
      toast.error('Holiday could not be saved');
    }
  };

  // ADD TICKET MODAL END

  // VIEW TICKET DETAILS MODAL START
  // State to manage modal visibility
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Function to open the modal
  const openDetailsModal = () => setIsDetailsModalOpen(true);

  // Function to close the modal
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const handleTicketDetails = () => {
    // toast.success("New Ticket Created");
    closeDetailsModal(); // Optionally close the modal after the alert
  };
  // VIEW TICKET DETAILS MODAL END

  // EDIT TICKET DETAILS MODAL START
  // State to manage modal visibility
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);

  // Function to open the modal
  const openEditTicket = () => setIsEditTicketOpen(true);

  // Function to close the modal
  const closeEditTicket = () => setIsEditTicketOpen(false);

  const handleEditTicket = () => {
    setHighlightEditedRow(true); // Highlight the first row after editing a ticket
    toast.success("Ticket Updated");
    closeEditTicket(); // Optionally close the modal after the alert
  };
  // EDIT TICKET DETAILS MODAL END

  // EDIT TICKET DETAILS MODAL START
  // State to manage modal visibility
  const [isDeleteTicketOpen, setIsDeleteTicketOpen] = useState(false);

  // Function to open the modal
  const openDeleteTicket = () => setIsDeleteTicketOpen(true);

  // Function to close the modal
  const closeDeleteTicket = () => setIsDeleteTicketOpen(false);

  const handleDeleteTicket = () => {
    // setHighlightFirstRow(true); // Highlight the first row after editing a ticket
    toast.success("Holiday Deleted");
    closeDeleteTicket(); // Optionally close the modal after the alert
  };
  // EDIT TICKET DETAILS MODAL END

  const steps = ["Add Holiday", "Verify Details"];

  const handleNextStep = (handleNext) => {
    // e.preventDefault();
    handleNext();
  };

  return (
    <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out bg-white p-0 rounded-md">
      {/* <div className="bg-green-500">
        <h2>Today's Tickets</h2>
      </div> */}

      {/* <div>
        <h2 className="text-lg">Today's Tickets</h2>
        <br />
      </div> */}

      {/* <div className="mb-2 flex justify-between">
        <h1 className="text-3xl"></h1>
        <button
          onClick={openModal}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Raise Ticket
        </button>
      </div> */}

      <div className="flex gap-4 mb-4 justify-between">
        {/* <div className="pt-2">Filter :</div> */}
        <div>
          {/* <FormControl size="small" style={{ minWidth: 220 }}>
            <TextField
              label="Filter by department"
              variant="outlined"
              select
              size="small"
              onChange={handleChange}
              value={department}
              sx={{ fontSize: "0.5rem" }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </FormControl> */}
        </div>
        {/* <div className=" flex">
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded h-9 mt-2">
            Export Report
          </CSVLink>
        </div> */}

        {/* <div className=" flex">
          <div className="mb-2 flex justify-between">
            <h1 className="text-3xl"></h1>
            <button
              onClick={openModal}
              className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
              Raise Ticket
            </button>
          </div>
        </div> */}

        {!auth.user.department.find((dept) => dept.name === "Finance") && (
          <div className="flex">
            <div className="mb-2 flex justify-between">
              <h1 className="text-3xl"></h1>
              <button
                onClick={openModal}
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
              >
                + Add Holiday
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tickets datatable START */}

      {/* <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, width: "75vw" }}
        /> */}

      {/* <AgTable data={filteredRows} columns={columns} highlightFirstRow={true} /> */}
      {/* <AgTable
        data={filteredRows}
        columns={columns}
        highlightFirstRow={false}
      /> */}

      <AgTable
        data={rows} // Use the state here
        columns={columns}
        highlightFirstRow={highlightFirstRow} // Bind the state here
        highlightEditedRow={highlightEditedRow} // Bind the state here
      />

      {/* {location.pathname === "/customer/tickets/my-tickets" && (
        <div>
          <br />
          <br />
          <br />
          <br />
        </div>
      )} */}

      {/* Tickets datatable END */}

      {/* ADD TICKET MODAL START */}
      {/* Stepper form start */}

      <NewModal open={isModalOpen} onClose={closeModal}>
        <>
          <FormStepper
            steps={steps}
            handleClose={closeModal}
            children={(activeStep, handleNext) => {
              if (activeStep === 0) {
                return (
                  <>
                    <div className="bg-white  w-[31vw] rounded-lg z-10 relative overflow-y-auto max-h-[80vh]">
                      {/* Modal Content */}

                      {/* Modal Header */}
                      {/* <div className="sticky top-0 bg-white pt-6 z-20 flex justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-4 uppercase">
                            Raise Ticket
                          </h2>
                        </div>
                        <div>
                      
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={closeModal}
                            className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
                            <IoMdClose />
                          </motion.button>
                        </div>
                      </div> */}

                      {/* Modal Body START */}
                      <div className=" w-full">
                        {/* <div>AddT icket Form</div> */}
                        <div className="">
                          <div className=" mx-auto">
                            {/* <h1 className="text-xl text-center my-2 font-bold">
                    Add Ticket
                  </h1> */}
                            <Box
                              sx={{
                                maxWidth: 600,
                                paddingY: 3,
                                bgcolor: "background.paper",
                                borderRadius: 2,
                              }}
                              // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                              className="bg-white py-6 rounded-lg"
                            >
                              {/* Personal Information */}
                              {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                              <div className="grid grid-cols-1 gap-4">
                                {/* Name, Mobile, Email, DOB fields */}
                                {/* <div className="grid grid-cols-1 gap-4">
                                  <FormControl fullWidth>
                                    <InputLabel id="leave-type-select-label">
                                      Leave Type
                                    </InputLabel>
                                    <Select
                                      labelId="leave-type-select-label"
                                      id="leave-type-select"
                                      // value={department}
                                      label="Department"
                                      // onChange={handleChange}
                                    >
                                      <MenuItem value="Sick Leave">
                                        Sick Leave
                                      </MenuItem>
                                      <MenuItem value="Casual Leave">
                                        Casual Leave
                                      </MenuItem>
                                      <MenuItem value="Annual Leave">
                                        Annual Leave
                                      </MenuItem>
                               
                                    </Select>
                                  </FormControl>
                                </div> */}
                                <div className="grid grid-cols-1 gap-4">
                                  <TextField
                                    label="Holiday Name"
                                    value={holidayList.title}
                                    onChange={(e) =>
                                      handleHolidayChange(
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                  />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormControl fullWidth>
                                    {/* <InputLabel id="suggestion-select-label">
                                      Ticket Title
                                    </InputLabel> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Start Date"
                                        sx={{ width: "100%" }}
                                        value={
                                          holidayList.start
                                            ? dayjs(holidayList.start)
                                            : null
                                        } // Convert string to Dayjs
                                        onChange={(newDate) => {
                                          if (newDate) {
                                            const formattedDate =
                                              newDate.format("YYYY-MM-DD"); // Format date
                                            handleHolidayChange(
                                              "start",
                                              formattedDate
                                            ); // Store as string
                                          }
                                        }}
                                        // format="DD/MM/YYYY" // Display format in the DatePicker
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            className="w-full"
                                          />
                                        )}
                                      />
                                      <br></br>
                                      <DatePicker
                                        label="END DATE"
                                        sx={{ width: "100%" }}
                                        value={
                                          holidayList.end
                                            ? dayjs(holidayList.end)
                                            : null
                                        } // Convert string to Dayjs
                                        onChange={(newDate) => {
                                          if (newDate) {
                                            const formattedDate =
                                              newDate.format("YYYY-MM-DD"); // Format date
                                            handleHolidayChange(
                                              "end",
                                              formattedDate
                                            ); // Store as string
                                          }
                                        }}
                                        // format="DD/MM/YYYY" // Display format in the DatePicker
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            className="w-full"
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                    <br></br>
                                    <TextField
                                      label="Description"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      multiline
                                      rows={4}
                                      value={holidayList.description}
                                      onChange={(e) =>
                                        handleHolidayChange(
                                          "description",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </FormControl>
                                </div>
                                {holidayName === "Other" && (
                                  <div className="grid grid-cols-1 gap-4">
                                    <TextField
                                      label="Specify"
                                      // value={newEvent.name}
                                      // onChange={(e) =>
                                      //   setnewEvent({ ...newEvent, name: e.target.value })
                                      // }
                                      fullWidth
                                    />
                                  </div>
                                )}

                                {/* <div className="grid grid-cols-1 gap-4">
                                  <TextField
                                    label="Ticket Title"
                                    // value={newEvent.name}
                                    // onChange={(e) =>
                                    //   setnewEvent({ ...newEvent, name: e.target.value })
                                    // }
                                    fullWidth
                                  />
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

                      <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
                        <div className="flex justify-center items-center w-full">
                          <button
                            className="wono-blue-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                            // onClick={handleAddTicket}>
                            onClick={() => handleNextStep(handleNext)}
                          >
                            Next
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
                  </>
                );
              } else if (activeStep === 1) {
                return (
                  <>
                    <div className="p-6">
                      <h1 className="text-2xl mb-4 py-3 font-semibold text-center">
                        Are the provided details correct ?
                      </h1>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold">Holiday Name</h1>
                          <span>{holidayList.title}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold"> Start Date</h1>
                          <span>{holidayList.start}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold">End Date</h1>
                          <span>{holidayList.end}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold">Description</h1>
                          <span>{holidayList.description}</span>
                        </div>
                      </div>
                      <div className="pt-8 pb-4">
                        {/* <p>details</p> */}

                        <WonoButton
                          content={"Submit"}
                          onClick={() =>
                            handleAddTicket(newTicket, holidayList)
                          }
                        />
                      </div>
                    </div>
                  </>
                );
              }
            }}
          />
        </>
      </NewModal>

      {/* Stepper form end */}

      {/* ADD TICKET MODAL END */}

      {/* TICKET DETAILS MODAL START */}
      <NewModal open={isDetailsModalOpen} onClose={closeDetailsModal}>
        <div className="bg-white  w-[31vw] rounded-lg z-10 relative overflow-y-auto max-h-[80vh]">
          {/* DetailsModal Content */}

          {/* DetailsModal Header */}
          <div className="sticky top-0 bg-white py-6 z-20 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase">
                Ticket Details
              </h2>
            </div>
            <div>
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={closeDetailsModal}
                className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1"
              >
                <IoMdClose />
              </motion.button>
            </div>
          </div>

          {/* DetailsModal Body START */}
          <div className=" w-full">
            {/* <div>AddT icket Form</div> */}
            <div className="">
              <div className=" mx-auto">
                {/* <h1 className="text-xl text-center my-2 font-bold">
                    Ticket Details
                  </h1> */}

                <p>
                  <span className="font-bold">Ticket Title : </span>
                  <span>Wifi is not working</span>
                </p>
                <br />
                <p>
                  <span className="font-bold">Ticket Priority : </span>
                  <span>High</span>
                </p>
                <br />
                <p>
                  <span className="font-bold">Ticket Status : </span>
                  <span>Closed</span>
                  <br />
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="text-gray-500">
                    2024-12-05 - 13:15 - In process
                  </span>{" "}
                  <br />
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="text-gray-500">
                    2024-12-07 - 13:15 - Escalated
                  </span>{" "}
                  <br />
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="text-gray-500">
                    2024-12-09 - 13:15 - Closed
                  </span>
                </p>
                <br />
                <p>
                  <span className="font-bold">Ticket Department : </span>
                  <span>IT</span>
                </p>
                <br />
                <p>
                  <span className="font-bold">Request Date : </span>
                  <span>2024-10-01</span>
                </p>
              </div>
            </div>
          </div>
          {/* DetailsModal Body END */}

          {/* DetailsModal Footer */}

          <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
            <div className="flex justify-center items-center">
              {/* <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={handleTicketDetails}
                >
                  Close
                </button> */}
            </div>
          </div>
          {/* Close button */}
          {/* <button
                className="bg-blue-500 text-white py-2 px-4 my-4 rounded-lg hover:bg-blue-600"
                onClick={closeDetailsModal}>
                Close
              </button> */}
        </div>
      </NewModal>

      {/* TICKET DETAILS MODAL END */}

      {/* EDIT TICKET MODAL START */}
      {isEditTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={closeEditTicket}></div>

          <div className="bg-white w-11/12 max-w-[90%] lg:max-w-[40%] pl-8 pr-8  rounded-lg shadow-lg z-10 relative overflow-y-auto max-h-[80vh]">
            {/* EditTicket Content */}

            {/* EditTicket Header */}
            <div className="sticky top-0 bg-white py-6 z-20 flex justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">
                  Edit Ticket
                </h2>
              </div>
              <div>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={closeEditTicket}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1"
                >
                  <IoMdClose />
                </motion.button>
              </div>
            </div>

            {/* EditTicket Body START */}
            <div className=" w-full">
              {/* <div>AddT icket Form</div> */}
              <div className="">
                <div className=" mx-auto">
                  {/* <h1 className="text-xl text-center my-2 font-bold">
                    Edit Ticket
                  </h1> */}
                  <Box
                    sx={{
                      maxWidth: 600,
                      padding: 3,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                    // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                    className="bg-white p-4 rounded-lg mx-auto"
                  >
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}

                      <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Reason For Editing"
                          // value={newEvent.name}
                          // value="Wifi is not working" // Hardcoded value for ticket title
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <FormControl fullWidth>
                          <InputLabel id="department-select-label">
                            Department
                          </InputLabel>
                          <Select
                            labelId="department-select-label"
                            id="department-select"
                            // value={department}
                            value="IT" // Hardcoded value for department
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
                          label="Enter Ticket Title"
                          // value={newEvent.name}
                          value="Laptop screen malfunctioning" // Hardcoded value for ticket title
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
            {/* EditTicket Body END */}

            {/* EditTicket Footer */}

            <div className="sticky bottom-0 bg-white p-6 z-20 flex justify-center">
              <div className="flex justify-center items-center w-full">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                  onClick={handleEditTicket}
                >
                  Save
                </button>
              </div>
            </div>
            {/* Close button */}
            {/* <button
                className="bg-blue-500 text-white py-2 px-4 my-4 rounded-lg hover:bg-blue-600"
                onClick={closeEditTicket}>
                Close
              </button> */}
          </div>
        </div>
      )}

      {/* EDIT TICKET MODAL END */}

      {/* DELETE TICKET MODAL START */}
      {isDeleteTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={closeDeleteTicket}></div>

          <div className="bg-white w-11/12 max-w-[90%] lg:max-w-[40%] pl-8 pr-8  rounded-lg shadow-lg z-10 relative overflow-y-auto max-h-[80vh]">
            {/* DeleteTicket Content */}

            {/* DeleteTicket Header */}
            <div className="sticky top-0 bg-white py-6 z-20 flex justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">
                  Delete Holiday
                </h2>
              </div>
              <div>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={closeDeleteTicket}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1"
                >
                  <IoMdClose />
                </motion.button>
                {/* <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={closeDeleteTicket}>
                  X
                </button> */}
              </div>
            </div>

            {/* DeleteTicket Body START */}
            <div className=" w-full">
              {/* <div>AddT icket Form</div> */}
              <div className="">
                <div className=" mx-auto">
                  <h1 className="text-xl text-center my-2 font-bold">
                    Are you sure you want to delete the holiday?
                  </h1>
                  <Box
                    sx={{
                      maxWidth: 600,
                      padding: 3,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                    // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                    className="bg-white p-4 rounded-lg mx-auto"
                  >
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}

                      {/* <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Reason for deleting"
                          // value={newEvent.name}
                          // value="Wifi is not working" // Hardcoded value for ticket title
                          // onChange={(e) =>
                          //   setnewEvent({ ...newEvent, name: e.target.value })
                          // }
                          fullWidth
                        />
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
            {/* DeleteTicket Body END */}

            {/* DeleteTicket Footer */}

            <div className="sticky bottom-0 bg-white p-6 z-20 flex justify-center gap-5">
              <div className="flex justify-center items-center w-full">
                <button
                  // className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
                  onClick={handleDeleteTicket}
                >
                  Delete
                </button>
              </div>
              {/* <div className="flex justify-center items-center">
                <button
                  // className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={closeDeleteTicket}>
                  Cancel
                </button>
              </div> */}
            </div>
            {/* Close button */}
            {/* <button
              className="bg-blue-500 text-white py-2 px-4 my-4 rounded-lg hover:bg-blue-600"
              onClick={closeDeleteTicket}>
              No
            </button> */}
          </div>
        </div>
      )}

      {/* DELETE TICKET MODAL END */}
    </div>
  );
};

export default Holidays;
