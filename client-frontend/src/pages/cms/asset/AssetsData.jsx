import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { NewModal } from "../../../components/NewModal";
import AssignAssetForm from "./AssignAssetForm";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AssetsData = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const { brand } = location.state || { brand: "Unknown Brand" };
  const navigate = useNavigate();
  const [asset, setAsset] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleViewDetails = (row) => {
    setAsset(row);
    setOpenModal(true);
  };

  useEffect(() => {
    if (asset && asset.assetName) {
      console.log(asset.assetName); // Safely log assetName
    }
  }, [asset]); // Re-run effect whenever asset changes

  const handleCloseModal = () => {
    setOpenModal(false);
    setAsset(null);
  };

  // Fetch data from the JSON server
  useEffect(() => {
    const fetchAssignedAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5001/0");
        const data = response.data;

        // Extract and flatten the IT array
        const flatData = data.IT.map((asset, index) => ({
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
      renderCell: (params) => (
        <div className="p-2 mb-2">
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
            onClick={() => handleViewDetails(params.row)}
          >
            Revoke
          </button>
        </div>
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
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
      <NewModal open={openModal} onClose={handleCloseModal}>
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
              <strong>Assignment Date:</strong> {asset && asset.assignmentDate}
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
              onClick={() => {
                console.log("Revoke Asset Details:", asset); // Revoke action
                handleCloseModal(); // Close the modal after revoking
                toast.success(`Asset revoked for : ${asset && asset.assigneeName}`)
              }}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Revoke
            </button>
          </div>
        </Box>
      </NewModal>
    </div>
  );
};

export default AssetsData;
