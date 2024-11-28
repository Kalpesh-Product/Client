import React from "react";
import { useNavigate } from "react-router-dom";

const ReportWidget1 = ({ title, subtitle, link }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div
      //   className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      className="mt-6 p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(link)} // Use navigate for routing
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      <p className="pt-2 text-xs wono-blue-text">Click here to view report</p>
    </div>
  );
};

export default ReportWidget1;
