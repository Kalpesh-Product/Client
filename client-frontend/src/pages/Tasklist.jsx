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
  const [Editvalue,SetEditValue] = useState(false);
  const [title,SetTitle] = useState("");
  const [description,SetDescription] = useState("");
  const [department,SetDepartment] = useState("");
  
  const [view,SetView] = useState("Grid View");

  const [projectData, setProjectData] = useState({
    projectName: "",
    category: "",
    Department: "",
    assignees: [],
    Title: "",
    description: "",
    date: "",
    status:""
  });

  const [tasks, setTasks] = useState({
    ongoing: [
      {
        Title: "Website Redesign",
        Department: "IT",
        description:
          "To discuss about the details of the projects which is important",
        Assignes: [
          "https://i.pravatar.cc/150?img=1",
          "https://i.pravatar.cc/150?img=2",
          "https://i.pravatar.cc/150?img=3",
        ],
      },
      {
        Title: "Launch a new digital marketing Campaign",
        Department: "Marketing",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=4",
          "https://i.pravatar.cc/150?img=5",
          "https://i.pravatar.cc/150?img=6",
        ],
      },
      {
        Title: "Market Expansion strategy for new Product line",
        Department: "Finance",
        description:
          "To entertain the peacefull understanding anf training for the ppeople around us.",
        Assignes: [
          "https://i.pravatar.cc/150?img=7",
          "https://i.pravatar.cc/150?img=8",
          "https://i.pravatar.cc/150?img=9",
        ],
      },
    ],
    upcoming: [
      {
        Title: "Financial forcasting and Budgeting",
        Department: "Sales",
        description:
          "To discuss about the details of the projects which is important",
        Assignes: [
          "https://i.pravatar.cc/150?img=7",
          "https://i.pravatar.cc/150?img=8",
          "https://i.pravatar.cc/150?img=9",
        ],
      },
      {
        Title: "Bussiness Process optimizations and Automation",
        Department: "Operation",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=1",
          "https://i.pravatar.cc/150?img=2",
          "https://i.pravatar.cc/150?img=3",
        ],
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
        Assignes: [
          "https://i.pravatar.cc/150?img=1",
          "https://i.pravatar.cc/150?img=2",
          "https://i.pravatar.cc/150?img=3",
        ],
      },
      {
        Title: "Data Privacy And GDPR Compliance initiative",
        Department: "Compliance and Regulatory",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=7",
          "https://i.pravatar.cc/150?img=8",
          "https://i.pravatar.cc/150?img=9",
        ],
      },
      {
        Title: "Reducing Environmental impact and promoting Sustainability",
        Department: "Corporate Sustainability and Compliance",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=7",
          "https://i.pravatar.cc/150?img=8",
          "https://i.pravatar.cc/150?img=9",
        ],
      },
    ],
    completed: [
      {
        Title: "Annual Co-operate Conference and Networking Evets",
        Department: "Event Management",
        description: "Details about Task 7",
        Assignes: [
          "https://i.pravatar.cc/150?img=1",
          "https://i.pravatar.cc/150?img=2",
          "https://i.pravatar.cc/150?img=3",
        ],
      },
      {
        Title: "Data Privacy And GDPR Compliance initiative",
        Department: "Compliance and Regulatory",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=7",
          "https://i.pravatar.cc/150?img=8",
          "https://i.pravatar.cc/150?img=9",
        ],
      },
      {
        Title: "Reducing Environmental impact and promoting Sustainability",
        Department: "Corporate Sustainability and Compliance",
        description:
          "To enhance the productivity and the materials of the projects which is very much effetives.",
        Assignes: [
          "https://i.pravatar.cc/150?img=1",
          "https://i.pravatar.cc/150?img=2",
          "https://i.pravatar.cc/150?img=3",
        ],
      },
    ],
  });

  const navigate = useNavigate();

  const handleClick = (title) => {
    navigate("/tasks/tasklisttable", { state: { taskTitle: title } });
  };



  const handleActionChange = () => {};

  // const tasks = {
  //   ongoing: [
  //     {
  //       title: "Website Redesign",
  //       department: "IT",
  //       description:
  //         "To discuss about the details of the projects which is important",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=1",
  //         "https://i.pravatar.cc/150?img=2",
  //         "https://i.pravatar.cc/150?img=3",
  //       ],
  //     },
  //     {
  //       title: "Launch a new digital marketing Campaign",
  //       department: "Marketing",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=4",
  //         "https://i.pravatar.cc/150?img=5",
  //         "https://i.pravatar.cc/150?img=6",
  //       ],
  //     },
  //     {
  //       title: "Market Expansion strategy for new Product line",
  //       department: "Finance",
  //       description:
  //         "To entertain the peacefull understanding anf training for the ppeople around us.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=7",
  //         "https://i.pravatar.cc/150?img=8",
  //         "https://i.pravatar.cc/150?img=9",
  //       ],
  //     },
  //   ],
  //   upcoming: [
  //     {
  //       title: "Financial forcasting and Budgeting",
  //       department: "Sales",
  //       description:
  //         "To discuss about the details of the projects which is important",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=7",
  //         "https://i.pravatar.cc/150?img=8",
  //         "https://i.pravatar.cc/150?img=9",
  //       ],
  //     },
  //     {
  //       title: "Bussiness Process optimizations and Automation",
  //       department: "Operation",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=1",
  //         "https://i.pravatar.cc/150?img=2",
  //         "https://i.pravatar.cc/150?img=3",
  //       ],
  //     },
  //     {
  //       title: "Employee Onboarding and training programme",
  //       department: "Human Resources and Training",
  //       description:
  //         "To entertain the peacefull understanding anf training for the ppeople around us",
  //     },
  //   ],
  //   pending: [
  //     {
  //       title: "Annual Co-operate Conference and Networking Evets",
  //       department: "Event Management",
  //       description: "Details about Task 7",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=1",
  //         "https://i.pravatar.cc/150?img=2",
  //         "https://i.pravatar.cc/150?img=3",
  //       ],
  //     },
  //     {
  //       title: "Data Privacy And GDPR Compliance initiative",
  //       department: "Compliance and Regulatory",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=7",
  //         "https://i.pravatar.cc/150?img=8",
  //         "https://i.pravatar.cc/150?img=9",
  //       ],
  //     },
  //     {
  //       title: "Reducing Environmental impact and promoting Sustainability",
  //       department: "Corporate Sustainability and Compliance",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=7",
  //         "https://i.pravatar.cc/150?img=8",
  //         "https://i.pravatar.cc/150?img=9",
  //       ],
  //     },
  //   ],
  //   completed: [
  //     {
  //       title: "Annual Co-operate Conference and Networking Evets",
  //       department: "Event Management",
  //       description: "Details about Task 7",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=1",
  //         "https://i.pravatar.cc/150?img=2",
  //         "https://i.pravatar.cc/150?img=3",
  //       ],
  //     },
  //     {
  //       title: "Data Privacy And GDPR Compliance initiative",
  //       department: "Compliance and Regulatory",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=7",
  //         "https://i.pravatar.cc/150?img=8",
  //         "https://i.pravatar.cc/150?img=9",
  //       ],
  //     },
  //     {
  //       title: "Reducing Environmental impact and promoting Sustainability",
  //       department: "Corporate Sustainability and Compliance",
  //       description:
  //         "To enhance the productivity and the materials of the projects which is very much effetives.",
  //       Assignes: [
  //         "https://i.pravatar.cc/150?img=1",
  //         "https://i.pravatar.cc/150?img=2",
  //         "https://i.pravatar.cc/150?img=3",
  //       ],
  //     },
  //   ],
  // };

  const setEditModalOpen =(value,title,description,department)=>{
    SetModalOpen(true);
    SetEditValue(true);
    SetDepartment(department);
    SetDescription(description);
    SetTitle(title);
    console.log("Opening MOdal of Edit");
  }

  const TaskCard = ({ Title, Description, Department, Assignes = [] }) => (
    <div
      className="bg-gray-100 shadow-md bg-white rounded-lg p-3 mb-4"
      
    >
      <div className="flex justify-between gap-5">
        <div>
          <p className="text-xs  py-2 px-2 bg-white rounded-full  my-2">
            {department}
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
              <MenuItem value="view" onClick={(value) => handleClick(title)}>View Details</MenuItem>
              <MenuItem value="edit" onClick={(value,titlee,descriptions,department)=>setEditModalOpen("Edit",title,description,department)}>Edit</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <h4 className="text-sm font-semibold">{Title}</h4>
      <p className="text-gray-600 my-5 text-xs">{Description}</p>
      <div>
        <p className="text-xs font-bold">Assignees</p>
        <Stack
          spacing={-1}
          direction="row"
          sx={{
            paddingTop: "5%", // Centers horizontally
            // Centers vertically
            width: "100%",
            // Ensures it takes the full width of the cell
          }}
        >
          {Assignes.map((src, index) => (
            <Avatar
              key={index} // Use a unique key for each Avatar component
              src={src}
              sx={{
                width: 30,
                height: 30,
                border: "1px solid white",
              }}
            />
          ))}
        </Stack>
      </div>
    </div>
  );

 

  const Column = ({ title, tasks, titleColor }) => (
    <div className="w-full lg:w-1/4 px-3">
      <h2 className={`text-xl font-bold ${titleColor} mb-4`}>{title}</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
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

  //     const filteredRows =
  // searchTerm === ""
  //   ? allRows // show all rows if no department is selected
  //   : allRows?.filter((row) => row.Name.toLowerCase().includes(searchTerm?.toLowerCase()));

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto ">
        <h2 className="text-2xl  ">Projects</h2>
        <div className="flex flex-wrap items-center justify-between mt-5">
          {/* Left Side: Search, Priority Dropdown, and Date Filter */}


        {/* Grid View and Table View dropdown */}
          <div>
          <TextField
                    label="Select View"
                    value={view}
                    select
                    size="large"
                    onChange={(e) => SetView(e.target.value)}
                  >
                    {["Grid View","Table View"].map((type, index) => (
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
{view === "Grid View" ? (<>
  <div className=" mt-10">
          <div className="flex flex-wrap -mx-4">
            <Column
              title="Upcoming"
              tasks={tasks.upcoming}
              titleColor="text-blue-600"
            />
            <Column
              title="Pending"
              tasks={tasks.pending}
              titleColor="text-red-600"
            />
            <Column
              title="Ongoing"
              tasks={tasks.ongoing}
              titleColor="text-orange-600"
            />
            <Column
              title="Completed"
              tasks={tasks.completed}
              titleColor="text-green-600"
            ></Column>
          </div>
        </div>
</>):
(<TasklistGrid/>)}
       
      </div>
      {modalOpen && (
        <NewModal open={modalOpen} onClose={closeModal}>
          <AssignTaskForm
            department={department}
            description={description}
            Title={title}
            EditValue={Editvalue}
            title={btnclicked === "Add Task" ? "Add Task" : Editvalue ? "Edit Field" : "Add Project"}
            handleClose={closeModal}
            modalType={btnclicked}
            projectData ={projectData}
            setProjectData={setProjectData}
            setTasks = {setTasks}
            tasks={tasks}
          />
        </NewModal>
      )}
    </div>
  );
};

export default Tasklist;
