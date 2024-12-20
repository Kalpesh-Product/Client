import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartMUI = ({ data }) => {
  // Default data for site visits by city
  const defaultData = [
    // { id: 0, value: 25, label: 'Mumbai' },
    // { id: 1, value: 20, label: 'Delhi' },
    // { id: 2, value: 15, label: 'Bangalore' },
    // { id: 3, value: 10, label: 'Hyderabad' },
    // { id: 4, value: 30, label: 'Chennai' },
  ];

  const pieData = !data ? defaultData : data;

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <h2 style={{ textAlign: "center" }}>Site Visits by City</h2>
      <PieChart
        series={[{ data: pieData }]}
        width={500}
        height={300}
        slotProps={{
          legend: {
            direction: "column",
            position: {
              horizontal: "right",
              vertical: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChartMUI;
