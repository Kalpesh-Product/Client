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
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";

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

  const steps = ["Assign Asset", "Verify Details"];
  const handleNextStep = (e, handleNext) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <>
      <FormStepper
        steps={steps}
        handleClose={handleCloseModal}
        children={(activeStep, handleNext) => {
          if (activeStep === 0) {
            return (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Popins-Semibold",
                    color: "gray",
                  }}
                >
                  Asset Details
                </Typography>
                <div className="grid grid-cols-2 gap-7 mb-10 mt-5">
                  {/* Asset Number */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Asset Number</h1>
                    <span>{formData.assetNumber || "N/A"}</span>
                  </div>

                  {/* Asset Type */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Asset Type</h1>
                    <span>{formData.assetType || "N/A"}</span>
                  </div>

                  {/* Asset Name */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Asset Name</h1>
                    <span>{formData.assetName || "N/A"}</span>
                  </div>

                  {/* Brand Name */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Brand Name</h1>
                    <span>{formData.brandName || "N/A"}</span>
                  </div>

                  {/* Location */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Location</h1>
                    <span>{formData.location || "N/A"}</span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Status</h1>
                    <span>{formData.status || "N/A"}</span>
                  </div>

                  {/* Assignment Date */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Assignment Date</h1>
                    <span className="pl-4">{formData.assignmentDate || "N/A"}</span>
                  </div>

                  {/* Assignment Time */}
                  <div className="flex justify-between py-2 border-b">
                    <h1 className="font-semibold">Assignment Time</h1>
                    <span>{formData.assignmentTime || "N/A"}</span>
                  </div>
                </div>

                <Box sx={{ maxWidth: 600, mx: "auto" }}>
                  <form onSubmit={(e) => handleNextStep(e, handleNext)}>
                    {/* Section 1: Assignee Details */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Popins-Semibold",
                        color: "gray",
                      }}
                    >
                      Assignee Details
                    </Typography>
                    <Grid
                      container
                      spacing={3}
                      sx={{ marginBottom: 3, marginTop: 1 }}
                    >
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Department</InputLabel>
                          <Select
                            label="Department"
                            name="department"
                            value={selectedDepartment}
                            onChange={(e) =>
                              setSelectedDepartment(e.target.value)
                            }
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

                    <Box sx={{ mt: 3 }}>
                      <button
                        type="submit"
                        className="px-6 w-full py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
                      >
                        Next
                      </button>
                    </Box>
                  </form>
                </Box>
              </>
            );
          } else if (activeStep === 1) {
            return (
              <>
                <div className="grid grid-cols-2 gap-7 my-10">
                  {Object.entries(formData)
                    .reduce(
                      (columns, [key, value], index) => {
                        const formattedKey = key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());

                        // Alternate between the two columns
                        if (index % 2 === 0) {
                          columns[0].push(
                            <div
                              key={key}
                              className="flex justify-between  py-2 border-b"
                            >
                              <h1 className="font-semibold">{formattedKey}</h1>
                              <span className="pl-4">
                                {value ? value.toString() : "N/A"}
                              </span>
                            </div>
                          );
                        } else {
                          columns[1].push(
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b"
                            >
                              <h1 className="font-semibold">{formattedKey}</h1>
                              <span className="pl-4">
                                {value ? value.toString() : "N/A"}
                              </span>
                            </div>
                          );
                        }
                        return columns;
                      },
                      [[], []] // Initial columns: two empty arrays
                    )
                    .map((column, colIndex) => (
                      <div key={colIndex}>{column}</div>
                    ))}
                </div>

                <WonoButton content={"Submit"} onClick={handleSubmit} />
              </>
            );
          }
        }}
      />
    </>
  );
}
