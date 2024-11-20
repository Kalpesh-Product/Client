// import React from "react";
import TestLink from "../TestLink";
import TestSide from "../../../../components/Sidetest";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
// import Modal from "../components/Modal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { closeModal } from "../redux/features/modalSlice";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import { useDispatch } from "react-redux";
import { color, motion } from "framer-motion";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";

const AddTicketForm = () => {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const navigate = useNavigate();
  return (
    <div className="flex">
      {/* <TestSide />
      <TestLink /> */}
      <div className="w-full">
        {/* <div>AddT icket Form</div> */}
        <div className="">
          <div className=" mx-auto">
            <h1 className="text-xl text-center my-2 font-bold">Add Ticket</h1>
            <Box
              sx={{
                maxWidth: 600,
                padding: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
              // className="bg-white p-6 rounded-lg shadow-md mx-auto">
              className="bg-white p-6 rounded-lg mx-auto">
              {/* Personal Information */}
              {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
              <div className="grid grid-cols-1 gap-4">
                {/* Name, Mobile, Email, DOB fields */}
                <div className="grid grid-cols-1 gap-4">
                  <FormControl fullWidth>
                    <InputLabel id="department-select-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="department-select-label"
                      id="department-select"
                      value={department}
                      label="Department"
                      onChange={handleChange}>
                      <MenuItem value="IT">IT</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                      <MenuItem value="Tech">Tech</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <TextField
                    label="Ticket Title"
                    // value={newEvent.name}
                    // onChange={(e) =>
                    //   setnewEvent({ ...newEvent, name: e.target.value })
                    // }
                    fullWidth
                  />
                </div>
              </div>

              {/* Role & Department fields */}

              {/* <div className="col-span-2 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
                  //   onClick={handleSaveEvent}
                  onClick={() => navigate("/customer/tickets")}>
                  Save
                </motion.button>
          
              </div> */}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTicketForm;
