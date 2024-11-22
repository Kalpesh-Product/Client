import React, { useEffect, useState } from "react";
import AssetsData from "./AssetsData";
import { NewModal } from "../../../components/NewModal";
import AssignAssetForm from "./AssignAssetForm";
import AddAssetForm from "./AddAssetForm";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import maintenanceAssets from "./temp_db/MaintainanceAssets.json";

const ManageAsset = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState("");
  const [selectedLaptop, setSelectedLaptop] = useState();
  const [laptops, setLaptops] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetName, setSelectedAssetName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assetsData, setAssetsData] = useState(maintenanceAssets);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log(user);
    console.log(user.name);
  }, []);

  const handleViewDetails = (row) => {
    setSelectedLaptop(row);
    handleOpenModal("assign");
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
    { field: "id", headerName: "ID", width: 90 },
    { field: "department", headerName: "Department", width: 90 },
    { field: "assetNumber", headerName: "Asset Number", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
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
        <div className="p-2 mb-2 gap-2 flex">
        
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
            
          >
            Edit
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
            onClick={() => handleViewDetails(params.row)}
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
  const filteredLaptops = laptops.filter((laptop) => {
    const matchesSearch = laptop.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? laptop.assetName === selectedAssetName
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

  console.log(selectedDepartment)
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
            sx={{ width: "100%" }}
          >
            <Tab label="Add/Assign Assets" />
            <Tab label="Assigned Asset" />
          </Tabs>
        </div>
        <div>
          {activeTab === 0 && (
            <div className="w-[72vw]">
              <h1 className="text-2xl font-semibold py-4 text-gray-600">
                Add / Assign Assets
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

                  <FormControl size="small" style={{ minWidth: 200 }}>
                    {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                    <TextField
                      label="Filter by Asset Name"
                      variant="outlined"
                      select
                      size="small"
                      value={selectedAssetName}
                      onChange={(e) => setSelectedAssetName(e.target.value)}
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
                      <FormControl size="small" style={{ minWidth: 200 }}>
                        {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                        <TextField
                          label="Filter by Department"
                          variant="outlined"
                          select
                          size="small"
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
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
                  checkboxSelection
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
                <h1 className="text-2xl font-semibold text-gray-600">
                  Assigned assets
                </h1>
              </div>
              <div className="flex gap-4">
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  size="small"
                />

                <FormControl size="small" style={{ minWidth: 200 }}>
                  {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                  <TextField
                    label="Filter by Asset Name"
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
