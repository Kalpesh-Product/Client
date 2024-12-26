import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidget3 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="p-4 py-8 flex justify-between items-start"
        onClick={() => navigate("/hr/leaves/my-leaves")}>
        <div>
          <p className="text-5xl font-bold text-center">4</p>
        </div>
        <div>
          <div>
            <h3 className="text-xl font-semibold text-center pb-2">
              Pending Leaves
            </h3>
          </div>
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
              View Applied Leaves
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveWidget3;
