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
      tooltip: {
        enabled: true,
        callbacks: {
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
              `Allocated Budget: ${allocated}%`,
              `Utilised Budget: ${utilised}%`,
              `${status}: ${Math.abs(difference)}%`, // Show exceeded or remaining percentage
            ];
          },
        },
        displayColors: false, // Disable color boxes in the tooltip
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
          weight : "bold",
          display : "flex"
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)", // White background
        titleColor: "#000", // Black title
        bodyColor: "#000", // Black body text
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 10,
      },
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => {
            return [
              {
                text: "Allocated", // Custom label for Allocated
                fillStyle: "rgba(54, 162, 235, 0.7)", // Blue color
              },
              {
                text: "Exceeded Budget", // Custom label for exceeded budget
                fillStyle: "rgba(255, 0, 0, 1)", // Red color
              },
              {
                text: "Utilized", // Custom label for utilized
                fillStyle: "rgba(0, 255, 0, 1)", // Green color
              },
            ];
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
}
