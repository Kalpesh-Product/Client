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

const BasicGroupedBarGraph = ({ labels, datasets, graphWidth, graphHeight, yAxisFormat = "number" }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: labels, // x-axis labels
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false, // Enable stacking for complaints
        ticks: {
          font: {
            family: "Popins-Regular", // Custom font for x-axis
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            // Dynamically format Y-axis values based on yAxisFormat prop
            if (yAxisFormat === "dollar") {
              return `$${value}`; // Format as dollar value
            }
            return value; // Default: plain number
          },
          font: {
            family: "Popins-Regular", // Custom font for y-axis
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (context) {
            // Display the month as title
            return context[0].label;
          },
          label: function (context) {
            const value = context.raw; // Value of the bar
            return `${context.dataset.label}: ${
              yAxisFormat === "dollar" ? `$${value}` : value
            }`; // Format value based on yAxisFormat
          },
        },
        displayColors: true,
        backgroundColor: "rgba(0, 0, 0, 0.9)", // White background
        titleFont: {
          size: 14,
          weight: "bold",
          family: "Popins-Regular",
        },
        bodyFont: {
          size: 12,
          weight: "normal",
          family: "Popins-Regular",
        },
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 10,
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: "Popins-Regular", // Custom font for legend
          },
        },
      },
    },
  };

  return (
    <div style={{ width: graphWidth, height: graphHeight }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BasicGroupedBarGraph;
