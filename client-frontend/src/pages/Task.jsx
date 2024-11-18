import React from 'react'
import TestSide from '../components/Sidetest'
import TaskSidebar from '../components/TaskManagement/TaskSidebar'

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { type } from 'jquery';
import ModuleSidebar from '../components/ModuleSidebar';


const Task = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "ticketTitle", headerName: "Tasks", width: 200 },
        { field: "Assignes", headerName: "Assignes", width: 200,
            type: "singleSelect",
            valueOptions: ["shreya","Aditi","Pallavi","Silva","Saloni","Jayesh","Pratap","Kamlesh","vaibhav"],
         },
        {
          field: "priority",
          headerName: "Priority",
          width: 130,
          type: "singleSelect",
          valueOptions: ["High", "Medium", "Low"],
        },
        {
          field: "department",
          headerName: "Department",
          width: 150,
          type: "singleSelect",
          valueOptions: ["IT", "HR", "Tech", "Admin"],
        },
        { field: "requestDate", headerName: "Request Date", width: 160 },
      ];
    
      const allRows = [
        {
          id: 1,
          ticketTitle: "Website Bug",
          Assignes:"shreya",
          priority: "High",
          department: "IT",
          requestDate: "2024-10-01",
        },
        {
          id: 2,
          ticketTitle: "Payroll Issue",
          priority: "Medium",
          department: "HR",
          requestDate: "2024-10-03",
        },
        {
          id: 3,
          ticketTitle: "Server Downtime",
          priority: "High",
          department: "Tech",
          requestDate: "2024-10-05",
        },
        {
          id: 4,
          ticketTitle: "New Workstation Setup",
          priority: "Low",
          department: "Admin",
          requestDate: "2024-10-06",
        },
        {
          id: 5,
          ticketTitle: "Employee Onboarding",
          priority: "Medium",
          department: "HR",
          requestDate: "2024-10-07",
        },
        {
          id: 6,
          ticketTitle: "Network Issue",
          priority: "High",
          department: "IT",
          requestDate: "2024-10-08",
        },
        {
          id: 7,
          ticketTitle: "Software Installation",
          priority: "Low",
          department: "Tech",
          requestDate: "2024-10-09",
        },
        {
          id: 8,
          ticketTitle: "Office Supplies Request",
          priority: "Low",
          department: "Admin",
          requestDate: "2024-10-10",
        },
        {
          id: 9,
          ticketTitle: "Email Access Issue",
          priority: "Medium",
          department: "IT",
          requestDate: "2024-10-11",
        },
      ];
    
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
    
  return (
    <div className="flex min-h-screen">
        <TestSide/>
        {/* <TaskSidebar /> */}
        <ModuleSidebar />
        <div className='w-full p-6 motion-preset-blur-right-md'>
        <h2 className="text-4xl  ">Tasks</h2>
        <div className="grid grid-cols-4 gap-4">
    {/* Total Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center">
      <h3 className="text-xl font-semibold">Total Tasks</h3>
    </div>

    {/* Upcoming Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center">
      <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
    </div>

    {/* Tasks in Progress */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center">
      <h3 className="text-xl font-semibold">Tasks in Progress</h3>
    </div>

    {/* Completed Tasks */}
    <div className="bg-gray-100 p-4 shadow-md rounded-lg flex items-center justify-center">
      <h3 className="text-xl font-semibold">Completed Tasks</h3>
    </div>
  </div>

  {/* Tabular section */}
  <div className='mt-20'>
  <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows} // Pass filtered rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
    </Paper>

</div>


        </div>


    </div>
  )
}

export default Task