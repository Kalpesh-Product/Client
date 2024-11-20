import React, { useState } from "react";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

const departments = ["HR", "Tech", "Sales", "Marketing"];
const categories = ["Laptop", "Monitor", "Headphones", "Keyboard", "Mice"];
const brands = ["Dell", "HP", "Apple", "Lenovo"];
const models = ["Inspiron 15", "Pavilion 14", "MacBook Air M2", "ThinkPad X1 Carbon"];

export default function AssignAssetForm({handleCloseModal}) {
  const [assigneeDetails, setAssigneeDetails] = useState({ department: "", name: "" });
  const [assetDetails, setAssetDetails] = useState({
    category: "",
    brand: "",
    model: "",
    issueDate: new Date().toLocaleDateString(),  // Current date as a string
  });

  const handleAssigneeChange = (e) => {
    const { name, value } = e.target;
    setAssigneeDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAssetChange = (e) => {
    const { name, value } = e.target;
    setAssetDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Assignee Details:", assigneeDetails);
    console.log("Asset Details:", assetDetails);
    handleCloseModal()
    toast.success("Asset assigned")
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto"}}>
      <div className="flex justify-between mb-4">
      <Typography sx={{fontFamily:'Popins-Semibold'}} variant="h4">
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
        <Typography variant="h6" sx={{ mb: 2, fontFamily:'Popins-Semibold', color:'gray' }}>
        Assignee Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                name="department"
                value={assigneeDetails.department}
                onChange={handleAssigneeChange}
              >
                {departments.map((dept, index) => (
                  <MenuItem key={index} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={assigneeDetails.name}
              onChange={handleAssigneeChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Section 2: Asset Details */}
        <Typography variant="h6" sx={{ my: 2, fontFamily:'Popins-Semibold',color:'gray' }}>
          Asset Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={assetDetails.category}
                onChange={handleAssetChange}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                label="Brand"
                name="brand"
                value={assetDetails.brand}
                onChange={handleAssetChange}
              >
                {brands.map((brand, index) => (
                  <MenuItem key={index} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Model</InputLabel>
              <Select
                label="Model"
                name="model"
                value={assetDetails.model}
                onChange={handleAssetChange}
              >
                {models.map((model, index) => (
                  <MenuItem key={index} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Issue Date"
              value={assetDetails.issueDate}
              disabled  // Make the date field non-editable
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <button type="submit" className="px-6 w-full py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            Assign
          </button>
        </Box>
      </form>
    </Box>
  );
}
