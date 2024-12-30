import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AgGridReact } from "ag-grid-react";
import AgTable from "../../../components/AgTable";

const Applicants = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const onRemarkChange = (department, rowId, value) => {
    setEmployeeData((prevData) => {
      console.log("prevData:", prevData);
      console.log("department:", department);
  
      if (!prevData[department]) {
        console.error(`Department "${department}" not found in data.`);
        return prevData; // Return the current state without changes
      }
  
      return {
        ...prevData,
        [department]: prevData[department].map((row) =>
          row.id === rowId ? { ...row, Remark: value } : row
        ),
      };
    });
  };

  //new
  const tableData = [
    { department: "Finance", payroll: 2 },
    { department: "HR", payroll: 2 },
    { department: "Tech", payroll: 2 },
    { department: "IT", payroll: 2 },
    { department: "Sales", payroll: 2 },
    { department: "Administration", payroll: 2 },
  ];

  const [employeeData,setEmployeeData] = useState({
    Finance: [
      {
        id: 1,
        Name: "John Doe",
        Role: "Accountant",
        salary: 5000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
      {
        id: 2,
        Name: "Jane Smith",
        Role: "Auditor",
        salary: 6000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
        

        

      },
    ],
    HR: [
      {
        id: 3,
        Name: "Alice Brown",
        Role: "Recruiter",
        salary: 4000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
      {
        id: 4,
        Name: "Bob White",
        Role: "HR Manager",
        salary: 7000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
    ],
    Tech: [
      {
        id: 5,
        Name: "Charlie Green",
        Role: "Developer",
        salary: 8000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },

      {
        id: 6,
        Name: "Daisy Blue",
        Role: "Tester",
        salary: 5000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
    ],
    IT: [
      {
        id: 7,
        Name: "Eve Black",
        Role: "SysAdmin",
        salary: 5500,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
      {
        id: 8,
        Name: "Frank Red",
        Role: "Network Admin",
        salary: 6000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
    ],
    Sales: [
      {
        id: 9,
        Name: "Grace Pink",
        Role: "Sales Exec",
        salary: 4500,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
      {
        id: 10,
        Name: "Hank Yellow",
        Role: "Sales Manager",
        salary: 6500,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
    ],
    Administration: [
      {
        id: 11,
        Name: "Ivy Purple",
        Role: "Admin Assistant",
        salary: 4000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
      {
        id: 12,
        Name: "Jack Orange",
        Role: "Office Manager",
        salary: 6000,
        Email: "anushri@gmail.com",
        date: "2024-01-26",
        Manager: "Kalpesh Naik",
        ProfileLink: "https://example.com/profile/john",
        Remark: ""
      },
    ],
  

  })

  // const employeeData = {
  //   Finance: [
  //     {
  //       Name: "John Doe",
  //       Role: "Accountant",
  //       salary: 5000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //     {
  //       Name: "Jane Smith",
  //       Role: "Auditor",
  //       salary: 6000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
        

        

  //     },
  //   ],
  //   HR: [
  //     {
  //       Name: "Alice Brown",
  //       Role: "Recruiter",
  //       salary: 4000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //     {
  //       Name: "Bob White",
  //       Role: "HR Manager",
  //       salary: 7000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //   ],
  //   Tech: [
  //     {
  //       Name: "Charlie Green",
  //       Role: "Developer",
  //       salary: 8000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },

  //     {
  //       Name: "Daisy Blue",
  //       Role: "Tester",
  //       salary: 5000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //   ],
  //   IT: [
  //     {
  //       Name: "Eve Black",
  //       Role: "SysAdmin",
  //       salary: 5500,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //     {
  //       Name: "Frank Red",
  //       Role: "Network Admin",
  //       salary: 6000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //   ],
  //   Sales: [
  //     {
  //       Name: "Grace Pink",
  //       Role: "Sales Exec",
  //       salary: 4500,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //     {
  //       Name: "Hank Yellow",
  //       Role: "Sales Manager",
  //       salary: 6500,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //   ],
  //   Administration: [
  //     {
  //       Name: "Ivy Purple",
  //       Role: "Admin Assistant",
  //       salary: 4000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //     {
  //       Name: "Jack Orange",
  //       Role: "Office Manager",
  //       salary: 6000,
  //       Email: "anushri@gmail.com",
  //       date: "2024-01-26",
  //       Manager: "Kalpesh Naik",
  //       ProfileLink: "https://example.com/profile/john",
  //       Remark: ""
  //     },
  //   ],
  // };

  //new//

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Email", headerName: "Email" },
    { field: "date", headerName: "Date" },
    {
      field: "Role",
      headerName: "Role",
    },

    {
      field: "ProfileLink",
      headerName: "Resume",
      cellRenderer: (params) => {
        return (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            View Profile
          </a>
        );
      },
    },

    {
      field: "viewDetails",
      headerName: "Status",
      width: 150,
      cellRenderer: (params) => {
        const handleActionChange = (event) => {
          const selectedAction = event.target.value;

          const updatedData = params.api.getRowNode(params.node.id).data;
          updatedData.viewDetails = selectedAction;
          params.api.applyTransaction({ update: [updatedData] });

          setSelectedValue(selectedAction); // Update the selected value dynamically
          console.log("Selected Action:", selectedAction);
        };

        return (
          <FormControl size="small" sx={{ width: "100%" }}>
            <Select
              value={params.data.viewDetails || ""} // Always forces the dropdown to display the SVG
              onChange={handleActionChange}
              displayEmpty
              disableUnderline
              IconComponent={() => null} // Removes the dropdown arrow
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 16px",
                  borderRadius: "0.375rem", // Tailwind rounded
                  backgroundColor: "transparent",
                  border: "none", // Removes border
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& fieldset": {
                  border: "none", // Removes border in outlined variant
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="start">Approved</MenuItem>
              <MenuItem value="pending">Rejected</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },

    {
      field: "Remark",
      headerName: "Remark",
      cellRenderer: (params) => {
         const department = params.context?.department; 
        return (
          <input
          type="text"
          placeholder="Add Remark"
          value={params.data.remark}
          onChange={(e) => onRemarkChange(department,params.data.id, e.target.value)}
          style={{
            width: "100%",
            padding: "4px",
            boxSizing: "border-box",
          }}
        />
        );
      },
      width: 200,
    },

    {
      field: "Manager",
      headerName: "Manager",
      width: 200,
    },

    {
      field: "send",
      headerName: "Send",
      width: 170,
      // renderCell: (params) => (
      cellRenderer: (params) => (
        <Button
          size="small"
          // onClick={() => handleDelete(params.row)}

          // onClick={handleDeleteTicket}
          variant="contained"
          sx={{
            backgroundColor: "#3cbce7",
            color: "white",
            "&:hover": {
              backgroundColor: "#3cbce7",
            },
            padding: "4px 8px",
            borderRadius: "0.375rem",
          }}
        >
          Send
        </Button>
      ),
    },
  ];

  const allRows = [
    {
      id: 1,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Frontend Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 2,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "UI/UX Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 3,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "PHP Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 4,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Senior React Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 5,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "React Developer Intern",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 6,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Backend Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 7,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Manager",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 8,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Sr. Angular developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "Jr. React Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role: "PHP Developer",
      Department: "Tech",
      Manager: "Kalpesh Naik",
      ProfileLink: "https://example.com/profile/john",
      Resume: "",
    },
  ];

  return (
    <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out p-0 rounded-md">
      <div className="flex gap-4 mb-4 justify-between">
        <div></div>
        <div className="flex">
          <div className="mb-2 flex justify-between">
            <h1 className="text-3xl"></h1>
            {/* <button className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
              + Add Applicants
            </button> */}
          </div>
        </div>
      </div>

      {/* AGgRIDtABLE START */}

      {/* <div className="w-full overflow-hidden">
        <div
          className="ag-theme-alpine w-full"
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            rowData={allRows} // Use the state here
            columnDefs={columns}
            domLayout="autoHeight"
          />
        </div>
      </div> */}

      {/* AGgRIDtABLE END */}

      {/* Accordian Start */}
      {tableData.map((department) => (
        <Accordion key={department.department}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${department.department}-content`}
            id={`${department.department}-header`}
          >
            <div className="flex justify-between w-full px-2">
              <Typography className="font-medium text-lg">
                {department.department}
              </Typography>
              <Typography className="font-medium text-lg">
                Applicants: {department.payroll.toLocaleString()}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <AgTable
              data={employeeData[department.department] || []}
              columns={columns}
              paginationPageSize={5}
              highlightFirstRow={false}
              highlightEditedRow={false}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      {/* Accordion End */}

      {/* <div
                  className="ag-theme-alpine w-full"
                  style={{ height: 500, width: "100%" }}
                >
                  <AgGridReact
                    data={allRows} // Use the state here
                    columns={columns}
                    defaultColDef={{
                      flex: 1, // Ensures columns are flexible
                      resizable: true,
                    }}
                    domLayout="autoHeight"
                  />
                </div> */}
    </div>
  );
};

export default Applicants;
