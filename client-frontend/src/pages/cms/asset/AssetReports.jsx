import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, MenuItem, TextField } from "@mui/material";

const AssetReports = () => {
  const [laptops, setLaptops] = useState([]);
  const [chargers, setChargers] = useState([]);
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
    <div className="p-6  ">
      {/* <button
        onClick={() => handleOpenModal("add")}
        className="wono-blue-dark p-2 rounded-md text-white"
      >
        Add Asset
      </button> */}

      <h1 className="text-2xl font-semibold mb-4">Asset Reports</h1>

      <div className="w-[72vw]">
      <div className="flex justify-between gap-4 pb-4">
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

        <button
          className="wono-blue-dark p-2 rounded-md text-white"
        >
          Export
        </button>
      </div>
      <div className="motion-preset-slide-up-md">
        <DataGrid
          rows={laptops}
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


    </div>
  );
};

export default AssetReports;