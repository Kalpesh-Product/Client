import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { motion, steps } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";
import assetsData from "../../../pages/cms/asset/temp_db/MaintainanceAssets.json";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";

const AddAssetForm = ({ title, handleClose, user }) => {
  const [formData, setFormData] = useState({
    assetNumber: "0001",
    department: "",
    category: "",
    brandName: "",
    modelName: "",
    quantity: "",
    price: "",
    totalPrice: "",
    vendorName: "",
    purchaseDate: dayjs(),
    warranty: "",
    location: "",
    status: "active",
  });

  const storedUser = user;
  console.log("passed user :", storedUser.department);

  const assetTypes = ["Laptop", "Monitor", "Keyboard", "Mouse", "Headphones"];
  const departments = ["IT", "Maintainance", "Admin"];

  // Filter the departments based on the user's department
  const filteredDepartments = departments.filter(
    (dept) => dept === storedUser.department
  );

  console.log(filteredDepartments); // ["IT"] if user.department is "IT"

  const locations = ["ST-701A", "ST-701B", "ST-601A", "ST-601B"];

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
  
      // Update totalPrice if price or quantity changes
      if (name === "price" || name === "quantity") {
        const price = name === "price" ? value : prevData.price; // Get the updated price
        const quantity = name === "quantity" ? value : prevData.quantity; // Get the updated quantity
        updatedData.totalPrice = price && quantity ? price * quantity : ""; // Calculate totalPrice
      }
  
      return updatedData;
    });
  };

  const requests = [];

  const handleNextStep = (e, handleNext) => {
    e.preventDefault();
    handleNext();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Retrieve the existing requests from localStorage or initialize an empty array
      const storedRequests = JSON.parse(localStorage.getItem("asset")) || [];

      if (user.role === "Admin") {
        console.log(formData);
        const newAsset = { ...formData, id: assetsData.length + 1 };
        assetsData.push(newAsset);
        toast.success("Asset added successfully!");
      } else if (user.role === "Employee") {
        toast.success("Request sent to admin");

        // Create a new request and add it to the stored requests array
        const addRequest = { ...formData, id: storedRequests.length + 1 };
        const updatedRequests = [...storedRequests, addRequest];

        // Save the updated requests array back to localStorage
        localStorage.setItem("asset", JSON.stringify(updatedRequests));
      }
    } catch (error) {
      toast.error("Error adding asset");
    } finally {
      console.log(formData);
      handleClose();

      // For debugging
      const currentRequests = JSON.parse(localStorage.getItem("asset"));
      console.log(currentRequests);
    }
  };

  const steps = ["Add Asset", "Verify Details"];
  return (
    <>
      <FormStepper
        steps={steps}
        handleClose={handleClose}
        children={(activeStep, handleNext) => {
          if (activeStep === 0) {
            return (
              <>
                <Box
                  sx={{
                    borderRadius: 2,
                    fontFamily: "Popins-SemiBold",
                  }}>
                  <div className="flex justify-end align-middle mb-4">
                    {/* <Typography
                      sx={{ fontFamily: "Popins-SemiBold" }}
                      variant="h5"
                      gutterBottom
                    >
                      {title}
                    </Typography> */}
                  </div>
                  <form onSubmit={(e) => handleNextStep(e, handleNext)}>
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
                          value={formData.department}
                          onChange={handleChange}>
                          {user.department === "TopManagement"
                            ? departments.map((dept, index) => {
                                return (
                                  <MenuItem key={index} value={dept}>
                                    {dept}
                                  </MenuItem>
                                );
                              })
                            : filteredDepartments.map((dept, index) => (
                                <MenuItem key={index} value={dept}>
                                  {dept}
                                </MenuItem>
                              ))}
                        </TextField>
                      </Grid>

                      {/* Asset Type Dropdown */}
                      <Grid item xs={12}>
                        <TextField
                          label="Category"
                          name="category"
                          select
                          fullWidth
                          value={formData.category}
                          onChange={handleChange}
                          sx={{ textAlign: "start" }}>
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
                          label="Brand Name"
                          name="brandName"
                          fullWidth
                          value={formData.brandName}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Brand Name */}
                      <Grid item xs={12}>
                        <TextField
                          label="Model Name"
                          name="modelName"
                          fullWidth
                          value={formData.modelName}
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
                          value={formData.totalPrice}
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Purchase Date"
                            value={formData.purchaseDate}
                            onChange={(newDate) => {
                              if (newDate) {
                                setFormData({
                                  ...formData,
                                  purchaseDate: newDate, // Store the Dayjs object
                                });
                              }
                            }}
                            format="DD/MM/YYYY" // Display format in the DatePicker
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="w-full md:w-1/4"
                              />
                            )}
                          />
                        </LocalizationProvider>
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
                          onChange={handleChange}>
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
                      <button
                        type="submit"
                        className="p-2 wono-blue-dark text-white rounded-md w-full">
                        Next
                      </button>
                    </div>
                  </form>
                </Box>
              </>
            );
          } else if (activeStep === 1) {
            return (
              <>
                <h1 className="text-2xl mb-4 font-semibold text-center">
                  Are the provided details correct ?
                </h1>
                <div>
                  <div className="grid grid-cols-2 gap-7">
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
                                className="flex justify-between py-2 border-b">
                                <h1 className="font-semibold">
                                  {formattedKey}
                                </h1>
                                <span>{value ? value.toString() : "N/A"}</span>
                              </div>
                            );
                          } else {
                            columns[1].push(
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b">
                                <h1 className="font-semibold">
                                  {formattedKey}
                                </h1>
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
                </div>
              </>
            );
          }
        }}
      />
    </>
  );
};

export default AddAssetForm;
