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
import AgTable from "../../../components/AgTable";
import axios from "axios";
import allAssets from "./temp_db/MaintainanceAssets.json";
import itAssets from "./temp_db/ItTemp.json";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from "../../../hooks/useAuth";

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
  const [approval, setApproval] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [requests, setRequests] = useState([]);
  const { auth: authUser } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser); // Set user here
  }, []);

  useEffect(() => {
    const storedRequests = localStorage.getItem("asset");
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Filter the assets based on the department of the user
      if (user.department === "TopManagement") {
        // TopManagement gets all assets
        setAssetsData(allAssets); // Assuming 'allAssets' contains the combined data
      } else {
        // Filter assets based on user's department
        const filteredAssets = allAssets.filter(
          (asset) => asset.department === user.department
        );
        setAssetsData(filteredAssets);
      }
      console.log("User:", user);
      console.log("Filtered Assets:", assetsData);
    }
  }, [user]);

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

  const laptopColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "assetNumber", headerName: "Asset Number", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    // { field: "assetName", headerName: "Asset Name", width: 150 },
    { field: "brandName", headerName: "Brand", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    // { field: "totalPrice", headerName: "Total Price", flex: 1 },
    // { field: "vendorName", headerName: "Vendor", flex: 200 },
    { field: "purchaseDate", headerName: "Purchase Date", flex: 1 },
    { field: "warranty", headerName: "Warranty (Months)", flex: 1 },
    // { field: "location", headerName: "Location", flex: 150 },
    {
      field: "actions",
      filter: false,
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) =>
        params.data.status !== "Revoked" ? (
          <div className="p-2 flex gap-2">
            <button
              style={{
                backgroundColor: "#0db4ea",
                color: "white",
                border: "none",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={() => handleViewDetails(params.data)}>
              Details
            </button>
            {/* <button
              style={{
                backgroundColor: "#0db4ea",
                color: "white",
                border: "none",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={() => handleAssignAsset(params.data)}
            >
              Assign
            </button> */}
          </div>
        ) : (
          <span style={{ color: "gray", fontStyle: "italic" }}>Revoked</span>
        ),
    },
  ];
  const assignAssetsColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "assetNumber", headerName: "Asset Number", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    // { field: "assetName", headerName: "Asset Name", width: 150 },
    { field: "brandName", headerName: "Brand", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    // { field: "totalPrice", headerName: "Total Price", flex: 1 },
    // { field: "vendorName", headerName: "Vendor", flex: 200 },
    { field: "purchaseDate", headerName: "Purchase Date", flex: 1 },
    { field: "warranty", headerName: "Warranty (Months)", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "actions",
      filter: false,
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) =>
        params.data.status !== "Revoked" ? (
          <div className="p-2 flex gap-2">
            {/* <button
              style={{
                backgroundColor: "#0db4ea",
                color: "white",
                border: "none",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={() => handleViewDetails(params.data)}>
              Details
            </button> */}
            <button
              style={{
                backgroundColor: "#0db4ea",
                color: "white",
                border: "none",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={() => handleAssignAsset(params.data)}>
              Assign
            </button>
          </div>
        ) : (
          <span style={{ color: "gray", fontStyle: "italic" }}>Revoked</span>
        ),
    },
  ];
  const assetRequestColumns = [
    { field: "department", headerName: "Department" },
    {
      field: "assetNumber",
      headerName: "Asset Number",
      filter: "agNumberColumnFilter",
    },
    { field: "category", headerName: "Category" },
    // { field: "assetName", headerName: "Asset Name", : 1 },
    { field: "brandName", headerName: "Brand" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    // { field: "totalPrice", headerName: "Total Price",  },
    { field: "vendorName", headerName: "Vendor" },
    // { field: "purchaseDate", headerName: "Purchase Date",  },
    { field: "warranty", headerName: "Warranty (Months)" },
    { field: "location", headerName: "Location" },
    {
      field: "actions",
      filter: false,
      headerName: "Status",
      flex: 1,
      cellRenderer: () => (
        <div className="p-2 flex gap-2">
          <span className="text-yellow-600 italic">Requested</span>
        </div>
      ),
    },
  ];
  const assetApprovalColumns = [
    { field: "department", headerName: "Department" },
    { field: "assetNumber", headerName: "Asset Number" },
    { field: "category", headerName: "Category" },
    // { field: "assetName", headerName: "Asset Name", : 1 },
    { field: "brandName", headerName: "Brand" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    // { field: "totalPrice", headerName: "Total Price",  },
    { field: "vendorName", headerName: "Vendor" },
    // { field: "purchaseDate", headerName: "Purchase Date",  },
    // { field: "warranty", headerName: "Warranty (Months)" },
    // { field: "location", headerName: "Location" },
    {
      field: "actions",
      filter: false,
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <>
          {approval === null && (
            <div className="p-2 flex gap-2">
              <button
                style={{
                  backgroundColor: "#0db4ea",
                  color: "white",
                  border: "none",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  height: "100%",
                }}
                onClick={() => setApproval(true)}>
                Approve
              </button>
              <button
                style={{
                  backgroundColor: "#0db4ea",
                  color: "white",
                  border: "none",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  height: "100%",
                }}
                onClick={() => setApproval(false)}>
                Reject
              </button>
            </div>
          )}
          {approval === true && (
            <span className="text-green-700 font-semibold">Approved</span>
          )}
          {approval === false && (
            <span className="text-red-700 font-semibold">Rejected</span>
          )}
        </>
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

  // Filter assets based on search term and selected asset name
  const filteredAssets = allAssets.filter((asset) => {
    const matchesSearch = asset.brandName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? asset.category === selectedAssetName
      : true;
    return matchesSearch && matchesDropdown;
  });
  // Filter assets based on search term and selected asset name for assignee table
  const filteredAssigneeAssets = allAssets.filter((asset) => {
    const matchesSearch = asset.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? asset.category === selectedAssetName
      : true;
    return matchesSearch && matchesDropdown;
  });
  // Filter assets based on department
  const filteredByDepartment =
    user?.department === "TopManagement"
      ? filteredAssets // Include all assets for TopManagement
      : filteredAssets.filter((asset) => asset.department === user?.department);

  // Further filter by selected department if applicable
  const filteredData =
    selectedDepartment === ""
      ? filteredByDepartment
      : filteredByDepartment.filter(
          (item) => item.department === selectedDepartment
        );
  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold mb-4 motion-preset-expand">
        Manage Assets
      </h1>
      <div className="rounded-md">
        <div className="flex ">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="asset actions tabs"
            variant="fullWidth"
            TabIndicatorProps={{ style: { transition: "none" } }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              fontFamily: "Popins-Semibold",
              padding: "0.5rem",
            }}>
            {/* 0 */}
            <Tab sx={{ borderRight: "1px solid #e4e4e4" }} label="Add Assets" />
            {/* 1 */}
            <Tab
              sx={{ borderRight: "1px solid #e4e4e4" }}
              label="Assign Assets"
            />
            {/* 2 */}
            <Tab
              sx={{ borderRight: "1px solid #e4e4e4" }}
              label="Assigned Asset"
            />
            {/* 3 */}
            {authUser?.role?.roleTitle === "Employee" ? (
              <Tab label="Requests" />
            ) : (
              <Tab label="Approvals" />
            )}
          </Tabs>
        </div>
        <div>
          {activeTab === 0 && (
            <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out bg-white p-0">
              <div className="flex justify-between gap-4 pb-4">
                <div className="flex gap-4">
                  <TextField
                    label="Search by Brand Name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <FormControl size="small" style={{ minWidth: 220 }}>
                    {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                    <TextField
                      label="Filter by Category"
                      variant="outlined"
                      select
                      size="small"
                      value={selectedAssetName}
                      onChange={(e) => setSelectedAssetName(e.target.value)}
                      sx={{ fontSize: "0.5rem" }}>
                      <MenuItem value="">All</MenuItem>
                      {[
                        ...new Set(assetsData.map((asset) => asset.category)),
                      ].map((assetName) => (
                        <MenuItem key={assetName} value={assetName}>
                          {assetName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>

                  {authUser?.department?.map((dept) => dept.name) ===
                    "TopManagement" && (
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
                          }>
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
                  className="wono-blue-dark p-2 rounded-md text-white">
                  Add Asset
                </button>
              </div>
              <div className="motion-preset-slide-up-md">
                <AgTable
                  data={filteredData}
                  columns={laptopColumns}
                  paginationPageSize={10}
                />
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out bg-white p-0">
              <div className="flex justify-between gap-4 pb-4">
                <div className="flex gap-4">
                  <TextField
                    label="Search by Brand Name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <FormControl size="small" style={{ minWidth: 220 }}>
                    {/* <InputLabel>Filter by Asset Name</InputLabel> */}
                    <TextField
                      label="Filter by Category"
                      variant="outlined"
                      select
                      size="small"
                      value={selectedAssetName}
                      onChange={(e) => setSelectedAssetName(e.target.value)}
                      sx={{ fontSize: "0.5rem" }}>
                      <MenuItem value="">All</MenuItem>
                      {[
                        ...new Set(assetsData.map((asset) => asset.category)),
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
                          }>
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="IT">IT</MenuItem>
                          <MenuItem value="Maintainance">Maintainance</MenuItem>
                        </TextField>
                      </FormControl>
                    </>
                  )}
                </div>
              </div>
              <div className="motion-preset-slide-up-md">
                <AgTable
                  data={filteredData}
                  columns={assignAssetsColumns}
                  paginationPageSize={10}
                />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <>
              <AssetsData data={filteredAssigneeAssets} />
            </>
          )}

          {activeTab === 3 && (
            <>
              {user.role === "Employee" ? (
                <div className="w-full p-2 bg-white">
                  <AgTable
                    data={requests}
                    columns={assetRequestColumns}
                    paginationPageSize={10}
                  />
                </div>
              ) : (
                <>
                  <div className="w-full p-2 bg-white">
                    <AgTable
                      data={requests}
                      columns={assetApprovalColumns}
                      paginationPageSize={10}
                    />
                  </div>
                </>
              )}
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
            <div className="flex flex-col gap-4 bg-white rounded-md w-full">
              {/* Header */}
              <div className="flex justify-between mb-4">
                <Typography sx={{ fontFamily: "Popins-Semibold" }} variant="h4">
                  Details
                </Typography>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md">
                  <IoMdClose />
                </motion.button>
              </div>

              {/* Edit Button */}
              <div className="flex justify-start mb-4 gap-4">
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={isEditing}
                  sx={{ backgroundColor: "#0db4ea", color: "#fff" }}>
                  Edit
                </Button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Asset Number"
                  name="assetNumber"
                  value={formData.assetNumber || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Asset Name"
                  name="assetName"
                  value={formData.assetName || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Brand Name"
                  name="brandName"
                  value={formData.brandName || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Price"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Total Price"
                  name="totalPrice"
                  value={formData.totalPrice || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Vendor Name"
                  name="vendorName"
                  value={formData.vendorName || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  select>
                  <MenuItem value="">
                    <em>Select Department</em> {/* Placeholder */}
                  </MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="TopManagement">Top Management</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                </TextField>

                <TextField
                  label="Status"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                  disabled>
                  <MenuItem value="Active">Active</MenuItem>
                </TextField>
                <TextField
                  label="Category"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Purchase Date"
                    disabled={!isEditing}
                    renderInput={(params) => (
                      <TextField
                        sx={{ display: "flex", height: "100%" }}
                        {...params}
                        className="w-full md:w-1/4"
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  label="Warranty (Months)"
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!isEditing}
                  sx={{ height: "100%" }}
                />
              </div>

              {/* Save Button */}
              {isEditing && (
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#0db4ea",
                    color: "#fff",
                    width: "full",
                  }}>
                  Save
                </Button>
              )}
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
