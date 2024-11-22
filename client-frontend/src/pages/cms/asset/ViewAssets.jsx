import React, { useEffect, useState } from "react";
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
import  axios  from "axios";
import AssignAssetForm from "./AssignAssetForm";

const ViewAssets = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState();
  const [laptops, setLaptops] = useState([]);
  const [chargers, setChargers] = useState([]);

  const handleViewDetails = (row) => {
    setSelectedLaptop(row);
    setOpenModal(true);
  };

  useEffect(() => {
    console.log(selectedLaptop);
  }, [selectedLaptop]); 

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

  // const laptopData = [
  //   {
  //     id: 1,
  //     brand: "Dell",
  //     model: "Inspiron 15",
  //     specs: {
  //       processor: "Intel Core i5",
  //       ram: "8GB",
  //       storage: "256GB SSD",
  //     },
  //     assignedTo: "John Doe",
  //     purchaseDate: "2023-05-10",
  //   },
  //   {
  //     id: 2,
  //     brand: "HP",
  //     model: "Pavilion 14",
  //     specs: {
  //       processor: "AMD Ryzen 5",
  //       ram: "16GB",
  //       storage: "512GB SSD",
  //     },
  //     assignedTo: "Jane Smith",
  //     purchaseDate: "2022-12-20",
  //   },
  //   {
  //     id: 3,
  //     brand: "Apple",
  //     model: "MacBook Air M2",
  //     specs: {
  //       processor: "Apple M2",
  //       ram: "8GB",
  //       storage: "256GB SSD",
  //     },
  //     assignedTo: "Alice Johnson",
  //     purchaseDate: "2023-01-15",
  //   },
  //   {
  //     id: 4,
  //     brand: "Lenovo",
  //     model: "ThinkPad X1 Carbon",
  //     specs: {
  //       processor: "Intel Core i7",
  //       ram: "16GB",
  //       storage: "1TB SSD",
  //     },
  //     assignedTo: "Bob Brown",
  //     purchaseDate: "2022-07-30",
  //   },
  // ];
  useEffect(() => {
    const fetchITAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/IT");

        if (response.data.length > 0) {
          const itData = response.data[0];
          setLaptops(itData.laptops || []);
          setChargers(itData.chargers || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchITAssets();
  }, []);
  const laptopColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "assetNumber", headerName: "Asset Number", width: 150 },
    { field: "assetName", headerName: "Asset Name", width: 150 },
    { field: "brandName", headerName: "Brand", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "vendorName", headerName: "Vendor", width: 200 },
    { field: "purchaseDate", headerName: "Purchase Date", width: 150 },
    { field: "warranty", headerName: "Warranty (Months)", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
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
              fontFamily: "Popins-Regular",
            }}
            onClick={() => handleViewDetails(params.row)}
          >
            Asllllllllll
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">View Assets</h1>
        {/* <div className="grid motion-preset-expand grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
        <div className="">
          <div className="w-[75vw]">
            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              scrollButtons="auto"
              aria-label="Asset Categories"
              sx={{width:'100%'}}
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
            <div className="w-[75vw]">
              {selectedTab === 0 && (
                <div className="motion-preset-slide-up-md">
                  <DataGrid
                    rows={laptops}
                    columns={laptopColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    initialState={{pinnedColumns : {right : ['actions'] }}}
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
                      width:'100%', height:'50vh', fontFamily:'Popins-Regular'
                    }}
                    
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>

      {/* Modal to show laptop details */}
      <NewModal open={openModal} onClose={handleCloseModal}>
       <AssignAssetForm handleCloseModal={handleCloseModal} selectedAsset={selectedLaptop} />
      </NewModal>
    </div>
  );
};

export default ViewAssets;
