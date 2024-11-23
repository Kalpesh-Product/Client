import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyTickets from "./MyTickets";
import ExternalTickets from "./ExternalTickets";
import ClosedTickets from "./ClosedTickets";
import UnresolvedTickets from "./UnresolvedTickets";

const MyTicketsTabs = () => {
  // For Departments
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className=" w-full py-10 text-lg">
        <h2 className="text-2xl font-bold">My Tickets</h2>
      </div>

      <div>
        {/* Tabs Material UI Start*/}
        <TabContext value={value} sx={{ backgroundColor: "red" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
            }}>
            <TabList
              onChange={handleChange}
              aria-label="Departments"
              variant="fullWidth">
              <Tab
                label="My Tickets"
                value="1"
                className="wono-blue"
                sx={{ textTransform: "capitalize" }}
              />
              {/* <Tab
                label="External Tickets"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Closed Tickets"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Unresolved Tickets"
                value="4"
                sx={{ textTransform: "capitalize" }}
              /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* <div className="flex gap-4">
              <div>My Tickets</div>
            </div>
            <br /> */}

            {/* <MyTicketsTable /> */}
            <MyTickets />
          </TabPanel>

          <TabPanel value="2">
            <div className="flex gap-4">
              <div>External Tickets</div>
            </div>
            <br />
            {/* <MyTicketsTable /> */}
            <ExternalTickets />
          </TabPanel>

          <TabPanel value="3">
            <div className="flex gap-4">
              <div>Closed Tickets</div>
            </div>
            <br />
            {/* <MyTicketsTable /> */}
            <ClosedTickets />
          </TabPanel>

          <TabPanel value="4">
            <div className="flex gap-4">
              <div>Unresolved Tickets</div>
            </div>
            <br />
            {/* <MyTicketsTable /> */}
            <UnresolvedTickets />
          </TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default MyTicketsTabs;
