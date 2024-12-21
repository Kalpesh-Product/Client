import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function GroupedBarGraph({
  labels, // Months
  datasets, // Array of datasets (targets and achievements)
  graphWidth,
  graphHeight,
}) {
  return (
    <BarChart
      width={graphWidth}
      height={graphHeight}
      xAxis={[{ data: labels, scaleType: "band" }]}
      series={datasets.map((dataset) => ({
        data: dataset.data,
        label: dataset.label,
        color: dataset.backgroundColor, // Using color from the dataset
      }))}
      groupOffset={10} // Space between groups
      barSpacing={0.3} // Space between bars
    />
  );
}
