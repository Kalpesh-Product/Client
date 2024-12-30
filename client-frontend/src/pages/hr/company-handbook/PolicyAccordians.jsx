import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AgTable from "../../../components/AgTable";
import PolicyCrud from "./PolicyCrud";

const PolicyAccordians = () => {
  // Table Data
  const tableData = [
    { department: "Finance", payroll: 35000 },
    { department: "HR", payroll: 15000 },
    { department: "Tech", payroll: 20000 },
    { department: "IT", payroll: 25000 },
    { department: "Sales", payroll: 18000 },
    { department: "Administration", payroll: 45000 },
  ];

  // Dummy Employee Data per Department
  const employeeData = {
    Finance: [
      { name: "John Doe", role: "Accountant", salary: 5000 },
      { name: "Jane Smith", role: "Auditor", salary: 6000 },
    ],
    HR: [
      { name: "Alice Brown", role: "Recruiter", salary: 4000 },
      { name: "Bob White", role: "HR Manager", salary: 7000 },
    ],
    Tech: [
      { name: "Charlie Green", role: "Developer", salary: 8000 },
      { name: "Daisy Blue", role: "Tester", salary: 5000 },
    ],
    IT: [
      { name: "Eve Black", role: "SysAdmin", salary: 5500 },
      { name: "Frank Red", role: "Network Admin", salary: 6000 },
    ],
    Sales: [
      { name: "Grace Pink", role: "Sales Exec", salary: 4500 },
      { name: "Hank Yellow", role: "Sales Manager", salary: 6500 },
    ],
    Administration: [
      { name: "Ivy Purple", role: "Admin Assistant", salary: 4000 },
      { name: "Jack Orange", role: "Office Manager", salary: 6000 },
    ],
  };

  // Columns for Employee Table
  const employeeColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    {
      headerName: "Salary (₹)",
      field: "salary",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
    },
  ];

  return (
    <div className="py-4 w-[80vw] md:w-full">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Payroll Table</h2> */}
      {tableData.map((department) => (
        <Accordion key={department.department}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${department.department}-content`}
            id={`${department.department}-header`}>
            <div className="flex justify-between w-full px-2">
              <Typography className="font-medium text-lg">
                {department.department}
              </Typography>
              <Typography className="font-medium text-lg">
                {/* Payroll: ₹ {department.payroll.toLocaleString()} */}
                Policies: 3
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {/* <AgTable
              data={employeeData[department.department] || []}
              columns={employeeColumns}
              paginationPageSize={5}
              highlightFirstRow={false}
              highlightEditedRow={false}
            /> */}
            <PolicyCrud />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PolicyAccordians;
