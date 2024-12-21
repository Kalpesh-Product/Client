import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BudgetLineChart({ graphYaxis, graphXaxis, xAxisLabel, graphWidth, graphHeight }) {
  return (
    <LineChart
      width={graphWidth}
      height={graphHeight}
      series={[{ data: graphYaxis[0].data, label: xAxisLabel }]}
      xAxis={[
        {
          scaleType: "point",
          data: graphXaxis, // Use months as labels
        },
      ]}
    />
  );
}
