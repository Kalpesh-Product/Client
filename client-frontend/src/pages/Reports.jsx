import React from "react";
import Sidebar from "../components/ClientSidebar";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Reports = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className=" w-full">
        <h2 className="text-4xl pt-3 pl-3">Reports</h2>
        <h3 className="text-2xl pt-3 pb-1 pl-5">Departments</h3>

        {/* Tabs Custom Start*/}
        {/* <div className="bg-yellow-500">
          <ul className="flex">
            <li className="px-3">Finance</li>
            <li className="px-3">Admin</li>
            <li className="px-3">Sales</li>
            <li className="px-3">Tech</li>
            <li className="px-3">HR</li>
            <li className="px-3">IT</li>
            <li className="px-3">Maintenance</li>
          </ul>
        </div> */}
        {/* Tabs Custom End*/}

        {/* Tabs Material UI Start*/}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Departments">
              <Tab
                label="Finance"
                value="1"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Admin"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Sales"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Tech"
                value="4"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab label="HR" value="5" sx={{ textTransform: "capitalize" }} />
              <Tab label="IT" value="6" sx={{ textTransform: "capitalize" }} />
              <Tab
                label="Maintenance"
                value="7"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">Finance</TabPanel>
          <TabPanel value="2">Admin</TabPanel>
          <TabPanel value="3">Sales</TabPanel>
          <TabPanel value="4">Tech</TabPanel>
          <TabPanel value="5">HR</TabPanel>
          <TabPanel value="6">IT</TabPanel>
          <TabPanel value="7">Maintenance</TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default Reports;
