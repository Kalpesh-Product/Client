import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TestSide from "../components/Sidetest";
import DataTable from "../components/Datatable";

const Reports = () => {
  // For Top Bar
  // const [topBarValue, setTopBarValue] = React.useState("myTickets");

  // const handleTopBarChange = (e, newVal) => {
  //   setTopBarValue(newVal);
  // };

  // For Departments
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex min-h-screen">
      <TestSide />
      <div className=" w-full">
        <h2 className="text-4xl pt-3 pl-3">Reports</h2>
        <h3 className="text-2xl pt-5 pb-4 pl-5">My Reports</h3>

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

        {/* Tabs Departments Start */}
        {/* <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTopBarChange} aria-label="Top Tab">
              <Tab
                label="My Tickets"
                value="myTickets"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Departments"
                value="departments"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="myTickets">My Tickets</TabPanel>
          <TabPanel value="departments">Departments</TabPanel>
        </TabContext> */}
        {/* Tabs Departments End */}

        {/* Tabs Material UI Start*/}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Departments">
              <Tab
                label="Tasks"
                value="1"
                className="wono-blue"
                sx={{ textTransform: "capitalize" }}
                // sx={{
                //   textTransform: "capitalize",
                //   borderRadius: "16px",
                //   padding: "4px 16px",
                //   margin: "0 8px",
                //   minWidth: "100px",
                //   minHeight: "32px",
                //   height: "32px",
                //   "&.Mui-selected": {
                //     backgroundColor: "rgb(13,180,234)", // Apply wono-blue when selected
                //     color: "#fff", // Change text color to white when selected
                //   },
                //   "&:hover": {
                //     backgroundColor: "#d3d3d3",
                //   },
                // }}
              />
              <Tab
                label="Ticket"
                value="2"
                sx={{ textTransform: "capitalize" }}
                // sx={{
                //   textTransform: "capitalize",
                //   borderRadius: "16px",
                //   padding: "4px 16px",
                //   margin: "0 8px",
                //   minWidth: "100px",
                //   minHeight: "32px",
                //   height: "32px",
                //   "&.Mui-selected": {
                //     backgroundColor: "rgb(13,180,234)", // Apply wono-blue when selected
                //     color: "#fff", // Change text color to white when selected
                //   },
                //   "&:hover": {
                //     backgroundColor: "#d3d3d3",
                //   },
                // }}
              />
              <Tab
                label="Meeting"
                value="3"
                sx={{ textTransform: "capitalize" }}
                // sx={{
                //   textTransform: "capitalize",
                //   borderRadius: "16px",
                //   padding: "4px 16px",
                //   margin: "0 8px",
                //   minWidth: "100px",
                //   minHeight: "32px",
                //   height: "32px",
                //   "&.Mui-selected": {
                //     backgroundColor: "rgb(13,180,234)", // Apply wono-blue when selected
                //     color: "#fff", // Change text color to white when selected
                //   },
                //   "&:hover": {
                //     backgroundColor: "#d3d3d3",
                //   },
                // }}
              />
              <Tab
                label="Customer Service"
                value="4"
                sx={{ textTransform: "capitalize" }}
                // sx={{
                //   textTransform: "capitalize",
                //   borderRadius: "16px",
                //   padding: "4px 16px",
                //   margin: "0 8px",
                //   minWidth: "100px",
                //   minHeight: "32px",
                //   height: "32px",
                //   "&.Mui-selected": {
                //     backgroundColor: "rgb(13,180,234)", // Apply wono-blue when selected
                //     color: "#fff", // Change text color to white when selected
                //   },
                //   "&:hover": {
                //     backgroundColor: "#d3d3d3",
                //   },
                // }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="flex gap-4">
              <div>Tasks Reports</div>

              <div>
                <button class="wono-blue hover:bg-blue-600 text-white font-bold text-xs py-1 px-4 rounded-3xl">
                  View Service
                </button>
              </div>
            </div>
            <br />
            <DataTable />
          </TabPanel>

          <TabPanel value="2">
            <div className="flex gap-4">
              <div>Ticket Reports</div>

              <div>
                <button class="wono-blue hover:bg-blue-600 text-white font-bold text-xs py-1 px-4 rounded-3xl">
                  View Service
                </button>
              </div>
            </div>
            <br />
            <DataTable />
          </TabPanel>
          <TabPanel value="3">
            <div className="flex gap-4">
              <div>Meeting Reports</div>

              <div>
                <button class="wono-blue hover:bg-blue-600 text-white font-bold text-xs py-1 px-4 rounded-3xl">
                  View Service
                </button>
              </div>
            </div>
            <br />
            <DataTable />
          </TabPanel>
          <TabPanel value="4">
            <div className="flex gap-4">
              <div>Customer Service Reports</div>

              <div>
                <button class="wono-blue hover:bg-blue-600 text-white font-bold text-xs py-1 px-4 rounded-3xl">
                  View Service
                </button>
              </div>
            </div>
            <br />
            <DataTable />
          </TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default Reports;
