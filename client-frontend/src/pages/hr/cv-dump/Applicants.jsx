import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import AgTable from "../../../components/AgTable";
import { useLocation } from "react-router-dom";
import { NewModal } from "../../../components/NewModal";
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from "../../../hooks/useAuth";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";

const Applicants = () => {
  const [selectedValue,setSelectedValue] = useState("");

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Email", headerName: "Email"}, 
    { field: "date", headerName: "Date"}, 
    {
       field: "Role", headerName: "Role"
    },
    {
       field: "Department", headerName: "Department"
    },
    {
      field:"ProfileLink", headerName: "Resume", 
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
      field: "Manager", headerName: "Manager", width: 200 ,
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
      Role:"Frontend Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 2,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"UI/UX Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
      
    },
    {
      id: 3,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"PHP Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 4,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"Senior React Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 5,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"React Developer Intern",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 6,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"Backend Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 7,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"Manager",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 8,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"Sr. Angular developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"Jr. React Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Role:"PHP Developer",
      Department: "Tech",
      Manager:"Kalpesh Naik",
      ProfileLink:"https://example.com/profile/john",
      Resume: "",
    },
  ];

  return (
    <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out bg-white p-2 rounded-md">
      <div className="flex gap-4 mb-4 justify-between">
        <div></div>
        <div className="flex">
          <div className="mb-2 flex justify-between">
            <h1 className="text-3xl"></h1>
            <button className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
              + Add Applicants
            </button>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
      <div className="ag-theme-alpine w-full"
                  style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={allRows} // Use the state here
        columnDefs={columns}
        domLayout="autoHeight"
        
      />
      </div>
      </div>
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
