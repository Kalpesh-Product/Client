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

const SubordinateDueApprovals = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [myLeaves, setMyLeaves] = useState([]);

  const [highlightFirstRow, setHighlightFirstRow] = React.useState(false);
  const [highlightEditedRow, setHighlightEditedRow] = React.useState(false);

  const [leaveType, setLeaveType] = useState(""); // State to track the selected option

  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const takenByFilter = authUser.user.name; // Replace with the desired name or variable
  // function that fetches our tickets
  const fetchmyLeaves = async () => {
    // Fetch the tickets
    const responseFromBackend = await axios.get("/api/leaves/view-all-leaves"); // the function is not running yet. we want the function to run as soon as the app starts up, so we do that in a useEffect (react hook).

    const allLeaves = responseFromBackend.data.leaves;

    // Filter tickets where 'takenBy' matches
    const filteredLeaves = allLeaves.filter(
      (leave) => leave.takenBy !== takenByFilter
    );

    // Set it on state (update the value of tickets)
    // setMyTickets(responseFromBackend.data.tickets); // setTickets will update the value of tickets from null to the current array of tickets
    // Update state with filtered tickets
    setMyLeaves(filteredLeaves);
    // console.log(responseFromBackend);
    // console.log(responseFromBackend.data.tickets);
  };

  // useeffect for displaying the tickets array after fetching from backend response
  useEffect(() => {
    // anything you put in here will run when the app starts
    fetchmyLeaves();
    console.log(myLeaves);
    // this will run the fetchTickets function & fetch the tickets array from backend as our response (in network tab from developer tools)
  }, []); // we leave the array empty since we need it to run only once when the app starts up.

  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    { field: "fromDate", headerName: "From Date", width: 200 },
    { field: "toDate", headerName: "To Date", width: 200 },
    { field: "leaveType", headerName: "Leave Type", width: 200 },
    { field: "leavePeriod", headerName: "Leave Period", width: 200 },
    { field: "hours", headerName: "Hours", width: 200 },
    { field: "takenBy", headerName: "Created By", width: 200 },
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
    // { field: "approvedBy", headerName: "Approved By", width: 200 },
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
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 170,
    //   // renderCell: (params) => (
    //   cellRenderer: (params) => (
    //     <div className="flex gap-2">
    //       <Button
    //         size="small"
    //         // onClick={() => handleDelete(params.row)}
    //         // onClick={handleAccept}
    //         onClick={handleApprove}
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "green",
    //           color: "white",
    //           "&:hover": {
    //             backgroundColor: "green",
    //           },
    //           padding: "4px 8px",
    //           borderRadius: "0.375rem",
    //         }}>
    //         Approve
    //       </Button>
    //       <Button
    //         size="small"
    //         // onClick={() => handleDelete(params.row)}
    //         // onClick={handleAccept}
    //         onClick={handleReject}
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "#EF4444",
    //           color: "white",
    //           "&:hover": {
    //             backgroundColor: "#DC2626",
    //           },
    //           padding: "4px 8px",
    //           borderRadius: "0.375rem",
    //         }}>
    //         Reject
    //       </Button>
    //     </div>
    //   ),
    // },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => {
        // const viewDetails = () => {
        //   console.log("View Ticket Details:", params.data._id);
        //   // Implement your edit logic here
        //   // toggleUpdate()

        //   // Toggling update
        //   setUpdateForm({
        //     raisedBy: authUser.user.name,
        //     selectedDepartment: params.data.selectedDepartment,
        //     description: params.data.description,
        //     _id: params.data._id,
        //   });

        //   console.log(setUpdateForm);
        // };

        // Check if params.data is defined
        if (!params.data) {
          return null; // Return nothing if data is undefined
        }

        const handleApprove = async () => {
          console.log("Approved Leave:", params.data._id);
          // Implement your edit logic here

          const responseFromBackend = await axios.put(
            `/api/leaves/approve-leave/${params.data._id}`,
            {
              // selectedDepartment: newUpdatedTicketDepartment,
              approvedBy: authUser.user.name,
            }
          );

          const newLeaves = [...myLeaves];
          const leaveIndex = myLeaves.findIndex((myLeave) => {
            return myLeave._id === params.data._id; // finds the index of the leave which is updated (leave whose id was in the button). We find the index so that we can update the leave at that index
          });
          newLeaves[leaveIndex] = responseFromBackend.data.myLeave; // The leave at that particular index is now equal to the response we got from updating the leave
          setMyLeaves(newLeaves); // Set the leaves array to our updated array
          // Clear update form state

          fetchmyLeaves();

          toast.success("Leave Approved");
        };
        //  toggleUpdateForm(ticket);

        const handleReject = async () => {
          console.log("Rejected Leave:", params.data._id);

          const responseFromBackend = await axios.put(
            `/api/leaves/reject-leave/${params.data._id}`,
            {
              // selectedDepartment: newUpdatedTicketDepartment,
              approvedBy: authUser.user.name,
            }
          );

          const newLeaves = [...myLeaves];
          const leaveIndex = myLeaves.findIndex((myLeave) => {
            return myLeave._id === params.data._id; // finds the index of the leave which is updated (leave whose id was in the button). We find the index so that we can update the leave at that index
          });
          newLeaves[leaveIndex] = responseFromBackend.data.myLeave; // The leave at that particular index is now equal to the response we got from updating the leave
          setMyLeaves(newLeaves); // Set the leaves array to our updated array
          // Clear update form state
          console.log(params.data.status);
          fetchmyLeaves();

          toast.error("Leave Rejected");
        };

        return (
          <div className="flex space-x-2">
            {params.data.status === "Pending" && (
              <>
                <button
                  onClick={handleApprove}
                  // onClick={openEditTicket}
                  // onClick={() => {
                  //   handleEdit();
                  //   openDetailsModal();
                  // }}
                  className="bg-green-500 text-white px-3 py-1 rounded">
                  Approve
                </button>

                <button
                  onClick={handleReject}
                  className="bg-red-500 text-white px-3 py-1 rounded">
                  Reject
                </button>
              </>
            )}
            {params.data.status !== "Pending" && (
              <>
                <button
                  // onClick={handleApprove}
                  // onClick={openEditTicket}
                  // onClick={() => {
                  //   handleEdit();
                  //   openDetailsModal();
                  // }}
                  className="bg-green-200 text-white px-3 py-1 rounded">
                  Approve
                </button>

                <button
                  // onClick={handleReject}
                  className="bg-red-200 text-white px-3 py-1 rounded">
                  Reject
                </button>
              </>
            )}
          </div>
        );
      },
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
      fromDate: "Nov 26 2024",
      toDate: "Nov 26 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Single",
      hours: "9.00",
      priority: "High",
      createdB: "Pending",
      takenBy: "Allan Silveira",

      status: "Pending",
      approvedBy: "N/A",
    },
    {
      id: 1,
      fromDate: "Nov 7 2024",
      toDate: "Nov 7 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Partial",
      hours: "4.00",
      priority: "High",
      createdB: "Approved",
      takenBy: "Allan Silveira",
      status: "Pending",
      approvedBy: "N/A",
    },
    {
      id: 1,
      fromDate: "Nov 2 2024",
      toDate: "Nov 2 2024",
      leaveType: "Privileged Leave",
      leavePeriod: "Partial",
      hours: "3.00",
      priority: "High",
      createdB: "Approved",
      takenBy: "Allan Silveira",
      status: "Pending",
      approvedBy: "N/A",
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
    leaveType: "Sick Leave",
    priority: "Medium",
    status: "Pending",
    department: "IT",
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
        // data={rows} // Use the state here
        data={myLeaves} // Use the state here
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
                                      <MenuItem value="Annual Leave">
                                        Annual Leave
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
                          <span>Sick Leave</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2 border-b">
                          <h1 className="font-semibold">Date</h1>
                          <span>07/12/2024</span>
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
                    className="bg-white p-4 rounded-lg mx-auto">
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

export default SubordinateDueApprovals;
