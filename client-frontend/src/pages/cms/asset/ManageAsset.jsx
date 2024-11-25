import React, { useEffect, useState } from "react";
import AssetsData from "./AssetsData";
import { NewModal } from "../../../components/NewModal";
import AssignAssetForm from "./AssignAssetForm";
import { motion } from "framer-motion";
import AddAssetForm from "./AddAssetForm";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import maintenanceAssets from "./temp_db/MaintainanceAssets.json";
import itAssets from "./temp_db/ItTemp.json";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

const ManageAsset = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState("");
  const [selectedLaptop, setSelectedLaptop] = useState();
  const [laptops, setLaptops] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetName, setSelectedAssetName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assetsData, setAssetsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [formData, setFormData] = useState(assetsData || {}); // Form data state

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log(user);
    console.log(user.department);
    if(user.department === 'Maintainance'){
      setAssetsData(itAssets);
    }
    else if(user.department === 'IT'){
      setAssetsData(itAssets);
    }
    
  }, []);

  const handleAssignAsset = (row) => {
    setSelectedLaptop(row);
    handleOpenModal("assign");
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
    toast.success("Asset data updated"); // Log updated data
  };

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
    { field: "id", headerName: "ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "assetNumber", headerName: "Asset Number", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    // { field: "assetName", headerName: "Asset Name", width: 150 },
    // { field: "brandName", headerName: "Brand", width: 150 },
    // { field: "price", headerName: "Price", width: 150 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "totalPrice", headerName: "Total Price", flex: 1 },
    // { field: "vendorName", headerName: "Vendor", flex: 200 },
    { field: "purchaseDate", headerName: "Purchase Date", flex: 1 },
    { field: "warranty", headerName: "Warranty (Months)", flex: 1 },
    // { field: "location", headerName: "Location", flex: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="p-2 mb-2 gap-2 flex">
          {/* <button
            style={{
              backgroundColor: "#0db4ea",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "Popins-Regular",
            }}
          >
            Edit
          </button> */}
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
              backgroundColor: "#0db4ea",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "Popins-Regular",
            }}
            onClick={() => handleAssignAsset(params.row)}
          >
            Assign
          </button>

         
        </div>
      ),
    },
  ];

  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter laptops based on search term and selected asset name
  const filteredLaptops = assetsData.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? asset.assetName === selectedAssetName
      : true;
    return matchesSearch && matchesDropdown;
  });
  // Filter laptops based on search term and selected asset name
  const filteredMaintainance = assetsData.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? asset.assetName === selectedAssetName
      : true;
    return matchesSearch && matchesDropdown;
  });

  const adjustedMaintainance = filteredMaintainance.map((item, index) => ({
    ...item,
    id: filteredLaptops.length + index + 1, // Offset the IDs to avoid conflicts
  }));

  //Combined data for TopManagement

  const combinedData =
    user.department === "TopManagement"
      ? [...filteredLaptops, ...adjustedMaintainance]
      : user.department === "IT"
      ? filteredLaptops
      : filteredMaintainance;

  const filteredData =
    selectedDepartment === ""
      ? combinedData
      : combinedData.filter((item) => item.department === selectedDepartment);

  console.log(selectedDepartment);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Assets</h1>
      <div>
        <div className="flex">
          {/* <button
             onClick={() => handleOpenModal("add")}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
          >
            Add Assets
          </button>
          <button
             onClick={() => handleOpenModal("assign")}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
          >
            Assign Asset
          </button>
          <button className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            Revoke Asset
          </button> */}

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="asset actions tabs"
            variant="fullWidth"
            TabIndicatorProps={{ style: { transition: "none" } }}
            sx={{ width: "100%" }}
          >
            <Tab label="Add/Assign Assets" />
            <Tab label="Assigned Asset" />
          </Tabs>
        </div>
        <div>
          {activeTab === 0 && (
            <div className="w-[72vw] md:w-full">
              <h1 className="text-xl font-semibold py-4 text-gray-600">
                Filter by :
              </h1>
              <div className="flex justify-between gap-4 pb-4">
                <div className="flex gap-4">
                  <TextField
                    label="Search by Name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <FormControl size="small" style={{ minWidth: 220 }}>
                    {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                    <TextField
                      label="Filter by Asset Name"
                      variant="outlined"
                      select
                      size="small"
                      value={selectedAssetName}
                      onChange={(e) => setSelectedAssetName(e.target.value)}
                      sx={{ fontSize: "0.5rem" }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Chair">Chair</MenuItem>
                      <MenuItem value="Carpet Floor">Carpet</MenuItem>
                      {[
                        ...new Set(laptops.map((laptop) => laptop.assetName)),
                      ].map((assetName) => (
                        <MenuItem key={assetName} value={assetName}>
                          {assetName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>

                  {user.department === "TopManagement" && (
                    <>
                      <FormControl size="small" style={{ minWidth: 220 }}>
                        {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                        <TextField
                          label="Filter by Department"
                          variant="outlined"
                          select
                          size="small"
                          value={selectedDepartment}
                          onChange={(e) =>
                            setSelectedDepartment(e.target.value)
                          }
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="IT">IT</MenuItem>
                          <MenuItem value="Maintainance">Maintainance</MenuItem>
                        </TextField>
                      </FormControl>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleOpenModal("add")}
                  className="wono-blue-dark p-2 rounded-md text-white"
                >
                  Add Asset
                </button>
              </div>
              <div className="motion-preset-slide-up-md">
                <DataGrid
                  rows={filteredData}
                  columns={laptopColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  initialState={{ pinnedColumns: { right: ["actions"] } }}
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
                    width: "100%",
                    height: "50vh",
                    fontFamily: "Popins-Regular",
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <>
              <div className="flex justify-between gap-4 py-4">
                <h1 className="text-xl font-semibold text-gray-600">
                  Filter by :
                </h1>
              </div>
              <div className="flex gap-4">
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  size="small"
                />

                <FormControl size="small" style={{ minWidth: 200 }}>
                  <TextField
                    label="Asset Name"
                    variant="outlined"
                    select
                    size="small"
                    value={selectedAssetName}
                    onChange={(e) => setSelectedAssetName(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {[
                      ...new Set(laptops.map((laptop) => laptop.assetName)),
                    ].map((assetName) => (
                      <MenuItem key={assetName} value={assetName}>
                        {assetName}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>
              <AssetsData />
            </>
          )}
        </div>
        {/* <AssetsData /> */}
      </div>

      {/* Modal */}
      <NewModal open={!!openModal} onClose={handleCloseModal}>
        {openModal === "add" && (
          <AddAssetForm
            user={user}
            title="Add Asset"
            handleClose={handleCloseModal}
          />
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
                {/* Render Form Fields */}
                {Object.entries(formData).map(([key, value]) => (
                  <TextField
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the label
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        {openModal === "assign" && (
          <AssignAssetForm
            handleCloseModal={handleCloseModal}
            selectedAsset={selectedLaptop}
          />
        )}
        {openModal === "edit" && (
          <AssignAssetForm
            handleCloseModal={handleCloseModal}
            selectedAsset={selectedLaptop}
          />
        )}
      </NewModal>
    </div>
  );
};

export default ManageAsset;
