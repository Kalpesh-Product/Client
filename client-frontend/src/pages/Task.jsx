import React,{useState} from 'react'
import TestSide from '../components/Sidetest'
import TaskSidebar from '../components/TaskManagement/TaskSidebar';
import AssignTaskForm from '../components/TaskManagement/AssignTaskForm';

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { type } from 'jquery';
import ModuleSidebar from '../components/ModuleSidebar';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { NewModal } from '../components/NewModal';


const Task = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 70  },
        { field: "ticketTitle", headerName: "Tasks", width: 200 },
        { field: "Assignes", headerName: "Assignes", width: 200,
            type: "singleSelect",
            valueOptions: ["shreya","Aditi","Pallavi","Silva","Saloni","Jayesh","Pratap","Kamlesh","vaibhav"],
            
         },
         { field: "DueDate", headerName: "Due Date", width: 200 },
        {
          field: "priority",
          headerName: "Priority",
          width: 130,
          type: "singleSelect",
          valueOptions: ["High", "Medium", "Low"],
          cellClassName: (params) => {
            
            if (params.value === "High") return "bg-red-400 text-white px-4 py-1 rounded-full text-center";
            if (params.value === "Medium") return "bg-yellow-400 text-black px-4 py-1 rounded-full text-center";
            if (params.value === "Low") return "bg-green-400 text-white px-4 py-1 rounded-full text-center ";

            return "";
          },
          
        },
        {
          field: "department",
          headerName: "Department",
          width: 150,
          type: "singleSelect",
          valueOptions: ["IT", "HR", "Tech", "Admin"],
          
        },
        
      ];
    
      const allRows = [
        {
          id: 1,
          ticketTitle: "Website Bug",
          Assignes:"shreya",
          DueDate: "10th october 2024",
          priority: "High",
          department: "IT",
          requestDate: "2024-10-01",
        },
        {
          id: 2,
          ticketTitle: "Payroll Issue",
          Assignes:"Aditi",
          DueDate:"12th october 2024",
          priority: "Medium",
          department: "HR",
          requestDate: "2024-10-03",
        },
        {
          id: 3,
          ticketTitle: "Server Downtime",
          Assignes: "Pallavi",
          DueDate:"15th october 2024",
          priority: "High",
          department: "Tech",
          requestDate: "2024-10-05",
        },
        {
          id: 4,
          ticketTitle: "New Workstation Setup",
          Assignes: "Silva",
          DueDate:"30th october 2024",
          priority: "Low",
          department: "Admin",
          requestDate: "2024-10-06",
        },
        {
          id: 5,
          ticketTitle: "Employee Onboarding",
          Assignes:"Jayesh",
          DueDate:"2th November 2024",
          priority: "Medium",
          department: "HR",
          requestDate: "2024-10-07",
        },
        {
          id: 6,
          ticketTitle: "Network Issue",
          Assignes:"Pratab",
          DueDate:"7th November 2024",
          priority: "High",
          department: "IT",
          requestDate: "2024-10-08",
        },
        {
          id: 7,
          ticketTitle: "Software Installation",
          Assignes:"Kamlesh",
          DueDate:"9th November 2024",
          priority: "Low",
          department: "Tech",
          requestDate: "2024-10-09",
        },
        {
          id: 8,
          ticketTitle: "Office Supplies Request",
          Assignes:"Saloni, siya",
          DueDate:"10th November 2024",
          priority: "Low",
          department: "Admin",
          requestDate: "2024-10-10",
        },
        {
          id: 9,
          ticketTitle: "Email Access Issue",
          Assignes:"Divya",
          DueDate:"20th November 2024",
          priority: "Medium",
          department: "IT",
          requestDate: "2024-10-11",
        },
      ];
    
      const paginationModel = { page: 0, pageSize: 5 };
      const [department, setDepartment] = React.useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [priorityFilter, setPriorityFilter] = useState("");
      const [modalOpen,SetModalOpen] = useState(false);
    
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
          return matchesPriority && matchesSearch ;
          }

          );

          const assignTaskbtnClick =()=>{
            SetModalOpen(true);
          }

          const closeModal = () => SetModalOpen(false);
    
  return (
    <div className="flex min-h-screen">
        
        <div className='w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        <h2 className="text-4xl  ">Tasks</h2>
        <div className="grid grid-cols-4 gap-4">
    {/* Total Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center flex-col">
      <h3 className="text-xl font-semibold">Total Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-cyan-500 text-3xl'>20</div>
    </div>

    {/* Upcoming Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center flex-col">
      <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-purple-500 text-3xl'>10</div>
    </div>

    {/* Tasks in Progress */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center flex-col">
      <h3 className="text-xl font-semibold">Tasks in Progress</h3>
      <div className='items-center justify-center mt-5 font-bold text-orange-500 text-3xl'>15</div>
    </div>

    {/* Completed Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center flex-col">
      <h3 className="text-xl font-semibold">Completed Tasks</h3>
      <div className='items-center justify-center mt-5 font-bold text-green-500 text-3xl'>10</div>
    </div>
  </div>

  <div className="flex flex-wrap items-center justify-between mt-10">
    {/* Left Side: Search, Priority Dropdown, and Date Filter */}
    <div className="flex flex-wrap gap-4">
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Priority Dropdown */}
      <select
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
         

        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Date Filter */}
      <input
        type="date"
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Right Side: Assign Task Button */}
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    onClick={assignTaskbtnClick}>
     + Assign Task
    </button>
  </div>

  {/* Tabular section */}
  <div className='mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md'>
  <Paper sx={{ height: 400, width: "100%", alignItems:"center" , display:"flex", justifyContent:"center"}}>
        <DataGrid
          rows={filteredTasks} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          
          sx={{ "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#fff", // Optional, background for the header
      color: "black",          // Text color
      fontWeight: "bold",
            // Make header bold
    }, }}
        />
    </Paper>

</div>


        </div>
        
        
        {modalOpen &&
(<NewModal open={modalOpen} onClose={closeModal}>
  
      <AssignTaskForm title="Add Task" handleClose={closeModal}  />

    
  </NewModal>)}


    </div>
    
  )
}

export default Task