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

export default function GroupedBarGraph({ labels, datasets, graphWidth, graphHeight }) {
  // Prepare data for Chart.js
  const chartData = {
    labels: labels, // x-axis labels
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor:
        dataset.label === "Utilised"
          ? dataset.data.map((value) =>
              value > 100 ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)"
            ) // Dynamic coloring for Utilised
          : "rgba(54, 162, 235, 0.7)", // Default color for Allocated
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false, // Set to true if you want stacking
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Add % to y-axis values
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ width: graphWidth, height: graphHeight }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
