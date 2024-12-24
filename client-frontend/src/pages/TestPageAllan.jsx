import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
];

const TestPageAllan = () => {
  const CustomLabel = ({ x, y, value }) => (
    <text x={x} y={y} dy={-10} fill="#000" fontSize={14} textAnchor="middle">
      {value}
    </text>
  );
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Bar dataKey="value" fill="#8884d8">
          <LabelList
            dataKey="value"
            position="top"
            style={{ fill: "#000", fontSize: 14 }}
          />
        </Bar> */}
        {/* <Bar dataKey="value" fill="#8884d8">
          <LabelList dataKey="value" content={<CustomLabel />} />
        </Bar> */}

        <Bar dataKey="value" fill="#8884d8">
          <LabelList
            dataKey="value"
            position="insideTop"
            style={{ fill: "#fff", fontSize: 14 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TestPageAllan;
