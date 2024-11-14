import React, { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "../../Datatable";
// import MyTicketsTable from "./MyTicketsTable";
// import TicketsAssignedToMeTable from "./TicketsAssignedToMeTable";
import MyTasksTable from "./MyTasksTable";

const TaskReportsSection = () => {
  // For Departments
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <span className="text-2xl">Task Reports</span>&nbsp;&nbsp;
        {/* <button>View Service</button> */}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-3 rounded-full">
          View Service
        </button>
      </div>
      {/* <div>Tabs For Tickets</div> */}

      {/* Tabs Material UI Start*/}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Departments">
            <Tab
              label="My Tasks"
              value="1"
              className="wono-blue"
              sx={{ textTransform: "capitalize" }}
            />
            <Tab
              label="Tasks Assigned To Me"
              value="2"
              sx={{ textTransform: "capitalize" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="flex gap-4">
            <div>My Tasks</div>
          </div>
          <br />

          <MyTasksTable />
        </TabPanel>

        <TabPanel value="2">
          <div className="flex gap-4">
            <div>Tasks Assigned To Me</div>
          </div>
          <br />
          <MyTasksTable />
        </TabPanel>
      </TabContext>
      {/* Tabs Material UI End*/}
    </div>
  );
};

export default TaskReportsSection;
