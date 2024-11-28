import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyTickets from "./MyTickets";
import ExternalTickets from "./ExternalTickets";
import ClosedTickets from "./ClosedTickets";
import UnresolvedTickets from "./UnresolvedTickets";
import AcceptedTickets from "./AcceptedTickets";
import AssignedTickets from "./AssignedTickets";

const ViewTicketsTabs = () => {
  // For Departments
  const [value, setValue] = React.useState("5");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div>
      <div className=" w-full p-4 text-lg">
        {/* <h2 className="text-2xl font-bold">View Tickets</h2> */}
        {/* <h2 className="text-3xl motion-preset-slide-right-md font-bold"> */}
        <h2 className="text-3xl  font-bold">View Tickets</h2>
      </div>

      <div className="bg-white mx-4 rounded-md">
        {/* Tabs Material UI Start*/}
        <TabContext value={value} sx={{ backgroundColor: "red" }}>
          <Box
            sx={{
              borderBottom: 0,
              borderColor: "divider",
              width: "100%",
            }}>
            {/* <TabList
              onChange={handleChange}
              aria-label="Departments"
              variant="fullWidth">
              <Tab
                label="My Tickets"
                value="1"
                className="wono-blue"
                sx={{ textTransform: "uppercase" }}
              />

              {user.role === "Admin" && user.department === "IT" && (
                <Tab
                  label="External Tickets"
                  value="2"
                  sx={{ textTransform: "uppercase" }}
                />
              )}
              {user.role === "Employee" && user.department === "IT" && (
                <Tab
                  label="Closed Tickets"
                  value="3"
                  sx={{ textTransform: "uppercase" }}
                />
              )}
              {user.role === "Admin" && user.department === "IT" && (
                <Tab
                  label="Unresolved Tickets"
                  value="4"
                  sx={{ textTransform: "uppercase" }}
                />
              )}
              {user.role === "Employee" && user.department === "IT" && (
                <Tab
                  label="Assigned Tickets"
                  value="5"
                  sx={{ textTransform: "uppercase" }}
                />
              )}
              {user.role === "Employee" && user.department === "IT" && (
                <Tab
                  label="Accepted Tickets"
                  value="6"
                  sx={{ textTransform: "uppercase" }}
                />
              )}
            </TabList> */}
            <TabList
              onChange={handleChange}
              aria-label="Departments"
              variant="fullWidth"
              // sx={{
              //   backgroundColor: "white",
              //   borderRadius: "10px",
              //   fontFamily: "Popins-Semibold",
              //   marginLeft: "2rem",
              //   marginRight: "2rem",
              //   textTransform: "uppercase",
              // }}

              sx={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                fontFamily: "Popins-Semibold",
                padding: "0.5rem",
              }}>
              {/* <Tab
                label="My Tickets"
                value="1"
                className="wono-blue"
                sx={{ textTransform: "uppercase" }}
              /> */}

              {user.role !== "Employee" && (
                <Tab
                  label="External Tickets"
                  value="2"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
              )}
              <Tab
                label="Assigned Tickets"
                value="5"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />

              <Tab
                label="Accepted Tickets"
                value="6"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              <Tab
                label="Unresolved Tickets"
                value="4"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              <Tab
                label="Closed Tickets"
                value="3"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className="p-2">
            <MyTickets />
          </TabPanel>

          <TabPanel value="2">
            {/* <div className="flex gap-4">
              <div>External Tickets</div>
            </div> */}
            {/* <br /> */}
            {/* <MyTicketsTable /> */}
            <ExternalTickets />
          </TabPanel>

          <TabPanel value="3">
            {/* <div className="flex gap-4">
              <div>Closed Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <ClosedTickets />
          </TabPanel>

          <TabPanel value="4">
            {/* <div className="flex gap-4">
              <div>Unresolved Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <UnresolvedTickets />
          </TabPanel>

          <TabPanel value="5" className="" sx={{ padding: "0.5rem" }}>
            {/* <div className="flex gap-4">
              <div>Assigned Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <AssignedTickets />
          </TabPanel>

          <TabPanel value="6">
            {/* <div className="flex gap-4">
              <div>Accepted Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <AcceptedTickets />
          </TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default ViewTicketsTabs;
