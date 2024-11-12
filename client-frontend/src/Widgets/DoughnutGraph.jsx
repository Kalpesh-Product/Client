import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutGraph = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#f87171', // Red
          '#60a5fa', // Blue
          '#fbbf24', // Yellow
          '#34d399', // Green
          '#c084fc', // Purple
          '#fb923c', // Orange
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563', // Tailwind's gray-600
          padding: 20,
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937', // Tailwind's gray-800
        titleColor: '#f3f4f6', // Tailwind's gray-100
        bodyColor: '#f3f4f6',
        padding: 12,
      },
    },
    cutout: '70%', // Inner circle size for a modern look
  }

  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
        Doughnut Chart
      </h3>
      <div className="relative">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default DoughnutGraph

