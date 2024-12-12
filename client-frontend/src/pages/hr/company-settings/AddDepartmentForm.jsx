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
import axios from "axios"

const AddDepartmentForm = () => {
const [users, setUsers] = useState()
  const [formData, setFormData] = useState({
    departmentId: "",
    name: "",
    admin: "",
    company: "",
    designations: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/fetch-users");
        setUsers(response.data.users); // Assuming users are in response.data.users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users)

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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form Data:", formData);
    // Add API call here to send formData to the backend
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, margin: "0 auto", p: 4, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Add Department
      </Typography>

      <TextField
        label="Department ID"
        value={formData.departmentId}
        onChange={(e) => handleChange("departmentId", e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Department Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Admin (User ID)"
        value={formData.admin}
        onChange={(e) => handleChange("admin", e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Company (Company ID)"
        value={formData.company}
        onChange={(e) => handleChange("company", e.target.value)}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
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
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default AddDepartmentForm;
