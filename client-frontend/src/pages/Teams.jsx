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
import ModuleSidebar from '../components/ModuleSidebar';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { NewModal } from '../components/NewModal';

const Teams = () => {

    const paginationModel = { page: 0, pageSize: 5 };
    const [department, setDepartment] = React.useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [modalOpen,SetModalOpen] = useState(false);
  

    const columns = [
        { field: "id", headerName: "ID", width: 70  },
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Email", headerName: "Email", width: 200,
            type: "singleSelect",
            valueOptions: ["shreya","Aditi","Pallavi","Silva","Saloni","Jayesh","Pratap","Kamlesh","vaibhav"],
            
         },
         { field: "Role", headerName: "Role", width: 200 },
        {
          field: "Task",
          headerName: "Task",
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
          field: "Project",
          headerName: "Project",
          width: 150,
          type: "singleSelect",
          valueOptions: ["IT", "HR", "Tech", "Admin"],
          
        },
        
      ];

      const [allRows, setAllRows] = useState([
        {
          id: 1,
          Name: "Anushri Bhagat",
          Email:"anushri.wono@gmail.com",
          Role: "Backend",
          Task: "3d Globe",
          Project: "wono frontend"
          
        },
        {
          id: 2,
          Name: "Aiwinraj",
          Email:"aiwin.wono@gmail.com",
          Role: "Frontend",
          Task: "Hordings",
          Project: "wono frontend"
          
        },
        {
          id: 3,
          Name: "Allen Disousa",
          Email:"allen.wono@gmail.com",
          Role: "Frontend",
          Task: "Data entry form",
          Project: "wono frontend"
        },
        {
          id: 4,
          Name: "Sankalp Kalangutkar",
          Email:"sankalp.wono@gmail.com",
          Role: "Backend",
          Task: "data fetching from database",
          Project: "wono frontend"
        },
        {
          id: 5,
          Name: "Anushri Bhagat",
          Email:"anushri.wono@gmail.com",
          Role: "Frontend",
          Task: "3d Globe",
          Project: "wono frontend"
        },
        {
          id: 6,
          Name: "Aron Pires",
          Email:"Aron@biznest.co.in",
          Role: "Frontend",
          Task: "3d Globe",
          Project: "wono frontend"
        },
        {
          id: 7,
          Name: "Narshiva Naik",
          Email:"Narshiva@biznest.co.in",
          Role: "Backend",
          Task: "3d Globe",
          Project: "wono frontend"
        },
        {
          id: 8,
          Name: "Amol kakade",
          Email:"amol@biznest.co.in",
          Role: "Frontend",
          Task: "3d Globe",
          Project: "wono frontend"
        },
        {
          id: 9,
          Name: "Anushri Bhagat",
          Email:"anushri.wono@gmail.com",
          Role: "Frontend",
          Task: "3d Globe",
          Project: "wono frontend"
        }
       
      ]);
      const filteredRows =
      searchTerm === ""
        ? allRows // show all rows if no department is selected
        : allRows.filter((row) => row.Name === searchTerm);

        const filteredTasks = filteredRows.filter((task) =>{
        const matchesSearch =  task.Name.toLowerCase().includes(searchTerm?.toLowerCase());
        const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
        return matchesPriority && matchesSearch ;
        }

        );

        const addTeamMembersbtn = ()=>{
            SetModalOpen(true);

        }

        const closeModal = () => SetModalOpen(false);

  return (
    <div className='flex min-h-screen'>
        <TestSide />
        <ModuleSidebar />
        <div className='w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        {/* <h2 className="text-2xl  ">Team Members</h2> */}
        <div className="flex flex-wrap items-center justify-between ">
        <h2 className="text-2xl  ">Team Members</h2>
    {/* Left Side: Search, Priority Dropdown, and Date Filter */}
    <div className="flex flex-wrap gap-1">
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

     
    </div>

    {/* Right Side: Assign Task Button */}
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
     onClick={addTeamMembersbtn}>
     + Add Team Member
    </button>
  </div>
        <div className='w-full motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        <div className='mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md'>
  <Paper sx={{ height: 400, width: "100%", alignItems:"center" , display:"flex", justifyContent:"center"}}>
        <DataGrid
          rows={filteredTasks} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          
          
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
        </div>

        {modalOpen &&
(<NewModal open={modalOpen} onClose={closeModal}>
  
      <AssignTaskForm title="Add Team Members" handleClose={closeModal} rows={allRows} setAllRows={setAllRows} /> 
  </NewModal>)}

    </div>
  )
}

export default Teams