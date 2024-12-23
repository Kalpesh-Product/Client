import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidget4 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-4" onClick={() => navigate("/hr/leaves/due-approvals")}>
        <h3 className="text-lg font-semibold text-center">
          Subordinate Due Approvals
        </h3>
        <p className="text-3xl font-bold text-center">5/10</p>
        <br />
        <div className="text-center">
          <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">
            View Past Leaves
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaveWidget4;
