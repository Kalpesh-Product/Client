import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

// PC Fixes widget
const PCFixes = ({ count }) => (
    <div className="p-4 bg-blue-700 text-white rounded-lg text-center h-full">
      <h3 className="text-sm font-semibold">PC Fixes</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );

// PC Fixes Progress widget (progress bar)
const PCFixesProgress = ({ progress }) => (
    <div className="p-4 bg-blue-700 text-white rounded-lg text-center">
      <h3 className="text-sm font-semibold">PC Fixes Progress</h3>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-xl font-bold mt-2">{progress}% Complete</p>
    </div>
  );

// PC Fixes Pending widget (progress bar)
const PCFixesPending = ({ pendingCount }) => (
    <div className="p-4 bg-orange-700 text-white rounded-lg text-center">
      <h3 className="text-sm font-semibold">PC Fixes Pending</h3>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(pendingCount / 100) * 100}%` }}></div>
      </div>
      <p className="text-xl font-bold mt-2">{pendingCount} Pending</p>
    </div>
  );
  
  // WiFi Configuration widget
  const WiFiConfiguration = ({ count }) => (
    <div className="p-4 bg-green-700 text-white rounded-lg text-center">
      <h3 className="text-sm font-semibold">WiFi Configurations</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
  
  // WiFi Traffic widget
  const WiFiTraffic = ({ traffic }) => (
    <div className="p-4 bg-yellow-700 text-white rounded-lg text-center">
      <h3 className="text-sm font-semibold">WiFi Traffic</h3>
      <p className="text-2xl font-bold">{traffic} GB</p>
    </div>
  );
  
  // Network Issues Resolved widget
  const NetworkIssuesResolved = ({ count }) => (
    <div className="p-4 bg-red-700 text-white rounded-lg text-center">
      <h3 className="text-sm font-semibold">Network Issues Resolved</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
  const itWidgetsData = {
    pcFixesOverTime: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"], // Weeks for x-axis
      values: [15, 25, 30, 45, 20, 30, 90], // Number of PC fixes for each week
    },
  };
  // LineGraph widget (PC Fixes Over Time)
const PCFixesLineGraph = ({ data }) => {
    const chartData = {
        labels: itWidgetsData.pcFixesOverTime.labels, // Week labels
        datasets: [
          {
            label: "PC Fixes Over Time",
            data: itWidgetsData.pcFixesOverTime.values, // Values for PC fixes
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            fill: true, // Fills the area under the line
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      };
  
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.raw + " fixes"; // Add units to the tooltip
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <div className="p-4 bg-white text-black rounded-lg text-center">
        <h3 className="text-sm font-semibold">PC Fixes Over Time</h3>
        <div className="h-full w-full mt-3">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  };
  
  export { PCFixes, WiFiConfiguration, WiFiTraffic, NetworkIssuesResolved, PCFixesProgress, PCFixesPending, PCFixesLineGraph };
  