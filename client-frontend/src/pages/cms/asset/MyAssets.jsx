import React from "react";
import AgTable from "../../../components/AgTable";

const MyAssets = () => {
  const myAssets = [
    {
      department: "IT",
      assets: [
        { assetNumber: "5001", category: "Mobile", description: "Samsung" },
        {
          assetNumber: "5002",
          category: "Monitor",
          description: "Dell UltraSharp",
        },
        {
          assetNumber: "5003",
          category: "Laptop",
          description: "MacBook Pro M1",
        },
      ],
    },
    {
      department: "Maintenance",
      assets: [
        {
          assetNumber: "6001",
          category: "Chair",
          description: "Herman Miller",
        },
        {
          assetNumber: "6002",
          category: "Desk",
          description: "TableU",
        },
        {
          assetNumber: "6003",
          category: "Bottle",
          description: "TupperWare",
        },
      ],
    },
  ];

  let globalId = 1; // Initialize a global counter

  const tableData = myAssets.flatMap((dept) =>
    dept.assets.map((asset) => ({
      id: globalId++, // Increment the global counter
      department: dept.department,
      assetNumber: asset.assetNumber,
      category: asset.category,
      description: asset.description,
    }))
  );

  // Define columns
  const columns = [
    { headerName: "ID", field: "id",flex:1 },
    { headerName: "Department", field: "department" },
    { headerName: "Asset Number", field: "assetNumber" },
    { headerName: "Category", field: "category" },
    { headerName: "Description", field: "description" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">My Assets</h1>
      <div className="bg-white rounded-md p-2">
      <AgTable data={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default MyAssets;
