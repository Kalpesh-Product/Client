// Import necessary libraries
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PayrollSummary = () => {
  // Mock data for payroll summary
  const payrollData = {
    totalPaid: 25000,
    totalPending: 12000,
    chartData: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Paid",
          data: [5000, 6000, 4500, 7000, 2500],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Pending",
          data: [2000, 1500, 3000, 2500, 3000],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payroll Summary",
      },
    },
  };

  return (
    <div className="bg-white p-6 space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800">Payroll Summary</h2>
      <div className="flex justify-between items-center text-center">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-600">Total Paid</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{payrollData.totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-600">Total Pending</h3>
          <p className="text-2xl font-bold text-red-600">
            ₹{payrollData.totalPending.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="w-full">
        <Bar data={payrollData.chartData} options={options} />
      </div>
    </div>
  );
};

export default PayrollSummary;
