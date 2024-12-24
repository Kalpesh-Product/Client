import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedChart = ({title}) => {
  // Example data for the chart
  const data = {
    labels: [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ], // X-axis: Financial year months
    datasets: [
      {
        label: "IT Companies",
        data: [3, 4, 2, 5, 6, 3, 2, 4, 5, 6, 4, 3], // Example IT company registrations per month
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue
      },
      {
        label: "Sales Companies",
        data: [2, 3, 4, 3, 2, 4, 5, 3, 2, 3, 5, 4], // Example Sales company registrations per month
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Red
      },
      {
        label: "Finance Companies",
        data: [1, 2, 1, 2, 1, 2, 3, 2, 1, 3, 2, 1], // Example Finance company registrations per month
        backgroundColor: "rgba(75, 192, 192, 0.7)", // Green
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    // responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacking for x-axis
      },
      y: {
        beginAtZero: true,
        stacked: true, // Enable stacking for y-axis
        ticks: {
          stepSize: 5, // Increment by 5 on y-axis
        },
      },
    },
  };

  return (
    <div className="relative" style={{ width: "800px", height: "450px" }}>
      <h1 className="sticky top-0 p-3 font-semibold">{title}</h1>
      <Bar height={""} data={data} options={options} />
    </div>
  );
};

export default StackedChart;
