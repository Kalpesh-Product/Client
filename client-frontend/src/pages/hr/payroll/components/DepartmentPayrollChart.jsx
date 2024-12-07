import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentPayrollChart = () => {
  // Example data for department-wise payroll
  const data = {
    labels: ["Finance", "HR", "Tech", "IT", "Sales", "Administration"],
    datasets: [
      {
        label: "Payroll Distribution",
        data: [35000, 15000, 20000, 25000, 18000, 45000], // Example payroll amounts
        backgroundColor: [
          "#264653", // Deep Teal
          "#2A9D8F", // Warm Aqua
          "#E9C46A", // Mustard Yellow
          "#F4A261", // Burnt Sienna
          "#E76F51", // Terracotta
          "#8AB17D", // Sage Green
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `₹${value.toLocaleString()}`; // Use INR symbol
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 w-full mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Department-wise Payroll Split
      </h2>
      <div className="flex justify-center items-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPayrollChart;
