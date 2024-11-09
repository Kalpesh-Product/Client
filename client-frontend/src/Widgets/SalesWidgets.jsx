import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement, // Register PointElement for Line chart
    LineElement,  // Register LineElement for Line chart
    ArcElement    // Register ArcElement for Pie chart
  );

// RecurringClients widget
const RecurringClients = ({ count, progress, target }) => (
  <div className="p-4 bg-blue-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Recurring Clients</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

// SalesProgress widget
const SalesProgress = ({ progress }) => (
  <div className="p-4 bg-green-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Sales Progress</h3>
    <p className="text-2xl font-bold">{progress}%</p>
  </div>
);

// SalesTarget widget
const SalesTarget = ({ target }) => (
  <div className="p-4 bg-yellow-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Sales Target</h3>
    <p className="text-2xl font-bold">${target}</p>
  </div>
);

// Bar Chart Widget - Sales by Month
const SalesByMonthGraph = () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales ($)',
          data: [3000, 4000, 3500, 4500, 6000, 7000], // Sample data for sales each month
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold">Sales by Month</h3>
        <Bar data={data} />
      </div>
    );
  };

  // Line Chart Widget - Sales Trend Over Time
  const SalesTrendGraph = () => {
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [
        {
          label: 'Sales Trend ($)',
          data: [1000, 2500, 3000, 3500, 4000], // Sample data for sales trend
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1,
        },
      ],
    };
  
    return (
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold">Sales Trend Over Time</h3>
        <Line data={data} />
      </div>
    );
  };

// Pie Chart Widget - Sales Distribution
const SalesDistributionGraph = () => {
    const data = {
      labels: ['Online', 'In-Store', 'Wholesale'],
      datasets: [
        {
          label: 'Sales Distribution (%)',
          data: [40, 35, 25], // Sample data for sales distribution by type
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold">Sales Distribution</h3>
        <Pie data={data} />
      </div>
    );
  };

export { RecurringClients, SalesProgress, SalesTarget,  SalesByMonthGraph, SalesTrendGraph, SalesDistributionGraph };
