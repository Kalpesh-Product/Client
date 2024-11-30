import React,{ useState} from 'react'

import AssignTaskForm from "./AssignTaskForm";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { alignProperty } from "@mui/material/styles/cssUtils";
import { NewModal } from "../../components/NewModal";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import AgTable from "../AgTable";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AvatarCellRenderer from "../AvatarCellRenderer";
import { px } from 'framer-motion';


const TasklistGrid = () => {
    const [allRows, setAllRows] = useState([
        {
          id: 1,
          ticketTitle: "Financial Forcasting And Budgeting",
          Assignees: [
            "https://i.pravatar.cc/150?img=1",
            "https://i.pravatar.cc/150?img=2",
            "https://i.pravatar.cc/150?img=3",
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
          Assignees: [
            "https://i.pravatar.cc/150?img=4",
            "https://i.pravatar.cc/150?img=5",
            "https://i.pravatar.cc/150?img=6",
          ],
          DueDate: "12th october 2024",
          priority: "Medium",
          department: "HR",
          status:"Ongoing",
          requestDate: "2024-10-03",
        },
        {
          id: 3,
          ticketTitle: "Website Redesign",
          Assignees: [
            "https://i.pravatar.cc/150?img=7",
            "https://i.pravatar.cc/150?img=8",
            "https://i.pravatar.cc/150?img=9",
          ],
          DueDate: "15th october 2024",
          priority: "High",
          department: "Tech",
          status: "Completed",
          requestDate: "2024-10-05",
        },
        {
          id: 4,
          ticketTitle: "Bussiness Process optimizations and Automations",
          Assignees: [
            "https://i.pravatar.cc/150?img=1",
            "https://i.pravatar.cc/150?img=2",
            "https://i.pravatar.cc/150?img=3",
          ],
          DueDate: "30th october 2024",
          priority: "Low",
          department: "Admin",
          status: "Pending",
          requestDate: "2024-10-06",
        },
        {
          id: 5,
          ticketTitle: "Data Privacy and GDPR Compliance Initiative",
          Assignees: [
            "https://i.pravatar.cc/150?img=1",
            "https://i.pravatar.cc/150?img=2",
            "https://i.pravatar.cc/150?img=3",
          ],
          DueDate: "2th November 2024",
          priority: "Medium",
          department: "HR",
          status: "Ongoing",
          requestDate: "2024-10-07",
        },
        {
          id: 6,
          ticketTitle: "Launch a New Digital Marketing Initiative ",
          Assignees: [
            "https://i.pravatar.cc/150?img=7",
            "https://i.pravatar.cc/150?img=8",
            "https://i.pravatar.cc/150?img=9",
          ],
          DueDate: "7th November 2024",
          priority: "High",
          department: "IT",
          status:"upcoming",
          requestDate: "2024-10-08",
        },
        {
          id: 7,
          ticketTitle: "Data Privacy And GDPR Compliance Initiative",
          Assignees: [
            "https://i.pravatar.cc/150?img=7",
            "https://i.pravatar.cc/150?img=8",
            "https://i.pravatar.cc/150?img=9",
          ],
          DueDate: "9th November 2024",
          priority: "Low",
          department: "Tech",
          status:"Ongoing",
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
          status:"Pending",
          requestDate: "2024-10-10",
        },
        {
          id: 9,
          ticketTitle: "Email Access Issue",
          Assignees: [
            "https://i.pravatar.cc/150?img=7",
            "https://i.pravatar.cc/150?img=8",
            "https://i.pravatar.cc/150?img=9",
          ],
          DueDate: "20th November 2024",
          priority: "Medium",
          department: "IT",
          status:"Ongoing",
          requestDate: "2024-10-11",
        },
      ]);
      // const [avatars, setAvatars]= useState(allRows.forEach((rows)=>{rows.Assignes}))
      // console.log(avatars)
    
      const columns = [
        { field: "id", headerName: "ID", width: "100%" },
        { field: "ticketTitle", headerName: "Projects", width:"100%" },
        {
          field: "Assignees",
          headerName: "Assignees",
          width: 200,
          type: "singleSelect",
          cellRenderer: (params) => (
            <Stack
              spacing={-1}
              direction="row"
              sx={{
                paddingTop: "5%", // Centers horizontally
                width: "100%",
              }}
            >
              {params.data.Assignees.map((assignee, index) => (
                <Avatar
                  key={index}
                  src={assignee}
                  sx={{ width: 30, height: 30, border: "1px solid white" }}
                />
              ))}
            </Stack>
          ),
        },
        { field: "DueDate", headerName: "Due Date", width: 200 },
        {
          field: "priority",
          headerName: "Priority",
          width: 130,
          type: "singleSelect",
          valueOptions: ["High", "Medium", "Low"],
    
          cellRenderer: (params) => {
            const statusColors = {
              High: "text-red-600 bg-red-100",
              Medium: "text-blue-600 bg-blue-100",
              Low: "text-yellow-600 bg-yellow-100",
            };
            const statusClass = statusColors[params.value] || "";
    
            return (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
              >
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
            field:"status" ,
            headerName: "Status",
            width: 150,
            type: "singleSelect",
           
        },
        {
          field: "viewDetails",
          headerName: "Actions",
          width: 150,
          cellRenderer: (params) => {
            const handleActionChange = (event) => {
              const selectedAction = event.target.value;
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
                  }}
                >
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
                      strokeLinejoin="round"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </MenuItem>
                  <MenuItem
                    value="view"
                    onClick={() => handleOpenModal(params.data)}
                  >
                    View Details
                  </MenuItem>
                  <MenuItem value="edit">Edit</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                </Select>
              </FormControl>
            );
          },
        },
      ];
    
      const paginationModel = { page: 0, pageSize: 5 };
      const [department, setDepartment] = React.useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [priorityFilter, setPriorityFilter] = useState("");
      const [modalOpen, SetModalOpen] = useState(false);
      const [departmentFilter, setDepartmentFilter] = useState("");
      const [selectedRow, SetselectedRow] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = (event) => {
        setDepartment(event.target.value);
      };
    
      // Filter rows based on selected department
      const filteredRows =
        department === ""
          ? allRows // show all rows if no department is selected
          : allRows.filter((row) => row.department === department);
    
      const filteredTasks = filteredRows.filter((task) => {
        const matchesSearch = task.ticketTitle
          .toLowerCase()
          .includes(searchTerm?.toLowerCase());
        const matchesPriority = priorityFilter
          ? task.priority === priorityFilter
          : true;
        const matchesDepartment = departmentFilter
          ? task.department === departmentFilter
          : true;
        return matchesPriority && matchesSearch && matchesDepartment;
      });
    
      const assignTaskbtnClick = () => {
        SetModalOpen(true);
      };
    
      const handleOpenModal = (row) => {
        SetselectedRow(row);
        SetModalOpen(true);
      };
    
      const closeModal = () => SetModalOpen(false);
    
      const navigateProjectList = () => {
        navigate("/tasks/tasklist");
      };
    
  return (
   <div >
         <div
            className="mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md "
            style={{ fontFamily: "Popins-Regular" }}
          >
            {/* <Paper sx={{ height: 400, width: "100%", alignItems:"center" , display:"flex", justifyContent:"center"}}> */}
            <AgTable
              data={filteredTasks}
              columns={columns}
              paginationPageSize={5}
            />
            {/* </Paper> */}
          </div>

          {modalOpen && (
        <NewModal open={modalOpen} onClose={closeModal}>
          <AssignTaskForm
            title="Add Task"
            handleClose={closeModal}
            rows={allRows}
            setAllRows={setAllRows}
            selectedRow={selectedRow}
          />
        </NewModal>
      )}

   </div>
  )
}

export default TasklistGrid