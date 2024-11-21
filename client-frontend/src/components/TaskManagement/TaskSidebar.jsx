import React, { useState } from 'react'
import { Toolbar, Tooltip } from "@mui/material";
import { useLocation,useNavigate } from 'react-router-dom';
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaHandsHelping,
    FaTasks,
  } from "react-icons/fa";
  import {
    FaArrowRightToBracket,
    FaBuildingUser,
    FaCode,
    FaMoneyBillTrendUp,
  } from "react-icons/fa6";

const TaskSidebar = () => {
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);

    const location = useLocation();
  const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      

  return (
    <div>
        <div className="">
      <div
        className={`${
          isSidebarOpen ? "w-60" : "w-20"
        } bg-white text-black flex-shrink-0 h-full sticky top-10 overflow-y-auto transition-all duration-300`}>
        {/*Dashboard */}
        <div className="flex flex-col gap-2 mt-5 px-3 relative">
          {/* Title/Dashboard */}
          <div
            // onClick={() => navigate(`/${passedDepartment}/dashboard`)}
            className={`flex border-b-[1px] ${
              isSidebarOpen ? "pl-[1rem]" : "justify-center"
            } items-center py-3 wono-blue wono-blue-text rounded-md `}>
            <div className="flex justify-center w-5 text-2xl">
              
            </div>
            {isSidebarOpen && (
              <span className="pl-5 font-bold uppercase">
                {/* {passedDepartment} */}
              </span>
            )}
          </div>

          {/* Collapse-button */}
          <Tooltip
            title={isSidebarOpen ? "Close" : "Collapse"}
            placement="right">
            <button
              onClick={toggleSidebar}
              className={`text-black text-[0.8rem] p-2 focus:outline-none text-end absolute top-[0.6rem] ${
                isSidebarOpen ? "left-[11rem]" : "left-[3.2rem]"
              } `}>
              {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRightToBracket />}
            </button>
          </Tooltip>

          {/* SubModules-Items */}
          {/* {
        modules.map(({ title, route, icon }, index) => (
          <Tooltip title={title} placement="right" key={index}>
            <div
              onClick={() => navigate(route)}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer py-2 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === route
                  ? "wono-blue border-r-4  border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-5 text-2xl">{icon}</div>
              {isSidebarOpen && <span className="pl-5 text-[0.8rem]">{title}</span>}
            </div>
          </Tooltip>
        ))
      } */}

          {/* Common-submodules-menu */}
          <Tooltip title={"Reports"} placement="right">
            <div
              onClick={() => {
                navigate("#dashboard");
              }}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-2 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-6 text-[1.3rem]">
              
              </div>
              {isSidebarOpen && <span className="pl-5 text-[0.8rem]">Dashboard</span>}
              </div>
            </Tooltip>
         

          {/* Menu Items only for reports */}
          {location.pathname === "/tasks" && (
            <>
              <Tooltip title={"Task Dashboard"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Tasklist
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                   
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]"> Teams</span>
                  )}
                </div>
              </Tooltip>
          
            </>
          )}
        </div>
      </div>
    </div>

    </div>
  )
}

export default TaskSidebar