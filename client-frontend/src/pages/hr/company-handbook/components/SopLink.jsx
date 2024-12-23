import React from "react";
import { useNavigate } from "react-router-dom";

const SopLink = () => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate("/hr/company-handbook/sop")}>
        <div className="p-4">
          {/* <h3 className="text-lg font-semibold">Utilised Leaves</h3> */}
          <br />
          <p className="text-3xl font-bold">SOPs</p>
          <br />
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

export default SopLink;
