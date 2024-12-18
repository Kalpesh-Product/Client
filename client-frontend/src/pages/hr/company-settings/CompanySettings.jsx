import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab, Box } from "@mui/material";
import WonoButton from "../../../components/Buttons/WonoButton";
import { NewModal } from "../../../components/NewModal";
import AddDepartmentForm from "./AddDepartmentForm";
import AgTable from "../../../components/AgTable";
import AddDesignationForm from "./AddDesignationForm";

const CompanySettings = () => {
  const [company, setCompany] = useState(null); // Initialize as null to handle loading state.
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getCompanies = async () => {
    try {
      const companies = await axios.get(
        "/api/company/get-companies"
      );
      const response = companies.data;
      setCompany(response.companies[0]); // Assuming only one company for now.
    } catch (error) {
      console.error("Error fetching companies:", error.message);
    }
  };

  const modalStyle = {
    width: "50vw",
    minHeight: "40vh",
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await axios.get(
          "/api/departments/get-departments"
        );
        setDepartments(response.data.departments);
        console.log(response.data.departments);
        setLoadingDepartments(false);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setLoadingDepartments(false);
      }
    };
    if (activeTab === 1 && departments.length === 0) {
      fetchDepartments();
    }
  }, [activeTab]);

  const handleViewDepartment = (row) => {
    setSelectedDepartment(row);
    setOpenModal("view-department");
  };

  const departmentColumns = [
    {
      headerName: "Department Name",
      field: "name",
    },
    {
      headerName: "Actions",
      cellRenderer: (params) =>
        params.value || (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewDepartment(params.data)}
              className="wono-blue-dark px-2 text-white rounded-md"
            >
              View
            </button>
            {/* <button
              onClick={() => handleManageDepartment(params.data)}
              className="wono-blue-dark px-2 text-white rounded-md"
            >
              Manage
            </button> */}
          </div>
        ),
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenModal = (modal) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", padding: 2, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Company" />
          <Tab label="Departments" />
          <Tab label="Designations" />
        </Tabs>

        {activeTab === 0 && (
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
        )}

        {activeTab === 1 && (
          <div className="bg-white rounded-md p-2">
            <div className="flex justify-between items-center my-3">
              <h1 className="text-xl font-bold">Departments</h1>
              <WonoButton
                content={"Add Department"}
                onClick={() => handleOpenModal("add-department")}
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-500 my-3">
              Admins
            </h1>
            {loadingDepartments ? (
              <p>Loading departments...</p>
            ) : (
              <AgTable
                data={departments}
                columns={departmentColumns}
                paginationPageSize={10}
                highlightFirstRow={false}
                highlightEditedRow={false}
              />
            )}
            <p className="text-gray-600">
              Here you can manage your company departments.
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <AddDesignationForm />
          </div>
        )}
      </Box>

      <NewModal
        styles={modalStyle}
        open={!!openModal}
        onClose={handleCloseModal}
      >
        {openModal === "add-department" && (
          <>
            <AddDepartmentForm handleClose={handleCloseModal} />
          </>
        )}
        {openModal === "view-department" && selectedDepartment && (
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Department Details</h1>
            <p>
              <strong>Department Name:</strong> {selectedDepartment.name}
            </p>
            <p>
              <strong>Admin:</strong>{" "}
              {selectedDepartment.admin?.name || "Unassigned"}
            </p>
            <p>
              <strong>Company:</strong>{" "}
              {selectedDepartment.company?.companyName || "N/A"}
            </p>
            {/* <p>
              <strong>Designations:</strong>{" "}
              {selectedDepartment.designations?.length > 0
                ? selectedDepartment.designations.map((designation, index) => (
                    <div key={designation._id}>
                      <strong>Title:</strong> {designation.title} <br />
                      <strong>Responsibilities:</strong>{" "}
                      {designation.responsibilities?.join(", ") || "None"}
                    </div>
                  ))
                : "N/A"}
            </p> */}
            <p>
              <strong>Members:</strong>{" "}
              {selectedDepartment.members?.length || 0}
            </p>
            <button
              className="wono-blue-dark px-4 py-2 text-white rounded-md mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        )}
        {/* {openModal === "manage-department && "} */}
      </NewModal>
    </>
  );
};

export default CompanySettings;
