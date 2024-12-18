import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";
import { TextField } from "@mui/material";
import AgTable from "../../../components/AgTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "sonner";
import axios from "axios";

const MyTicketsTable = () => {
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

  const selectedDepartmentFilter = user.department; // Replace with the desired name or variable

  // Ticket With APIs & Local START

  // State to store my tickets
  const [myTickets, setMyTickets] = useState([]);
  // const selectedDepartmentFilter = "Allan"; // Replace with the desired name or variable

  // state to hold the values of ticket form inputs
  const [createForm, setCreateForm] = useState({
    raisedBy: user.name,
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
      raisedBy: user.name, // Ensure raisedBy is always set to user.name
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

    // Filter tickets where 'department' matches
    const filteredTickets = allTickets.filter(
      (ticket) =>
        ticket.selectedDepartment === selectedDepartmentFilter &&
        ticket.assignedMember === user.name
    );

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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ticketTitle", headerName: "Ticket Title", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
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
      flex: 1,
      type: "singleSelect",
      valueOptions: ["IT", "HR", "Tech", "Admin"],
    },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Pending", "In Process", "Resolved"],
      cellRenderer: (params) => {
        const statusColors = {
          "In Process": "text-blue-600 bg-blue-100",
          Pending: "text-red-600 bg-red-100",
          Resolved: "text-yellow-600 bg-yellow-100",
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
  ];

  const columns3 = [
    { field: "ticketId", headerName: "ID", width: 100 },
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
    {
      id: 1,
      ticketTitle: "Wifi is not working",
      priority: "High",
      status: "Pending",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Payroll Issue",
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

  const csvHeaders = [
    { label: "ID", key: "ticketId" },
    { label: "Raised By", key: "raisedBy" },
    { label: "Selected Department", key: "selectedDepartment" },
    { label: "Ticket Title", key: "description" },
    // { label: "Priority", key: "priority" },
    { label: "Status", key: "status" },
    // { label: "Request Date", key: "requestDate" },
    { label: "Escalated To", key: "escalatedTo" },
  ];

  // nesting the mongoDB value for escalatedTo

  const ticketsForTable = myTickets.map((ticket) => ({
    ...ticket,
    escalatedTo: ticket.escalation?.escalationToAdmin?.escalatedTo || "N/A",
  }));

  return (
    <div className="px-2 pb-2 pt-0 bg-white mx-4">
      {/* <div className="flex gap-4 h-16 ">
        <div className="pt-2">Filter by :</div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px",
                padding: "10px 8px 4px 2px",
              }}>
              <InputLabel
                id="department-select-label"
                className=" pt-0 mt-0 mr-3 pr-2 pl-1">
                Department
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px",
                  width: "140px",
                  padding: "2px 8px 4px 8px",
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                Start Date
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">2024-10-01</MenuItem>
                <MenuItem value="IT">Last 7 Days</MenuItem>
                <MenuItem value="HR">Last 30 Days</MenuItem>
                <MenuItem value="Admin">Last 365 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                End Date
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">Today</MenuItem>
                <MenuItem value="IT">Last 7 Days</MenuItem>
                <MenuItem value="HR">Last 30 Days</MenuItem>
                <MenuItem value="Admin">Last 365 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 140 }}>
            <FormControl
              fullWidth
              sx={{
                height: "34px", // Adjust height of the select input
                padding: "10px 8px 4px 2px", // Adjust padding inside
              }}>
              <InputLabel id="department-select-label" className=" pt-0 mt-0">
                Status
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Department"
                sx={{
                  height: "32px", // Adjust the height of the select
                  padding: "2px 8px 4px 8px", // Adjust the padding inside the select
                }}
                className=" pt-0"
                onChange={handleChange}>
                <MenuItem value="">All</MenuItem>{" "}
                <MenuItem value="Tech">Pending</MenuItem>
                <MenuItem value="IT">In Process</MenuItem>
                <MenuItem value="HR">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className=" flex w-full">
          <CSVLink
            data={filteredRows} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded h-9 mt-2">
            Export Report
          </CSVLink>
        </div>
      </div> */}

      <div className="flex justify-between p-2 pl-0 items-center">
        {/* <div className="">Filter by :</div> */}
        <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField
            label="Department"
            variant="outlined"
            select
            size="small"
            onChange={handleChange}
            value={department}>
            {/* <MenuItem value="">All</MenuItem>
            <MenuItem value="Chair">Chair</MenuItem>
            <MenuItem value="Carpet Floor">Carpet</MenuItem>
            <MenuItem value="Carpet Floor">Carpet</MenuItem> */}
            <MenuItem value="">All</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField label="Priority" variant="outlined" select size="small">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Chair">High</MenuItem>
            <MenuItem value="Carpet Floor">Medium</MenuItem>
            <MenuItem value="Carpet Floor">Low</MenuItem>
          </TextField>
        </FormControl>
        {/* <FormControl size="small" style={{ minWidth: 220 }}>
          <TextField label="Start Date" variant="outlined" select size="small">
            <MenuItem value="">.</MenuItem>
            <MenuItem value="Chair">.</MenuItem>
            <MenuItem value="Carpet Floor">.</MenuItem>
          </TextField>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 220 }}>
          <TextField label="End Date" variant="outlined" select size="small">
            <MenuItem value="">.</MenuItem>
            <MenuItem value="Chair">.</MenuItem>
            <MenuItem value="Carpet Floor">.</MenuItem>
          </TextField>
        </FormControl> */}
        {/* Date Range Filter */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            slotProps={{ textField: { size: "small" } }}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} className="w-full md:w-1/4" />
            )}
          />
          <DatePicker
            label="End Date"
            slotProps={{ textField: { size: "small" } }}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} className="w-full md:w-1/4" />
            )}
          />
        </LocalizationProvider>
        <div className="h-full">
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
            Export Report
          </button> */}
          <CSVLink
            // data={filteredRows} // Pass the filtered rows for CSV download
            data={ticketsForTable} // Pass the filtered rows for CSV download
            headers={csvHeaders} // Pass the CSV headers
            filename="tickets_report.csv" // Set the filename for the CSV file
            className="wono-blue-dark hover:bg-blue-700 text-white text-sm font-bold p-2 rounded ">
            Export
          </CSVLink>
        </div>
      </div>
      {/* Tickets datatable START */}
      <div className="w-full">
        {/* <DataGrid
          rows={filteredRows} 
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{backgroundColor:'white'}}
        /> */}
        {/* <AgTable data={filteredRows} columns={columns} /> */}
        <AgTable data={ticketsForTable} columns={columns3} />
      </div>
      {/* Tickets datatable END */}
    </div>
  );
};

export default MyTicketsTable;
