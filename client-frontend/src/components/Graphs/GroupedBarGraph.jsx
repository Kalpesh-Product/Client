import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";

const data = [
  { name: "April", Allocated: 100, Used: 100, Exceeded: 10 },
  { name: "May", Allocated: 100, Used: 100, Exceeded: 20 },
  { name: "June", Allocated: 100, Used: 90, Exceeded: 0 },
  { name: "July", Allocated: 100, Used: 100, Exceeded: 0 },
  { name: "August", Allocated: 100, Used: 80, Exceeded: 0 },
  { name: "September", Allocated: 100, Used: 100, Exceeded: 8 },
  { name: "October", Allocated: 100, Used: 90, Exceeded: 0 },
  { name: "November", Allocated: 100, Used: 100, Exceeded: 0 },
  { name: "December", Allocated: 100, Used: 92, Exceeded: 0 },
  { name: "January", Allocated: 100, Used: 0, Exceeded: 0 },
  { name: "February", Allocated: 100, Used: 0, Exceeded: 0 },
  { name: "March", Allocated: 100, Used: 0, Exceeded: 0 },
];

const GroupedBarGraph = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Annual Budget</h1>
      <BarChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          ticks={[0, 20, 40, 60, 80, 100, 120]}
          domain={[0, 120]}
          unit="%"
        />
        <Tooltip />
        <Legend verticalAlign="top" />
       
        <Bar dataKey="Used" stackId="b" fill="#2E8B57">
          <LabelList dataKey="Used" position="top" />
        </Bar>
        <Bar dataKey="Allocated" stackId="a" fill="#00FF00">
          <LabelList dataKey="Allocated" position="top" />
        </Bar>
        <Bar dataKey="Exceeded" stackId="a" fill="#FF0000">
          <LabelList dataKey="Exceeded" position="top" />
        </Bar>
        
      </BarChart>
    </div>
  );
};

export default GroupedBarGraph;
