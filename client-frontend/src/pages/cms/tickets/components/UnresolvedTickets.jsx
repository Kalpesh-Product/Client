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
import { TextField } from "@mui/material";
import AgTable from "../../../../components/AgTable";
import { toast } from "sonner";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const UnresolvedTickets = () => {
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

  const selectedDepartmentFilter = authUser.user.department[0].name; // Replace with the desired name or variable

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
          ticket.status !== "Closed" &&
          ticket.escalation.isEscalated === true
      );
    } else {
      // Filter tickets where 'department' matches
      var filteredTickets = allTickets.filter(
        (ticket) =>
          ticket.selectedDepartment === selectedDepartmentFilter &&
          ticket.status !== "Closed" &&
          ticket.escalation.isEscalated === true
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
    {
      field: "assignee", // New column field
      headerName: "Assignee", // Column name
      width: 200,
      cellRenderer: () => (
        <span className="text-gray-800">Faizan Shaikh</span> // Display fixed value
      ),
    },
    {
      field: "escalatedTo",
      headerName: "Escalated To",
      width: 200,
    },
    { field: "requestDate", headerName: "Request Date", width: 150 },

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
    //   field: "accept",
    //   headerName: "Accept",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button
    //       size="small"
    //       // onClick={() => handleDelete(params.row)}
    //       onClick={handleDelete}
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
    //       Accept
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
    {
      field: "escalatedTo",
      headerName: "Escalated To",
      width: 200,
    },
    // { field: "requestDate", headerName: "Request Date", width: 150 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 200,
    //   cellRenderer: (params) => {
    //     const handleEdit = () => {
    //       console.log("Editing ticket:", params.data._id);
    //       // Implement your edit logic here
    //     };

    //     const handleDelete = async () => {
    //       console.log("Deleting ticket:", params.data._id);
    //       // Update state to remove the ticket
    //       // setMyTickets((prevTickets) =>
    //       //   prevTickets.filter((ticket) => ticket._id !== params.data._id)
    //       // );

    //       const responseFromBackend = await axios.delete(
    //         `/api/tickets/delete-ticket/${params.data._id}`
    //       );
    //       console.log(responseFromBackend);

    //       // Update state
    //       // we heve to filter out the one we deleted
    //       const newTickets = [...myTickets].filter((ticket) => {
    //         return ticket._id !== params.data._id; // return tickets where note._id is not equal to the id we passed in (idOfTheNoteToBeDeleted). This will return an array of notes that meet this condition.
    //       });

    //       setMyTickets(newTickets); // assigns newTickets as the new value of the tickets state variable.
    //     };

    //     return (
    //       <div className="flex space-x-2">
    //         <button
    //           onClick={handleEdit}
    //           className="bg-red-500 text-white px-3 py-1 rounded">
    //           Close
    //         </button>
    //         <button
    //           onClick={handleDelete}
    //           className="bg-red-500 text-white px-3 py-1 rounded">
    //           Escalate
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const allRows = [
    // {
    //   id: 1,
    //   ticketTitle: "Wifi is not working",
    //   priority: "High",
    //   department: "IT",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-01",
    // },
    // {
    //   id: 2,
    //   ticketTitle: "Payroll Issue",
    //   priority: "Medium",
    //   department: "HR",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-03",
    // },
    // {
    //   id: 3,
    //   ticketTitle: "Server Downtime",
    //   priority: "High",
    //   department: "Tech",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-05",
    // },
    // {
    //   id: 4,
    //   ticketTitle: "New Workstation Setup",
    //   priority: "Low",
    //   department: "Admin",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-06",
    // },
    {
      id: 5,
      ticketTitle: "Wifi is not working",
      priority: "Medium",
      department: "IT",
      escalatedTo: "Machindranath Parkar",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Network Issue",
      priority: "High",
      department: "IT",
      escalatedTo: "Machindranath Parkar",
      requestDate: "2024-10-08",
    },
    // {
    //   id: 7,
    //   ticketTitle: "Software Installation",
    //   priority: "Low",
    //   department: "Tech",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-09",
    // },
    // {
    //   id: 8,
    //   ticketTitle: "Office Supplies Request",
    //   priority: "Low",
    //   department: "Admin",
    //   escalatedTo: "Machindranath Parkar",
    //   requestDate: "2024-10-10",
    // },
    {
      id: 9,
      ticketTitle: "Email Access Issue",
      priority: "Medium",
      department: "IT",
      escalatedTo: "Machindranath Parkar",
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

  // nesting the mongoDB value for escalatedTo

  // const ticketsForTable = myTickets.map((ticket) => ({
  //   ...ticket,
  //   escalatedTo: ticket.escalation?.escalationToAdmin?.escalatedTo || "N/A",
  // }));
  const ticketsForTable = myTickets.map((ticket) => ({
    ...ticket,
    escalatedTo: ticket.escalation?.currentlyEscalatedTo || "N/A",
  }));

  return (
    <div>
      {/* <div className="bg-green-500">
        <h2>Today's Tickets</h2>
      </div> */}

      {/* <div>
        <h2 className="text-lg">Today's Tickets</h2>
        <br />
      </div> */}

      <div className="flex gap-4">
        <div className="flex gap-4 mb-4">
          <div>
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
      {/* <AgTable data={myTickets} columns={columns3} /> */}
      <AgTable data={ticketsForTable} columns={columns3} />
      {/* Tickets datatable END */}
    </div>
  );
};

export default UnresolvedTickets;
