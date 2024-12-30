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

const EmployeeAgreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const [myLeaves, setMyLeaves] = useState([]);

  const [createForm, setCreateForm] = useState({
    employee: "",
    employmentAgreementDepartment: "",
  });

  const [entryToDelete, setEntryToDelete] = useState("");

  const updateCreateFormField = (e) => {
    // console.log("hey");
    console.log(createForm);

    // const { name, value } = e.target;
    const target = e.target; // We first access the target property of the event object e, which represents the element that triggered the event.
    const name = target.name; // Next, we extract the name and value properties from the target object and assign them to variables.
    const value = target.value;

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
  const createEmployeeAgreement = async (e) => {
    try {
      console.log("submitted x");
      console.log(createForm);
      e.preventDefault(); // prevents the page from reloading when the form is submitted

      const responseFromBackend = await axios.post(
        "/api/employee-agreements/create-employment-agreement",
        createForm
      );

      console.log(responseFromBackend);

      toast.success("New Employee Agreement Created");
      fetchmyLeaves();
      closeModal();

      // Update state
      setMyLeaves([...myLeaves, responseFromBackend.data.employmentAgreement]); // adds our newly created leave to the array of leaves. The variable leave was created in out backend for response

      // Clear form state
      setCreateForm({
        employee: "",
        employmentAgreementDepartment: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchmyLeaves = async () => {
    // Fetch the tickets
    const responseFromBackend = await axios.get(
      "/api/employee-agreements/view-all-employment-agreements"
    ); // the function is not running yet. we want the function to run as soon as the app starts up, so we do that in a useEffect (react hook).

    const allLeaves = responseFromBackend.data.employmentAgreements;
    console.log(allLeaves);

    setMyLeaves(allLeaves);
    console.log(allLeaves);
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
    { field: "employmentAgreementId", headerName: "ID", width: 100 },
    { field: "employee", headerName: "Employee Name", width: 200 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => {
        const handleDelete = () => {
          console.log("Deleting leave:", params.data._id);

          openDeleteTicket();

          setEntryToDelete(params.data._id);
          console.log(entryToDelete);
        };

        return (
          <>
            {params.data.deletedStatus === true ? (
              <p>Deleted</p>
            ) : (
              <div className="flex space-x-2 group">
                {params.data.deletedStatus !== true && (
                  <>
                    <Button
                      size="small"
                      // onClick={() => handleDelete(params.row)}
                      onClick={() =>
                        navigate("/hr/employment-agreement-details")
                      }
                      // onClick={handleDeleteTicket}
                      variant="contained"
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "blue",
                        },
                        padding: "4px 8px",
                        borderRadius: "0.375rem",
                      }}>
                      View Details
                    </Button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </>
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
      },
    },
  ];

  const allRows = [
    {
      id: 1,
      employeeName: "Kalpesh Naik",
      agreement: "Republic Day",
      priority: "High",
      status: "Pending",
      department: "IT",
      date: "2024-01-26",
    },
    {
      id: 2,
      employeeName: "Allan Silveira",
      agreement: "New Year",
      priority: "Medium",
      status: "Pending",
      department: "HR",
      date: "2024-01-01",
    },
    {
      id: 3,
      employeeName: "Aiwinraj KS",
      agreement: "Labor Day",
      priority: "High",
      status: "Pending",
      department: "Tech",
      date: "2024-05-01",
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

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Ticket Title", key: "holidayName" },
    { label: "Priority", key: "priority" },
    { label: "Department", key: "department" },
    { label: "Request Date", key: "date" },
  ];

  const newTicket = {
    id: rows.length + 1,
    employeeName: "Kalpesh Naik",
    agreement: "Republic Day",
    priority: "High",
    status: "Pending",
    department: "IT",

    date: new Date().toISOString().split("T")[0], // Today's date
  };

  // ADD TICKET MODAL START
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleAddTicket = (newTicket) => {
    setRows((prevRows) => [newTicket, ...prevRows]); // Update the state
    toast.success("Added a new agreement.");
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
    // setHighlightFirstRow(true); // Highlight the first row after editing a ticket

    const responseFromBackend = await axios.put(
      `/api/employee-agreements/soft-delete-employment-agreement/${entryToDelete}`
    );
    console.log(responseFromBackend);

    // setMyLeaves(newLeaves); // assigns newLeaves as the new value of the leaves state variable.
    fetchmyLeaves();

    toast.success("Agreement Deleted");
    closeDeleteTicket(); // Optionally close the modal after the alert
  };
  // EDIT TICKET DETAILS MODAL END

  const steps = ["Add Agreement", "Verify Details"];

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
      <div className="flex gap-4 mb-4 justify-between">
        {/* <div className="pt-2">Filter :</div> */}
        <div></div>

        {!auth.user.department.find((dept) => dept.name === "Finance") && (
          <div className="flex">
            <div className="mb-2 flex justify-between">
              <h1 className="text-3xl"></h1>
              <button
                onClick={openModal}
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                + Add Agreement
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tickets datatable START */}

      <AgTable
        data={myLeaves} // Use the state here
        columns={columns}
        highlightFirstRow={highlightFirstRow} // Bind the state here
        highlightEditedRow={highlightEditedRow} // Bind the state here
      />

      {/* Tickets datatable END */}

      {/* ADD TICKET MODAL START */}
      {/* Stepper form start */}

      <NewModal open={isModalOpen} onClose={closeModal}>
        <>
          <form onSubmit={createEmployeeAgreement}>
            <FormStepper
              steps={steps}
              handleClose={closeModal}
              children={(activeStep, handleNext) => {
                if (activeStep === 0) {
                  return (
                    <>
                      <div className="bg-white  w-[31vw] rounded-lg z-10 relative overflow-y-auto max-h-[80vh]">
                        {/* Modal Content */}

                        {/* Modal Body START */}
                        <div className=" w-full">
                          {/* <div>AddT icket Form</div> */}
                          <div className="">
                            <div className=" mx-auto">
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
                                      <InputLabel id="select-employee-label">
                                        Select Employee
                                      </InputLabel>
                                      <Select
                                        labelId="select-employee-label"
                                        id="select-employee"
                                        // value={department}
                                        label="Department"
                                        // onChange={handleChange}
                                        value={createForm.employee}
                                        name="employee"
                                        onChange={updateCreateFormField}>
                                        <MenuItem value="Kalpesh Naik">
                                          Kalpesh Naik
                                        </MenuItem>
                                        <MenuItem value="Allan Silveira">
                                          Allan Silveira
                                        </MenuItem>
                                        <MenuItem value="Aiwinraj KS">
                                          Aiwinraj KS
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="room-image"
                                      className="block text-sm font-medium text-gray-700">
                                      Upload Agreement
                                    </label>
                                    <input
                                      id="room-image"
                                      type="file"
                                      name="image"
                                      accept="pdf/*"
                                      // onChange={handleChange}
                                      className="border-none mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
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
                                </div>
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
                            <h1 className="font-semibold">Employee Name</h1>
                            <span>{createForm.employee}</span>
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
            <div className="flex justify-center items-center"></div>
          </div>
          {/* Close button */}
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
                    // className="bg-white p-4 rounded-lg shadow-md mx-auto">
                    className="bg-white p-4 rounded-lg mx-auto">
                    {/* Personal Information */}
                    {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name, Mobile, Email, DOB fields */}

                      <div className="grid grid-cols-1 gap-4">
                        <TextField label="Reason For Editing" fullWidth />
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
                <h2 className="text-3xl font-bold mb-4 uppercase">
                  Delete Agreement
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
              </div>
            </div>

            {/* DeleteTicket Body START */}
            <div className=" w-full">
              {/* <div>AddT icket Form</div> */}
              <div className="">
                <div className=" mx-auto">
                  <h1 className="text-xl text-center my-2 font-bold">
                    Are you sure you want to delete the agreement?
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
                    </div>

                    {/* Role & Department fields */}
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
            </div>
            {/* Close button */}
          </div>
        </div>
      )}

      {/* DELETE TICKET MODAL END */}
    </div>
  );
};

export default EmployeeAgreement;
