import React from "react";
import EmployeeAgreementDetails from "./EmployeeAgreementDetails";
import useAuth from "../../../hooks/useAuth";

const EmployeeAgreementDetailsContainer = () => {
  const { auth: authUser } = useAuth();
  return (
    <>
      {authUser.user.department[0].name === "HR" ||
      authUser.user.name === "Kalpesh Naik" ? (
        <EmployeeAgreementDetails />
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default EmployeeAgreementDetailsContainer;
