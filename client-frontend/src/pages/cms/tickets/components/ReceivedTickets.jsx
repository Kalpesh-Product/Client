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
import { toast } from "sonner";
import { TextField } from "@mui/material";
import AgTable from "../../../../components/AgTable";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const ReceivedTickets = () => {
  const { auth: authUser } = useAuth();
  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   setUser(storedUser);
  // }, []);
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   setUser(storedUser);
  //   fetchmyTickets();
  // }, []);

  // const [refreshTrigger, setRefreshTrigger] = useState(false);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   setUser(storedUser);
  //   fetchmyTickets();

  //   // Set a timeout to update the refreshTrigger state after 2 seconds
  //   const timer = setTimeout(() => {
  //     setRefreshTrigger((prev) => !prev); // Toggle the trigger state
  //   }, 2000);

  //   // Cleanup to clear the timeout
  //   return () => clearTimeout(timer);
  // }, [refreshTrigger]); // Depend on refreshTrigger to re-run the effect

  const selectedDepartmentFilter = authUser.user.department[0].name; // Replace with the desired name or variable
  console.log(authUser.user.department[0].name);
  // Ticket With APIs & Local START

  // State to store my tickets
  const [myTickets, setMyTickets] = useState([]);
  // const selectedDepartmentFilter = "Allan"; // Replace with the desired name or variable

  // state to hold the values of ticket form inputs
  const [createForm, setCreateForm] = useState({
    raisedBy: authUser.user.name,
    selectedDepartment: "",
    description: "",
  });

  // we need to get the name of the input field while typing(changing using onChange) & we need to get the new value. so we get both of those of the default html event that gets passed here (we put an e for the event)
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
      raisedBy: authUser.user.name, // Ensure raisedBy is always set to authUser.user.name
    }));

    console.log("Updated Form:", createForm);
    console.log("Updated Field:", { name, value });

    console.log({ name, value });
  };

  // Function to create the ticket
  const createMyTicket = async (e) => {
    try {
      console.log("submitted x");
      console.log(createForm);
      e.preventDefault(); // prevents the page from reloading when the form is submitted

      // Create the ticket

      // const responseFromBackend = await axios.post(
      //   // the 2 arguments are: the link to post the values, the values to be sent for post method
      //   // "/api/tickets/create-ticket",
      //   "http://localhost:5000/api/tickets/create-ticket",
      //   createForm
      // );

      const responseFromBackend = await axios.post(
        "/api/tickets/create-ticket",
        createForm
      );

      console.log(responseFromBackend);

      // Update state
      setMyTickets([...myTickets, responseFromBackend.data.ticket]); // adds our newly created ticket to the array of tickets. The variable ticket was created in out backend for response
      // console.log("submit");
      // console.log(responseFromBackend);

      // Clear form state
      setCreateForm({
        raisedBy: "",
        selectedDepartment: "",
        description: "",
      });
      toast.success("New Ticket Created");
      fetchmyTickets();
    } catch (error) {
      console.log(error);
    }
  };

  // function that fetches our tickets
  const fetchmyTickets = async () => {
    // Fetch the tickets
    const responseFromBackend = await axios.get(
      "/api/tickets/view-all-tickets"
    ); // the function is not running yet. we want the function to run as soon as the app starts up, so we do that in a useEffect (react hook).

    const allTickets = responseFromBackend.data.tickets;

    if (selectedDepartmentFilter === "TopManagement") {
      // Filter tickets where 'department' matches
      var filteredTickets = allTickets.filter(
        (ticket) =>
          ticket.escalatedDepartment === selectedDepartmentFilter &&
          ticket.accepted.acceptedStatus === false &&
          ticket.status !== "Closed"
      );
    } else {
      // Filter tickets where 'department' matches
      var filteredTickets = allTickets.filter(
        (ticket) =>
          ticket.selectedDepartment === selectedDepartmentFilter &&
          ticket.accepted.acceptedStatus === false &&
          ticket.status !== "Closed" &&
          ticket.escalation.isEscalated === false
      );
    }

    // Set it on state (update the value of tickets)
    // setMyTickets(responseFromBackend.data.tickets); // setNotes will update the value of tickets from null to the current array of tickets
    // Update state with filtered tickets
    setMyTickets(filteredTickets);
    // console.log(responseFromBackend);
    // console.log(responseFromBackend.data.tickets);
  };

  // useeffect for displaying the tickets array after fetching from backend response
  useEffect(() => {
    // anything you put in here will run when the app starts
    fetchmyTickets(); // this will run the fetchNotes function & fetch the tickets array from backend as our response (in network tab from developer tools)
  }, []); // we leave the array empty since we need it to run only once when the app starts up.

  // Finction to delete a ticket

  // Function to edit the ticket

  // Ticket With APIs & Local END

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ticketTitle", headerName: "Ticket Title", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      width: 170,
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
      width: 170,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", flex: 1 },

    {
      field: "accept",
      headerName: "Accept",
      width: 170,
      // renderCell: (params) => (
      cellRenderer: (params) => (
        <Button
          size="small"
          // onClick={() => handleDelete(params.row)}
          onClick={handleAccept}
          variant="contained"
          sx={{
            backgroundColor: "#EF4444",
            color: "white",
            "&:hover": {
              backgroundColor: "#DC2626",
            },
            padding: "4px 8px",
            borderRadius: "0.375rem",
          }}>
          Accept
        </Button>
      ),
    },
    ...(authUser.user.role.roleTitle !== "Employee"
      ? [
          {
            field: "assign",
            headerName: "Assign",
            width: 170,
            // renderCell: (params) => (
            cellRenderer: (params) => (
              <Button
                size="small"
                // onClick={() => handleDelete(params.row)}
                // onClick={handleAssign}
                onClick={openModal}
                variant="contained"
                sx={{
                  backgroundColor: "#EF4444",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#DC2626",
                  },
                  padding: "4px 8px",
                  borderRadius: "0.375rem",
                }}>
                Assign Member
              </Button>
            ),
          },
        ]
      : []),

    // {
    //   field: "viewDetails",
    //   headerName: "View Details",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button
    //       size="small"
    //       onClick={() => handleViewDetails(params.row)}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#3B82F6", // Tailwind blue-500
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "#2563EB", // Tailwind blue-600
    //         },
    //         padding: "8px 16px",
    //         borderRadius: "0.375rem", // Tailwind rounded
    //       }}>
    //       View Details
    //     </Button>
    //   ),
    // },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   width: 100,
    //   renderCell: (params) => (
    //     <Button
    //       size="small"
    //       onClick={() => handleEdit(params.row)}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#22C55E", // Tailwind green-500
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "#16A34A", // Tailwind green-600
    //         },
    //         padding: "8px 16px",
    //         borderRadius: "0.375rem", // Tailwind rounded
    //       }}>
    //       Edit
    //     </Button>
    //   ),
    // },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   width: 120,
    //   renderCell: (params) => (
    //     <Button
    //       size="small"
    //       onClick={() => handleDelete(params.row)}
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#EF4444", // Tailwind red-500
    //         color: "white",
    //         "&:hover": {
    //           backgroundColor: "#DC2626", // Tailwind red-600
    //         },
    //         padding: "8px 16px",
    //         borderRadius: "0.375rem", // Tailwind rounded
    //       }}>
    //       Delete
    //     </Button>
    //   ),
    // },
    // {
    //   field: "viewDetails",
    //   headerName: "Actions",
    //   width: 150,
    //   // renderCell: (params) => {
    //   cellRenderer: (params) => {
    //     const handleActionChange = (event) => {
    //       const selectedAction = event.target.value;

    //       if (selectedAction === "view") {
    //         handleViewDetails(params.row);
    //       } else if (selectedAction === "edit") {
    //         handleEdit(params.row);
    //       } else if (selectedAction === "delete") {
    //         handleDelete(params.row);
    //       }
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
    //           <MenuItem value="view">View Details</MenuItem>

    //         </Select>
    //       </FormControl>
    //     );
    //   },
    // },
  ];

  const columns3 = [
    // { field: "ticketId", headerName: "ID", width: 100 },
    { field: "raisedBy", headerName: "Raised By", flex: 1 },
    {
      field: "selectedDepartment",
      headerName: "From Department",
      width: 150,
    },
    { field: "description", headerName: "Ticket Title", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      valueOptions: ["Pending", "In Process", "Closed"],
      cellRenderer: (params) => {
        const statusColors = {
          "In Process": "text-yellow-600 bg-yellow-100",
          Pending: "text-red-600 bg-red-100",
          Closed: "text-blue-600 bg-blue-100",
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
    // { field: "requestDate", headerName: "Request Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => {
        const handleAcceptTicket = async () => {
          console.log("Accepted ticket:", params.data._id);
          // Implement your edit logic here
          console.log(params.data);
          console.log("Accepted by:", authUser.user.name);

          // Accept ticket START
          //  const newUpdatedTicketDepartment = updateForm.selectedDepartment;
          const newUpdatedAssignedMember = authUser.user.name;
          // Even longer version
          // const updateFormTitle = updateForm.title;
          // const updateFormBody = updateForm.body;
          // const title = updateFormTitle;
          // const body = updateFormBody;
          // Send the update request
          const responseFromBackend = await axios.put(
            `/api/tickets/accept-ticket/${params.data._id}`,
            {
              // selectedDepartment: newUpdatedTicketDepartment,
              assignedMember: newUpdatedAssignedMember,
            }
          );
          // console.log(responseFromBackend);
          // Update state
          // creating a duplicate of the tickets
          const newTickets = [...myTickets];
          const ticketIndex = myTickets.findIndex((myTicket) => {
            return myTicket._id === params.data._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
          });
          newTickets[ticketIndex] = responseFromBackend.data.myTicket; // The ticket at that particular index is now equal to the response we got from updating the ticket
          setMyTickets(newTickets); // Set the tickets array to our updated array
          // Clear update form state

          // console.log(myTicket);
          // console.log(newTickets);
          // setUpdateForm({
          //   _id: null,
          //   raisedBy: authUser.user.name,
          //   selectedDepartment: "",
          //   description: "",
          // });

          // Additional things
          // display tickets again in the table
          fetchmyTickets();

          toast.success("Ticket Accepted");
          // closeEditTicket(); // Optionally close the modal after the alert
          // Accept ticket END
        };

        const handleAssignTicket = async () => {
          console.log("Assigning ticket:", params.data._id);
          // Update state to remove the ticket
          // setMyTickets((prevTickets) =>
          //   prevTickets.filter((ticket) => ticket._id !== params.data._id)
          // );

          // const responseFromBackend = await axios.delete(
          //   `/api/tickets/delete-ticket/${params.data._id}`
          // );
          // console.log(responseFromBackend);

          // // Update state
          // // we heve to filter out the one we deleted
          // const newTickets = [...myTickets].filter((ticket) => {
          //   return ticket._id !== params.data._id; // return tickets where note._id is not equal to the id we passed in (idOfTheNoteToBeDeleted). This will return an array of notes that meet this condition.
          // });

          // setMyTickets(newTickets); // assigns newTickets as the new value of the tickets state variable.
        };

        return (
          <div className="flex space-x-2">
            <button
              // onClick={handleEdit}
              onClick={handleAcceptTicket}
              className="bg-red-500 text-white px-3 py-1 rounded">
              Accept
            </button>
            {/* {authUser.user.role.roleTitle === "Admin" && (
              <button
                // onClick={handleDelete}
                // onClick={handleAssign}
                // onClick={handleAssignTicket}
                onClick={openModal}
                className="bg-red-500 text-white px-3 py-1 rounded">
                Assign
              </button>
            )} */}
          </div>
        );
      },
    },
  ];

  const allRows = [
    {
      id: 1,
      ticketTitle: "Wifi is not working",
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
    toast.success("Ticket Assigned To Available Employee: Faizan Shaikh");
    closeModal(); // Optionally close the modal after the alert
  };

  const handleAccept = () => {
    toast.success("Ticket Accepted");
    //   closeDeleteTicket();
  };

  const handleAssign = () => {
    toast.success("Ticket Assigned To Available Employee: Faizan Shaikh");
    //   closeDeleteTicket();
  };

  const [nameInput, setNameInput] = useState(""); // To store the current input value
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // To store filtered name suggestions

  const fullNames = [
    "Faizan",
    "Rajiv",
    "Desmon",
    // "Faizan Shaikh",
    // "Rajiv Kumar Pal",
    // "Desmon Goes",
    // "Allan Mark Silveira",
    // "Aiwinraj KS",
    // "Anushri Mohandas Bhagat",
    // "Sankalp Chandrashekar Kalangutkar",
    // "Kashif Shaikh",
    // "Ragesh A C",
    // "Machindranath Parkar",
    // "Benson Nadakattin",
    // "Kalpesh Naik",
    // "Nikhil Nagvekar",
    // "Farzeen Qadri",
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

      {/* <div>
        <h2 className="text-lg">Today's Tickets</h2>
        <br />
      </div> */}

      <div className="flex gap-4 pt-2">
        <div className="flex gap-4 mb-4">
          <div>
            <FormControl size="small" style={{ minWidth: 220 }}>
              {/* <InputLabel>Filter by Asset Name</InputLabel> */}
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
            </FormControl>
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

      {/* <AgTable data={filteredRows} columns={columns} /> */}
      <AgTable data={myTickets} columns={columns3} />
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
                  Assign Member
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
                    // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                    className="bg-white p-4 rounded-lg mx-auto">
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}
                      <div className="grid grid-cols-1 gap-4">
                        <FormControl fullWidth>
                          <InputLabel id="department-select-label">
                            Select Team Member
                          </InputLabel>
                          <Select
                            labelId="department-select-label"
                            id="department-select"
                            // value={department}
                            label="Select Team Member"
                            // onChange={handleChange}
                          >
                            <MenuItem value="Faizan Shaikh">
                              Faizan Shaikh
                            </MenuItem>
                            <MenuItem value="Rajiv Kumar Pal">
                              Rajiv Kumar Pal
                            </MenuItem>
                            <MenuItem value="Desmon Goes">Desmon Goes</MenuItem>
                            {/* <MenuItem value="Admin">Admin</MenuItem> */}
                          </Select>
                        </FormControl>
                      </div>
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
                        label="Select Available Member"
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

export default ReceivedTickets;
