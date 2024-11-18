import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";

const AssetsData = () => {
    const location = useLocation();
  const { brand } = location.state || { brand: "Unknown Brand" };
  const navigate = useNavigate();

  // Table Data
  const laptopUsageData = [
    {
      id: 1,
      name: "John Doe",
      department: "IT",
      issueDate: "2023-01-15",
      returnDate: "2023-06-10",
      remarks: "Good condition",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "HR",
      issueDate: "2023-03-20",
      returnDate: "2023-09-25",
      remarks: "Battery issue",
    },
    {
      id: 3,
      name: "Alice Johnson",
      department: "Finance",
      issueDate: "2023-02-05",
      returnDate: "2023-07-15",
      remarks: "Charger replaced",
    },
    {
      id: 4,
      name: "Bob Brown",
      department: "Marketing",
      issueDate: "2023-04-10",
      returnDate: "2023-08-20",
      remarks: "Screen issue fixed",
    },
  ];

  // Column Configuration
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "issueDate", headerName: "Issue Date", width: 150 },
    { field: "returnDate", headerName: "Return Date", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 200 },
  ];

  return (
    <div className="p-6">
      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Back to Laptops
      </button>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Asset Details: {brand}
      </h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={laptopUsageData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default AssetsData;
