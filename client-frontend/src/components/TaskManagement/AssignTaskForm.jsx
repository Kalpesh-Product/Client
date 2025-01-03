import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { data } from "../../utils/data";
import { useLocation, useNavigate } from "react-router-dom";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import FormStepper from "../../components/FormStepper";
import WonoButton from "../../components/Buttons/WonoButton";
import axios from "axios";
import dayjs from "dayjs";

const extractNames = (data) => {
  const names = [];
  data.forEach((item) => {
    names.push(item.name);
    if (item.reports && item.reports.length > 0) {
      names.push(...extractNames(item.reports));
    }
  });
  return names;
};

const AssignTaskForm = ({
  title,
  handleClose,
  rows,
  setAllRows,
  selectedRow,
  modalType,
  EditValue,
  department,
  description,
  SetTitle,
  SetDepartment,
  SetDescription,
  Title,
  projectTitle,
  projectData,
  setProjectData,
  setTasks,
  tasks,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/departments/get-departments"
        ); // Update with your backend URL
        setDepartments(response.data.departments || []);

        console.log(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
      console.log(departments);
    };
    fetchDepartments();
  }, []);

  const projectTitles =
    modalType !== "Delete_Row"
      ? [
          ...tasks.ongoing.map((task) => task.Title),
          ...tasks.upcoming.map((task) => task.Title),
          ...tasks.pending.map((task) => task.Title),
          ...tasks.completed.map((tasks) => tasks.Title),
        ]
      : [];

  const [formData, setFormData] = useState({
    taskName: "",
    date: null,
    priority: "",
    status: "",
    project: "",
    description: "",
  });

  const [membersData, setMembersData] = useState({
    Name: "",
    Email: "",
    Role: "",
    Task: "",
    Projects: "",
  });

  const [insideAddTask, SetInsideAddTask] = useState({
    taskName: "",
    date: "",
    priority: "",
    status: "",
    project: "",
  });

  const priorityType = ["High", "Low", "Medium"];
  const statusTypes = ["Ongoing", "Pending", "Upcoming", "Completed"];
  const Roles = [
    "Frontend Developer",
    "Backened Developer",
    "Ui/UX Developer",
    "Mentor",
    "Manager",
    "Intern",
    "Trainee",
    "React developer",
    "Java  developer",
    "DBA",
  ];

  const projects = [
    "Website Redesign",
    "Financial Forcastig And Budgeting",
    "Annual Co-orporate and Conference",
    "Launch a New Digital Marketing Campaign",
    "Bussiness process optimization and automation",
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const names = extractNames(data);

  const handleEditField = (e) => {
    SetDepartment(e.target.value);
    SetDescription(e.target.value);
    SetTitle(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hadndleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setMembersData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // For preview
      setFormData((prevData) => ({ ...prevData, avatar: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.pathname === "/tasks") {
      const newTask = {
        id: rows.length + 1,
        ticketTitle: formData.taskName,
        Assignes: selectedOptions.join(", "), // Join multiple selections
        DueDate: "TBD", // Update with a proper value if needed
        priority: formData.priority,
        department: "TBD", // Update with a proper value if needed
        requestDate: new Date().toISOString().split("T")[0],
      };

      setAllRows([...rows, newTask]);

      toast("Task Added successfully");
    } else if (location.pathname === "/tasks/teams") {
      const newTeamsMembers = {
        id: rows.length + 1,
        Name: membersData.Name,
        Email: membersData.Email,
        Role: membersData.Role,
        Tasks: membersData.Task,
        Projects: membersData.Projects,
      };

      setAllRows([...rows, newTeamsMembers]);

      toast("Members Added successfully");
    } else if (modalType === "Add Project") {
      setTasks((prev) => ({
        ...prev,
        upcoming: [
          ...prev.upcoming,
          { ...projectData, Assignees: projectData.assignees },
          // { ...projectData, assignees: projectData.assignees.map((name) => `/path/to/${name}.jpg`) },
        ],
      }));
      setProjectData({
        Title: "",
        description: "",
        Department: "",
        category: "",
      });
    }
    console.log(tasks);
    console.log(projectData);
    handleClose();
  };

  const navigateProject = () => {
    navigate("/tasks/tasklist");
  };

  const steps = ["Add Projects", "Verify Details"];

  const steps2 = ["Add Tasks", "Verify Details"];

  const steps3 = ["Add Employee", "View Details"];

  const editSteps = ["Edit Fields", "View Edits"];

  const handleNextStep = (e, handleNext) => {
    e.preventDefault();
    handleNext();
  };

  const handleAddProject = async (project) => {
    setProjectData({
      Department: "",
      assignees: [],
      Title: "",
      description: "",

      status: "",
    });

    handleClose();
    console.log(project);
    // Optionally close the modal after the alert
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks/create-project",
        project
      );
      alert(response.data.message);
      alert("Projects Added Successfully to database");
      toast.success("Added a new projects.");
    } catch (error) {
      console.log("Error Saving projects", error);
      alert("Failed to save projects. Please try again");
      toast.error("Projects could not be saved");
    }
  };

  const handleDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setProjectData((prev) => ({ ...prev, startdate: formattedDate }));
  };
  const handleDate2change = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
    setProjectData((prev) => ({ ...prev, enddate: formattedDate }));
  };

  const handleAddTasks = async (tasks) => {
    handleClose();
    setTasks({
      taskName: "",
      priority: "",
      status: "",
      project: "",
      description: "",
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks/create-tasks",
        tasks
      );

      alert("Tasks Added Successfully to database");
      toast.success("Added a new tasks.");
    } catch (error) {
      console.log("Error Saving tasks", error);
      alert("Failed to save Tasks. Please try again");
      toast.error("Tasks could not be saved");
    }
  };

  const handleEditProject = async(updatedData) => {
    console.log(projectData);

    if (!projectData?._id) {
      console.error("Project ID is undefined");
      return;
    }
    try {
      const response = await fetch(`/api/tasks/create-project/${projectData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        alert("Project updated successfully!");
        // Optionally refresh the project list
        handleClose(); // Close the modal
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }
  return (
    <div>
      <Box
        sx={{
          maxWidth: 600,
          minWidth: 600,
          mx: "auto",
          p: 2,
          borderRadius: 2,
          fontFamily: "Popins-SemiBold",
        }}
      >
        <div className="flex justify-between align-middle mb-4">
          <Typography
            sx={{ fontFamily: "Popins-SemiBold" }}
            variant="h5"
            gutterBottom
          >
            {/* {title} */}
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          {location.pathname === "/tasks/teams" ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {/* Asset Number */}
                <Grid item xs={12}>
                  <TextField
                    name="Name"
                    label="Employee name"
                    value={membersData.Name}
                    fullWidth
                    onChange={hadndleEmployeeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Email"
                    label="Employee Email"
                    value={membersData.Email}
                    fullWidth
                    onChange={hadndleEmployeeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Assign Role"
                    name="Role"
                    select
                    fullWidth
                    value={membersData.Role}
                    onChange={hadndleEmployeeChange}
                  >
                    {Roles.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Assign Projects"
                    name="Projects"
                    select
                    fullWidth
                    value={membersData.Projects}
                    onChange={hadndleEmployeeChange}
                  >
                    {projects.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Assign Tasks"
                    name="Task"
                    select
                    fullWidth
                    value={membersData.Task}
                    onChange={hadndleEmployeeChange}
                  >
                    {projects.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </div>
            </>
          ) : modalType === "Delete_Row" ? (
            <>
              <div className="container">
                <div className="main">
                  <h1>Are You Sure you want to delete ?</h1>
                </div>
                <div className="btns">
                  <Button variant="contained" color="red" fullWidth>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleClose()}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          ) : modalType === "Add Task" ? (
            <>
              <FormStepper
                steps={steps2}
                handleClose={handleClose}
                children={(activeStep, handleNext) => {
                  if (activeStep === 0) {
                    return (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Asset Number */}
                          <Grid item xs={12}>
                            <TextField
                              name="taskName"
                              label="Task name"
                              value={formData.taskName}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>

                          {/* Department Dropdown */}
                          <Grid item xs={12}>
                            <Autocomplete
                              multiple
                              options={names}
                              value={selectedOptions}
                              onChange={(event, newValue) =>
                                setSelectedOptions(newValue)
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Assignes"
                                  placeholder="Choose..."
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              label="Select Project"
                              name="project"
                              select
                              fullWidth
                              value={formData.project}
                              onChange={handleChange}
                            >
                              {projectTitles.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              name="description"
                              label="Tasks Description"
                              value={formData.description}
                              fullWidth
                              onChange={handleChange}
                              multiline
                              rows={4}
                            />
                          </Grid>

                          {/* Asset Type Dropdown */}
                          <Grid item xs={12}>
                            <TextField
                              label="Priority"
                              name="priority"
                              select
                              fullWidth
                              value={formData.priority}
                              onChange={handleChange}
                            >
                              {priorityType.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          {/* Due Date */}
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label=" Start Date"
                                // slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "-webkit-fill-available" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className="w-full md:w-1/4"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="End Date"
                                // slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "-webkit-fill-available" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className="w-full md:w-1/4"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          {/* Asset Name */}
                          <Grid item xs={12}>
                            <TextField
                              label="Status"
                              name="status"
                              select
                              fullWidth
                              value={formData.status}
                              onChange={handleChange}
                            >
                              {statusTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleNextStep(e, handleNext)}
                          >
                            Next
                          </Button>
                        </div>
                      </>
                    );
                  } else if (activeStep === 1) {
                    return (
                      <>
                        <h1>View Details</h1>
                        <div className="grid grid-cols-2 gap-7 mb-10 mt-5">
                          {/* Asset Number */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Task</h1>
                            <span>{formData.taskName || "N/A"}</span>
                          </div>

                          {/* Asset Type */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Project Name</h1>
                            <span>{formData.project || "N/A"}</span>
                          </div>

                          {/* Asset Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Priority</h1>
                            <span>{formData.priority || "N/A"}</span>
                          </div>

                          {/* Brand Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Status</h1>
                            <span>{formData.status || "N/A"}</span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddTasks(formData)}
                        >
                          Submit
                        </Button>
                      </>
                    );
                  }
                }}
              ></FormStepper>
            </>
          ) : modalType === "task2" ? (
            <>
              <FormStepper
                steps={steps2}
                handleClose={handleClose}
                children={(activeStep, handleNext) => {
                  if (activeStep === 0) {
                    return (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Asset Number */}
                          <Grid item xs={12}>
                            <TextField
                              name="taskName"
                              label="Task name"
                              value={insideAddTask.taskName}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>

                          {/* Department Dropdown */}
                          <Grid item xs={12}>
                            <Autocomplete
                              multiple
                              options={names}
                              value={selectedOptions}
                              onChange={(event, newValue) =>
                                setSelectedOptions(newValue)
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Assignes"
                                  placeholder="Choose..."
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              label="Project Name"
                              name="project"
                              fullWidth
                              value={projectTitle}
                              onChange={handleChange}
                            ></TextField>
                          </Grid>

                          {/* Asset Type Dropdown */}
                          <Grid item xs={12}>
                            <TextField
                              label="Priority"
                              name="priority"
                              select
                              fullWidth
                              value={insideAddTask.priority}
                              onChange={handleChange}
                            >
                              {/* {priorityType.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))} */}
                            </TextField>
                          </Grid>

                          {/* Due Date */}
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Date"
                                // slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "-webkit-fill-available" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className="w-full md:w-1/4"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          {/* Asset Name */}
                          <Grid item xs={12}>
                            <TextField
                              label="Status"
                              name="status"
                              select
                              fullWidth
                              value={insideAddTask.status}
                              onChange={handleChange}
                            >
                              {statusTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        </div>
                      </>
                    );
                  } else if (activeStep === 1) {
                    return (
                      <>
                        <h1>View Details</h1>
                      </>
                    );
                  }
                }}
              ></FormStepper>
            </>
          ) : modalType === "Add Project" ? (
            <>
              <FormStepper
                steps={steps}
                handleClose={handleClose}
                children={(activeStep, handleNext) => {
                  if (activeStep === 0) {
                    return (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Asset Number */}
                          <Grid item xs={12}>
                            <TextField
                              name="Title"
                              label="Project Name"
                              value={projectData.Title}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>

                          {/* Department */}
                          <Grid item xs={12}>
                            <TextField
                              label="Department"
                              name="Department"
                              select
                              fullWidth
                              value={projectData.Department}
                              onChange={handleChange}
                            >
                              {departments?.map((dept) => (
                                <MenuItem key={dept._id} value={dept.name}>
                                  {dept.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          {/* Description */}
                          <Grid item xs={12}>
                            <TextField
                              name="description"
                              label="Project Description"
                              value={projectData.description}
                              fullWidth
                              onChange={handleChange}
                              multiline
                              rows={4}
                            />
                          </Grid>

                          {/* Department Dropdown */}
                          <Grid item xs={12}>
                            <Autocomplete
                              multiple
                              options={names}
                              value={projectData.assignees}
                              onChange={(e, newValue) =>
                                setProjectData({
                                  ...projectData,
                                  assignees: [...new Set([...newValue])],
                                })
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Assignes"
                                  placeholder="Choose..."
                                />
                              )}
                            />
                          </Grid>

                          {/* Due date of task */}
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label=" Start Date"
                                value={
                                  projectData.startdate
                                    ? dayjs(projectData.startdate)
                                    : null
                                }
                                onChange={handleDateChange}
                                //
                                // slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "-webkit-fill-available" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className="w-full md:w-1/4"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="End Date"
                                value={
                                  projectData.enddate
                                    ? dayjs(projectData.enddate)
                                    : null
                                }
                                onChange={handleDate2change}
                                // slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "-webkit-fill-available" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className="w-full md:w-1/4"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          {/* Asset Type Dropdown */}
                          <Grid item xs={12}>
                            <TextField
                              label="Status"
                              name="status"
                              select
                              fullWidth
                              value={projectData.status}
                              onChange={handleChange}
                            >
                              {statusTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleNextStep(e, handleNext)}
                          >
                            Next
                          </Button>
                        </div>
                      </>
                    );
                  } else if (activeStep === 1) {
                    return (
                      <>
                        <h1>View Project Details</h1>
                        <div className="grid grid-cols-2 gap-7 mb-10 mt-5">
                          {/* Asset Number */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Project</h1>
                            <span>{projectData.Title || "N/A"}</span>
                          </div>

                          {/* Asset Type */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Department</h1>
                            <span>{projectData.Department || "N/A"}</span>
                          </div>

                          {/* Asset Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Description</h1>
                            <span>{projectData.description || "N/A"}</span>
                          </div>

                          {/* Assignees */}
                          <div className="flex justify-between py-2 border-b gap-5">
                            <h1 className="font-semibold">Assignees</h1>
                            <span>{projectData.assignees || "N/A"}</span>
                          </div>

                          {/* Brand Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Status</h1>
                            <span>{projectData.status || "N/A"}</span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={() => handleAddProject(projectData)}
                        >
                          Submit
                        </Button>
                      </>
                    );
                  }
                }}
              ></FormStepper>
            </>
          ) : EditValue ? (
            <>
              <FormStepper
                steps={editSteps}
                handleClose={handleClose}
                children={(activeStep, handleNext) => {
                  if (activeStep === 0) {
                    return (
                      <div className="grid grid-cols-1 gap-4 top-5">
                        {/* Asset Number */}
                        {/* <Grid item xs={12}>
                          <TextField
                            name="department"
                            label="Departments"
                            value={department}
                            onChange={(e) => SetDepartment(e.target.value)}
                            fullWidth
                          />
                        </Grid> */}
                        <Grid item xs={12}>
                          <TextField
                            label="Title"
                            name="Title"
                            value={Title}
                            fullWidth
                            onChange={(e) => SetTitle(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="descriptions"
                            name="description"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => SetDescription(e.target.value)}
                          ></TextField>
                        </Grid>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => handleNextStep(e, handleNext)}
                        >
                          Next
                        </Button>
                      </div>
                    );
                  } else if (activeStep === 1) {
                    return (
                      <>
                        <h1>View Project Details</h1>
                        <div className="grid grid-cols-2 gap-7 mb-10 mt-5">
                          {/* Asset Number */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Project</h1>
                            <span>{Title || "N/A"}</span>
                          </div>

                          {/* Asset Type */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Department</h1>
                            <span>{department || "N/A"}</span>
                          </div>

                          {/* Asset Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Description</h1>
                            <span>{description || "N/A"}</span>
                          </div>

                          {/* Assignees */}
                          <div className="flex justify-between py-2 border-b gap-5">
                            <h1 className="font-semibold">Assignees</h1>
                            <span>{projectData.assignees || "N/A"}</span>
                          </div>

                          {/* Brand Name */}
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Status</h1>
                            <span>{projectData.status || "N/A"}</span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          // onClick={() =>
                          //   handleEditProject({
                          //     title: Title,
                          //     description: description,
                          //     department: department,
                          //     assignees: projectData.assignees, // Include other fields if needed
                          //   })
                          // }
                          onClick={() => handleEditProject(projectData)}
                        >
                          Submit
                        </Button>
                      </>
                    );
                  }
                }}
              ></FormStepper>
            </>
          ) : location.pathname === "/tasks/teams" ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {/* Asset Number */}
                <Grid item xs={12}>
                  <TextField
                    name="Name"
                    label="Employee name"
                    value={membersData.Name}
                    fullWidth
                    onChange={hadndleEmployeeChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="Email"
                    label="Employee Email"
                    value={membersData.Email}
                    fullWidth
                    onChange={hadndleEmployeeChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="tasks"
                    name="Task"
                    select
                    fullWidth
                    value={membersData.Task}
                    onChange={hadndleEmployeeChange}
                  >
                    {statusTypes.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </div>
            </>
          ) : (
            <>
              <h2>Row Details</h2>
              {selectedRow && (
                <div>
                  <p>
                    <strong>ID:</strong> {selectedRow.id}
                  </p>
                  <p>
                    <strong>Task:</strong> {selectedRow.ticketTitle}
                  </p>
                  <p>
                    <strong>Assignee:</strong> {selectedRow.AssigneeNames}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {selectedRow.DueDate}
                  </p>
                  <p>
                    <strong>Priority:</strong> {selectedRow.priority}
                  </p>
                  <p>
                    <strong>Department:</strong> {selectedRow.department}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            {selectedRow && (
              <>
                <Button
                  onClick={navigateProject}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  view
                </Button>
              </>
            )}
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AssignTaskForm;
