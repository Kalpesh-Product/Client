import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WonoButton from "../../../components/Buttons/WonoButton";
import FormStepper from "../../../components/FormStepper";

const OnBoardingForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    name: "",
    gender: "",
    dob: null,
    role: "",
    department: "",
    designation: "",

    // Step 2: Contact Information
    email: "",
    phone: "",
    reportsTo: "",

    // Step 3: Address Information
    street: "",
    city: "",
    state: "",
    zip: "",

    // Step 4: KYC Details
    aadhaar: "",
    pan: "",

    // Step 5: Bank Details
    bankName: "",
    accountNumber: "",
    ifsc: "",

    // Additional Metadata (Optional)
    selectedServices: [],
    company: "",
    assignedAsset: null,
    assignedMembers: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const empId = `E${Math.floor(Math.random() * 10000)}`; // Placeholder for auto-generated ID
    const submittedData = { ...formData, empId };

    // Perform submission logic here (e.g., API call, console.log, etc.)
    console.log("Form Submitted:", submittedData);

    // Close the modal or reset the form if needed
    if (handleClose) handleClose();
  };

  const steps = [
    "Personal",
    "Contact",
    "Address",
    "KYC",
    "Bank Details",
    "Verify",
  ];

  return (
    <>
      <FormStepper
        steps={steps}
        handleClose={handleClose}
        children={(activeStep, handleNext) => {
          if (activeStep === 0) {
            // Step 1: Personal Information
            return (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent page reload
                      handleNext();
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        fullWidth
                        required
                      />
                      <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={formData.gender}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                          required
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                      <DesktopDatePicker
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={(newValue) => handleChange("dob", newValue)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth required />
                        )}
                      />
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={formData.role}
                          onChange={(e) => handleChange("role", e.target.value)}
                          required
                        >
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Manager">Manager</MenuItem>
                          <MenuItem value="Employee">Employee</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                          value={formData.department}
                          onChange={(e) =>
                            handleChange("department", e.target.value)
                          }
                          required
                        >
                          <MenuItem value="Tech">Tech</MenuItem>
                          <MenuItem value="HR">HR</MenuItem>
                          <MenuItem value="Finance">Finance</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Designation</InputLabel>
                        <Select
                          value={formData.designation}
                          onChange={(e) =>
                            handleChange("designation", e.target.value)
                          }
                          required
                        >
                          <MenuItem value="Software Engineer">
                            Software Engineer
                          </MenuItem>
                          <MenuItem value="HR Manager">HR Manager</MenuItem>
                          <MenuItem value="Accountant">Accountant</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="contained" color="primary" type="submit">
                        Next
                      </Button>
                    </div>
                  </form>
                </LocalizationProvider>
              </>
            );
          } else if (activeStep === 1) {
            // Step 2: Contact Information
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                      required
                    />
                    <FormControl fullWidth>
                      <InputLabel>Reports To</InputLabel>
                      <Select
                        value={formData.reportsTo}
                        onChange={(e) =>
                          handleChange("reportsTo", e.target.value)
                        }
                        required
                      >
                        <MenuItem value="AdminID1">Admin 1</MenuItem>
                        <MenuItem value="AdminID2">Admin 2</MenuItem>
                        <MenuItem value="AdminID3">Admin 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Next
                    </Button>
                  </div>
                </form>
              </>
            );
          } else if (activeStep === 2) {
            // Step 3: Address Information
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Street Address"
                      value={formData.street}
                      onChange={(e) => handleChange("street", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Zip Code"
                      value={formData.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Next
                    </Button>
                  </div>
                </form>
              </>
            );
          } else if (activeStep === 3) {
            // Step 4: KYC Details
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Aadhaar Number"
                      value={formData.aadhaar}
                      onChange={(e) => handleChange("aadhaar", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="PAN Number"
                      value={formData.pan}
                      onChange={(e) => handleChange("pan", e.target.value)}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Next
                    </Button>
                  </div>
                </form>
              </>
            );
          } else if (activeStep === 4) {
            // Step 5: Bank Details
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => handleChange("bankName", e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleChange("accountNumber", e.target.value)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="IFSC Code"
                      value={formData.ifsc}
                      onChange={(e) => handleChange("ifsc", e.target.value)}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </>
            );
          } else if (activeStep === 5) {
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

export default OnBoardingForm;
