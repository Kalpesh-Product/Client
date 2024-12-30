import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartMUI = ({ data, title }) => {
  return (
    <>
      <div className="gray-underline p-2 mb-4">
        <h1 className="text-xl">{title}</h1>
      </div>
      <div style={{ width: "100%", margin: "0" }}>
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
    </>
  );
};

export default PieChartMUI;
