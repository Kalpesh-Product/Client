import React from "react";
import ModuleSidebar from "../../components/ModuleSidebar";
import { useLocation, useParams } from "react-router-dom";
import TestSide from "../../components/Sidetest";


const DepartmentDash = () => {
    const location = useLocation()
    const departmentName = location.state?.departmentName
    const { department } = useParams();
  return (
    <div className="flex">
      <TestSide />
      <ModuleSidebar />
      <div className="p-6 bg-gray-200">
        <h1>{departmentName} Dashboard here </h1>
      </div>
    </div>
  );
};

export default DepartmentDash;
