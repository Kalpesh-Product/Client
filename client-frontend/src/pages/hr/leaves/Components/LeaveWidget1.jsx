import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidget1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="p-4 py-8 flex justify-between items-start"
        onClick={() => navigate("/hr/leaves/my-leaves")}>
        <div className="">
          <div>
            <p className="text-5xl font-bold text-center">6</p>
          </div>
        </div>
        <div>
          <div>
            <h3 className="text-xl font-semibold text-center pb-2">
              Applicable Leaves
            </h3>
          </div>

          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
              view Applied Leaves
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveWidget1;
