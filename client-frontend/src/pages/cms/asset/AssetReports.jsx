import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, MenuItem, TextField } from "@mui/material";
import allAssets from "./temp_db/MaintainanceAssets.json";
import AgTable from "../../../components/AgTable";

const AssetReports = () => {
  const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetName, setSelectedAssetName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assetsData, setAssetsData] = useState([]);
  // useEffect(() => {
  //   const fetchITAssets = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/IT");

  //       if (response.data.length > 0) {
  //         const itData = response.data[0];
  //         setLaptops(itData.laptops || []);
  //         setChargers(itData.chargers || []);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchITAssets();
  // }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser); // Set user here
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

  // Filter assets based on search term and selected asset name
  const filteredAssets = allAssets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDropdown = selectedAssetName
      ? asset.assetName === selectedAssetName
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

  console.log(selectedDepartment);
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
            onClick={() => handleViewDetails(params.row)}
          >
            Assign
          </button> */}
        </div>
      ),
    },
  ];

  //   // Filter laptops based on search term and selected asset name
  //   const filteredLaptops = laptops.filter((laptop) => {
  //     const matchesSearch = laptop.assetName
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesDropdown = selectedAssetName
  //       ? laptop.assetName === selectedAssetName
  //       : true;
  //     return matchesSearch && matchesDropdown;
  //   });
  return (
    <div className="p-4">
      {/* <button
        onClick={() => handleOpenModal("add")}
        className="wono-blue-dark p-2 rounded-md text-white"
      >
        Add Asset
      </button> */}

      <h1 className="text-2xl font-semibold mb-4">Asset Reports</h1>

      <div className="w-[72vw]">
        <div className="flex justify-between gap-4 p-2 rounded-md bg-white">
          <div className="flex gap-4 ">
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
              >
                <MenuItem value="">All</MenuItem>
                {/* {[...new Set(laptops.map((laptop) => laptop.assetName))].map(
                (assetName) => (
                  <MenuItem key={assetName} value={assetName}>
                    {assetName}
                  </MenuItem>
                )
              )} */}
              </TextField>
            </FormControl>
          </div>

          <button className="wono-blue-dark p-2 rounded-md text-white">
            Export
          </button>
        </div>

        <div className="motion-preset-slide-up-md">
          <AgTable data={filteredData} columns={laptopColumns} paginationPageSize={6} />
        </div>
      </div>
    </div>
  );
};

export default AssetReports;
