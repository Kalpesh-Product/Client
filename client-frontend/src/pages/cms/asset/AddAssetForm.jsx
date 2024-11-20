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
import { toast } from "sonner";

const AddAssetForm = ({ title, handleClose, user }) => {
  const [formData, setFormData] = useState({
    assetNumber: "0001",
    assetType: "",
    assetName: "",
    brandName: "",
    quantity: "",
    price: "",
    vendorName: "",
    purchaseDate: "",
    warranty: "",
    location: "",
    status: "active",
  });

  const storedUser = user;
  console.log(storedUser.department)

  const assetTypes = ["Laptop", "Monitor", "Keyboard", "Mouse", "Headphones"];
  const departments = ["IT", "HR", "Finance", "Marketing", "Maintainance"];
  const locations = ["ST-701A", "ST-701B", "ST-601A", "ST-601B"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    handleClose();
    toast.success('Asset added')
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        fontFamily: "Popins-SemiBold",
      }}
    >
      <div className="flex justify-between align-middle mb-4">
        <Typography
          sx={{ fontFamily: "Popins-SemiBold" }}
          variant="h5"
          gutterBottom
        >
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
        <div className="grid grid-cols-2 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              label="Asset Number"
              value={formData.assetNumber}
              fullWidth
              disabled
            />
          </Grid>

          {/* Department Dropdown */}
          <Grid item xs={12}>
            <TextField
              label="Department"
              name="department"
              select
              fullWidth
              disabled
              value={user.department}
              onChange={handleChange}
            >
              {departments.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Asset Type Dropdown */}
          <Grid item xs={12}>
            <TextField
              label="Asset Type"
              name="assetType"
              select
              fullWidth
              value={formData.assetType}
              onChange={handleChange}
            >
              {assetTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Asset Name */}
          <Grid item xs={12}>
            <TextField
              label="Asset Name"
              name="assetName"
              fullWidth
              value={formData.assetName}
              onChange={handleChange}
            />
          </Grid>

          {/* Brand Name */}
          <Grid item xs={12}>
            <TextField
              label="Brand Name"
              name="brandName"
              fullWidth
              value={formData.brandName}
              onChange={handleChange}
            />
          </Grid>

          {/* Quantity (Months) */}
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          {/* Price */}
          <Grid item xs={12}>
            <TextField
              label="Total Price"
              name="totalPrice"
              type="number"
              fullWidth
              disabled
              value={(formData.price * formData.quantity)}
              onChange={handleChange}
            />
          </Grid>

          {/* Vendor Name */}
          <Grid item xs={12}>
            <TextField
              label="Vendor Name"
              name="vendorName"
              fullWidth
              value={formData.vendorName}
              onChange={handleChange}
            />
          </Grid>

          {/* Purchase Date */}
          <Grid item xs={12}>
            <TextField
              label="Purchase Date"
              name="purchaseDate"
              type="date"
              fullWidth
              value={formData.purchaseDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Warranty */}
          <Grid item xs={12}>
            <TextField
              label="Warranty (in months)"
              name="warranty"
              fullWidth
              value={formData.warranty}
              onChange={handleChange}
            />
          </Grid>
          {/* Warranty */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              select
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
            >
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </div>
        {/* Submit Button */}
        <div className="mt-4">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddAssetForm;
