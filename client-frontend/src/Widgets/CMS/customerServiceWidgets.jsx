// customerServiceWidgets.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register necessary Chart.js components for Bar Chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export const AssetsCount = ({ count, route, title }) =>{
    const navigate = useNavigate();


  return(
    <div onClick={()=>navigate(route)} className="p-4 cursor-pointer hover:bg-slate-100 transition-all">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

export const MaintenanceRequests = ({ requests, route }) => {
  const navigate = useNavigate();
  return(
  <div onClick={()=>navigate(route)} className="p-4 cursor-pointer hover:bg-slate-100 transition-all h-full">
    <h3 className="text-lg font-semibold">Asset Tickets</h3>
    <p className="text-2xl">{requests} Requests</p>
  </div>
);
}

export const AssetsAssigned = ({ assigned, route }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="p-4 cursor-pointer hover:bg-slate-100 transition-all h-full">
      <h3 className="text-lg font-semibold">Assets Assigned</h3>
      <p className="text-2xl">{assigned}</p>
    </div>
  );
};

export const AssetsInRepair = ({ count, route }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="p-4 cursor-pointer hover:bg-slate-100 transition-all h-full">
      <h3 className="text-lg font-semibold">Assets In Repair</h3>
      <p className="text-2xl">{count}</p>
    </div>
  );
};

export const NewAssetsAdded = ({ added, route }) => {
  const navigate = useNavigate();
  <div
    onClick={() => navigate(route)}
    className="p-4 cursor-pointer hover:bg-slate-100 transition-all h-full">
    <h3 className="text-lg font-semibold">New Assets Added</h3>
    <p className="text-2xl">{added}</p>
  </div>;
};

export const QuantityRemainingWidget = ({
  totalStock,
  remainingStock,
  assetType,
}) => {
  // Calculate the percentage of remaining stock
  const percentageRemaining = (remainingStock / totalStock) * 100;

  // Determine color based on the remaining stock
  let progressColor = "bg-green-500"; // Default color: Green (high stock)
  if (percentageRemaining <= 50 && percentageRemaining > 20) {
    progressColor = "bg-yellow-500"; // Moderate stock
  } else if (percentageRemaining <= 20) {
    progressColor = "bg-red-500"; // Low stock
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 my-4 w-full cursor-pointer hover:bg-slate-100 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {/* Asset Icon */}
          <h2 className="text-lg font-semibold text-gray-800">
            {assetType} Remaining
          </h2>
        </div>
        <div className="text-xl font-bold text-gray-800">
          {remainingStock}/{totalStock}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1 ">
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Stock Remaining
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(percentageRemaining)}%
          </span>
        </div>
        <div className="flex mb-2">
          <div className="w-full bg-gray-200 h-2.5 rounded-full">
            <div
              className={`h-2.5 rounded-full ${progressColor}`}
              style={{ width: `${percentageRemaining}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tooltip/Status text */}
      <div className="text-center mt-4">
        {percentageRemaining <= 20 ? (
          <p className="text-red-500 font-medium">Warning: Stock is low!</p>
        ) : percentageRemaining <= 50 ? (
          <p className="text-yellow-500 font-medium">
            Moderate Stock: Order soon!
          </p>
        ) : (
          <p className="text-green-500 font-medium">
            Sufficient Stock Available
          </p>
        )}
      </div>
    </div>
  );
};

export const AssetAllocationWidget = () => {
  const assetData = [
    { assetType: "Laptop", assetName: "Dell XPS 13", location: "ST-1" },
    { assetType: "Laptop", assetName: "MacBook Pro", location: "ST-2" },
    { assetType: "Monitor", assetName: "LG 27", location: "ST-3" },
    { assetType: "Laptop", assetName: "HP Pavilion", location: "ST-4" },
    { assetType: "Monitor", assetName: "Samsung Odyssey", location: "ST-5" },
    { assetType: "Printer", assetName: "Canon PIXMA", location: "ST-6" },
  ];

  // Extract asset allocation data
  const assetTypes = assetData.map((asset) => asset.assetType);
  const uniqueAssetTypes = [...new Set(assetTypes)]; // Get unique asset types
  const assetCounts = uniqueAssetTypes.map(
    (type) => assetData.filter((asset) => asset.assetType === type).length
  );

  // Chart.js Data for Bar Chart
  const data = {
    labels: uniqueAssetTypes,
    datasets: [
      {
        label: "Asset Allocation",
        data: assetCounts,
        backgroundColor: "#36A2EB", // Blue bars for the dataset
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  // Options for customizing the Bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensures the Y-axis starts from zero
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full cursor-pointer hover:bg-slate-100 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Asset Allocation
        </h2>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-64 mb-4">
        <Bar data={data} options={options} />
      </div>

      {/* Additional Info */}
      <div className="text-center mt-4">
        <p className="text-gray-600">
          View the distribution of assets by type.
        </p>
      </div>
    </div>
  );
};
