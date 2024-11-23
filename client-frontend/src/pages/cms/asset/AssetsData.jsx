import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { NewModal } from "../../../components/NewModal";
import AssignAssetForm from "./AssignAssetForm";
import axios from "axios";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { toast } from "sonner";
import assignedAssetsData from "./temp_db/AssignedAssets.json";
import userData from "../../../dummyData/dummyData.json";

const AssetsData = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const { brand } = location.state || { brand: "Unknown Brand" };
  const navigate = useNavigate();
  const [asset, setAsset] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [formData, setFormData] = useState(assignedAssetsData || {}); // Form data state
  const [revoked, setRevoked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [processedData, setProcessedData] =useState(assignedAssetsData.IT.map((row, index) => ({
    ...row,
    id: index, // Assign a unique id based on the index
  })))

  const storedUser = localStorage.getItem("user");

  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleRevoke = (row) => {
    setAsset(row);
    handleOpenModal("revoke");
  };

  const handleRevokeAsset = () => {
    // Update the asset status to "Revoked"
    const updatedRows = processedData.map((row) =>
      row.id === asset.id ? { ...row, status: "Revoked" } : row
    );
    setProcessedData(updatedRows); // Update the state
    rows.status === "Revoked" && setRevoked(true);
    handleCloseModal(); // Close the modal
    toast.success(`Asset revoked for: ${asset && asset.assigneeName}`);
  };

  const handleViewDetails = (row) => {
    setFormData(row);
    handleOpenModal("view");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing
  };

  const handleSave = () => {
    setIsEditing(false); // Disable editing
    toast.success("Assignee data updated"); // Log updated data
  };

  useEffect(() => {
    console.log(assignedAssetsData);
    if (asset && asset.assetName) {
      console.log(asset.assetName); // Safely log assetName
    }
  }, [asset]); // Re-run effect whenever asset changes

  const handleCloseModal = () => {
    setOpenModal(false);
    setAsset(null);
  };

  
  const AssigneeDepartment = [
    ...new Set(userData.map((user) => user.department)),
  ].map((department, index) => (
    <MenuItem key={index} value={department}>
      {department}
    </MenuItem>
  ));

  //User names
  const AssigneeOptions = userData
    .filter((user) => user.department === selectedDepartment) // Filter by selected department
    .map((user) => (
      <MenuItem key={user.email} value={user.name}>
        {user.name}
      </MenuItem>
    ));

    console.log(AssigneeOptions)

  // Fetch data from the JSON server
  useEffect(() => {
    const fetchAssignedAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5001/IT");
        const data = response.data;

        // Extract and flatten the IT array
        const flatData = data.map((asset, index) => ({
          id: index + 1, // Add unique id
          ...asset, // Spread asset data
        }));

        setRows(flatData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAssignedAssets();
  }, []);


  const ITUsageData = [
    {
      id: 1,
      department: "HR",
      assigneeName: "Farzeen",
      assetNumber: "0002",
      assetType: "Laptop",
      assetName: "Laptop",
      location: "ST-1",
      status: "active",
      assignmentDate: "21/11/2024",
    },
    // More rows...
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "assigneeName", headerName: "Assignee Name", flex: 1 },
    { field: "assetNumber", headerName: "Asset Number", flex: 1 },
    { field: "assetType", headerName: "Asset Type", flex: 1 },
    { field: "assetName", headerName: "Asset Name", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "assignmentDate", headerName: "Assignment Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) =>
        params.row.status !== "Revoked" ? (
          <div className="p-2 mb-2 flex gap-2">
            <button
              style={{
                backgroundColor: "#0db4ea",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "Popins-Regular",
              }}
              onClick={() => handleViewDetails(params.row)}
            >
              Details
            </button>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "Popins-Regular",
              }}
              onClick={() => handleRevoke(params.row)}
            >
              Revoke
            </button>
          </div>
        ) : (
          <span style={{ color: "gray", fontStyle: "italic" }}>Revoked</span>
        ),
    },
  ];

  return (
    <div className="p-0">
      <div className="flex justify-between mb-6">
        <div className="content-center"></div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          // rows={rows ? rows : processedData}
          rows={processedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowClassName={(params) =>
            params.row.status === "Revoked" ? "row-revoked" : ""
          }
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "start", // Center align button content
            },
            "& .MuiDataGrid-row": {
              padding: 0, // Ensure no extra padding
            },
            fontFamily: "Popins-Regular",
            width: "100%",
          }}
        />
      </div>

      {/* Modal to show laptop details */}
      <NewModal open={!!openModal} onClose={handleCloseModal}>
        {openModal === "revoke" && (
          <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <div className="flex justify-between mb-4">
              <Typography sx={{ fontFamily: "Popins-Semibold" }} variant="h4">
                Revoke Asset
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
            <h1>Are you sure you want to revoke ?</h1>
            {/* Display Asset Details */}
            <div className="mt-4 flex flex-col gap-y-3">
              <p>
                <strong>Asset Number:</strong> {asset && asset.assetNumber}
              </p>
              <p>
                <strong>Asset Type:</strong> {asset && asset.assetType}
              </p>
              <p>
                <strong>Asset Name:</strong> {asset && asset.assetName}
              </p>
              <p>
                <strong>Assigned To:</strong> {asset && asset.assigneeName}
              </p>
              <p>
                <strong>Location:</strong> {asset && asset.location}
              </p>
              <p>
                <strong>Assignment Date:</strong>{" "}
                {asset && asset.assignmentDate}
              </p>
            </div>

            {/* Button Group */}
            <div className="flex justify-start gap-x-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleRevokeAsset}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Revoke
              </button>
            </div>
          </Box>
        )}

        {openModal === "view" && (
          <>
            <div className="flex flex-col gap-4 p-6 bg-white rounded-md w-full">
              <div className="flex justify-between mb-4">
                <Typography sx={{ fontFamily: "Popins-Semibold" }} variant="h4">
                  Details
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
              <div className="flex justify-start mb-4 gap-4">
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={isEditing}
                  sx={{ backgroundColor: "#0db4ea", color: "#fff" }}
                >
                  Edit
                </Button>
                {isEditing && (
                  <div className="motion-preset-expand">
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      sx={{ backgroundColor: "#4caf50", color: "#fff" }}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Separate Input Fields */}
                <TextField
                  label="Department"
                  name="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  select
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                >
                 {AssigneeDepartment}
                </TextField>

                <TextField
                  label="Assignee Name"
                  name="assigneeName"
                  value={formData.assigneeName || ""}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                >
                  {AssigneeOptions}
                  </TextField>

                <TextField
                  label="Asset Number"
                  name="assetNumber"
                  value={formData.assetNumber || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                />
                
                <TextField
                  label="Asset Type"
                  name="assetType"
                  value={formData.assetType || ""}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                >
                  {["Laptop", "Monitor", "Keyboard", "Mouse"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Asset Name"
                  name="assetName"
                  value={formData.assetName || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                />

                <TextField
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                />

                <TextField
                  label="Status"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                >
                  {["Active", "Revoked", "Pending"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Assignment Date"
                  name="assignmentDate"
                  type="date"
                  value={formData.assignmentDate || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="Assignment Time"
                  name="assignmentTime"
                  type="time"
                  value={formData.assignmentTime || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  variant="outlined"
                  
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </>
        )}
      </NewModal>
    </div>
  );
};

export default AssetsData;
