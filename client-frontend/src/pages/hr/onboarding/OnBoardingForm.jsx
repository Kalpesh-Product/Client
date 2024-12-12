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
import ReviewData from "../../../components/ReviewData";

const OnBoardingForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    empId: "", // Unique and required
    name: "",
    gender: "",
    dob: null, // ISO format
    role: "",
    department: [], // Array of ObjectId
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    martialStatus: "",
    spouseName: "",
    spouseOccupation: "",
    email: "",
    phone: "",
    reportsTo: null, // ObjectId reference

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

    workLocation: "",
    workType: "",
    employeeType: "",
    startDate: null,
    shift: "",
    workPolicy: "",
    attendanceSource: "TimeClock",
    pfAccountNumber: "",
    esiAccountNumber: "",

    selectedServices: [],
    company: "67586c2d95a813e39504d625", // ObjectId
    assignedAsset: [],
    assignedMembers: [],
    refreshToken: null,
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
    try {
      // Auto-generate empId if not provided
      const empId = formData.empId || `E${Math.floor(Math.random() * 10000)}`;

      // Prepare the payload with all fields
      const payload = {
        ...formData,
        empId, // Include auto-generated empId
        department: Array.isArray(formData.department)
          ? formData.department
          : [formData.department], // Ensure department is an array
        dob: formData.dob ? new Date(formData.dob).toISOString() : null, // Convert dob to ISO format
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null, // Convert startDate to ISO format
        address: {
          ...formData.address,
        },
        kycDetails: {
          ...formData.kycDetails,
        },
        bankDetails: {
          ...formData.bankDetails,
        },
        selectedServices: formData.selectedServices || [], // Default empty array
        assignedAsset: formData.assignedAsset || [], // Default empty array
        assignedMembers: formData.assignedMembers || [], // Default empty array
      };

      console.log("Submitting Form Payload:", payload);

      // Call the API
      const response = await axios.post(
        "http://localhost:5000/api/users/create-user",
        payload
      );
      toast.success("User Created Successfully");
      console.log("User Created Successfully:", response.data);

      // Handle success: Close modal or reset form
      if (handleClose) handleClose();
    } catch (error) {
      console.error(
        "Error Creating User:",
        error.response?.data || error.message
      );
      alert("Failed to create user. Please check the input data.");
    }
  };

  const steps = [
    "Personal",
    "Contact",
    "Job Details",
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className="flex flex-col h-[70vh] overflow-y-scroll gap-10"
                >
                  <div className="flex flex-col justify-center w-full">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-500 my-3">
                        Personal Details
                      </h1>
                      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <TextField
                          label="Name"
                          sx={{borderRadius:'20px'}}
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
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-500 my-3">
                        Family Details
                      </h1>
                      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <TextField
                          label="Father/Guardian Name"
                          value={formData.fatherName}
                          onChange={(e) =>
                            handleChange("fatherName", e.target.value)
                          }
                          fullWidth
                          required
                        />
                        <TextField
                          label="Mother Name"
                          value={formData.motherName}
                          onChange={(e) =>
                            handleChange("motherName", e.target.value)
                          }
                          fullWidth
                          required
                        />
                        <TextField
                          label="Father/Guardian Occupation"
                          value={formData.fatherOccupation}
                          onChange={(e) =>
                            handleChange("fatherOccupation", e.target.value)
                          }
                          fullWidth
                          required
                        />
                        <TextField
                          label="Mother Occupation"
                          value={formData.motherOccupation}
                          onChange={(e) =>
                            handleChange("motherOccupation", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-500 my-3">
                        Martial Details
                      </h1>
                      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <FormControl fullWidth>
                          <InputLabel>Martial Status</InputLabel>
                          <Select
                            value={formData.martialStatus}
                            onChange={(e) =>
                              handleChange("martialStatus", e.target.value)
                            }
                            required
                          >
                            <MenuItem value="Male">Married</MenuItem>
                            <MenuItem value="Female">UnMarried</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          label="Spouse Name"
                          value={formData.spouseName}
                          onChange={(e) =>
                            handleChange("spouseName", e.target.value)
                          }
                          fullWidth
                          required
                        />
                        <TextField
                          label="Spouse Occupation"
                          value={formData.spouseOccupation}
                          onChange={(e) =>
                            handleChange("spouseOccupation", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="contained" color="primary" type="submit">
                        Next
                      </Button>
                    </div>
                  </div>
                </form>
              </LocalizationProvider>
            );
          } else if (activeStep === 1) {
            // Step 2: Contact Information
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className="flex flex-col h-full gap-10"
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
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="contained" color="primary" type="submit">
                    Next
                  </Button>
                </div>
              </form>
            );
          } else if (activeStep === 2) {
            // Step 3: Job info
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className="flex flex-col h-full gap-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/DD/YYYY"
                      value={
                        formData.startDate ? dayjs(formData.startDate) : null
                      }
                      onChange={(newValue) => {
                        if (newValue) {
                          const isoDate = dayjs(newValue).toISOString();
                          handleChange("startDate", isoDate); // Update with ISO format
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
                          <MenuItem key={department._id} value={department._id}>
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
                    <FormControl fullWidth>
                      <InputLabel>Shift</InputLabel>
                      <Select
                        value={formData.shift}
                        onChange={(e) => handleChange("shift", e.target.value)}
                        required
                      >
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Night">Night</MenuItem>
                        <MenuItem value="Flexible">Flexible</MenuItem>
                      </Select>
                    </FormControl>
                  </LocalizationProvider>

                  <FormControl fullWidth>
                    <InputLabel>Attendance Source</InputLabel>
                    <Select
                      value={formData.attendanceSource}
                      onChange={(e) =>
                        handleChange("attendanceSource", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="TimeClock">TimeClock</MenuItem>
                      <MenuItem value="Manual">Manual</MenuItem>
                      <MenuItem value="Biometric">Biometric</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Work Location</InputLabel>
                    <Select
                      value={formData.workLocation}
                      onChange={(e) =>
                        handleChange("workLocation", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="Panaji-ST-701">Panaji-ST-701</MenuItem>
                      <MenuItem value="Panaji-ST-601">Panaji-ST-601</MenuItem>
                      <MenuItem value="Panaji-ST-602">Panaji-ST-602</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Policy</InputLabel>
                    <Select
                      value={formData.workPolicy}
                      onChange={(e) =>
                        handleChange("workPolicy", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="Default">Default</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Employee Type</InputLabel>
                    <Select
                      value={formData.employeeType}
                      onChange={(e) =>
                        handleChange("employeeType", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="Day">Full-Time</MenuItem>
                      <MenuItem value="Night">Intern</MenuItem>
                      <MenuItem value="Flexible">Part-Time</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="contained" color="primary" type="submit">
                    Next
                  </Button>
                </div>
              </form>
            );
          } else if (activeStep === 3) {
            // Step 4: KYC Details
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className="flex flex-col h-full gap-10"
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
            );
          } else if (activeStep === 4) {
            // Step 5: Bank Details
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className="flex flex-col h-full gap-10"
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
                  <TextField
                    label="PF Account Number"
                    value={formData.pfAccountNumber}
                    onChange={(e) =>
                      handleChange("pfAccountNumber", e.target.value)
                    }
                    fullWidth
                    required
                  />
                  <TextField
                    label="ESI Account Number"
                    value={formData.esiAccountNumber}
                    onChange={(e) =>
                      handleChange("esiAccountNumber", e.target.value)
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
            );
          } else if (activeStep === 5) {
            // Final Step: Review
            return (
              <ReviewData formData={formData} handleSubmit={handleSubmit} />
            );
          }
        }}
      />
    </>
  );
};

export default OnBoardingForm;
