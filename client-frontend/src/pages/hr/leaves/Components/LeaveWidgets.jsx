import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidgets = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-4" onClick={() => navigate("/hr/leaves/my-leaves")}>
        <h3 className="text-lg font-semibold text-center">Applicable Leaves</h3>
        <p className="text-3xl font-bold text-center">8/12</p>
        <br />
        <div className="text-center">
          <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">
            view Applied Leaves
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaveWidgets;
