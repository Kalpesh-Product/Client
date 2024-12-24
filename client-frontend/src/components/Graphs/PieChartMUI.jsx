import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartMUI = ({ data, title }) => {
  return (
    <div style={{ width: "100%", margin: "0" }}>
      <h2 className="p-4 text-2xl">{title}</h2>
      <PieChart
        series={[
          {
            data: data.map((item) => ({
              ...item,
              backgroundColor: item.color, // Use the color from the data
            })),
          },
        ]}
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
