import React, { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TestSide from "../components/Sidetest";
import DataTable from "../components/Datatable";
import Select from "react-select";
import TaskReportsSection from "../components/Submodules/tasks/TaskReportsSection";
import TicketReportsSection from "../components/Submodules/ticket/TicketReportsSection";
import MeetingReportsSection from "../components/Submodules/meetings/MeetingReportsSection";
import CustomerServiceReportsSection from "../components/Submodules/customer-service/CustomerServiceReportsSection";

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

  // For the selected report
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "Tasks", label: "Tasks" },
    { value: "Tickets", label: "Tickets" },
    { value: "Meetings", label: "Meetings" },
    { value: "Customer Service", label: "Customer Service" },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected ? selected.value : null); // Set the selected option
  };

  return (
    <div className="flex min-h-screen">
      <TestSide />
      <div className=" w-full pl-3">
        <h2 className="text-4xl pt-3 ">Reports</h2>
        <h3 className="text-2xl pt-5 pb-4 ">Select Report</h3>

        {/* Select Tag To Select Submodule START */}
        <div className="grid grid-cols-3 sm:grid-cols-6 pb-5">
          <Select
            options={options}
            onChange={handleSelectChange} // Handle select option change
            placeholder="Select a report"
          />
        </div>
        {/* Select Tag To Select Submodule END */}

        {selectedOption === "Tasks" && (
          <div>
            <TaskReportsSection />
            {/* Add your Tasks section content here */}
          </div>
        )}

        {selectedOption === "Tickets" && (
          <div>
            <TicketReportsSection />
            {/* Add your Tickets section content here */}
          </div>
        )}

        {selectedOption === "Meetings" && (
          <div>
            <MeetingReportsSection />
            {/* Add your Meetings section content here */}
          </div>
        )}

        {selectedOption === "Customer Service" && (
          <div>
            <CustomerServiceReportsSection />
            {/* Add your Customer Service section content here */}
          </div>
        )}

        {/* Tabs Material UI Start*/}
        {/* <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Departments">
              <Tab
                label="Tasks"
                value="1"
                className="wono-blue"
                sx={{ textTransform: "capitalize" }}
   
              />
              <Tab
                label="Ticket"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Meeting"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Customer Service"
                value="4"
                sx={{ textTransform: "capitalize" }}
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
        </TabContext> */}
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default Reports;
