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

export default function GroupedBarGraph({
  labels,
  datasets,
  graphWidth,
  graphHeight,
  title
}) {
  // Prepare data for Chart.js
  const chartData = {
    labels: labels, // x-axis labels
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor:
        dataset.label === "Utilised"
          ? dataset.data.map((value) =>
              value > 100 ? "rgb(255,145,169)" : "rgb(2,178,175)"
            ) // Dynamic coloring for Utilised
          : "rgb(114,190,241)", // Default color for Allocated
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false, // Set to true if you want stacking
        ticks: {
          font: {
            family: "Popins-Regular", // Custom font for x-axis
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Add % to y-axis values
          font: {
            family: "Popins-Regular", // Custom font for x-axis
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        displayColors: true, // Display the color indicator for each dataset
        callbacks: {
          title: function (context) {
            // Show the month (title)
            return context[0].label; // Example: "March"
          },
          label: function (context) {
            // Get Allocated and Utilised values
            const allocated =
              context.chart.data.datasets[0].data[context.dataIndex]; // Allocated
            const utilised =
              context.chart.data.datasets[1].data[context.dataIndex]; // Utilised

            // Calculate the difference
            const difference = utilised - allocated;
            const status = difference > 0 ? "Exceeded" : "Remaining";

            // Return custom tooltip content
            return [
              `Allocated: ${allocated}%`,
              `Utilised: ${utilised}%`,
              `${status}: ${Math.abs(difference)}%`,
            ];
          },
        },
        titleFont: {
          size: 14,
          weight: "bold", // Bold title font
          family: "Popins-Regular", // Custom font for title
        },
        bodyFont: {
          size: 12,
          weight: "normal", // Regular body font
          family: "Popins-Regular", // Custom font for body
        },
        bodySpacing: 8, // Add spacing between body lines
        backgroundColor: "rgba(255, 255, 255, 1)", // White background
        titleColor: "#000", // Black title
        bodyColor: "#000", // Black body text
        borderColor: "rgba(0, 0, 0, 0.1)", // Light border
        borderWidth: 1,
        padding: 10, // Adjust padding
        boxWidth: 10, // Adjust indicator width
        boxHeight: 10, // Adjust indicator height
      },

      legend: {
        display: true,
        labels: {
          font : {
            family: "Popins-Regular", 
          },
          generateLabels: (chart) => {
            return [
              {
                text: "Allocated", // Custom label for Allocated
                fillStyle: "rgb(114,190,241)", // Blue color
              },
              {
                text: "Exceeded Budget", // Custom label for exceeded budget
                fillStyle: "rgb(255,145,169)", // Red color
              },
              {
                text: "Utilized", // Custom label for utilized
                fillStyle: "rgb(2,178,175)", // Green color
              },
            ];
          },
        },
      },
    },
  };

  return (
    <div className="p-4 pb-8" style={{ width: graphWidth, height: graphHeight }}>
      <div>
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
