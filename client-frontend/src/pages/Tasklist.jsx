import React, { useState } from "react";
import AssignTaskForm from "../components/TaskManagement/AssignTaskForm";
import { NewModal } from "../components/NewModal";
import { useNavigate } from "react-router-dom";
import TasklistGrid from "../components/TaskManagement/TasklistGrid";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Avatar, TextField } from "@mui/material";

const Tasklist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, SetModalOpen] = useState(false);
  const [btnclicked, setbtnclicked] = useState("");
  const [Editvalue, SetEditValue] = useState(false);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [department, SetDepartment] = useState("");

  const [view, SetView] = useState("Grid View");

  const [projectData, setProjectData] = useState({
    projectName: "",
    category: "",
    Department: "",
    assignees: [],
    Title: "",
    description: "",
    date: "",
    status: "",
  });

  const [tasks, setTasks] = useState({
    ongoing: [
      {
        Title: "Website Redesign",
        Department: "IT",
        description:
          "To discuss about the details of the projects which is important",
        Assignees: ["John Doe", "Jane Smith", "Alex Johnson"],
      },
      {
        Title: "Launch a new digital marketing Campaign",
        Department: "Marketing",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Siya Amonkar", "Chaya Shinde", "Priya Dessai"],
      },
      {
        Title: "Market Expansion strategy for new Product line",
        Department: "Finance",
        description:
          "To entertain the peacefull understanding anf training for the ppeople around us.",
        Assignees: [
          "Vedashree Amonkar",
          "Jaya Sankwalkar",
          "Supriya Chaudhari",
          "Gajanan Madkaikar",
        ],
      },
    ],
    upcoming: [
      {
        Title: "Financial forcasting and Budgeting",
        Department: "Sales",
        description:
          "To discuss about the details of the projects which is important",
        Assignees: [
          "Saddhya Sawaikar",
          "Sankalp Kalangutkar",
          "Supriya Gaonkar",
          "Neha Tari",
        ],
      },
      {
        Title: "Bussiness Process optimizations and Automation",
        Department: "Operation",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Jayesh Redkar", "Geeta parab", "Ashita Parab"],
      },
      {
        Title: "Employee Onboarding and training programme",
        Department: "Human Resources and Training",
        description:
          "To entertain the peacefull understanding anf training for the ppeople around us",
      },
    ],
    pending: [
      {
        Title: "Annual Co-operate Conference and Networking Evets",
        Department: "Event Management",
        description: "Details about Task 7",
        Assignees: ["Omkar Amonkar", "Neha Parab", "Sugandha Naik"],
      },
      {
        Title: "Data Privacy And GDPR Compliance initiative",
        Department: "Compliance and Regulatory",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Govardhan Parab", "Dgymj Lodh", "Dold Peold"],
      },
      {
        Title: "Reducing Environmental impact and promoting Sustainability",
        Department: "Corporate Sustainability and Compliance",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Wosh sudj", "Sodpl Weodl", "Qweusi Seuild"],
      },
    ],
    completed: [
      {
        Title: "Annual Co-operate Conference and Networking Evets",
        Department: "Event Management",
        description: "Details about Task 7",
        Assignees: ["Riya Naik", "Parinda Raikar", "Amisha Naik"],
      },
      {
        Title: "Data Privacy And GDPR Compliance initiative",
        Department: "Compliance and Regulatory",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Mahima Naik", "Angela Vaz", "Urvi Palang"],
      },
      {
        Title: "Reducing Environmental impact and promoting Sustainability",
        Department: "Corporate Sustainability and Compliance",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignees: ["Rami Naik", "Krutika Ghadi", "Rajeshwari Maheshwari"],
      },
    ],
  });

  const navigate = useNavigate();

  // for Assignees

  const getInitials = (name) => {
    const words = name.split(" ");
    const firstInitial = words[0][0];
    const lastInitial = words[words.length - 1][0];
    return `${firstInitial}${lastInitial}`;
  };

  // Function to generate a unique color
  const generateColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
  };

  const handleClick = (title) => {
    navigate("/tasks/tasklisttable", { state: { taskTitle: title } });
  };

  const handleActionChange = () => {};

  const setEditModalOpen = (value, title, description, department) => {
    SetModalOpen(true);
    SetEditValue(true);
    SetDepartment(department);
    SetDescription(description);
    SetTitle(title);
    console.log("Opening MOdal of Edit");
  };

  const TaskCard = ({ Title, description, Department, Assignees = [] }) => (
    <div className="bg-gray-100 shadow-md bg-white rounded-lg p-3 mb-4">
      <div className="flex justify-between gap-5">
        <div>
          <p className="text-xs  py-2 px-2 bg-white rounded-full  my-2">
            {Department}
          </p>
        </div>
        <div className="flex items-center justify-center w-max p-0">
          <FormControl size="small">
            <Select
              value="" // Always forces the dropdown to display the SVG
              onChange={handleActionChange}
              displayEmpty
              disableUnderline
              IconComponent={() => null} // Removes the dropdown arrow
              sx={{
                "& .MuiSelect-select": {
                  padding: 0,
                  paddingRight: 0,
                  borderRadius: "0.375rem", // Tailwind rounded
                  backgroundColor: "transparent",
                },
                "& fieldset": {
                  border: "none", // Removes border in outlined variant
                },
              }}
            >
              <MenuItem value="" disabled>
                <svg
                  className="flex-none size-4 text-gray-600 dark:text-neutral-500 "
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={12} cy={5} r={1} />
                  <circle cx={12} cy={19} r={1} />
                </svg>
              </MenuItem>
              <MenuItem value="view" onClick={(value) => handleClick(Title)}>
                View Details
              </MenuItem>
              <MenuItem
                value="edit"
                onClick={(value, titlee, descriptions, department) =>
                  setEditModalOpen("Edit", title, description, department)
                }
              >
                Edit
              </MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <h4 className="text-sm font-semibold">{Title}</h4>
      <p className="text-gray-600 my-5 text-xs">{description}</p>
      <div>
        <p className="text-xs font-bold">Assignees</p>

        
            <Stack
              spacing={-1}
              direction="row"
              sx={{
                paddingTop: "5%",
                width: "100%",
              }}
            >
              {Assignees.map((assignee, index) => {
                const initials = getInitials(assignee);
                const backgroundColor = generateColor(assignee);

                return (
                  <Avatar
                    key={index}
                    sx={{
                      width: 10,
                      height: 10,
                      border: "1px solid white",
                      padding:2,
                      fontSize:15,
                      backgroundColor,
                    }}
                  >
                    {initials}
                  </Avatar>
                );
              })}
            </Stack>
          
      </div>
    </div>
  );

  const Column = ({ title, tasks, titleColor }) => (
    <div className="w-full lg:w-1/4 px-3">
      <h2 className={`text-xl font-bold ${titleColor} mb-4`}>{title}</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task}/>
        ))}
      </div>
    </div>
  );

  const AddProjectbtn = (title) => {
    SetModalOpen(true);
    setbtnclicked(title);
  };

  const closeModal = () => SetModalOpen(false);

  const filterTasks = (tasks) => {
    if (!searchTerm.trim()) return tasks; // No filtering if search term is empty
    return tasks.filter(
      (task) =>
        task.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.Department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto ">
        <h2 className="text-2xl  ">Projects</h2>
        <div className="flex flex-wrap items-center justify-between mt-5">
          <div>
            <TextField
              label="Select View"
              value={view}
              select
              size="large"
              onChange={(e) => SetView(e.target.value)}
            >
              {["Grid View", "Table View"].map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex flex-wrap gap-1 ">
            {/* Search Field */}

            <TextField
              label="Search"
              value={searchTerm}
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
          </div>

          {/* Right Side: Assign Task Button */}
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-[#0db4ea] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => AddProjectbtn("Add Task")}
            >
              + Add Tasks
            </button>

            <button
              className="px-4 py-2 bg-[#0db4ea] text-white font-semibold rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => AddProjectbtn("Add Project")}
            >
              + Add Projects
            </button>
          </div>
        </div>
        {view === "Grid View" ? (
          <>
            <div className=" mt-10">
              <div className="flex flex-wrap -mx-4">
                <Column
                  title="Upcoming"
                  tasks={filterTasks(tasks.upcoming)}
                  titleColor="text-blue-600"
                />
                <Column
                  title="Pending"
                  tasks={filterTasks(tasks.pending)}
                  titleColor="text-red-600"
                />
                <Column
                  title="Ongoing"
                  tasks={filterTasks(tasks.ongoing)}
                  titleColor="text-orange-600"
                />
                <Column
                  title="Completed"
                  tasks={filterTasks(tasks.completed)}
                  titleColor="text-green-600"
                ></Column>
              </div>
            </div>
          </>
        ) : (
          <TasklistGrid />
        )}
      </div>
      {modalOpen && (
        <NewModal open={modalOpen} onClose={closeModal}>
          <AssignTaskForm
            department={department}
            description={description}
            Title={title}
            EditValue={Editvalue}
            title={
              btnclicked === "Add Task"
                ? "Add Task"
                : Editvalue
                ? "Edit Field"
                : "Add Project"
            }
            handleClose={closeModal}
            modalType={btnclicked}
            projectData={projectData}
            setProjectData={setProjectData}
            setTasks={setTasks}
            tasks={tasks}
          />
        </NewModal>
      )}
    </div>
  );
};

export default Tasklist;
