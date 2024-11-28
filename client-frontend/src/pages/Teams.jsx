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
import AgTable from '../components/AgTable';
import { Stack, Avatar, TextField, Button } from "@mui/material";

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
          headerName: "Tasks",
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
          headerName: "Projects",
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
          Task: "2",
          Project: "1"
          
        },
        {
          id: 2,
          Name: "Aiwinraj",
          Email:"aiwin.wono@gmail.com",
          Role: "Frontend",
          Task: "3",
          Project: "4"
          
        },
        {
          id: 3,
          Name: "Allen Disousa",
          Email:"allen.wono@gmail.com",
          Role: "Frontend",
          Task: "4",
          Project: "2"
        },
        {
          id: 4,
          Name: "Sankalp Kalangutkar",
          Email:"sankalp.wono@gmail.com",
          Role: "Backend",
          Task: "4",
          Project: "1"
        },
        {
          id: 5,
          Name: "Anushri Bhagat",
          Email:"anushri.wono@gmail.com",
          Role: "Frontend",
          Task: "5",
          Project: "3"
        },
        {
          id: 6,
          Name: "Aron Pires",
          Email:"Aron@biznest.co.in",
          Role: "Frontend",
          Task: "7",
          Project: "2"
        },
        {
          id: 7,
          Name: "Narshiva Naik",
          Email:"Narshiva@biznest.co.in",
          Role: "Backend",
          Task: "8",
          Project: "1"
        },
        {
          id: 8,
          Name: "Amol kakade",
          Email:"amol@biznest.co.in",
          Role: "Frontend",
          Task: "10",
          Project: "2"
        },
        {
          id: 9,
          Name: "Anushri Bhagat",
          Email:"anushri.wono@gmail.com",
          Role: "Frontend",
          Task: "12",
          Project: "2"
        }
       
      ]);
      const filteredRows =
      searchTerm === ""
        ? allRows // show all rows if no department is selected
        : allRows?.filter((row) => row.Name.toLowerCase().includes(searchTerm?.toLowerCase()));

        

        const addTeamMembersbtn = ()=>{
            SetModalOpen(true);

        }

        const closeModal = () => SetModalOpen(false);

  return (
    <div className='flex min-h-screen'>
       
        <div className='w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        {/* <h2 className="text-2xl  ">Team Members</h2> */}
        {/* <div className="flex flex-wrap items-center justify-between "> */}
        <h2 className="text-2xl mb-4">Team Members</h2>

        <div className='bg-white p-2'>
        <div className="flex flex-wrap items-center justify-between mt-4 ">
    {/* Left Side: Search, Priority Dropdown, and Date Filter */}
   
    
      {/* Search Field */}
      
      <FormControl  style={{ minWidth: 220 }}>
      <TextField
              variant="outlined"
              size="small"
              label="Search Team Member"
              value={searchTerm
              }  
              onChange={(e) => setSearchTerm(e.target.value)}
      />
      </FormControl>
    {/* Right Side: Assign Task Button */}
    <button className="px-4 py-2 bg-[#0db4ea] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
     onClick={addTeamMembersbtn}>
     + Add Team Member
    </button>
    
    </div>
  
        <div className='mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md '>
        {/* <div className='mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md'> */}
  
        <AgTable
          data={filteredRows} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#fff", // Optional, background for the header
      color: "black",          // Text color
      fontWeight: "bold",
            // Make header bold
    },width: "75vw" }}
        />
   
{/* </div> */}
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