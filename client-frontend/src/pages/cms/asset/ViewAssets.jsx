import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAssets = () => {
    const navigate = useNavigate();
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

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-8">
      {!selectedCategory ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">View Assets</h1>
          <div className="grid motion-preset-expand grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {assetCategories.map((asset, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 flex flex-col items-center text-center cursor-pointer"
                onClick={() => setSelectedCategory(asset.name)}
              >
                <div className="text-4xl mb-4">{asset.icon}</div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {asset.name}
                </h2>
                <p className="text-sm text-gray-500">{asset.count} available</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            className="mb-6 px-4 py-2 wono-blue-dark text-white rounded-lg hover:bg-blue-600"
            onClick={() => setSelectedCategory(null)}
          >
            Back to Categories
          </button>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {selectedCategory} Details
          </h1>
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {laptopData.map((laptop, index) => (
              <div
                key={index}
                onClick={() => navigate(`/customer/asset/details`, { state: { brand: laptop.brand } })}
                className="bg-white motion-preset-expand shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-2">{laptop.brand}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  Model: {laptop.model}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Processor: {laptop.specs.processor}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  RAM: {laptop.specs.ram}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Storage: {laptop.specs.storage}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Assigned To: {laptop.assignedTo}
                </p>
                <p className="text-sm text-gray-500">
                  Purchase Date: {laptop.purchaseDate}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAssets;
