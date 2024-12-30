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
import axios from "axios";

const ManageLeaves = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const [myLeaves, setMyLeaves] = useState([]);

  const [createForm, setCreateForm] = useState({
    leaveType: "",
    noOfDays: "",
  });

  const [entryToDelete, setEntryToDelete] = useState("");

  const updateCreateFormField = (e) => {
    // console.log("hey");
    console.log(createForm);

    // const { name, value } = e.target;
    const target = e.target; // We first access the target property of the event object e, which represents the element that triggered the event.
    const name = target.name; // Next, we extract the name and value properties from the target object and assign them to variables.
    const value = target.value;
    // const triggeredHtmlElement = e.target;
    // const nameAttributeOfTheTriggeredElement = triggeredHtmlElement.name;
    // const valueAttributeOfTheTriggeredElement = triggeredHtmlElement.value;

    // now we update the state
    // setCreateForm({
    //   ...createForm, // creates a duplicate of the createForm object
    //   // name: value, // this will update the key of name, but we don't need the key of name, we need whatever the variable is equal to
    //   [name]: value, // this will find the keys (name attributes) and update its values (value attributes) to whatever is changed by the JS event.
    // });

    setCreateForm((prevForm) => ({
      ...prevForm, // Spread previous form values
      [name]: value, // Update the specific field being modified
      // takenBy: authUser.user.name, // Ensure raisedBy is always set to authUser.user.name
    }));

    console.log("Updated Form:", createForm);
    console.log("Updated Field:", { name, value });

    console.log({ name, value });
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
        "/api/leaves/create-leave-type",
        createForm
      );

      console.log(responseFromBackend);

      toast.success("New Leave Created");
      fetchmyLeaves();
      closeModal();

      // Update state
      setMyLeaves([...myLeaves, responseFromBackend.data.leaveType]); // adds our newly created leave to the array of leaves. The variable leave was created in out backend for response
      // console.log("submit");
      // console.log(responseFromBackend);

      // Clear form state
      setCreateForm({
        leaveType: "",
        noOfDays: "",
      });
      // toast.success("New Leave Created");
      // fetchmyLeaves();
      // closeModal();
      // navigate("/leaves/view-leaves");
    } catch (error) {
      console.log(error);
    }
  };

  // const takenByFilter = authUser.user.name; // Replace with the desired name or variable
  // function that fetches our tickets
  const fetchmyLeaves = async () => {
    // Fetch the tickets
    const responseFromBackend = await axios.get(
      "/api/leaves/view-all-leave-types"
    ); // the function is not running yet. we want the function to run as soon as the app starts up, so we do that in a useEffect (react hook).

    const allLeaves = responseFromBackend.data.leavesTypes;
    console.log(allLeaves);
    // Filter tickets where 'takenBy' matches
    // const filteredLeaves = allLeaves.filter(
    //   (leave) => leave.takenBy === takenByFilter
    // );

    // Set it on state (update the value of tickets)
    // setMyTickets(responseFromBackend.data.tickets); // setTickets will update the value of tickets from null to the current array of tickets
    // Update state with filtered tickets
    // setMyLeaves(filteredLeaves);
    setMyLeaves(allLeaves);
    console.log(allLeaves);
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

  const [highlightFirstRow, setHighlightFirstRow] = React.useState(false);
  const [highlightEditedRow, setHighlightEditedRow] = React.useState(false);

  const [holidayName, setLeaveType] = useState(""); // State to track the selected option

  const columns = [
    // { field: "leaveTypeId", headerName: "ID", flex: 1},
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
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
    // { field: "date", headerName: "Date", width: 150 },
    { field: "noOfDays", headerName: "No Of Days", flex: 1 },
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
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   width: 170,
    //   // renderCell: (params) => (
    //   cellRenderer: (params) => (
    //     <Button
    //       size="small"
    //       // onClick={() => handleDelete(params.row)}
    //       onClick={openDeleteTicket}
    //       // onClick={handleDeleteTicket}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "red",
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "red",
    //         },
    //         padding: "4px 8px",
    //         borderRadius: "0.375rem",
    //       }}>
    //       Delete
    //     </Button>
    //   ),
    // },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => {
        const handleDelete = () => {
          console.log("Deleting leave:", params.data._id);
          // Update state to remove the leave
          // setMyLeaves((prevLeaves) =>
          //   prevLeaves.filter((leave) => leave._id !== params.data._id)
          // );

          openDeleteTicket();

          setEntryToDelete(params.data._id);
          console.log(entryToDelete);

          // const responseFromBackend = await axios.delete(
          //   `/api/leaves/delete-leave-type/${params.data._id}`
          // );
          // console.log(responseFromBackend);

          // // Update state
          // // we heve to filter out the one we deleted
          // const newLeaves = [...myLeaves].filter((leave) => {
          //   return leave._id !== params.data._id; // return leaves where leave._id is not equal to the id we passed in (idOfTheLeaveToBeDeleted). This will return an array of leaves that meet this condition.
          // });

          // setMyLeaves(newLeaves); // assigns newLeaves as the new value of the leaves state variable.
        };
        // columns.forEach((column) => {
        //   column.cellClassRules = {
        //     ...column.cellClassRules,
        //     "row-revoked": (params) => params.data.deletedStatus === true,
        //   };
        // });

        return (
          <>
            {params.data.deletedStatus === true ? (
              <p>Deleted</p>
            ) : (
              <div className="flex space-x-2 group">
                {params.data.deletedStatus !== true && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                )}
                {params.data.deletedStatus === true && (
                  <button
                    // onClick={handleDelete}
                    className="bg-red-200 text-white px-3 py-1 rounded ">
                    Delete
                  </button>
                )}
              </div>
            )}
          </>
        );

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

        // const handleEdit = () => {
        //   console.log("Editing ticket:", params.data._id);
        //   // Implement your edit logic here
        //   // toggleUpdate()

        //   // Toggling update
        //   setUpdateForm({
        //     // raisedBy: authUser.user.name,
        //     raisedBy: params.data.raisedBy,
        //     selectedDepartment: params.data.selectedDepartment,
        //     description: params.data.description,
        //     ticketPriority: params.data.ticketPriority,
        //     status: params.data.status,
        //     _id: params.data._id,
        //   });

        //   console.log(setUpdateForm);
        // };
        //  toggleUpdateForm(ticket);

        // const handleDelete = () => {
        //   console.log("Deleting leave:", params.data._id);
        //   // Update state to remove the leave
        //   // setMyLeaves((prevLeaves) =>
        //   //   prevLeaves.filter((leave) => leave._id !== params.data._id)
        //   // );

        //   openDeleteTicket();

        //   setEntryToDelete(params.data._id);
        //   console.log(entryToDelete);

        //   // const responseFromBackend = await axios.delete(
        //   //   `/api/leaves/delete-leave-type/${params.data._id}`
        //   // );
        //   // console.log(responseFromBackend);

        //   // // Update state
        //   // // we heve to filter out the one we deleted
        //   // const newLeaves = [...myLeaves].filter((leave) => {
        //   //   return leave._id !== params.data._id; // return leaves where leave._id is not equal to the id we passed in (idOfTheLeaveToBeDeleted). This will return an array of leaves that meet this condition.
        //   // });

        //   // setMyLeaves(newLeaves); // assigns newLeaves as the new value of the leaves state variable.
        // };

        // return (
        //   <div className="flex space-x-2 group">
        //     {params.data.deletedStatus !== true && (
        //       <button
        //         onClick={handleDelete}
        //         className="bg-red-500 text-white px-3 py-1 rounded">
        //         Delete
        //       </button>
        //     )}
        //     {params.data.deletedStatus === true && (
        //       <button
        //         // onClick={handleDelete}
        //         className="bg-red-200 text-white px-3 py-1 rounded ">
        //         Delete
        //       </button>
        //     )}
        //   </div>
        // );
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
      leaveType: "Sick Leave",
      priority: "High",
      status: "Pending",
      department: "IT",
      noOfLeaves: "6",
    },
    {
      id: 2,
      leaveType: "Casual Leave",
      priority: "Medium",
      status: "Pending",
      department: "HR",
      noOfLeaves: "2",
    },
    {
      id: 3,
      leaveType: "Priviledged Leave",
      priority: "High",
      status: "Pending",
      department: "Tech",
      noOfLeaves: "4",
    },
    // {
    //   id: 4,
    //   holidayName: "Independence Day",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Admin",
    //   date: "2024-08-15",
    // },
    // {
    //   id: 5,
    //   holidayName: "Gudi Padava",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "HR",
    //   date: "2024-04-09",
    // },
    // {
    //   id: 6,
    //   holidayName: "Goa Liberation Day",
    //   priority: "High",
    //   status: "Pending",
    //   department: "IT",
    //   date: "2024-12-19",
    // },
    // {
    //   id: 7,
    //   holidayName: "Ganesh Chaturthi",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Tech",
    //   date: "2024-09-07",
    // },
    // {
    //   id: 8,
    //   holidayName: "Gandhi Jayanti",
    //   priority: "Low",
    //   status: "Pending",
    //   department: "Admin",
    //   date: "2024-10-02",
    // },
    // {
    //   id: 9,
    //   holidayName: "Feast of St. Francis Xavier",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "IT",
    //   date: "2024-12-03",
    // },
    // {
    //   id: 9,
    //   holidayName: "Eid Al-Fitr",
    //   priority: "Medium",
    //   status: "Pending",
    //   department: "IT",
    //   date: "2024-04-11",
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
    leaveType: "New Leave",
    priority: "Medium",
    status: "Pending",
    noOfLeaves: "5",
    date: new Date().toISOString().split("T")[0], // Today's date
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
    toast.success("Added a new holiday.");
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

  const handleDeleteTicket = async () => {
    const responseFromBackend = await axios.put(
      `/api/leaves/soft-delete-leave-type/${entryToDelete}`
    );
    console.log(responseFromBackend);

    // Update state
    // we heve to filter out the one we deleted
    // const newLeaves = [...myLeaves].filter((leave) => {
    //   return leave._id !== entryToDelete; // return leaves where leave._id is not equal to the id we passed in (idOfTheLeaveToBeDeleted). This will return an array of leaves that meet this condition.
    // });

    // setMyLeaves(newLeaves); // assigns newLeaves as the new value of the leaves state variable.
    fetchmyLeaves();
    // setHighlightFirstRow(true); // Highlight the first row after editing a ticket
    toast.success("Leave Type Deleted");
    closeDeleteTicket(); // Optionally close the modal after the alert
  };
  // EDIT TICKET DETAILS MODAL END

  const steps = ["Add Leave Tpye", "Verify Details"];

  const handleNextStep = (handleNext) => {
    // e.preventDefault();
    handleNext();
  };

  columns.forEach((column) => {
    column.cellClassRules = {
      ...column.cellClassRules,
      "row-revoked": (params) => params.data.deletedStatus === true,
    };
  });

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
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                + Add New Leave Type
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
          <form onSubmit={createMyLeave}>
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
                                      label="Leave Type"
                                      value={createForm.leaveType}
                                      name="leaveType"
                                      onChange={updateCreateFormField}
                                      // value={newEvent.name}
                                      // onChange={(e) =>
                                      //   setnewEvent({ ...newEvent, name: e.target.value })
                                      // }
                                      fullWidth
                                    />
                                  </div>
                                  {/* <div className="grid grid-cols-1 gap-4">
                                  <FormControl fullWidth>
                            
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
                                </div> */}
                                  {holidayName === "Other" && (
                                    <div className="grid grid-cols-1 gap-4">
                                      <TextField
                                        label="Specify"
                                        value={createForm.leaveType}
                                        name="leaveType"
                                        onChange={updateCreateFormField}
                                        // value={newEvent.name}
                                        // onChange={(e) =>
                                        //   setnewEvent({ ...newEvent, name: e.target.value })
                                        // }
                                        fullWidth
                                      />
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 gap-4">
                                    <TextField
                                      label="Number Of Days"
                                      value={createForm.noOfDays}
                                      name="noOfDays"
                                      onChange={updateCreateFormField}
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
                            <span>{createForm.leaveType}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Number Of Days</h1>
                            <span>{createForm.noOfDays}</span>
                          </div>
                        </div>
                        <div className="pt-8 pb-4">
                          {/* <p>details</p> */}

                          <button
                            type="submit"
                            // onClick={console.log("submitted")}
                            className=" p-2 bg-white wono-blue-dark w-full text-white rounded-md">
                            Submit
                          </button>

                          {/* <WonoButton
                            content={"Submit"}
                            onClick={() => handleAddTicket(newTicket)}
                          /> */}
                        </div>
                      </div>
                    </>
                  );
                }
              }}
            />
          </form>
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
                  Delete Leave Type
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
                    Are you sure you want to delete the leave type?
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

export default ManageLeaves;
