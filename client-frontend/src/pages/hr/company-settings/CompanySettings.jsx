import React, { useEffect, useState } from "react";
import axios from "axios";
import WonoButton from "../../../components/Buttons/WonoButton";
import { NewModal } from "../../../components/NewModal";
import AddDepartmentForm from "./AddDepartmentForm";

const CompanySettings = () => {
  const [company, setCompany] = useState(null); // Initialize as null to handle loading state.
  const [openModal, setOpenModal] = useState(false);

  const getCompanies = async () => {
    try {
      const companies = await axios.get(
        "http://localhost:5000/api/company/get-companies"
      );
      const response = companies.data;
      setCompany(response.companies[0]); // Assuming only one company for now.
    } catch (error) {
      console.error("Error fetching companies:", error.message);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className="bg-white rounded-md p-2">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-xl font-bold">Company Settings</h1>
          <WonoButton
            content={"Add Department"}
            onClick={() => handleOpenModal("add-department")}
          />
        </div>
        {company ? (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              {company.companyName}
            </h2>
            <p>
              <strong>Industry:</strong> {company.industry}
            </p>
            <p>
              <strong>Company Size:</strong> {company.companySize}
            </p>
            <p>
              <strong>Type:</strong> {company.companyType}
            </p>
            <p>
              <strong>City:</strong> {company.companyCity}
            </p>
            <p>
              <strong>State:</strong> {company.companyState}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${company.websiteURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {company.websiteURL}
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={`https://linkedin.com/${company.linkedinURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {company.linkedinURL}
              </a>
            </p>
          </div>
        ) : (
          <p>Loading company details...</p>
        )}
      </div>

      <NewModal open={!!openModal} onClose={handleCloseModal}>
        {openModal === "add-department" && (
          <>
            <button onClick={handleCloseModal}>close</button>
            <AddDepartmentForm />
          </>
        )}
      </NewModal>
    </>
  );
};

export default CompanySettings;
