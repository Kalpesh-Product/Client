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
import AgTable from "../../../../components/AgTable";
import { useLocation, useNavigate } from "react-router-dom";
import { NewModal } from "../../../../components/NewModal";
import FormStepper from "../../../../components/FormStepper";
import WonoButton from "../../../../components/Buttons/WonoButton";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const RaiseTicketButton = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
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

  // [[[[[[[]]]]]]]
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    // Fetch the user from localStorage and update state
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchmyTickets();

    // Set a timeout to run the effect one more time after 2 seconds
    const timer = setTimeout(() => {
      if (!hasRefreshed) {
        setHasRefreshed(true); // Mark as refreshed
        fetchmyTickets(); // Run your fetching logic one more time
      }
    }, 1000);

    // Cleanup to clear the timeout
    return () => clearTimeout(timer);
  }, [hasRefreshed]);

  // ]]]]]]]]
  // [[[[[]]]]]

  // useEffect(() => {
  //   // Fetch the user from localStorage and update state
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   setUser(storedUser);

  //   // Fetch tickets immediately
  //   fetchmyTickets();

  //   // Schedule fetch to run again after 2 seconds
  //   const timer = setTimeout(() => {
  //     fetchmyTickets();
  //   }, 2000); // 2-second delay

  //   // Cleanup timeout to avoid memory leaks
  //   return () => clearTimeout(timer);
  // }, []); // Empty dependency array ensures this runs only once
  // ]]]]]]

  const raisedByFilter = authUser.user.name; // Replace with the desired name or variable

  // Ticket With APIs & Local START

  // State to store my tickets
  const [myTickets, setMyTickets] = useState([]);
  // const raisedByFilter = "Allan"; // Replace with the desired name or variable

  // state to hold the values of ticket form inputs
  const [createForm, setCreateForm] = useState({
    raisedBy: authUser.user.name,
    selectedDepartment: "",
    description: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
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
      closeModal();
      navigate("/it/tickets/my-tickets");
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

    // Filter tickets where 'raisedBy' matches
    const filteredTickets = allTickets.filter(
      (ticket) => ticket.raisedBy === raisedByFilter
    );

    // Set it on state (update the value of tickets)
    // setMyTickets(responseFromBackend.data.tickets); // setTickets will update the value of tickets from null to the current array of tickets
    // Update state with filtered tickets
    setMyTickets(filteredTickets);
    // console.log(responseFromBackend);
    // console.log(responseFromBackend.data.tickets);
  };

  // useeffect for displaying the tickets array after fetching from backend response
  useEffect(() => {
    // anything you put in here will run when the app starts
    fetchmyTickets(); // this will run the fetchTickets function & fetch the tickets array from backend as our response (in network tab from developer tools)
  }, []); // we leave the array empty since we need it to run only once when the app starts up.

  // Finction to delete a ticket

  // Editing a ticket
  // edit details before updating
  // const handleUpdateFieldChange = (e) => {
  //   // const { value, name } = e.target;
  //   const { name, value } = e.target;

  //   setUpdateForm({
  //     ...updateForm,
  //     [name]: value,
  //   });

  //   console.log(updateForm);
  // };

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Correctly updates `selectedDepartment` or `description`
    }));
  };

  // View  details before update
  const toggleUpdate = (ticketToBeDisplayedBeforeUpdating) => {
    // this function should preload the state with the values of the ticket we're editing
    // Get the current ticket
    // console.log(ticket);
    // Set state on update form
    setUpdateForm({
      raisedBy: authUser.user.name,
      selectedDepartment: ticketToBeDisplayedBeforeUpdating.selectedDepartment,
      description: ticketToBeDisplayedBeforeUpdating.description,
      _id: ticketToBeDisplayedBeforeUpdating._id,
    });
  };

  // Function to edit the ticket

  const updateTicket = async (e) => {
    e.preventDefault();
    // const { title, body } = updateForm;
    // Longer version of above line
    const newUpdatedTicketDepartment = updateForm.selectedDepartment;
    const newUpdatedTicketDescription = updateForm.description;
    // Even longer version
    // const updateFormTitle = updateForm.title;
    // const updateFormBody = updateForm.body;
    // const title = updateFormTitle;
    // const body = updateFormBody;
    // Send the update request
    const responseFromBackend = await axios.put(
      `/api/tickets/edit-ticket/${updateForm._id}`,
      {
        selectedDepartment: newUpdatedTicketDepartment,
        description: newUpdatedTicketDescription,
      }
    );
    // console.log(responseFromBackend);
    // Update state
    // creating a duplicate of the tickets
    const newTickets = [...myTickets];
    const ticketIndex = myTickets.findIndex((myTicket) => {
      return myTicket._id === updateForm._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
    });
    newTickets[ticketIndex] = responseFromBackend.data.myTicket; // The ticket at that particular index is now equal to the response we got from updating the ticket
    setMyTickets(newTickets); // Set the tickets array to our updated array
    // Clear update form state

    // console.log(myTicket);
    console.log(newTickets);
    setUpdateForm({
      _id: null,
      raisedBy: authUser.user.name,
      selectedDepartment: "",
      description: "",
    });

    // Additional things
    // display tickets again in the table
    fetchmyTickets();

    toast.success("Ticket Updated");
    closeEditTicket(); // Optionally close the modal after the alert
  };

  // Ticket With APIs & Local END

  const location = useLocation();

  const [highlightFirstRow, setHighlightFirstRow] = React.useState(false);
  const [highlightEditedRow, setHighlightEditedRow] = React.useState(false);

  const [ticketTitle, setTicketTitle] = useState(""); // State to track the selected option

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ticketTitle", headerName: "Ticket Title", width: 200 },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
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
      width: 150,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", width: 150 },
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
    {
      field: "viewDetails",
      headerName: "Actions",
      width: 150,
      cellRenderer: (params) => {
        const handleActionChange = (event) => {
          const selectedAction = event.target.value;

          // if (selectedAction === "view") {
          //   handleViewDetails(params.row);
          // } else if (selectedAction === "edit") {
          //   handleEdit(params.row);
          // } else if (selectedAction === "delete") {
          //   handleDelete(params.row);
          // }
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
              <MenuItem value="view" onClick={openDetailsModal}>
                View Details
              </MenuItem>
              <MenuItem value="edit" onClick={openEditTicket}>
                Edit
              </MenuItem>
              <MenuItem value="delete" onClick={openDeleteTicket}>
                Delete
              </MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  // Columns with Edit and Delete buttons
  // const columns2 = [
  //   { field: "_id", headerName: "ID", width: 100 },
  //   { field: "description", headerName: "Ticket Title", width: 200 },
  //   { field: "priority", headerName: "Priority", width: 150 },
  //   { field: "status", headerName: "Status", width: 150 },
  //   { field: "department", headerName: "Department", width: 150 },
  //   { field: "requestDate", headerName: "Request Date", width: 150 },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 200,
  //     cellRenderer: (params) => {
  //       const handleEdit = () => {
  //         console.log("Editing ticket:", params.data._id);
  //         // Implement your edit logic here
  //       };

  //       const handleDelete = () => {
  //         console.log("Deleting ticket:", params.data._id);
  //         // Update state to remove the ticket
  //         setMyTickets((prevTickets) =>
  //           prevTickets.filter((ticket) => ticket._id !== params.data._id)
  //         );
  //       };

  //       return (
  //         <div className="flex space-x-2">
  //           <button
  //             onClick={handleEdit}
  //             className="bg-blue-500 text-white px-3 py-1 rounded">
  //             Edit
  //           </button>
  //           <button
  //             onClick={handleDelete}
  //             className="bg-red-500 text-white px-3 py-1 rounded">
  //             Delete
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const columns3 = [
    { field: "ticketId", headerName: "ID", width: 80 },
    { field: "raisedBy", headerName: "Raised By", width: 150 },
    {
      field: "selectedDepartment",
      headerName: "Selected Department",
      width: 150,
    },
    { field: "description", headerName: "Ticket Title", width: 200 },
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

    ...(location.pathname === "/it/tickets/my-tickets"
      ? [
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

              const handleEdit = () => {
                console.log("Editing ticket:", params.data._id);
                // Implement your edit logic here
                // toggleUpdate()

                // Toggling update
                setUpdateForm({
                  raisedBy: authUser.user.name,
                  selectedDepartment: params.data.selectedDepartment,
                  description: params.data.description,
                  _id: params.data._id,
                });

                console.log(setUpdateForm);
              };
              //  toggleUpdateForm(ticket);

              const handleDelete = async () => {
                console.log("Deleting ticket:", params.data._id);
                // Update state to remove the ticket
                // setMyTickets((prevTickets) =>
                //   prevTickets.filter((ticket) => ticket._id !== params.data._id)
                // );

                const responseFromBackend = await axios.delete(
                  `/api/tickets/delete-ticket/${params.data._id}`
                );
                console.log(responseFromBackend);

                // Update state
                // we heve to filter out the one we deleted
                const newTickets = [...myTickets].filter((ticket) => {
                  return ticket._id !== params.data._id; // return tickets where ticket._id is not equal to the id we passed in (idOfTheTicketToBeDeleted). This will return an array of tickets that meet this condition.
                });

                setMyTickets(newTickets); // assigns newTickets as the new value of the tickets state variable.
              };

              return (
                <div className="flex space-x-2">
                  <button
                    // onClick={handleEdit}
                    // onClick={openEditTicket}
                    onClick={() => {
                      handleEdit();
                      openDetailsModal();
                    }}
                    className="bg-blue-300 text-white px-3 py-1 rounded">
                    Details
                  </button>
                  <button
                    // onClick={handleEdit}
                    // onClick={openEditTicket}
                    onClick={() => {
                      handleEdit();
                      openEditTicket();
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              );
            },
          },
        ]
      : []),
  ];

  // const [tickets, setTickets] = useState(allRows);

  const allRows = [
    {
      id: 1,
      ticketTitle: "Wifi is slow",
      priority: "High",
      status: "Pending",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Laptop screen malfunctioning",
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

  const newTicket = {
    id: rows.length + 1,
    ticketTitle: "Wifi is not working",
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

  const handleAddTicket = () => {
    toast.success("New Ticket Created");
    closeModal(); // Optionally close the modal after the alert
  };
  // const handleAddTicket = (newTicket) => {
  //   setRows((prevRows) => [newTicket, ...prevRows]); // Update the state
  //   toast.success("New Ticket Created");
  //   closeModal(); // Optionally close the modal after the alert
  // };

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
    // setHighlightEditedRow(true); // Highlight the first row after editing a ticket
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

  const steps = ["Raise Ticket", "Verify Details"];

  const handleNextStep = (handleNext) => {
    // e.preventDefault();
    handleNext();
  };

  const csvHeaders = [
    { label: "ID", key: "ticketId" },
    { label: "Raised By", key: "raisedBy" },
    { label: "Selected Department", key: "selectedDepartment" },
    { label: "Ticket Title", key: "description" },
    // { label: "Priority", key: "priority" },
    { label: "Status", key: "status" },
    // { label: "Request Date", key: "requestDate" },
    // { label: "Escalated To", key: "escalatedTo" },
  ];

  const visiblePaths = ["/profile", "/it/tickets/my-tickets"];

  // Code for filtering ticket messages
  const issues = [
    { department: "IT", message: "Wifi is not working" },
    { department: "IT", message: "Wifi is slow" },
    { department: "IT", message: "Laptop screen malfunctioning" },
    { department: "HR", message: "Attendance data is incorrect" },
    { department: "HR", message: "Salary Not received" },
    { department: "HR", message: "Discussion of new SOP" },
    { department: "Admin", message: "AC is too cold" },
    { department: "Admin", message: "Request for new stationery supplies" },
    { department: "Admin", message: "Conflict in meeting room scheduling" },
    { department: "Tech", message: "Domain expired" },
    { department: "Tech", message: "Software not working" },
    { department: "Tech", message: "Domain change required" },
  ];

  const filteredIssues = issues.filter(
    (issue) => issue.department === createForm.selectedDepartment
  );

  return (
    <div className=" transition-all duration-200 ease-in-out  p-2 rounded-md">
      <div className="flex gap-4  justify-between">
        {/* <div className="pt-2">Filter :</div> */}
        {/* <div>
          <FormControl size="small" style={{ minWidth: 220 }}>
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
        </div> */}

        {/* {location.pathname === "/it/tickets" && (
          <div className="  bg-red-500">
            <div className=" relative mb-2 flex justify-between">
              <h1 className="text-3xl"></h1>
              <button
                onClick={openModal}
                className="absolute bottom-4 right-4 px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                Raise Ticket
              </button>
            </div>
          </div>
        )} */}
        {/* {location.pathname === "/it/tickets" && (
          <div className="relative bg-red-500">
            <h1 className="text-3xl mb-2"></h1>
            <button
              onClick={openModal}
              className="w-[9.4rem] absolute top-[-960%] right-[-30rem] px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
              Raise Ticket
            </button>
          </div>
        )} */}

        {/* <div className="relative bg-red-500">
          <h1 className="text-3xl mb-2"></h1>
          <button
            onClick={openModal}
            className="w-[9.4rem] absolute top-[-960%] right-[-30rem] px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            Raise Ticket
          </button>
        </div> */}

        {/* {location.pathname === "/it/tickets" &&
          ["Employee"].includes(authUser.user.role.roleTitle) && (
            <div className="relative bg-red-500">
              <h1 className="text-3xl mb-2"></h1>
              <button
                onClick={openModal}
                className="w-[9.4rem] absolute top-[-560%] right-[-30rem] px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                Raise Ticket
              </button>
            </div>
          )} */}

        <div className="flex gap-4">
          <div className="flex">
            <div className="mb-2 flex justify-between">
              <h1 className="text-3xl"></h1>
              <button
                onClick={openModal}
                className=" px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                Raise Ticket
              </button>
            </div>
          </div>

          {visiblePaths.includes(location.pathname) && (
            <div className="flex">
              <div className="mb-2 flex justify-between">
                <h1 className="text-3xl"></h1>
                <CSVLink
                  // data={filteredRows} // Pass the filtered rows for CSV download
                  data={myTickets} // Pass the filtered rows for CSV download
                  headers={csvHeaders} // Pass the CSV headers
                  filename="tickets_report.csv" // Set the filename for the CSV file
                  className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold p-2 rounded ">
                  Export
                </CSVLink>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tickets datatable START */}

      {/* <AgTable
        // data={rows} // Use the state here
        data={myTickets} // Use the state here
        columns={columns3}
      /> */}

      {/* Tickets datatable END */}

      {/* ADD TICKET MODAL START */}
      {/* Stepper form start */}

      <NewModal open={isModalOpen} onClose={closeModal}>
        <>
          <form onSubmit={createMyTicket}>
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
                          <h2 className="text-3xl font-bold mb-4 uppercase">
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
                                // className="bg-white p-6 rounded-lg shadow-md mx-auto">
                                className="bg-white py-6 rounded-lg">
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
                                        value={createForm.selectedDepartment}
                                        label="Department"
                                        name="selectedDepartment"
                                        onChange={updateCreateFormField}>
                                        <MenuItem value="IT">IT</MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="Tech">Tech</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        {/* <MenuItem value="Finance">
                                          Finance
                                        </MenuItem>
                                        <MenuItem value="Maintenance">
                                          Maintenance
                                        </MenuItem>
                                        <MenuItem value="Sales">Sales</MenuItem> */}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="grid grid-cols-1 gap-4">
                                    <FormControl fullWidth>
                                      <InputLabel id="suggestion-select-label">
                                        Ticket Title
                                      </InputLabel>
                                      <Select
                                        labelId="suggestion-select-label"
                                        id="suggestion-select"
                                        // value={department}
                                        // value="IT" // Hardcoded value for department
                                        value={createForm.description}
                                        label="Ticket Title"
                                        // onChange={handleChange}
                                        name="description"
                                        onChange={updateCreateFormField}
                                        // onChange={(e) =>
                                        //   setTicketTitle(e.target.value)
                                        // }
                                        // Update state on selection
                                      >
                                        {/* <MenuItem value="Wifi is not working">
                                          Wifi is not working
                                        </MenuItem>
                                        <MenuItem value="Wifi is slow">
                                          Wifi is slow
                                        </MenuItem>
                                        <MenuItem value="Laptop screen malfunctioning">
                                          Laptop screen malfunctioning
                                        </MenuItem>
                                        <MenuItem value="Attendance data is incorrect">
                                          Attendance data is incorrect
                                        </MenuItem>
                                        <MenuItem value="Salary Not received">
                                          Salary Not received
                                        </MenuItem>
                                        <MenuItem value="Discussion of new SOP">
                                          Discussion of new SOP
                                        </MenuItem>
                                        <MenuItem value="ggs">ggs</MenuItem> */}
                                        {filteredIssues.map((issue, index) => (
                                          <MenuItem
                                            key={index}
                                            value={issue.message}>
                                            {issue.message}
                                          </MenuItem>
                                        ))}
                                        {/* <MenuItem value="Other">Other</MenuItem> */}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  {/* {ticketTitle === "Other" && (
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
                                  )} */}

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
                            <h1 className="font-semibold">Department</h1>
                            <span>{createForm.selectedDepartment}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Ticket title</h1>
                            <span>{createForm.description}</span>
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
                            buttonType={"Submit"}
                            // onClick={() => handleAddTicket(newTicket)}
                            onClick={createMyTicket}
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
              <h2 className="text-3xl font-bold mb-4 uppercase">
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
                  <span>{updateForm.description}</span>
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
                  <span>{updateForm.selectedDepartment}</span>
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
        <form onSubmit={updateTicket}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="absolute inset-0" onClick={closeEditTicket}></div>
            <div className="bg-white w-11/12 max-w-[90%] lg:max-w-[40%] pl-8 pr-8  rounded-lg shadow-lg z-10 relative overflow-y-auto max-h-[80vh]">
              {/* EditTicket Content */}

              {/* EditTicket Header */}
              <div className="sticky top-0 bg-white py-6 z-20 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4 uppercase">
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
                      // className="bg-white p-6 rounded-lg shadow-md mx-auto">
                      className="bg-white p-6 rounded-lg mx-auto">
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
                              // value="IT" // Hardcoded value for department
                              onChange={handleUpdateFieldChange}
                              name="selectedDepartment"
                              label="Department"
                              // onChange={handleChange}
                              value={updateForm.selectedDepartment}>
                              <MenuItem value="IT">IT</MenuItem>
                              <MenuItem value="HR">HR</MenuItem>
                              <MenuItem value="Tech">Tech</MenuItem>
                              <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <FormControl fullWidth>
                            <InputLabel id="suggestion-select-label">
                              Ticket Title
                            </InputLabel>
                            <Select
                              labelId="suggestion-select-label"
                              id="suggestion-select"
                              // value={department}
                              // value="IT" // Hardcoded value for department
                              value={updateForm.description}
                              label="Ticket Title"
                              // onChange={handleChange}
                              name="description"
                              onChange={handleUpdateFieldChange}
                              // onChange={(e) =>
                              //   setTicketTitle(e.target.value)
                              // }
                              // Update state on selection
                            >
                              <MenuItem value="Wifi is not working">
                                Wifi is not working
                              </MenuItem>
                              <MenuItem value="Wifi is slow">
                                Wifi is slow
                              </MenuItem>
                              <MenuItem value="Laptop screen malfunctioning">
                                Laptop screen malfunctioning
                              </MenuItem>
                              <MenuItem value="Attendance data is incorrect">
                                Attendance data is incorrect
                              </MenuItem>
                              {/* <MenuItem value="Incorrect salary received">
                                          Incorrect salary received
                                        </MenuItem> */}
                              <MenuItem value="Discussion of new SOP">
                                Discussion of new SOP
                              </MenuItem>
                              <MenuItem value="ggs">ggs</MenuItem>
                              {/* <MenuItem value="Other">Other</MenuItem> */}
                            </Select>
                          </FormControl>
                        </div>

                        {/* <div className="grid grid-cols-1 gap-4">
                          <TextField
                            label="Enter Ticket Title"
                            // value={newEvent.name}
                            value="Laptop screen malfunctioning" // Hardcoded value for ticket title
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
              {/* EditTicket Body END */}

              {/* EditTicket Footer */}

              <div className="sticky bottom-0 bg-white p-6 z-20 flex justify-center">
                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                    // onClick={handleEditTicket}
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
        </form>
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
                <h2 className="text-3xl font-bold mb-4 uppercase">
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
                    // className="bg-white p-6 rounded-lg shadow-md mx-auto">
                    className="bg-white p-6 rounded-lg mx-auto">
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

export default RaiseTicketButton;
