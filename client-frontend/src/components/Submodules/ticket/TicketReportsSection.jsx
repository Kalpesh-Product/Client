import React, { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "../../Datatable";
import MyTicketsTable from "./MyTicketsTable";
import TicketsAssignedToMeTable from "./TicketsAssignedToMeTable";

const TicketReportsSection = () => {
  // For Departments
  // const [value, setValue] = React.useState("1");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <div>
      <div className="pt-3 pb-3">
        <span className="text-xl">Ticket Reports</span>&nbsp;&nbsp;
        {/* <button>View Service</button> */}
        <button class="wono-blue-dark hover:bg-blue-700 text-white font-bold text-xs py-1 px-3 rounded-full">
          {/* <button class="wono-blue-dark hover:bg-blue-700 text-white font-bold text-xs py-1 px-3 rounded-full"> */}
          View Service
        </button>
      </div>
      {/* <div>Tabs For Tickets</div> */}

      <div className="mx-auto">
        <ul className="flex  border-b mb-4 gap-4">
          <li className=" text-center w-1/2" role="presentation">
            <button
              className={`text-md py-2 w-full hover:bg-gray-100  ${
                activeTab === "tab-1"
                  ? "border-b-4 wono-blue-dark-border wono-blue-text"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-1")}>
              My Tickets
            </button>
          </li>
          <li className=" text-center w-1/2" role="presentation">
            <button
              className={`text-md py-2 w-full hover:bg-gray-100 ${
                activeTab === "tab-2"
                  ? "border-b-4 wono-blue-dark-border wono-blue-text"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-2")}>
              Tickets Assigned To Me
            </button>
          </li>
        </ul>
        <div className="tab-content">
          {activeTab === "tab-1" && (
            <div
              className="tab-pane motion-preset-slide-up show active"
              id="tab-1"
              role="tabpanel">
              <div
                className="flex flex-col  mt-3"
                data-aos="fade-up"
                data-aos-delay="100">
                <MyTicketsTable />
              </div>
            </div>
          )}
          {activeTab === "tab-2" && (
            <div
              className="tab-pane motion-preset-slide-up-sm show"
              id="tab-2"
              role="tabpanel">
              <div
                className="flex flex-col  mt-3"
                data-aos="fade-up"
                data-aos-delay="100">
                {/* Tab 2 Content */}
                <TicketsAssignedToMeTable />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Tabs Material UI Start*/}
      {/* <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Departments">
            <Tab
              label="My Tickets"
              value="1"
              className="wono-blue"
              sx={{ textTransform: "capitalize" }}
            />
            <Tab
              label="Tickets Assigned To Me"
              value="2"
              sx={{ textTransform: "capitalize" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="flex gap-4">
            <div>My Tickets</div>
          </div>
          <br />

          <MyTicketsTable />
        </TabPanel>

        <TabPanel value="2">
          <div className="flex gap-4">
            <div>Tickets Assigned To Me</div>
          </div>
          <br />
          <MyTicketsTable />
        </TabPanel>
      </TabContext> */}
      {/* Tabs Material UI End*/}
    </div>
  );
};

export default TicketReportsSection;
