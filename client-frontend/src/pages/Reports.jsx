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
import ModuleSidebar from "../components/ModuleSidebar";
import ReportWidget1 from "../components/reportWidgets/ReportWidget1";

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
    // { value: "Customer Service", label: "Customer Service" },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected ? selected.value : null); // Set the selected option
  };
  // const handleSelectChange = (selected) => {
  //   setSelectedOption(selected ? selected.value : "Tickets"); // Set the selected option
  // };

  const myReportWidgetsData = [
    // {
    //   title: "Ticket",
    //   subtitle: "View and manage all ticket-related reports",
    //   link: "/customer/tickets/ticket-reports",
    // },
    {
      title: "Task",
      subtitle: "Analyze your task performance",
      link: "/tasks/mytasks",
    },
    {
      title: "Meeting",
      subtitle: "Track meeting analytics and outcomes",
      link: "/it/meetings/reports",
    },
    {
      title: "Leaves",
      subtitle: "Track meeting analytics and outcomes",
      link: "/hr/leaves/leave-reports",
    },
    // {
    //   title: "Assets",
    //   subtitle: "Insights into all the assets",
    //   link: "/customer/asset/reports",
    // },
  ];

  const externalReportWidgetsData = [
    {
      title: "Ticket",
      subtitle: "View and manage all ticket-related reports",
      link: "/it/tickets/ticket-reports",
    },
    // {
    //   title: "Task",
    //   subtitle: "Analyze your task performance",
    //   link: "/reports/tasks",
    // },
    // {
    //   title: "Meeting",
    //   subtitle: "Track meeting analytics and outcomes",
    //   link: "/customer/meetings/reports",
    // },
    {
      title: "Assets",
      subtitle: "Insights into all the assets",
      link: "/it/asset/reports",
    },
    // {
    //   title: "Finance",
    //   subtitle: "Insights into all the finances",
    //   link: "/customer/asset/reports",
    // },
    // {
    //   title: "Sales",
    //   subtitle: "Insights into all the sales",
    //   link: "/customer/asset/reports",
    // },
  ];

  return (
    <div className="flex min-h-screen">
      <TestSide />
      {/* <ModuleSidebar /> */}
      <div className="w-full p-6 motion-preset-blur-right-md">
        <h2 className="text-3xl font-bold">Reports</h2>

        <h2 className="text-2xl py-6">My Reports</h2>

        {/* Reports widgets START */}

        <div className="mt-0">
          <h2 className="text-2xl font-semibold"></h2>
          <div className={`grid gap-4 grid-cols-4`}>
            {myReportWidgetsData.map((widget, index) => (
              <div
                key={index}
                className="bg-white p-0 shadow-md rounded-lg h-full overflow-auto">
                <ReportWidget1
                  title={widget.title}
                  subtitle={widget.subtitle}
                  link={widget.link}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reports widgets END */}

        <h2 className="text-2xl pt-10 pb-6">Department Reports</h2>

        {/* Reports widgets START */}

        <div className="mt-0">
          <h2 className="text-2xl font-semibold"></h2>
          <div className={`grid gap-4 grid-cols-4`}>
            {externalReportWidgetsData.map((widget, index) => (
              <div
                key={index}
                className="bg-white p-0 shadow-md rounded-lg h-full overflow-auto">
                <ReportWidget1
                  title={widget.title}
                  subtitle={widget.subtitle}
                  link={widget.link}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reports widgets END */}

        {/* <div className="flex h-16">
          <div className="w-60">
            <h3 className="text-2xl pt-5 pb-4 ">Select Report: &nbsp;&nbsp;</h3>
          </div>

          <div className="grid pt-5 h-8 w-full pr-[1rem]">
            <Select
              options={options}
              onChange={handleSelectChange} // Handle select option change
              placeholder="Select a report"
              value={options.find((option) => option.value === selectedOption)} // Set default selected value
              className="min-w-52 w-full"
            />
          </div>
        </div> */}

        {/* {selectedOption === "Tasks" && (
          <div>
            <TaskReportsSection />
          </div>
        )}

        {selectedOption === "Tickets" && (
          <div>
            <TicketReportsSection />
          </div>
        )}

        {selectedOption === "Meetings" && (
          <div>
            <MeetingReportsSection />
          </div>
        )}

        {selectedOption === "Customer Service" && (
          <div>
            <CustomerServiceReportsSection />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Reports;
