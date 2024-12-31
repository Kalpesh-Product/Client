import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentPayrollChart = () => {
  const data = {
    labels: ["Finance", "HR", "Tech", "IT", "Sales", "Administration"],
    datasets: [
      {
        label: "Payroll Distribution",
        data: [35000, 15000, 20000, 25000, 18000, 45000],
        backgroundColor: [
          "#264653",
          "#2A9D8F",
          "#E9C46A",
          "#F4A261",
          "#E76F51",
          "#8AB17D",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent automatic resizing
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `₹${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white py-4 w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Department-wise Payroll Split
      </h2>
      <div className="flex justify-center items-center">
        <div
          style={{
            width: "300px",
            height: "300px", // Explicit size for the chart container
          }}
        >
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};



export default DepartmentPayrollChart;
