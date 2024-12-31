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
import TodaysTickets from "./TodaysTickets";

const MyTicketsTabs = () => {
  // For Departments
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className=" w-full py-4 pb-0 text-lg border-b-0">
        {/* <h2 className="text-2xl font-bold">My Tickets</h2> */}
        <h2 className="text-2xl  font-bold">My Tickets</h2>
      </div>

      <div>
        {/* Tabs Material UI Start*/}
        <TabContext value={value} sx={{ backgroundColor: "red" }}>
          <Box
            sx={{
              borderBottom: 0,
              borderColor: "divider",
              width: "100%",
            }}></Box>
          <TabPanel value="1" sx={{ padding: "1rem" }}>
            <MyTickets />
          </TabPanel>

          <TabPanel value="2">
            <div className="flex gap-4">
              <div>External Tickets</div>
            </div>
            <br />

            <ExternalTickets />
          </TabPanel>

          <TabPanel value="3">
            <div className="flex gap-4">
              <div>Closed Tickets</div>
            </div>
            <br />

            <ClosedTickets />
          </TabPanel>

          <TabPanel value="4">
            <div className="flex gap-4">
              <div>Unresolved Tickets</div>
            </div>
            <br />

            <UnresolvedTickets />
          </TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default MyTicketsTabs;
