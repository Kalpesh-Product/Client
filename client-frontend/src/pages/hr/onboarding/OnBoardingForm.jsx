import React, { useState, useEffect } from "react";
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
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "sonner";

const OnBoardingForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    empId: "", // Add empId as it's required and unique
    name: "",
    gender: "",
    dob: null, // Will be converted to ISO format before sending to backend
    role: "",
    department: [], // Adjusted to an array as per schema

    // Step 2: Contact Information
    email: "",
    phone: "",

    reportsTo: null, // Changed to null, should store an ObjectId

    // Step 3: Address Information
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },

    // Step 4: KYC Details
    kycDetails: {
      aadhaar: "",
      pan: "",
    },

    // Step 5: Bank Details
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifsc: "",
    },

    // Additional Metadata
    selectedServices: [],
    company: "67586c2d95a813e39504d625", // Remains as is (ObjectId reference)
    assignedAsset: [], // Adjusted to an array
    assignedMembers: [], // Adjusted to an array
    refreshToken: null, // Optional field added
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments from the API
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/departments/get-departments"
        ); // Correct endpoint
        setDepartments(response.data.departments); // Assuming response data has a `departments` array
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  console.log(departments);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear designation if department changes
    if (field === "department") {
      setFormData((prev) => ({
        ...prev,
        designation: "",
      }));
    }
  };

  //get admin details
  const getAdminData = () => {
    const selectedDepartment = departments.find(
      (department) => department._id === formData.department
    );
    return selectedDepartment ? selectedDepartment.admin : [];
  };

  // Get designations for the selected department
  const getDesignations = () => {
    const selectedDepartment = departments.find(
      (department) => department._id === formData.department
    );
    return selectedDepartment ? selectedDepartment.designations : [];
  };


  const handleSubmit = async () => {
    const empId = `E${Math.floor(Math.random() * 10000)}`; // Auto-generate empId
    const submittedData = { ...formData, empId };

    try {
      // Send the data to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/users/create-user",
        submittedData
      );

      console.log("Form Submitted Successfully:", response.data);

      // Optional: Show success notification or reset the form
      toast.success("User added successfully")
      setFormData({
        // Reset form data here if needed
        empId: "",
        name: "",
        gender: "",
        dob: null,
        role: "",
        department: [],
        designation: "",
        email: "",
        phone: "",
        reportsTo: null,
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        kycDetails: {
          aadhaar: "",
          pan: "",
        },
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifsc: "",
        },
        selectedServices: [],
        company: "67586c2d95a813e39504d625",
        assignedAsset: [],
        assignedMembers: [],
      });

      // Close the modal
      if (handleClose) handleClose();
    } catch (error) {
      console.error("Error Submitting Form:", error);
      alert("Failed to create user. Please try again.");
    }
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
                      e.preventDefault();
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
                        value={formData.dob ? dayjs(formData.dob) : null}
                        onChange={(newValue) => {
                          if (newValue) {
                            const isoDate = dayjs(newValue).toISOString();
                            handleChange("dob", isoDate);
                          }
                        }}
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
                          {departments.map((department) => (
                            <MenuItem
                              key={department._id}
                              value={department._id}
                            >
                              {department.name}
                            </MenuItem>
                          ))}
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
                          disabled={!formData.department}
                        >
                          {getDesignations().map((designation, index) => (
                            <MenuItem key={index} value={designation}>
                              {designation}
                            </MenuItem>
                          ))}
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
                    e.preventDefault();
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
                        <MenuItem value={getAdminData()._id}>
                          {getAdminData().name}
                        </MenuItem>
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
                    e.preventDefault();
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Street Address"
                      value={formData.address.street}
                      onChange={(e) =>
                        handleChange("address", {
                          ...formData.address,
                          street: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="City"
                      value={formData.address.city}
                      onChange={(e) =>
                        handleChange("address", {
                          ...formData.address,
                          city: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="State"
                      value={formData.address.state}
                      onChange={(e) =>
                        handleChange("address", {
                          ...formData.address,
                          state: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Zip Code"
                      value={formData.address.zip}
                      onChange={(e) =>
                        handleChange("address", {
                          ...formData.address,
                          zip: e.target.value,
                        })
                      }
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
                    e.preventDefault();
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Aadhaar Number"
                      value={formData.kycDetails.aadhaar}
                      onChange={(e) =>
                        handleChange("kycDetails", {
                          ...formData.kycDetails,
                          aadhaar: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="PAN Number"
                      value={formData.kycDetails.pan}
                      onChange={(e) =>
                        handleChange("kycDetails", {
                          ...formData.kycDetails,
                          pan: e.target.value,
                        })
                      }
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
                    e.preventDefault();
                    handleNext();
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Bank Name"
                      value={formData.bankDetails.bankName}
                      onChange={(e) =>
                        handleChange("bankDetails", {
                          ...formData.bankDetails,
                          bankName: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Account Number"
                      value={formData.bankDetails.accountNumber}
                      onChange={(e) =>
                        handleChange("bankDetails", {
                          ...formData.bankDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="IFSC Code"
                      value={formData.bankDetails.ifsc}
                      onChange={(e) =>
                        handleChange("bankDetails", {
                          ...formData.bankDetails,
                          ifsc: e.target.value,
                        })
                      }
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
          } else if (activeStep === 5) {
            const renderNestedObject = (obj, parentKey) => {
              return Object.entries(obj).map(([key, value]) => {
                const formattedKey = `${parentKey} ${key}`
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <div
                    key={`${parentKey}-${key}`}
                    className="flex justify-between py-2 border-b"
                  >
                    <h1 className="font-semibold">{formattedKey}</h1>
                    <span>{value ? value.toString() : "N/A"}</span>
                  </div>
                );
              });
            };

            return (
              <>
                <h1 className="text-2xl mb-4 font-semibold text-center">
                  Are the provided details correct?
                </h1>
                <div>
                  <div className="grid grid-cols-2 gap-7">
                    {Object.entries(formData)
                      .reduce(
                        (columns, [key, value], index) => {
                          // Handle nested objects
                          if (
                            typeof value === "object" &&
                            value !== null &&
                            !Array.isArray(value)
                          ) {
                            const nestedElements = renderNestedObject(
                              value,
                              key
                            );
                            columns[index % 2].push(...nestedElements);
                          } else {
                            // Render simple values
                            const formattedKey = key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());

                            columns[index % 2].push(
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b"
                              >
                                <h1 className="font-semibold">
                                  {formattedKey}
                                </h1>
                                <span>{value ? value.toString() : "N/A"}</span>
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
