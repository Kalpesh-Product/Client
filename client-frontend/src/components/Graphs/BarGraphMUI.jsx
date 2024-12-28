import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BarGraphMUI = ({ data, title, graphWidth, graphHeight }) => {
  // Default data in case no data is passed from the parent component
  const defaultData = {
    months: [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ],
    uniqueCompanies: [10, 20, 15, 30, 25, 35, 40, 45, 50, 55, 60, 65],
  };

  console.log(data);
  const graphData = data || defaultData;

  return (
    <>
      <div className="gray-underline p-2">
        <h1 className="text-xl">{title}</h1>
      </div>
      <div style={{ width: "100%", maxWidth: "700px", margin: "0" }}>
        <BarChart
          width={graphWidth}
          height={graphHeight}
          series={[
            {
              data: !data ? graphData.uniqueCompanies : graphData.data,
              label: title,
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: graphData.months,
            },
          ]}
        />
      </div>
    </>
  );
};

export default BarGraphMUI;
