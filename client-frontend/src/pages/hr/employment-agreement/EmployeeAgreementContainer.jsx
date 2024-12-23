import React from "react";
import useAuth from "../../../hooks/useAuth";
import EmployeeAgreement from "./EmployeeAgreement";

import EmployeeAgreementDetailsContainer from "./EmployeeAgreementDetailsContainer";

const EmployeeAgreementContainer = () => {
  const { auth: authUser } = useAuth();
  return (
    <>
      {authUser.user.department[0].name === "HR" ? (
        // <div>for HR</div>
        <EmployeeAgreement />
      ) : (
        // <div>For others</div>
        <>
          <EmployeeAgreementDetailsContainer />
        </>
      )}
    </>
  );
};

export default EmployeeAgreementContainer;
