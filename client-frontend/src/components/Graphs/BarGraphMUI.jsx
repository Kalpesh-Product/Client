import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BarGraphMUI = ({ data, title, graphWidth, graphHeight }) => {
  // Default data in case no data is passed from the parent component
  const defaultData = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    uniqueCompanies: [10, 20, 15, 30, 25, 35, 40, 45, 50, 55, 60, 65],
  };

  console.log(data)
  const graphData = data || defaultData;

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "0" }}>
      {/* <h2 style={{ textAlign: "center" }}>{title}</h2> */}
      <BarChart
        width={graphWidth}
        height={graphHeight}
        series={[
          {
            data: (!data ? graphData.uniqueCompanies : graphData.data),
            label: title,
          },
        ]}
        xAxis={[{
          scaleType: "band",
          data: graphData.months,
        }]}
      />
    </div>
  );
};

export default BarGraphMUI;
