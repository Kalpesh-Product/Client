import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { toast } from "sonner";
import axios from "axios";

const AddDesignationForm = () => {
  const [departments, setDepartments] = useState([]);
  const [expandedDesignation, setExpandedDesignation] = useState(null);

  const handleToggleResponsibilities = (designationId) => {
    setExpandedDesignation((prev) =>
      prev === designationId ? null : designationId
    );
  };

  // State and handlers (add these to your component)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    responsibilities: [],
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/departments/get-departments"
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResponsibilityChange = (index, value) => {
    setFormData((prev) => {
      const updatedResponsibilities = [...prev.responsibilities];
      updatedResponsibilities[index] = value;
      return { ...prev, responsibilities: updatedResponsibilities };
    });
  };

  const handleAddResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const handleAddDesignation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/designations/add-designation",
        formData
      );
      toast.success("Designation added successfully");
      setFormData({ title: "", department: "", responsibilities: [] });
    } catch (error) {
      console.error("Error adding designation:", error);
      toast.error("Failed to add designation");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-md p-2">
        <h1 className="text-xl font-bold mb-4">Designations</h1>
        <p className="text-gray-600">
          Here you can manage designations for your company.
        </p>
        <Box component="form" onSubmit={handleAddDesignation}>
          <TextField
            select
            label="Department"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Designation Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <h3 className="text-lg font-semibold mt-4">Responsibilities</h3>
          {formData.responsibilities.map((responsibility, index) => (
            <TextField
              key={index}
              label={`Responsibility ${index + 1}`}
              value={responsibility}
              onChange={(e) =>
                handleResponsibilityChange(index, e.target.value)
              }
              fullWidth
              margin="normal"
            />
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddResponsibility}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Add Responsibility
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>

        <div>
          <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              Departments
            </Typography>
            <Grid container spacing={4}>
              {departments.map((department) => (
                <Grid item xs={12} sm={6} md={4} key={department._id}>
                  <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {department.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        gutterBottom
                      >
                        Department ID: {department.departmentId}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        <strong>Company:</strong>{" "}
                        {department.company?.companyName || "N/A"}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        <strong>Designations:</strong>
                      </Typography>
                      <Box>
                        {department.designations?.length > 0 ? (
                          department.designations.map((designation) => (
                            <Accordion
                              key={designation._id}
                              sx={{ marginBottom: 1 }}
                            >
                              <AccordionSummary
                                expandIcon={<button>open</button>}
                                aria-controls={`panel-${designation._id}-content`}
                                id={`panel-${designation._id}-header`}
                              >
                                <Chip
                                  label={designation.title}
                                  color="primary"
                                  variant="outlined"
                                  sx={{ cursor: "pointer" }}
                                />
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  gutterBottom
                                >
                                  Responsibilities:
                                </Typography>
                                <ul>
                                  {designation.responsibilities?.map(
                                    (resp, index) => (
                                      <li
                                        key={index}
                                        style={{ marginBottom: "4px" }}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {resp}
                                        </Typography>
                                      </li>
                                    )
                                  ) || (
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      None
                                    </Typography>
                                  )}
                                </ul>
                              </AccordionDetails>
                            </Accordion>
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No designations available
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AddDesignationForm;
