import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const approvedBudget = [
  5000, 7000, 6000, 8000, 9000, 10000, 9500, 11000, 10500, 12000, 11500, 12500,
]; // Budget data for each month
const months = [
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
]; // X-axis labels

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
