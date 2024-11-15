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
  // For Departments
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // For the selected report
  const [selectedOption, setSelectedOption] = useState("Tickets");

  const options = [
    { value: "Tasks", label: "Tasks" },
    { value: "Tickets", label: "Tickets" },
    { value: "Meetings", label: "Meetings" },
    { value: "Customer Service", label: "Customer Service" },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected ? selected.value : null); // Set the selected option
  };
  // const handleSelectChange = (selected) => {
  //   setSelectedOption(selected ? selected.value : "Tickets"); // Set the selected option
  // };

  return (
    <div className="flex min-h-screen">
      <TestSide />
      <div className=" w-full pl-16 motion-preset-blur-right-md">
        <h2 className="text-4xl pt-3 ">Reports</h2>
        <div className="flex">
          <div>
            <h3 className="text-2xl pt-5 pb-4 ">Select Report: &nbsp;&nbsp;</h3>
          </div>

          {/* Select Tag To Select Submodule START */}
          <div className="grid grid-cols-3 sm:grid-cols-6 pt-5 pb-4">
            <Select
              options={options}
              onChange={handleSelectChange} // Handle select option change
              placeholder="Select a report"
            />
          </div>
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
      </div>
    </div>
  );
};

export default Reports;
