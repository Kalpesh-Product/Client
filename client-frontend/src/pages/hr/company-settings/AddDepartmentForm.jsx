import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const AddDepartmentForm = ({ handleClose }) => {
  const [users, setUsers] = useState();
  const [formData, setFormData] = useState({
    name: "",
    company: "67586c2d95a813e39504d625",
    // designations: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/fetch-users"
        );
        setUsers(response.data.users); // Assuming users are in response.data.users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDesignationChange = (event) => {
    const {
      target: { value },
    } = event;
    handleChange(
      "designations",
      typeof value === "string" ? value.split(",") : value // Convert string to array if needed
    );
  };
  const handleMemberChange = (selectedValues) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: selectedValues,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/departments/add-department",
        formData
      );
      console.log("Data sent successfully, Data : ", response);
      toast.success("Department added successfully");
      if (handleClose) {
        handleClose();
      }
    } catch (error) {
      toast.error("Error adding department");
      console.log(error.response?.data || error?.message);
    }
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{display:'flex' ,flexDirection:'column', gap:'2rem'}}
      >
        <div className="flex justify-between items-center">
          <Typography variant="h5">
            Add Department
          </Typography>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleClose}
              className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
            >
              <IoMdClose />
            </motion.button>
          </div>
        </div>

        <TextField
          label="Department Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        {/* <FormControl fullWidth margin="normal">
        <InputLabel>Designations</InputLabel>
        <Select
          multiple
          value={formData.designations}
          onChange={handleDesignationChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Team Lead">Team Lead</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </Select>
      </FormControl> */}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddDepartmentForm;
