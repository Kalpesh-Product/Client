import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidget2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div
          className="p-4 py-8 flex justify-between items-start"
          onClick={() => navigate("/hr/leaves/past-leaves")}>
          <div>
            <p className="text-5xl font-bold text-center">2</p>
          </div>
          <div>
            <div>
              <h3 className="text-xl font-semibold text-center pb-2">
                Utilised Leaves
              </h3>
            </div>

            <div className="text-center">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                View Past Leaves
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveWidget2;
