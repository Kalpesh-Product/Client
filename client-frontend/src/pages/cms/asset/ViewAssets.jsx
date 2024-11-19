import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { NewModal } from "../../../components/NewModal";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const ViewAssets = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  const handleViewDetails = (row) => {
    setSelectedLaptop(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLaptop(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const assetCategories = [
    { name: "Laptops", count: 5, icon: "💻" },
    { name: "Monitors", count: 15, icon: "🖥️" },
    { name: "Chargers", count: 40, icon: "🔌" },
    { name: "Keyboards", count: 30, icon: "⌨️" },
    { name: "Headphones", count: 20, icon: "🎧" },
    { name: "Mice", count: 35, icon: "🖱️" },
  ];

  const laptopData = [
    {
      id: 1,
      brand: "Dell",
      model: "Inspiron 15",
      specs: {
        processor: "Intel Core i5",
        ram: "8GB",
        storage: "256GB SSD",
      },
      assignedTo: "John Doe",
      purchaseDate: "2023-05-10",
    },
    {
      id: 2,
      brand: "HP",
      model: "Pavilion 14",
      specs: {
        processor: "AMD Ryzen 5",
        ram: "16GB",
        storage: "512GB SSD",
      },
      assignedTo: "Jane Smith",
      purchaseDate: "2022-12-20",
    },
    {
      id: 3,
      brand: "Apple",
      model: "MacBook Air M2",
      specs: {
        processor: "Apple M2",
        ram: "8GB",
        storage: "256GB SSD",
      },
      assignedTo: "Alice Johnson",
      purchaseDate: "2023-01-15",
    },
    {
      id: 4,
      brand: "Lenovo",
      model: "ThinkPad X1 Carbon",
      specs: {
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
      },
      assignedTo: "Bob Brown",
      purchaseDate: "2022-07-30",
    },
  ];

  const laptopColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: () => "Laptop",
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", headerName: "Model", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="p-2 mb-2">
          <button
            style={{
              backgroundColor: "#0db4ea",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: 'Popins-Regular'
            }}
            onClick={() => handleViewDetails(params.row)}
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-8">
      <>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">View Assets</h1>
        {/* <div className="grid motion-preset-expand grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
        <div className="">
          <Box>
            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              scrollButtons="auto"
              aria-label="Asset Categories"
            >
              {assetCategories.map((category, index) => (
                <Tab
                  key={index}
                  icon={<span>{category.icon}</span>}
                  label={`${category.name} (${category.count})`}
                  wrapped
                />
              ))}
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
              {selectedTab === 0 && (
                <div className="w-full motion-preset-slide-up-md">
                  <DataGrid
                    rows={laptopData}
                    columns={laptopColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowHeight={() => "auto"} // Automatically adjust row height
                    sx={{
                      "& .MuiDataGrid-cell": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start", // Center align button content
                      },
                      "& .MuiDataGrid-row": {
                        padding: 0, // Ensure no extra padding
                      },
                    }}
                  />
                </div>
              )}
            </Box>
          </Box>
        </div>
      </>

      {/* Modal to show laptop details */}
      <NewModal open={openModal} onClose={handleCloseModal}>
        {selectedLaptop && (
          <>
            <div className="flex justify-between align-middle mb-4">
              <Typography
                sx={{ fontFamily: "Popins-SemiBold" }}
                variant="h5"
                gutterBottom
              >
                {selectedLaptop.brand} - {selectedLaptop.model}
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
            <div>
              <p>
                <strong>Brand:</strong> {selectedLaptop.brand}
              </p>
              <p>
                <strong>Model:</strong> {selectedLaptop.model}
              </p>
              <p>
                <strong>Processor:</strong> {selectedLaptop.specs.processor}
              </p>
              <p>
                <strong>RAM:</strong> {selectedLaptop.specs.ram}
              </p>
              <p>
                <strong>Storage:</strong> {selectedLaptop.specs.storage}
              </p>
              <p>
                <strong>Assigned To:</strong> {selectedLaptop.assignedTo}
              </p>
              <p>
                <strong>Purchase Date:</strong> {selectedLaptop.purchaseDate}
              </p>
            </div>
          </>
        )}
      </NewModal>
    </div>
  );
};

export default ViewAssets;
