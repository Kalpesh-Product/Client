import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const AddAssetForm = ({title, handleClose}) => {
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    purchaseDate: "",
    assignedTo: "",
    status: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Asset Data Submitted:", formData);
    handleClose()
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, borderRadius: 2, fontFamily:'Popins-SemiBold' }}>
        <div className="flex justify-between align-middle mb-4">
      <Typography sx={{fontFamily:'Popins-SemiBold'}} variant="h5" gutterBottom>
        {title}
      </Typography>
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
      <form onSubmit={handleSubmit}>
        <Grid  container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Asset Name"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Asset Type"
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              <MenuItem value="Hardware">Hardware</MenuItem>
              <MenuItem value="Software">Software</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Purchase Date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Assigned To"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., John Doe"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="In Repair">In Repair</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Value ($)"
              name="value"
              value={formData.value}
              onChange={handleChange}
              type="number"
              fullWidth
              placeholder="e.g., 500"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <button className="wono-blue-dark p-2 rounded-md w-full font-[Popins-Regular]" type="submit" onSubmit={handleClose} >
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddAssetForm;
