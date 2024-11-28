import React,{useState} from 'react'
import TestSide from '../components/Sidetest'
import TaskSidebar from '../components/TaskManagement/TaskSidebar';
import AssignTaskForm from '../components/TaskManagement/AssignTaskForm';

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { TextField } from '@mui/material';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ModuleSidebar from '../components/ModuleSidebar';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { NewModal } from '../components/NewModal';
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


import AgTable from "../components/AgTable";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AvatarCellRenderer from '../components/AvatarCellRenderer';




const Task = () => {

  const [allRows, setAllRows] = useState([
    {
      id: 1,
      ticketTitle: "Website Bug",
      Assignes: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
      ],
      AssigneeNames :[
        "Riya",
        "Piya",
        "Siya"
      ],
      DueDate: "10th october 2024",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Payroll Issue",
      Assignes: [
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=6",
      ],
      DueDate:"12th october 2024",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-03",
    },
    {
      id: 3,
      ticketTitle: "Server Downtime",
      Assignes: [
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
      ],
      DueDate:"15th october 2024",
      priority: "High",
      department: "Tech",
      requestDate: "2024-10-05",
    },
    {
      id: 4,
      ticketTitle: "New Workstation Setup",
      Assignes:[
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
      ], 
      DueDate:"30th october 2024",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-06",
    },
    {
      id: 5,
      ticketTitle: "Employee Onboarding",
      Assignes:[
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
      ],
      DueDate:"2th November 2024",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Network Issue",
      Assignes:[
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
      ],
      DueDate:"7th November 2024",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-08",
    },
    {
      id: 7,
      ticketTitle: "Software Installation",
      Assignes:[
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
      ],
      DueDate:"9th November 2024",
      priority: "Low",
      department: "Tech",
      requestDate: "2024-10-09",
    },
    {
      id: 8,
      ticketTitle: "Office Supplies Request",
      Assignes:[
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
      ],
      DueDate:"10th November 2024",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-10",
    },
    {
      id: 9,
      ticketTitle: "Email Access Issue",
      Assignes:[
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
      ],
      DueDate:"20th November 2024",
      priority: "Medium",
      department: "IT",
      requestDate: "2024-10-11",
    }
   
  ]);
  // const [avatars, setAvatars]= useState(allRows.forEach((rows)=>{rows.Assignes}))
  // console.log(avatars)



    const columns = [
        { field: "id", headerName: "ID", width: 70  },
        { field: "ticketTitle", headerName: "Projects", width: 200 },
        { field: "Assignes", headerName: "Assignes", width: 200,
            type: "singleSelect",
            cellRenderer: (params) => (
              <Stack spacing={-1} direction="row" sx={{
                paddingTop:"5%", // Centers horizontally
                width: "100%"
              }}>
                {params.data.Assignes.map((assignee, index) => (
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
                    <MenuItem value="view" onClick={()=>handleOpenModal(params.data)}>
                      View Details
                    </MenuItem>
                    <MenuItem value="edit" >
                      Edit
                    </MenuItem>
                    <MenuItem value="delete" >
                      Delete
                    </MenuItem>
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
      const [modalOpen,SetModalOpen] = useState(false);
      const [departmentFilter,setDepartmentFilter] = useState("");
      const [selectedRow,SetselectedRow] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = (event) => {
        setDepartment(event.target.value);
      };
    
      // Filter rows based on selected department
      const filteredRows =
        department === ""
          ? allRows // show all rows if no department is selected
          : allRows.filter((row) => row.department === department);

          const filteredTasks = filteredRows.filter((task) =>{
          const matchesSearch =  task.ticketTitle.toLowerCase().includes(searchTerm?.toLowerCase());
          const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
          const matchesDepartment = departmentFilter ? task.department === departmentFilter :true;
          return matchesPriority && matchesSearch  && matchesDepartment;
          }

          );

          const assignTaskbtnClick =()=>{
            SetModalOpen(true);
          }

          const handleOpenModal = (row)=>{
            SetselectedRow(row);
            SetModalOpen(true);
          }

          const closeModal = () => SetModalOpen(false);

          const navigateProjectList = ()=>{
            navigate('/tasks/tasklist');
            
          }
    
  return (
    <div className="flex min-h-screen">
        
        <div className='w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        <h2 className="text-2xl  ">Tasks</h2>
        <div className="grid grid-cols-4 gap-4 mt-5">
    {/* Total Tasks */}
    <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center flex-col cursor-pointer" onClick={navigateProjectList}>
      <h3 className="text-xl font-semibold" >Ongoing Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-cyan-500 text-3xl'>20</div>
    </div>

    {/* Upcoming Tasks */}
    <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center flex-col cursor-pointer" onClick={navigateProjectList}>
      <h3 className="text-xl font-semibold" >Upcoming Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-purple-500 text-3xl'>10</div>
    </div>

    {/* Tasks in Progress */}
    <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center flex-col cursor-pointer" onClick={navigateProjectList}>
      <h3 className="text-xl font-semibold" >Pending</h3>
      <div className='items-center justify-center mt-5 font-bold text-orange-500 text-3xl'>15</div>
    </div>

    {/* Completed Tasks */}
    <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center flex-col cursor-pointer" onClick={navigateProjectList}>
      <h3 className="text-xl font-semibold">Completed Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-green-500 text-3xl'>10</div>
    </div>
  </div>

  <div className="flex flex-wrap items-center justify-between mt-10 gap-4">
    {/* Left Side: Search, Priority Dropdown, and Date Filter */}
   
      {/* Search Field */}
     
       <FormControl  style={{ minWidth: 220 }}>
      <TextField
              variant="outlined"
              size="small"
              label="Search"
              value={searchTerm
              }
             
              onChange={(e) => setSearchTerm(e.target.value)}

      />
      </FormControl>

      {/* Priority Dropdown */}

        <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField label="Priority" variant="outlined" select size="small" onChange={(e) => setPriorityFilter(e.target.value)} >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
          </TextField>
        </FormControl>

      {/* Date Filter */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                
                slotProps={{ textField: { size: "small" } }}
                
                renderInput={(params) => (
                  <TextField {...params} className="w-full md:w-1/4" />
                )}
              />
             
            </LocalizationProvider>
      

      {/* Department Dropdown */}

      <FormControl size="small" style={{ minWidth: 220 }}>
          {/* <InputLabel>Filter by Asset Name</InputLabel> */}
          <TextField label="Department" variant="outlined" select size="small" onChange={(e) => setDepartmentFilter(e.target.value)}>
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="High">IT</MenuItem>
            <MenuItem value="Low">HR</MenuItem>
            <MenuItem value="Medium">TECH</MenuItem>
            <MenuItem value="Medium">ADMIN</MenuItem>
          </TextField>
      </FormControl>
    </div>

  

  {/* Tabular section */}
  <div className='mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md font-semibold' style={{fontFamily:"Popins-Regular"}}>
  {/* <Paper sx={{ height: 400, width: "100%", alignItems:"center" , display:"flex", justifyContent:"center"}}> */}
  <AgTable
      data={filteredTasks}
      columns={columns}
      paginationPageSize={5}
     
    />
    {/* </Paper> */}

</div>
        </div>
        
        
        {modalOpen &&
(<NewModal open={modalOpen} onClose={closeModal}>
    <AssignTaskForm title="Add Task" handleClose={closeModal} rows={allRows} setAllRows={setAllRows} selectedRow={selectedRow} /> 
  </NewModal>)}


    </div>
    
  )
}

export default Task