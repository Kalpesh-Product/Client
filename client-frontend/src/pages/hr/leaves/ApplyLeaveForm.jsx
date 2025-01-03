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
import { useLocation, useNavigate } from "react-router-dom";
import { NewModal } from "../../../components/NewModal";
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import dayjs from "dayjs";

const ApplyLeaveForm = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [myLeaves, setMyLeaves] = useState([]);

  const [createForm, setCreateForm] = useState({
    takenBy: authUser.user.name,
    leaveType: "",
    fromDate: dayjs(),
  });

  const updateCreateFormField = (value, customField = null) => {
    if (customField) {
      // Ensure the value is a Dayjs object before formatting
      const formattedValue =
        value && typeof value.format === "function"
          ? value.format("DD/MM/YYYY")
          : "";

      setCreateForm((prevForm) => ({
        ...prevForm,
        [customField]: formattedValue,
      }));
    } else {
      // Handle standard input fields
      const { name, value: inputValue } = value.target;
      setCreateForm((prevForm) => ({
        ...prevForm,
        [name]: inputValue,
      }));
    }

    console.log(createForm);
  };

  // Function to create the ticket
  const createMyLeave = async (e) => {
    try {
      console.log("submitted x");
      console.log(createForm);
      e.preventDefault(); // prevents the page from reloading when the form is submitted

      // Create the leave

      // const responseFromBackend = await axios.post(
      //   // the 2 arguments are: the link to post the values, the values to be sent for post method
      //   // "/api/leaves/create-leave",
      //   "http://localhost:5000/api/leaves/create-leave",
      //   createForm
      // );

      const responseFromBackend = await axios.post(
        "/api/leaves/create-leave",
        createForm
      );

      console.log(responseFromBackend);

      // Update state
      setMyLeaves([...myLeaves, responseFromBackend.data.leave]); // adds our newly created leave to the array of leaves. The variable leave was created in out backend for response
      // console.log("submit");
      // console.log(responseFromBackend);

      // Clear form state
      setCreateForm({
        takenBy: authUser.user.name,
        leaveType: "",
        fromDate: "",
      });
      toast.success("New Leave Created");
      // fetchmyLeaves();

      closeModal();
      navigate("/hr/leaves/my-leaves");
    } catch (error) {
      console.log(error);
    }
  };

  const [highlightFirstRow, setHighlightFirstRow] = React.useState(false);
  const [highlightEditedRow, setHighlightEditedRow] = React.useState(false);

  const [leaveType, setLeaveType] = useState(""); // State to track the selected option

  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    { field: "fromDate", headerName: "From Date", width: 200 },
    { field: "toDate", headerName: "To Date", width: 200 },
    { field: "leaveType", headerName: "Leave Type", width: 200 },
    { field: "leavePeriod", headerName: "Leave Period", width: 200 },
    { field: "hours", headerName: "Hours", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      valueOptions: ["Approved", "Pending", "Rejected"],
      cellRenderer: (params) => {
        const statusColors = {
          Approved: "text-blue-600 bg-blue-100",
          Pending: "text-red-600 bg-red-100",
          Rejected: "text-yellow-600 bg-yellow-100",
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
    { field: "approvedBy", headerName: "Approved By", width: 200 },
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
    // { field: "requestDate", headerName: "Request Date", width: 150 },

    // {
    //   field: "approve",
    //   headerName: "Approve",
    //   width: 170,
    //   // renderCell: (params) => (
    //   cellRenderer: (params) => (
    //     <Button
    //       size="small"
    //       // onClick={() => handleDelete(params.row)}
    //       //   onClick={handleAccept}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "green",
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "green",
    //         },
    //         padding: "4px 8px",
    //         borderRadius: "0.375rem",
    //       }}>
    //       Approve
    //     </Button>
    //   ),
    // },
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
      fromDate: "Dec 29 2024",
      toDate: "Dec 29 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Single",
      hours: "9.00",
      priority: "High",
      description: "Privileged Leave",
      createdBy: "Allan Silveira",

      status: "Pending",
      approvedBy: "Abrar Shaikh",
    },
    {
      id: 1,
      fromDate: "Dec 26 2024",
      toDate: "Dec 26 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Partial",
      hours: "4.00",
      priority: "High",
      description: "Laptop Repair",
      createdBy: "Allan Silveira",
      status: "Rejected",
      approvedBy: "Abrar Shaikh",
    },
    {
      id: 1,
      fromDate: "Dec 22 2024",
      toDate: "Dec 22 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Partial",
      hours: "3.00",
      priority: "High",
      description: "Family Function",
      createdBy: "Allan Silveira",
      status: "Approved",
      approvedBy: "Abrar Shaikh",
    },
    // {
    //   id: 2,
    //   leaveType: "Sick Leave",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "HR",
    //   requestDate: "2024-10-03",
    // },
    // {
    //   id: 3,
    //   leaveType: "Sick Leave",
    //   priority: "High",
    //   status: "Pending",
    //   department: "Tech",
    //   requestDate: "2024-10-05",
    // },
    // {
    //   id: 4,
    //   leaveType: "Sick Leave",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Admin",
    //   requestDate: "2024-10-06",
    // },
    // {
    //   id: 5,
    //   leaveType: "Sick Leave",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "HR",
    //   requestDate: "2024-10-07",
    // },
    // {
    //   id: 6,
    //   leaveType: "Sick Leave",
    //   priority: "High",
    //   status: "Pending",
    //   department: "IT",
    //   requestDate: "2024-10-08",
    // },
    // {
    //   id: 7,
    //   leaveType: "Sick Leave",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Tech",
    //   requestDate: "2024-10-09",
    // },
    // {
    //   id: 8,
    //   leaveType: "Sick Leave",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Admin",
    //   requestDate: "2024-10-10",
    // },
    // {
    //   id: 9,
    //   leaveType: "Sick Leave",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "IT",
    //   requestDate: "2024-10-11",
    // },
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
  //   alert(`Viewing details for: ${row.leaveType}`);
  // };

  // const handleEdit = (row) => {
  //   alert(`Editing ticket: ${row.leaveType}`);
  // };

  // const handleDelete = (row) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete ticket: ${row.leaveType}?`
  //     )
  //   ) {
  //     alert(`Deleted ticket: ${row.leaveType}`);
  //   }
  // };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "leaveType" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "requestDate" },
  ];

  const newTicket = {
    id: rows.length + 1,
    fromDate: "Dec 30 2024",
    toDate: "Dec 30 2024",
    leaveType: "Privileged Leave",
    leavePeriod: "Single",
    hours: "9.00",
    priority: "High",
    description: "Privileged Leave",
    createdBy: "Allan Silveira",

    status: "Pending",
    approvedBy: "Kalpesh Naik",
    requestDate: new Date().toISOString().split("T")[0], // Today's date
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
  const handleAddTicket = (newTicket) => {
    setRows((prevRows) => [newTicket, ...prevRows]); // Update the state
    toast.success("Applied for a new leave.");
    closeModal(); // Optionally close the modal after the alert
    navigate("/hr/leaves/my-leaves");
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
    setHighlightFirstRow(true); // Highlight the first row after editing a ticket
    toast.success("Ticket Deleted");
    closeDeleteTicket(); // Optionally close the modal after the alert
  };
  // EDIT TICKET DETAILS MODAL END

  const steps = ["Apply Leave", "Verify Details"];

  const handleNextStep = (handleNext) => {
    // e.preventDefault();
    handleNext();
  };

  return (
    <div className="w-full md:w-full transition-all duration-200 ease-in-out  p-2 pb-0 pt-10 rounded-md">
      <div className="flex gap-4  justify-center w-full">
        <div className="bg-white  w-full rounded-lg z-10 relative overflow-y-auto max-h-[80vh]">
          {/* Modal Content */}

          {/* Modal Header */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Apply For Leave
            </h2>
          </div>

          {/* Modal Body START */}
          <div className=" w-full">
            {/* <div>AddT icket Form</div> */}
            <form onSubmit={createMyLeave}>
              <div className="">
                <div className=" mx-auto">
                  <Box
                    sx={{
                      Width: "100%",
                      // paddingY: 3,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                    className="bg-white pt-3 pb-10 rounded-lg w-full">
                    {/* <div className="grid grid-cols-1 gap-4"> */}
                    <div className="w-full  flex justify-between items-center gap-4">
                      <div className="w-full">
                        <FormControl fullWidth>
                          <InputLabel id="leave-type-select-label">
                            Leave Type
                          </InputLabel>
                          <Select
                            labelId="leave-type-select-label"
                            id="leave-type-select"
                            // value={department}
                            label="Department"
                            value={createForm.leaveType}
                            name="leaveType"
                            // onChange={handleChange}
                            // onChange={updateCreateFormField}
                            onChange={(e) => updateCreateFormField(e)}
                            // onChange={handleChange}
                          >
                            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                            <MenuItem value="Casual Leave">
                              Casual Leave
                            </MenuItem>
                            <MenuItem value="Privileged Leave">
                              Privileged Leave
                            </MenuItem>
                            {/* <MenuItem value="Admin">Admin</MenuItem> */}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="w-full">
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Date"
                              sx={{ width: "100%" }}
                              name="fromDate"
                              // value={formData.purchaseDate}
                              // value={createForm.fromDate}
                              // onChange={updateCreateFormField}

                              value={
                                createForm.fromDate
                                  ? dayjs(createForm.fromDate, "DD/MM/YYYY")
                                  : null
                              } // Parse stored string back into Dayjs object
                              onChange={(newDate) =>
                                updateCreateFormField(newDate, "fromDate")
                              }
                              format="DD/MM/YYYY" // Display format in the DatePicker
                              renderInput={(params) => (
                                <TextField {...params} className="w-full" />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </div>
                      <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center w-[200px]">
                        <div className="flex justify-center items-center w-full">
                          <button
                            type="submit"
                            className="wono-blue-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                            // onClick={handleAddTicket}>
                            // onClick={() => handleNextStep(handleNext)}
                            // onClick={() => handleAddTicket(newTicket)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
            </form>
          </div>
          {/* Modal Body END */}

          {/* Modal Footer */}

          {/* <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
            <div className="flex justify-center items-center w-full">
              <button
                className="wono-blue-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                // onClick={handleAddTicket}>
                // onClick={() => handleNextStep(handleNext)}
              >
                Next
              </button>
            </div>
          </div> */}
          {/* Close button */}
        </div>
      </div>

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
                              className="bg-white py-6 rounded-lg">
                              {/* Personal Information */}
                              {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                              <div className="grid grid-cols-1 gap-4">
                                {/* Name, Mobile, Email, DOB fields */}
                                <div className="grid grid-cols-1 gap-4">
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
                                      <MenuItem value="Privileged Leave">
                                        Privileged Leave
                                      </MenuItem>
                                      {/* <MenuItem value="Admin">Admin</MenuItem> */}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormControl fullWidth>
                                    {/* <InputLabel id="suggestion-select-label">
                                      Ticket Title
                                    </InputLabel> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Date"
                                        // value={formData.purchaseDate}
                                        sx={{ width: "100%" }}
                                        // onChange={(newDate) => {
                                        //   if (newDate) {
                                        //     setFormData({
                                        //       ...formData,
                                        //       purchaseDate: newDate, // Store the Dayjs object
                                        //     });
                                        //   }
                                        // }}
                                        format="DD/MM/YYYY" // Display format in the DatePicker
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            className="w-full"
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </FormControl>
                                </div>
                                {leaveType === "Other" && (
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
                            onClick={() => handleNextStep(handleNext)}>
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
                          <h1 className="font-semibold">Leave Type</h1>
                          <span>Privileged Leave</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold">Date</h1>
                          <span>Dec 30 2024</span>
                        </div>
                      </div>
                      <div className="pt-8 pb-4">
                        {/* <p>details</p> */}

                        <WonoButton
                          content={"Submit"}
                          onClick={() => handleAddTicket(newTicket)}
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
                className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
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
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
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
                    className="py-4 rounded-lg mx-auto">
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
                  onClick={handleEditTicket}>
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
                  Delete Ticket
                </h2>
              </div>
              <div>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={closeDeleteTicket}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
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
                    Are you sure you want to delete the ticket?
                  </h1>
                  <Box
                    sx={{
                      maxWidth: 600,
                      padding: 3,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                    // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                    className="bg-white p-4 rounded-lg mx-auto">
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}

                      <div className="grid grid-cols-1 gap-4">
                        <TextField
                          label="Reason for deleting"
                          // value={newEvent.name}
                          // value="Wifi is not working" // Hardcoded value for ticket title
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
            {/* DeleteTicket Body END */}

            {/* DeleteTicket Footer */}

            <div className="sticky bottom-0 bg-white p-6 z-20 flex justify-center gap-5">
              <div className="flex justify-center items-center w-full">
                <button
                  // className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
                  onClick={handleDeleteTicket}>
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

export default ApplyLeaveForm;
