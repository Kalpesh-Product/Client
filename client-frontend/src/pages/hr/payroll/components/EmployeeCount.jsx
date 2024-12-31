import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../utils/axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeCount() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async function () {
      try {
        const response = await api.get("/api/users/fetch-users");
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const departmentCount = data.users.reduce((acc, user) => {
    user.department.forEach((dept) => {
      acc[dept.name] = (acc[dept.name] || 0) + 1;
    });
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(departmentCount),
    datasets: [
      {
        data: Object.values(departmentCount),
        backgroundColor: [
          "#264653",
          "#2A9D8F",
          "#E9C46A",
          "#F4A261",
          "#E76F51",
          "#8AB17D",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Prevent automatic resizing
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${value} Employee${value > 1 ? "s" : ""}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white w-full">
      <h2 className="text-lg font-bold mb-2 p-2 text-gray-700">
        Department-wise Employee Count
      </h2>
      <div className="flex justify-center items-center">
        <div
          style={{
            width: "300px",
            height: "300px", // Explicit size for the chart container
          }}
        >
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

