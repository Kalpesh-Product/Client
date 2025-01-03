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
import ReceivedTickets from "./ReceivedTickets";
import useAuth from "../../../../hooks/useAuth";

const ViewTicketsTabs = () => {
  const { auth: authUser } = useAuth();
  // For Departments
  const [value, setValue] = React.useState("1");

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
      <div className=" w-full py-4 text-lg">
        <h2 className="text-2xl  font-bold">All Tickets</h2>
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
            <TabList
              onChange={handleChange}
              aria-label="Departments"
              variant="fullWidth"
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                fontFamily: "Popins-Semibold",
                padding: "0.5rem",
              }}>
              {/* {user.role !== "Employee" && user.role !== "Admin" && ( */}
              <Tab
                // label="My Tickets"
                label="Raised By Me"
                value="1"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              <Tab
                label="Received Tickets"
                value="2"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              {/* )} */}
              {/* {authUser.user.role.roleTitle !== "Master-Admin" && (
                <Tab
                  label="Assigned Tickets"
                  value="5"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
              )} */}
              <Tab
                label="Accepted Tickets"
                value="6"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              {authUser.user.role.roleTitle !== "Master-Admin" && (
                <Tab
                  label="Escalated Tickets"
                  value="4"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
              )}
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
            <ReceivedTickets />
          </TabPanel>

          <TabPanel value="3">
            <ClosedTickets />
          </TabPanel>

          <TabPanel value="4">
            <UnresolvedTickets />
          </TabPanel>

          <TabPanel value="5" className="" sx={{ padding: "0.5rem" }}>
            <AssignedTickets />
          </TabPanel>

          <TabPanel value="6">
            <AcceptedTickets />
          </TabPanel>
        </TabContext>
        {/* Tabs Material UI End*/}
      </div>
    </div>
  );
};

export default ViewTicketsTabs;
