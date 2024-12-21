import React from "react";
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

const Applicants = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Email", headerName: "Email", width: 200},

    
    { field: "date", headerName: "Date", width: 150 },
   
    {
       field: "Role", headerName: "Role", width: 200 ,


    },
    {
       field: "Department", headerName: "Department", width: 200 ,

    },
    {
      field:"Resume", headerName: "Resume", width: 200, 


    },
    {
      field: "delete",
      headerName: "Delete",
      width: 170,
      // renderCell: (params) => (
      cellRenderer: (params) => (
        <Button
          size="small"
          // onClick={() => handleDelete(params.row)}
          
          // onClick={handleDeleteTicket}
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "red",
            },
            padding: "4px 8px",
            borderRadius: "0.375rem",
          }}
        >
          Delete
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
      Department: "IT",
      Resume: "",
    },
    {
      id: 2,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
      
    },
    {
      id: 3,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 4,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 5,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 6,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 7,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 8,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
      Resume: "",
    },
    {
      id: 9,
      Name: "Anushri Bhagat",
      Email: "anushri@gmail.com",
      date: "2024-01-26",
      Department: "IT",
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
      <AgTable
        data={allRows} // Use the state here
        columns={columns}
        
      />
    </div>
  );
};

export default Applicants;
