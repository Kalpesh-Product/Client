import React from 'react'

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AdditionalTasks from './AdditionalTasks'
import Daily_KRA from './Daily_KRA'
import MontlyTasks from './MontlyTasks'

const TaskTicketsMainpg = () => {

    const [value, setValue] = React.useState("5");
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <>
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

              
                <Tab
                  label="Daily KRA"
                  value="2"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
              
              <Tab
                label="Monthly Tasks"
                value="5"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />

              <Tab
                label="Additional Tasks"
                value="6"
                sx={{
                  textTransform: "uppercase",
                  borderRight: "1px solid #e4e4e4",
                }}
              />
              
            </TabList>
          </Box>
          <TabPanel value="1" className="p-2">
            
          </TabPanel>

          <TabPanel value="2">
            {/* <div className="flex gap-4">
              <div>External Tickets</div>
            </div> */}
            {/* <br /> */}
            {/* <MyTicketsTable /> */}
            <Daily_KRA/>
            
          </TabPanel>

          <TabPanel value="3">
            {/* <div className="flex gap-4">
              <div>Closed Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            
            
          </TabPanel>

          <TabPanel value="4">
            {/* <div className="flex gap-4">
              <div>Unresolved Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
           
          </TabPanel>

          <TabPanel value="5" className="" sx={{ padding: "0.5rem" }}>
            {/* <div className="flex gap-4">
              <div>Assigned Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <MontlyTasks/>
          </TabPanel>

          <TabPanel value="6">
            {/* <div className="flex gap-4">
              <div>Accepted Tickets</div>
            </div>
            <br /> */}
            {/* <MyTicketsTable /> */}
            <AdditionalTasks/>
            
          </TabPanel>
        </TabContext>
    </>

  )
}

export default TaskTicketsMainpg