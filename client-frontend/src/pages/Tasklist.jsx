import React, { useState, useEffect } from "react";
import AssignTaskForm from "../components/TaskManagement/AssignTaskForm";
import { NewModal } from "../components/NewModal";
import { useNavigate } from "react-router-dom";
import TasklistGrid from "../components/TaskManagement/TasklistGrid";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Avatar, TextField } from "@mui/material";
import axios from "axios";

const Tasklist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, SetModalOpen] = useState(false);
  const [btnclicked, setbtnclicked] = useState("");
  const [Editvalue, SetEditValue] = useState(false);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [department, SetDepartment] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [projects, setProjects] = useState([]);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [allRows, setAllRows] = useState([
    {
      id: 1,
      ticketTitle: "Financial Forcasting And Budgeting",
      Assignees: [
        "Saddhya Sawaikar",
        "Sankalp Kalangutkar",
        "Supriya Gaonkar",
        "Neha Tari",
      ],
      AssigneeNames: ["Riya", "Piya", "Siya"],
      DueDate: "10th october 2024",
      priority: "High",
      department: "IT",
      status: "Upcoming",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Annual Co-orporate Network And Networking Events",
      Assignees: ["Riya Naik", "Parinda Raikar", "Amisha Naik"],
      DueDate: "12th october 2024",
      priority: "Medium",
      department: "HR",
      status: "Ongoing",
      requestDate: "2024-10-03",
    },
    {
      id: 3,
      ticketTitle: "Website Redesign",
      Assignees: ["John Doe", "Jane Smith", "Alex Johnson"],
      DueDate: "15th october 2024",
      priority: "High",
      department: "Tech",
      status: "Completed",
      requestDate: "2024-10-05",
    },
    {
      id: 4,
      ticketTitle: "Bussiness Process optimizations and Automations",
      Assignees: ["Jayesh Redkar", "Geeta parab", "Ashita Parab"],
      DueDate: "30th october 2024",
      priority: "Low",
      department: "Admin",
      status: "Pending",
      requestDate: "2024-10-06",
    },
    {
      id: 5,
      ticketTitle: "Data Privacy and GDPR Compliance Initiative",
      Assignees: ["Govardhan Parab", "Dgymj Lodh", "Dold Peold"],
      DueDate: "2th November 2024",
      priority: "Medium",
      department: "HR",
      status: "Ongoing",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Launch a New Digital Marketing Initiative ",
      Assignees: ["Siya Amonkar", "Chaya Shinde", "Priya Dessai"],
      DueDate: "7th November 2024",
      priority: "High",
      department: "IT",
      status: "upcoming",
      requestDate: "2024-10-08",
    },
    {
      id: 7,
      ticketTitle: "Data Privacy And GDPR Compliance Initiative",
      Assignees: ["Mahima Naik", "Angela Vaz", "Urvi Palang"],
      DueDate: "9th November 2024",
      priority: "Low",
      department: "Tech",
      status: "Ongoing",
      requestDate: "2024-10-09",
    },
    {
      id: 8,
      ticketTitle: "",
      Assignees: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
      ],
      DueDate: "10th November 2024",
      priority: "Low",
      department: "Admin",
      status: "Pending",
      requestDate: "2024-10-10",
    },
    {
      id: 9,
      ticketTitle: "Email Access Issue",
      Assignees: ["Rami Naik", "Krutika Ghadi", "Rajeshwari Maheshwari"],
      DueDate: "20th November 2024",
      priority: "Medium",
      department: "IT",
      status: "Ongoing",
      requestDate: "2024-10-11",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjects();

        setProjects(data || []);
        const groupedTasks = {
          ongoing: [],
          upcoming: [],
          pending: [],
          completed: [],
        };

        projects?.forEach((project) => {
          switch (project?.status.toLowerCase()) {
            case "ongoing":
              groupedTasks.ongoing.push(project);
              break;
            case "upcoming":
              groupedTasks.upcoming.push(project);
              break;
            case "pending":
              groupedTasks.pending.push(project);
              break;
            case "completed":
              groupedTasks.completed.push(project);
              break;
            default:
              console.warn(`Unknown status: ${project.status}`);
          }
        });

        setTasks(groupedTasks);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } // Populate projects state with the fetched data
    };

    fetchData(); // Call the async function
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "/api/tasks/get-projects"
      );
      console.log("Projects:", response.data.projects);
      return response.data.projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };

  const [view, SetView] = useState("Grid View");

  const [projectData, setProjectData] = useState({
    Department: "",
    assignees: [],
    Title: "",
    description: "",
    startdate: null,
    enddate: null,
    status: "",
  });

  const [tasks, setTasks] = useState({
    ongoing: [],
    Upcoming: [],
    pending: [],
    completed: [],
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
    console.log(title);
    console.log(description);
    console.log(department);

    console.log("Opening MOdal of Edit");
  };

  const TaskCard = ({
    projectName,
    description,
    Department,
    Assignees = [],
  }) => (
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
              <MenuItem
                value="view"
                onClick={(value) => handleClick(projectName)}
              >
                View Details
              </MenuItem>
              <MenuItem
                value="edit"
                onClick={(value, value1, value2, value3, value4) =>
                  setEditModalOpen(
                    value,
                    projectName,
                    description,
                    Department,
                    Assignees
                  )
                }
              >
                Edit
              </MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <h4 className="text-sm font-semibold">{projectName}</h4>
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
                  padding: 2,
                  fontSize: 15,
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
        {tasks?.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );

  const AddProjectbtn = (title) => {
    SetModalOpen(true);
    setbtnclicked(title);
  };

  const closeModal = () => SetModalOpen(false);

  const filteredRows =
    department === ""
      ? allRows // show all rows if no department is selected
      : allRows.filter((row) => row.department === department);

  const filterTasks = (tasks) => {
    if (view === "Grid View") {
      if (!searchTerm.trim()) return tasks; // No filtering if search term is empty
      return tasks.filter(
        (task) =>
          task.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.Department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return filteredRows;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full py-4 motion-preset-blur-right-md ">
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
          <TasklistGrid
            allRows={allRows}
            setAllRows={setAllRows}
            filterTasks={filterTasks}
            filteredRows={filteredRows}
          />
        )}
      </div>
      {modalOpen && (
        <NewModal open={modalOpen} onClose={closeModal}>
          <AssignTaskForm
            department={department}
            description={description}
            SetTitle={SetTitle}
            SetDepartment={SetDepartment}
            SetDescription={SetDescription}
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
