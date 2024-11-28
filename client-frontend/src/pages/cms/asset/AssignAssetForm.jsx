import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";
import userData from "../../../dummyData/dummyData.json";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const departments = ["HR", "Tech", "Sales", "Marketing"];
const categories = ["Laptop", "Monitor", "Headphones", "Keyboard", "Mice"];
const brands = ["Dell", "HP", "Apple", "Lenovo"];
const models = [
  "Inspiron 15",
  "Pavilion 14",
  "MacBook Air M2",
  "ThinkPad X1 Carbon",
];

export default function AssignAssetForm({ handleCloseModal, selectedAsset }) {
  const assignmentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    assetNumber: "",
    assetType: "",
    assetName: "",
    brandName: "",
    location: "",
    status: "",
    assignmentDate: new Date().toLocaleDateString(),
    assignmentTime: assignmentTime,
  });
  const [user, setUser] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const assetUpdate = () => {
    // Fetch the user from localStorage and update the assignedAsset field
    const storedUser = JSON.parse(localStorage.getItem("user")); // Parse the user data from localStorage
    storedUser.assignedAsset = `${formData.assetNumber} - ${formData.assetName} - ${formData.brandName}`; // Update the assignedAsset field
    console.log(storedUser);
    localStorage.setItem("user", JSON.stringify(storedUser)); // Save the updated user data to localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      department: selectedDepartment,
      assigneeName: formData.name,
      assetNumber: formData.assetNumber,
      assetType: formData.assetType,
      assetName: formData.assetName,
      location: formData.location,
      status: formData.status,
      assignmentDate: formData.assignmentDate,
    };

    console.log(payload);

    try {
      handleCloseModal();
      toast.success(`Asset assigned`);
    } catch (error) {
      console.error("Error assigning asset:", error);
      toast.error("Failed to assign asset. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedAsset) {
      setFormData((prevState) => ({
        ...prevState,
        assetNumber: selectedAsset.assetNumber || "",
        assetType: selectedAsset.assetType || "",
        assetName: selectedAsset.assetName || "",
        brandName: selectedAsset.brandName || "",
        location: selectedAsset.location || "",
        status: selectedAsset.status || "",
        assignmentDate: new Date().toLocaleDateString(),
      }));
    }
  }, [selectedAsset]); // Runs when selectedAsset changes

  const handleAssigneeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAssetChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //User names
  const AssigneeOptions = userData
    .filter((user) => user.department === selectedDepartment) // Filter by selected department
    .map((user) => (
      <MenuItem key={user.email} value={user.name}>
        {user.name}
      </MenuItem>
    ));
  const AssigneeDepartment = [
    ...new Set(userData.map((user) => user.department)),
  ].map((department, index) => (
    <MenuItem key={index} value={department}>
      {department}
    </MenuItem>
  ));

  // If selectedAsset is undefined or null, don't render the form yet
  if (!selectedAsset) {
    return <Typography>Loading...</Typography>; // Show loading or nothing
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <div className="flex justify-between mb-4">
        <Typography sx={{ fontFamily: "Popins-Semibold" }} variant="h4">
          Assign Asset
        </Typography>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleCloseModal}
          className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
        >
          <IoMdClose />
        </motion.button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Section 1: Assignee Details */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontFamily: "Popins-Semibold", color: "gray" }}
        >
          Assignee Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                name="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {AssigneeDepartment}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Assignee Name"
              name="name"
              value={formData.name || ""}
              onChange={handleAssigneeChange}
              fullWidth
              select
            >
              {AssigneeOptions}
            </TextField>
          </Grid>
        </Grid>

        {/* Section 2: Asset Details */}
        <Typography
          variant="h6"
          sx={{ my: 2, fontFamily: "Popins-Semibold", color: "gray" }}
        >
          Asset Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Asset Number"
              name="assetNumber"
              value={formData.assetNumber}
              onChange={handleAssetChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Asset Type"
              name="assetType"
              value={formData.assetType}
              onChange={handleAssetChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Asset Name"
              name="assetName"
              value={formData.assetName}
              onChange={handleAssetChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand Name"
              name="brandName"
              value={formData.brandName}
              onChange={handleAssetChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleAssetChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleAssetChange}
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Assignment Date"
              name="assignmentDate"
              value={formData.assignmentDate}
              onChange={handleAssetChange}
              disabled
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              label="Assignment Time"
              name="assignment time"
              value={formData.assignmentTime}
              onChange={handleAssetChange}
              disabled
              fullWidth
              required
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Assignment Time"
              name="assignment time"
              value={dayjs()}
              onChange={handleAssetChange}
              disabled
              fullWidth
              required
              renderInput={(params) => (
                <TextField {...params} className="w-full md:w-1/4" />
              )}
            />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <button
            type="submit"
            className="px-6 w-full py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
          >
            Assign
          </button>
        </Box>
      </form>
    </Box>
  );
}
