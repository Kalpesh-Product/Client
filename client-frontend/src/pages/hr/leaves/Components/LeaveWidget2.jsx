import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveWidget2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="p-4" onClick={() => navigate("/hr/leaves/past-leaves")}>
          <h3 className="text-lg font-semibold text-center">Utilised Leaves</h3>
          <p className="text-3xl font-bold text-center">4/12</p>
          <br />
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100">
              View Past Leaves
            </span>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="mb-2 flex justify-between">
          <h1 className="text-3xl"></h1>
          <button
            onClick={() => navigate("/hr/leaves/past-leaves")}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            View Past Leaves
          </button>
        </div>
      </div> */}
    </>
  );
};

export default LeaveWidget2;
